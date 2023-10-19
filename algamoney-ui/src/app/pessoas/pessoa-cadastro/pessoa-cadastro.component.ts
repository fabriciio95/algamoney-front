import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Pessoa } from 'src/app/core/model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent  {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
              private toastyService: MessageService,
              private errorHandler: ErrorHandlerService) { }


  salvar(ngForm: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
        .then(() => {
            this.toastyService.add({ severity: 'success', detail: 'Pessoa cadastrada com sucesso!'});

            ngForm.reset();

            this.pessoa = new Pessoa();
        }).catch(error => this.errorHandler.handle(error));
  }

}
