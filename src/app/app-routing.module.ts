import { TableComponent } from './table/table.component';
import { ArchiveComponent } from './archive/archive.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'table', component: TableComponent},
  {path: '', component: ArchiveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
