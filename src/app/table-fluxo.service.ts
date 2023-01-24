import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Fluxo } from './@type';
import { PresetsService } from './presets.service';
import { utils, writeFile } from 'xlsx';

@Injectable()
export class TableFluxoService {

  presetsService: PresetsService;

  tabela: Fluxo[] = [];

  fileUpload = false;

  constructor(_presetService: PresetsService) {
    this.presetsService = _presetService;
  }

  getTabela() {
    return this.tabela;
  }

  isFileUpload() {
    return this.fileUpload;
  }

  refactorTable() {
    this.tabela.forEach(item => {
      item.preset = true;
    })
  }

  edit() {
    this.tabela.forEach((fluxo)=> {
      const categoria = this.presetsService.presets.filter(preset => {
        return fluxo.onde == preset.onde;
     })

     if(categoria.length <= 0) {
      fluxo.preset = false;
    }

    })
  }

  onSubmit(arquivo: File) {
      this.fileUpload = true;
      const reader = new FileReader();
      reader.readAsText(arquivo);

      const listaFluxo: Fluxo[] = [];

      reader.onload = () => {
        const linesString = reader.result?.toString().split('\n');

        const linesStringClean = linesString?.slice(6, linesString.length);

        linesStringClean?.forEach((item, index) => {
          if(item.length <= 0) {
            return;
          }

          const split = item.split(';');

          const fluxo: Fluxo = {} as Fluxo;

          split.forEach((item, index) => {
            if(index == 0) {
              console.log(item);

              // DATA
              fluxo.data = moment(item, 'DD/MM/YYYY').toDate();
            }

            if(index == 1) {
              // ONDE
              // CATEGORIA
              // FVI

              const categoria = this.presetsService.presets.filter(preset => {
                 return item.includes(preset.descricao);
              })

              if(categoria.length > 0) {
                fluxo.categoria = categoria[0].categoria;
                fluxo.onde = categoria[0].onde;
                fluxo.fvi = categoria[0].fvi;
                fluxo.preset = true;
                return;
              }

              fluxo.preset = false;
              fluxo.onde = item;

            }

            if(index == 2) {
              // GASTO
              // RECEITA
              // SALDO

              if(item.includes('-')) {
                fluxo.gasto = parseFloat(item.replace('-', '').replaceAll('.', '').replace(',', '.'));
              } else {
                fluxo.receita = parseFloat(item.replaceAll('.', '').replace(',', '.'));
              }

            }

            if(index == 3) {
              fluxo.saldo = parseFloat(item.replaceAll('.', '').replace(',', '.'));
            }

          });

          listaFluxo.push(fluxo);
        });
      };
      this.tabela = listaFluxo.reverse();
    }

    saveExcel(head: string[]) {
      const wb = utils.book_new();

      moment.locale('pt');

      wb.Props = {
        Title: 'Fluxo de caixa',
        Author: 'Augusto Gernavi',
        CreatedDate: new Date()
      }

      const nomeSheet = `Fluxo de caixa - ${moment(this.tabela[0].data).format('MMMM').toUpperCase()}`

      wb.SheetNames.push(nomeSheet)

      const rows: any[][] = [head.slice(0, head.length - 1)];

      const dadosFluxo = this.tabela.map(fluxo => {
        return [fluxo.data, fluxo.gasto, fluxo.receita, fluxo.saldo, fluxo.onde, fluxo.categoria, fluxo.fvi];
      })

      const rowsConcat = rows.concat(dadosFluxo);

      wb.Sheets[nomeSheet] = utils.aoa_to_sheet(rowsConcat);

      writeFile(wb, 'fluxo_de_caixa.xlsx');
    }
}
