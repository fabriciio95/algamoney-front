import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { SharedModule } from '../shared/shared.module';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule} from 'primeng/button';
import { TableModule} from 'primeng/table';
import { TooltipModule} from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask'




@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    SharedModule
  ],
  exports: []
})
export class PessoasModule { }
