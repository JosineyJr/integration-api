/* eslint-disable import/export */
import { PedidoModel } from '@/domain/models';
import { IGetPedidoByNumero } from '@/domain/models/bling/http';
import { ICreatePedido } from '@/domain/models/bling/http/create-pedido';
import { Status } from '@/domain/models/pipedrive';
import { IGetAllDeals } from '@/domain/models/pipedrive/http';
import { IAddPedido } from '@/domain/use-cases';
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
    private readonly addPedido: IAddPedido,
    private readonly getPedidoByNumero: IGetPedidoByNumero,
  ) {
    super();
  }

  async perform({ pipeDrive, bling }: Integration.Request): Promise<HttpResponse> {
    const { data } = await this.getAllDeals.getAllDeals({
      apiToken: pipeDrive.apiToken,
      companyDomain: pipeDrive.companyDomain,
    });

    const status: Status = pipeDrive.filterByStatus ? pipeDrive.filterByStatus : 'won';

    const { filteredDeals } = this.filterDealsByStatus.filterByStatus({
      allDeals: data,
      status,
    });

    const addedPedidos: Array<PedidoModel> = [];

    await Promise.all(
      filteredDeals.map(async deals => {
        const { pedido } = await this.createPedido.create({ dealsData: deals });

        if (pedido) {
          const { pedido: pedidoData } = await this.getPedidoByNumero.getPedidoByNumero({
            apiKey: bling.apiKey,
            numero: pedido.numero,
          });
          this.addPedido.add(pedidoData);
          console.log(pedidoData);
          addedPedidos.push(pedidoData);
        }
      }),
    );

    return ok(addedPedidos);
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
