import { Grupo } from "./grupo";
import { Ingrediente } from "./ingrediente";

export class Prato {
  _id?: string;
  nome?: string;
  grupo?: Grupo;
  composicoes?: string[] = [];
  observacao?: string;

  icone?: string;
  imagem?: string;

  ingredientes?: string[] = [];
}

