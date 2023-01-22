import { Fluxo } from './../@type';
import { Router } from '@angular/router';
import { WriteVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import * as moment from 'moment';

import { PresetsService } from '../presets.service';
import { TableFluxoService } from '../table-fluxo.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  head: string[];
  tabela: Fluxo[];

  constructor(
    private tableFluxoService: TableFluxoService,
    private presetsService: PresetsService,
    private route: Router
  ) {
    this.head = [
      'Data',
      'Gastos',
      'Receita',
      'Saldo',
      'Onde',
      'Categoria',
      'F/V/I',
      'Editar',
    ];


    this.tabela = [];
  }

  ngOnInit() {
    if(!this.tableFluxoService.isFileUpload()) {
      this.route.navigate([""]);
    }
    this.tabela = this.tableFluxoService.getTabela();
  }

  onBlur() {

  }

  isInvalidTable(preset: boolean) {
    let invalid = false;

    if(this.tabela.length <= 0) {
      invalid = true;
    }

    this.tabela.forEach(value => {

      if(!value.data || !value.categoria || !value.fvi || (!value.gasto && !value.receita) || !value.onde || !value.saldo || (preset && !value.preset)) {
        invalid = true;
      }
    });

    return invalid;
  }

  isInvalidTableUpdate() {

    let invalid = false;

    if(this.tabela.length <= 0) {
      invalid = true;
    }

    this.tabela.forEach(value => {
      if(!value.data || !value.categoria || !value.fvi || (!value.gasto && !value.receita) || !value.onde || !value.saldo) {
        invalid = true;
      }
    });

    return invalid;
  }

  refactorTable() {
    this.tableFluxoService.refactorTable();
    this.tabela = this.tableFluxoService.getTabela();
  }

  edit() {
    this.tableFluxoService.edit();
    this.tabela = this.tableFluxoService.getTabela();
  }

  saveExcel() {
   this.tableFluxoService.saveExcel(this.head);
  }

}
