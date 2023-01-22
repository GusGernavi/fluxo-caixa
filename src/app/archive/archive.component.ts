import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fluxo } from '../@type';
import { PresetsService } from '../presets.service';
import { TableFluxoService } from '../table-fluxo.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  arquivo: File | null;
  fileReader: FileReader;

  ngOnInit(){}

  constructor(private tableFluxoService: TableFluxoService, private router: Router) {
    this.fileReader = new FileReader();
    this.arquivo = null;
  }

  insertArchive(e: Event) {
    const target = e.target as HTMLInputElement;
    this.arquivo = target.files![0];
  }

  onSubmit() {
    this.tableFluxoService.onSubmit(this.arquivo!);
    this.router.navigate(['/table'])
  }

}
