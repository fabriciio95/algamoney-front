import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule} from 'primeng/button';
import { TableModule} from 'primeng/table';
import { TooltipModule} from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask'



@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    PessoasGridComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    InputMaskModule
  ],
  exports: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ]
})
export class PessoasModule { }
