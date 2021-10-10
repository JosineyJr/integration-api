/* eslint-disable import/export */
import { ICreatePedido } from '@/domain/models/bling/http/create-pedido';
import { Status } from '@/domain/models/pipedrive';
import { IGetAllDeals } from '@/domain/models/pipedrive/http';
import { IFilterDealsByStatus } from '@/domain/use-cases/filter-deals-by-status';
import { ok } from '../helpers';
import { HttpResponse } from '../protocols';
import { IValidator, ValidationBuilder } from '../validation';
import { Controller } from './controller';

export class IntegrationController extends Controller {
  constructor(
    private readonly getAllDeals: IGetAllDeals,
    private readonly filterDealsByStatus: IFilterDealsByStatus,
    private readonly createPedido: ICreatePedido,
  ) {
    super();
  }

  async perform({ pipeDrive }: Integration.Request): Promise<HttpResponse> {
    const { data } = await this.getAllDeals.getAllDeals({
      apiToken: pipeDrive.apiToken,
      companyDomain: pipeDrive.companyDomain,
    });

    const status: Status = pipeDrive.filterByStatus ? pipeDrive.filterByStatus : 'won';

    const { filteredDeals } = this.filterDealsByStatus.filterByStatus({
      allDeals: data,
      status,
    });

    let statusStringFormatted = status.toLowerCase();
    statusStringFormatted = statusStringFormatted.charAt(0).toUpperCase() + statusStringFormatted.slice(1);

    filteredDeals.forEach(deals => {
      this.createPedido.create({ dealsData: deals });
    });

    return ok({ [`dealsWith${statusStringFormatted}Status`]: filteredDeals });
  }

  override buildValidators({ pipeDrive, bling }: Integration.Request): Array<IValidator> {
    return [
      ...ValidationBuilder.of({ fieldName: 'pipeDrive', value: pipeDrive }).required().beOfType('object').build(),
      ...ValidationBuilder.of({ fieldName: 'bling', value: bling }).required().beOfType('object').build(),
      ...ValidationBuilder.of({ fieldName: 'pipeDrive.apiToken', value: pipeDrive?.apiToken })
        .required()
        .beOfType('string')
        .build(),
      ...ValidationBuilder.of({ fieldName: 'pipeDrive.companyDomain', value: pipeDrive?.companyDomain })
        .required()
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
  };
}
