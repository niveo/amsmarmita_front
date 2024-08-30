import { TipoIngrediente } from "@navegador/enuns/tipoingrediente.enum";
import { TipoMedida } from "@navegador/enuns/tipomedida.enum";

export class Ingrediente {
  _id!: string;
  nome!: string;
  observacao?: string;
  tempero? = false;
  medida?: TipoMedida;
  tipo?: TipoIngrediente;

  embalagemQuantidade?: number;
  embalagemMedida?: TipoMedida;
}
