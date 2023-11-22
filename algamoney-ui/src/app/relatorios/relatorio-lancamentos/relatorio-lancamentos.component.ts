import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio: any;
  periodoFim: any;

  constructor(private relatorioService: RelatoriosService) { }

  ngOnInit(): void {
  }


  gerar() {
      this.relatorioService.relatoriosLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
         .then(relatorio => {
              const url = window.URL.createObjectURL(relatorio!);

              window.open(url);
         });
  }

}
