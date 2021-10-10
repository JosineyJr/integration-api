/* eslint-disable import/export */
import { Status } from '@/domain/models/pipedrive';
import { IGetAllDeals } from '@/domain/models/pipedrive/http';
import { IFilterDealsByStatus } from '@/domain/use-cases/filter-deals-by-status';
import { ok } from '../helpers';
import { HttpResponse } from '../protocols';
import { IValidator, ValidationBuilder } from '../validation';
import { Controller } from './controller';

export class IntegrationController extends Controller {
  constructor(private readonly getAllDeals: IGetAllDeals, private readonly filterDealsByStatus: IFilterDealsByStatus) {
    super();
  }

  async perform({ pipeDrive }: Integration.Request): Promise<HttpResponse> {
    const { data } = await this.getAllDeals.getAllDeals({
      apiToken: pipeDrive.apiToken,
      companyDomain: pipeDrive.companyDomain,
    });

    const { filteredDeals } = this.filterDealsByStatus.filterByStatus({
      allDeals: data,
      status: pipeDrive.filterByStatus,
    });

    let statusStringFormatted = pipeDrive.filterByStatus.toLowerCase();
    statusStringFormatted = statusStringFormatted.charAt(0).toUpperCase() + statusStringFormatted.slice(1);

    return ok({ [`dealsWith${statusStringFormatted}Status`]: filteredDeals });
  }

  override buildValidators({ pipeDrive }: Integration.Request): Array<IValidator> {
    return [
      ...ValidationBuilder.of({ fieldName: 'pipeDrive', value: pipeDrive }).required().beOfType('object').build(),
      ...ValidationBuilder.of({ fieldName: 'pipeDrive.apiToken', value: pipeDrive?.apiToken })
        .required()
        .beOfType('string')
        .build(),
      ...ValidationBuilder.of({ fieldName: 'pipeDrive.companyDomain', value: pipeDrive?.companyDomain })
        .required()
        .beOfType('string')
        .build(),
      ...ValidationBuilder.of({ fieldName: 'pipeDrive.filterByStatus', value: pipeDrive?.filterByStatus })
        .required()
        .beOfType('string')
        .build(),
    ];
  }
}

export namespace Integration {
  export type Request = {
    pipeDrive: {
      companyDomain: string;
      apiToken: string;
      filterByStatus: Status;
    };
  };
}
