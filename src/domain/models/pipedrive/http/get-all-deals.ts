import { DealsModel } from '../deals';

export namespace GetAllDeals {
  export type Input = { companyDomain: string; apiToken: string };
  export type Output = { success: boolean; data: Array<DealsModel> };
}

export interface IGetAllDeals {
  getAllDeals: (data: GetAllDeals.Input) => Promise<GetAllDeals.Output>;
}
