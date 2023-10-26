import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string = 'Erro ao processar serviço remoto. Tente novamente.';

    if(errorResponse instanceof HttpErrorResponse && (errorResponse.status > 399 && errorResponse.status < 500)) {
      const erro = errorResponse.error;
      if(erro && erro[0]?.mensagemUsuario) {
        msg = erro[0]?.mensagemUsuario
      }
    } else if(typeof errorResponse === 'string') {
       msg = errorResponse;
    }

    console.log('Ocorreu um erro', errorResponse);

    this.messageService.add({ severity: 'error', detail: msg });
  }
}
