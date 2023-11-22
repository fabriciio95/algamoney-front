import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    RelatorioLancamentosComponent
  ],
  imports: [
    CommonModule,
    RelatoriosRoutingModule,
    SharedModule,
    CalendarModule,
    FormsModule,
    HttpClientModule
  ]
})
export class RelatoriosModule { }
