import { GetAllDeals, IGetAllDeals } from '@/domain/models/pipedrive/http';
import { FilterDealsByStatus, IFilterDealsByStatus } from '@/domain/use-cases/filter-deals-by-status';
import { IHttpGetClient } from './client';

export class PipeDriveApi implements IGetAllDeals, IFilterDealsByStatus {
  constructor(private readonly httpGetClient: IHttpGetClient) {}

  async getAllDeals({ apiToken, companyDomain }: GetAllDeals.Input): Promise<GetAllDeals.Output> {
    const result = await this.httpGetClient.get({
      url: `https://${companyDomain}.pipedrive.com/api/v1/deals?api_token=${apiToken}`,
    });

    return result;
  }

  filterByStatus({ allDeals, status }: FilterDealsByStatus.Input): FilterDealsByStatus.Output {
    const result = allDeals.filter(deals => deals.status === status.toString().toLowerCase());

    return { filteredDeals: result };
  }
}
