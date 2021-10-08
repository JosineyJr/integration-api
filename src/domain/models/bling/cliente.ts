import { EnderecoModel } from './endereco';

export type ClienteModel = {
  id?: number;
  nome: string;
  tipoPessoa?: string;
  endereco?: EnderecoModel;
  ie?: string;
  cpf_cnpj?: string;
  rg?: string;
  fone?: string;
  celular?: string;
  email?: string;
  contribuinte: string;
};
