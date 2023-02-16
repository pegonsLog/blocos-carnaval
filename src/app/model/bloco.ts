export interface Blocos extends Array<Bloco>{}

export interface Bloco {
  id: string;
  nome: string;
  regional: string;
  data: string;
  publico: number;
  horaConc: string;
  horaDesf: string;
  horaDisp: string;
  responsavel: string;
  telefone: string;
  localConc: string;
  localDisp: string;
  linkDOT: string;
  linkMyMaps: string;
}

export interface BirthdaysAPI{
  birthdays: Blocos;
}
