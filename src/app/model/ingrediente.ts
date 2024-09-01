import { TipoIngrediente } from "@navegador/enuns/tipoingrediente.enum";
import { TipoMedida } from "@navegador/enuns/tipomedida.enum";

export class Ingrediente {
  _id!: string;
  nome!: string;
  observacao?: string;
  tipo?: TipoIngrediente;

  quantidade?: number;
  medida?: TipoMedida;

  embalagemQuantidade?: number;
  embalagemMedida?: TipoMedida;
}
