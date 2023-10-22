import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import localePt from '@angular/common/locales/pt';
import { HttpClient } from '@angular/common/http';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService, MessageService } from 'primeng/api';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';





registerLocaleData(localePt, 'pt-BR');

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    DatePipe,
    ErrorHandlerService,
    { provide: LOCALE_ID, useValue: 'pt-BR'},
    LancamentoService,
    PessoaService,
    MessageService,
    ConfirmationService,
    TranslateService
  ]
})
export class CoreModule { }
