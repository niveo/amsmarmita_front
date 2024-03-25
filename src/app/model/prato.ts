export class Prato {
  _id?: string;
  nome?: string;
  grupo?: string;
  composicoes?: string[] = [];
  observacao?: string;

  pedido: any;
}

