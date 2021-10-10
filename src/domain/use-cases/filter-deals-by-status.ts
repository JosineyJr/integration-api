import { DealsModel, Status } from '../models/pipedrive';

export namespace FilterDealsByStatus {
  export type Input = { allDeals: Array<DealsModel>; status: Status };
  export type Output = { filteredDeals: Array<DealsModel> };
}

export interface IFilterDealsByStatus {
  filterByStatus: ({ allDeals, status }: FilterDealsByStatus.Input) => FilterDealsByStatus.Output;
}
