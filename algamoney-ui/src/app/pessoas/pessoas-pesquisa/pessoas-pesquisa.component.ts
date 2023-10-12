import { Component, OnInit } from '@angular/core';
import { PessoaService, PessoasFiltro } from '../pessoa.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  totalRegistros = 0;
  pessoasFiltro= new PessoasFiltro;
  pessoas = [];

  constructor(private pessoaService: PessoaService) {}

  pesquisar(pagina = 0): void {
      this.pessoasFiltro.pagina = pagina;

      this.pessoaService.pesquisar(this.pessoasFiltro)
        .then(response => {
            this.totalRegistros = response.total;
            this.pessoas = response.pessoas;
        })
  }

  aoMudarDePagina(event: LazyLoadEvent) {
      const pagina = event!.first! / event!.rows!;

      this.pesquisar(pagina);
  }
}
