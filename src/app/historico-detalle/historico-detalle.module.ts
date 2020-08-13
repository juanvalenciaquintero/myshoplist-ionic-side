import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoricoDetallePageRoutingModule } from './historico-detalle-routing.module';

import { HistoricoDetallePage } from './historico-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoricoDetallePageRoutingModule
  ],
  declarations: [HistoricoDetallePage]
})
export class HistoricoDetallePageModule {}
