import { AuthService } from 'src/app/seguranca/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { NotAuthenticatedError } from './../seguranca/money-http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService,
              private authService: AuthService,
              private router: Router) { }

  handle(errorResponse: any) {
    let msg: string = 'Erro ao processar serviço remoto. Tente novamente.';

    if(errorResponse instanceof NotAuthenticatedError) {

      msg = 'Sua sessão expirou!';

      this.authService.login();

    } else if(errorResponse instanceof HttpErrorResponse && (errorResponse.status > 399 && errorResponse.status < 500)) {
      const erro = errorResponse.error;
      if(erro && erro[0]?.mensagemUsuario) {
        msg = erro[0]?.mensagemUsuario
      }

      if(errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar essa ação';
      }
    } else if(typeof errorResponse === 'string') {
       msg = errorResponse;
    }

    console.log('Ocorreu um erro', errorResponse);

    this.messageService.add({ severity: 'error', detail: msg });
  }
}
