import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/seguranca/auth.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid!: Table;

  constructor(private lancamentoService: LancamentoService,
              private authService: AuthService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private erroHandler: ErrorHandlerService,
              private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de lançamentos');
  }


  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
        .then(resultado => {
            this.totalRegistros = resultado.total;
            this.lancamentos = resultado.lancamentos;
        }).catch(error => this.erroHandler.handle(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;

     this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluír?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
      this.lancamentoService.excluir(lancamento.codigo)
         .then(() => {
          if(this.grid.first === 0) {
            this.pesquisar();
          } else {
            this.grid.reset();
          }

          this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!'})
         }).catch(error => this.erroHandler.handle(error));;
  }

  naoTemPermissao(permissao: string) {
    return !this.authService.temPermissao(permissao);
  }
}
