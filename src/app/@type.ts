export type Fluxo = {
  data: Date;
  gasto: number;
  receita: number;
  saldo: number;
  onde: string;
  categoria: string;
  fvi: 'F' | 'V' | 'I' | null;
  preset: boolean;
};

export type Preset = {
  descricao: string;
  categoria: string;
  onde: string;
  fvi: 'F' | 'V' | 'I' | null;
};
