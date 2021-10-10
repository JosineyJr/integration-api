import { PipeDriveApi } from '@/infra/http/';
import { makeAxiosHttpClient } from './axiosHttpClient';

export const makePipeDriveApi = (): PipeDriveApi => {
  return new PipeDriveApi(makeAxiosHttpClient());
};
