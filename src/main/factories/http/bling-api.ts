import { ConvertObjectToXmlAdapter } from '@/infra/data-conversion/convert-object-to-xml-adapter';
import { BlingApi } from '@/infra/http/bling-api';
import { makeDbAddPedido } from '../use-cases/add-pedido-repository';
import { makeAxiosHttpClient } from './axiosHttpClient';

export const makeBlingApi = (): BlingApi => {
  const convertObjectToXmlAdapter = new ConvertObjectToXmlAdapter();
  return new BlingApi(makeAxiosHttpClient(), convertObjectToXmlAdapter, makeAxiosHttpClient(), makeDbAddPedido());
};
