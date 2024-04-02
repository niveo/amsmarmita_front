import { Prato } from './prato';

export class PedidoItem {
  pedido?: string;
  prato?: Prato;
  quantidade?: number;
  _id?: string;
  acompanhamentos?: Prato[];
  observacao?: string;
}
