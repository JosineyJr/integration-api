/* eslint-disable import/export */
import { IGetPedidoByNumero } from '@/domain/models/bling/http';
import { ICreatePedido } from '@/domain/models/bling/http/create-pedido';
import { Status } from '@/domain/models/pipedrive';
import { IGetAllDeals } from '@/domain/models/pipedrive/http';
import { IUser } from '@/domain/models/user';
import { IFilterDealsByStatus } from '@/domain/use-cases/filter-deals-by-status';
import { IJobsProvider } from '@/infra/jobs';
import { ok } from '../helpers';
import { HttpResponse } from '../protocols';
import { IValidator, ValidationBuilder } from '../validation';
import { Controller } from './controller';
import env from '@/main/config/env';

export class IntegrationController extends Controller {
  constructor(
    private readonly getAllDeals: IGetAllDeals,
    private readonly filterDealsByStatus: IFilterDealsByStatus,
    private readonly createPedido: ICreatePedido,
    private readonly getPedidoByNumero: IGetPedidoByNumero,
    private readonly jobsProvider: IJobsProvider,
  ) {
    super();
  }

  async perform({ pipeDrive, bling, user }: Integration.Request): Promise<HttpResponse> {
    const { data } = await this.getAllDeals.getAllDeals({
      apiToken: pipeDrive.apiToken || env.pipeDriveApiToken,
      companyDomain: pipeDrive.companyDomain || env.pipeDriveCompanyDomain,
    });

    const status: Status = pipeDrive.filterByStatus ? pipeDrive.filterByStatus : 'won';

    const { filteredDeals } = this.filterDealsByStatus.filterByStatus({
      allDeals: data,
      status,
    });

    await Promise.all(filteredDeals.map(async deals => this.jobsProvider.add({ data: deals })));
    this.jobsProvider.processJobs({
      concurrency: 1,
      callback: (job: any) =>
        this.createPedido.create({
          dealsData: job,
          email: user.email,
          userName: user.name,
          apiKey: bling.apiKey || env.blingApiKey,
        }),
      details: 'creating pedidos...',
    });

    return ok({ message: 'Pedidos will be added to bling if they have not yet been registered' });
  }

  override buildValidators({ pipeDrive, bling }: Integration.Request): Array<IValidator> {
    return [
      ...ValidationBuilder.of({ fieldName: 'pipeDrive', value: pipeDrive }).beOfType('object').build(),
      ...ValidationBuilder.of({ fieldName: 'bling', value: bling }).beOfType('object').build(),
      ...ValidationBuilder.of({ fieldName: 'pipeDrive.apiToken', value: pipeDrive?.apiToken })
        .beOfType('string')
        .build(),
      ...ValidationBuilder.of({ fieldName: 'pipeDrive.companyDomain', value: pipeDrive?.companyDomain })
        .beOfType('string')
        .build(),
      ...ValidationBuilder.of({ fieldName: 'pipeDrive.filterByStatus', value: pipeDrive?.filterByStatus })
        .beOfType('string')
        .build(),
      ...ValidationBuilder.of({ fieldName: 'bling.apiKey', value: bling?.apiKey }).beOfType('string').build(),
    ];
  }
}

export namespace Integration {
  export type Request = {
    pipeDrive: {
      companyDomain: string;
      apiToken: string;
      filterByStatus?: Status;
    };
    bling: {
      apiKey: string;
    };
    user: IUser;
  };
}
