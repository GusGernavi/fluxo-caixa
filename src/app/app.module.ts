import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { TableFluxoService } from './table-fluxo.service';
import { PresetsService } from './presets.service';
import { ArchiveComponent } from './archive/archive.component';
import { TableComponent } from './table/table.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [		
    AppComponent,
      ArchiveComponent,
      TableComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'},
    TableFluxoService,
    PresetsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
