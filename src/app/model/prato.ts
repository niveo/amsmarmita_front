import { Grupo } from "./grupo"; 

export class Prato {
  _id?: string;
  nome?: string;
  grupo?: Grupo;
  composicoes?: string[] = [];
  observacao?: string;

  icone?: string; 

  ingredientes?: string[] = [];

  createdAt?: number;
  updatedAt?: number; 
}

