import { EtiquetaModel } from './etiqueta';
import { VolumeModel } from './volume';

export type TransporteModel = {
  transportadora?: string;
  tipo_frete?: string;
  servico_correios?: string;
  dados_etiqueta?: EtiquetaModel;
  volumes?: { volume: Array<VolumeModel> };
};
