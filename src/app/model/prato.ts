export class Prato {
  id?: string;
  nome?: string;
  grupo?: string;
  composicoes?: string[] = [];
  observacao?: string;

  pedido: any;
}

