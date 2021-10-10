import { ClienteModel } from './cliente';
import { ItemModel } from './item';
import { ParcelaModel } from './parcela';
import { TransporteModel } from './transporte';

export type PedidoModel = {
  cliente: ClienteModel;
  transporte?: TransporteModel;
  itens: Array<{ item: ItemModel }>;
  parcelas?: { parcela: Array<ParcelaModel> };
  idFormaPagamento?: number;
  vlr_frete?: string;
  vlr_desconto?: string;
  obs?: string;
  obs_internas?: string;
  data?: string;
  data_saida?: string;
  data_prevista?: string;
  numero: string;
  numero_loja?: string;
  loja?: number;
  nat_operacao?: string;
  numeroOrdemCompra?: string;
  outrasDespesas?: number;
};
