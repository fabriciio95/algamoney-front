import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';


import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule} from 'primeng/button';
import { TableModule} from 'primeng/table';
import { TooltipModule} from 'primeng/tooltip';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';


import { SharedModule } from '../shared/shared.module';
import { LancamentosRoutingModule } from './lancamentos-routing.module';





@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    SharedModule,
    LancamentosRoutingModule,
    FileUploadModule
  ],
  exports: []
})
export class LancamentosModule { }
