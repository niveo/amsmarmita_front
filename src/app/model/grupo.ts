import { Prato } from './prato';

export class Grupo {
  _id!: string;
  nome!: string;
  principal = false;
  multiplo = false;
  observacao?: string;
  pratos?: Prato[];
  cor?: string;

  pratoSelecionado?: string;
  somarRelatorio = false;
}
