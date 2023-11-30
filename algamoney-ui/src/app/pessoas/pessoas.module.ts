import { PanelModule } from 'primeng/panel';
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
import { DialogModule } from 'primeng/dialog';

import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';
import { DropdownModule } from 'primeng/dropdown';




@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent,
    PessoaCadastroContatoComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    SharedModule,
    PessoasRoutingModule,
    PanelModule,
    DialogModule,
    DropdownModule
  ],
  exports: []
})
export class PessoasModule { }
