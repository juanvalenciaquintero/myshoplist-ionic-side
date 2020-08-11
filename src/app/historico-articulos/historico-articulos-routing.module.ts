import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoricoArticulosPage } from './historico-articulos.page';

const routes: Routes = [
  {
    path: '',
    component: HistoricoArticulosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoricoArticulosPageRoutingModule {}
