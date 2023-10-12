import { Component, OnInit, ViewChild } from '@angular/core';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';

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

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit(): void {
  }


  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
        .then(resultado => {
            this.totalRegistros = resultado.total;
            this.lancamentos = resultado.lancamentos;
        });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event!.first! / event!.rows!;

     this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
      this.lancamentoService.excluir(lancamento.codigo)
         .then(() => {
            this.grid.reset();
         });
  }
}
