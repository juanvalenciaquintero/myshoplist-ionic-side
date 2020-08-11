import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoricoArticulosPageRoutingModule } from './historico-articulos-routing.module';

import { HistoricoArticulosPage } from './historico-articulos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoricoArticulosPageRoutingModule
  ],
  declarations: [HistoricoArticulosPage]
})
export class HistoricoArticulosPageModule {}
