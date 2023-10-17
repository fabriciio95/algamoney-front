import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaService, PessoasFiltro } from '../pessoa.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  totalRegistros = 0;
  pessoasFiltro= new PessoasFiltro;
  pessoas = [];
  @ViewChild('tabela') grid!: Table;

  constructor(private pessoaService: PessoaService,
              private confirmationService: ConfirmationService,
              private toastService: MessageService,
              private errorHandler: ErrorHandlerService) {}

  pesquisar(pagina = 0): void {
      this.pessoasFiltro.pagina = pagina;

      this.pessoaService.pesquisar(this.pessoasFiltro)
        .then(response => {
            this.totalRegistros = response.total;
            this.pessoas = response.pessoas;
        }).catch(error => this.errorHandler.handle(error))
  }

  aoMudarDePagina(event: LazyLoadEvent) {
      const pagina = event!.first! / event!.rows!;

      this.pesquisar(pagina);
  }

  confirmarExclusao(codigo: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => this.excluir(codigo)
    });
  }

  excluir(codigo: number) {
      this.pessoaService.excluir(codigo)
         .then(() => {
            this.grid.reset();

            this.toastService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso!' });

         }).catch(error => this.errorHandler.handle(error));
  }


}
