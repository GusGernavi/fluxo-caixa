import { Injectable } from '@angular/core';
import { Preset } from './@type';

@Injectable()
export class PresetsService {

  presets: Array<Preset>;

  constructor() {
    this.presets = [{
      descricao: '*IFD*',
      onde: 'Refeição IFOOD',
      categoria: 'Refeição',
      fvi: 'V'
    },
    {
      descricao: 'SABESP',
      onde: 'Conta de água',
      categoria: 'Água',
      fvi: 'F'
    },
    {
      descricao: 'AUTTAR LOJA',
      onde: 'Bilhete Unico',
      categoria: 'Transporte',
      fvi: 'V'
    }
  ]
  }

}
