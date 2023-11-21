import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';

import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  lineChartData: any;

  optionsPie = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any): any => {
            let label = context.label || '';
            let value = context.raw || 0;
            let formattedValue = this.decimalPipe.transform(value, '1.2-2', 'pt_BR');
            return `${label}: ${formattedValue}`;
          }
        }
      }
    }
  }

  optionsLine = {
     plugins: {
       tooltip: {
        callbacks: {
          label: (context: any): any => {
            let label = context.dataset.label || '';
            let value = context.raw || 0;
            let formattedValue = this.decimalPipe.transform(value, '1.2-2', 'pt_BR');
            return `${label}: ${formattedValue}`;
          }
        }
       }
     }
  }

  constructor(private  dashboardService: DashboardService,
              private decimalPipe: DecimalPipe ) {}

  ngOnInit(): void {
    this.configurarGraficoPizza();

    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
      this.dashboardService.lancamentosPorCategoria()
        .then(dados => {
            this.pieChartData = {
              labels: dados.map(dado => dado.categoria.nome),
              datasets: [
                {
                  data: dados.map(dado => dado.total),
                  backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#3366CC', '#DC3912']
                }
              ]
            }
        });
  }

  configurarGraficoLinha() {
      this.dashboardService.lancamentosPorDia()
         .then(dados => {
            const diasDoMes = this.configurarDiasMes();
            const totaisReceitas = this.totaisPorCadaDiaMes(dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
            const totaisDespesas = this.totaisPorCadaDiaMes(dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);
            this.lineChartData = {
              labels: diasDoMes,
              datasets: [
                {
                  label: 'Receitas',
                  data: totaisReceitas,
                  borderColor: '#3366CC'
                }, {
                  label: 'Despesas',
                  data: totaisDespesas,
                  borderColor: '#D62B00'
                }
              ]
            }
         })
  }

  private totaisPorCadaDiaMes(dados: any, diasDoMes: number[]) {
      const totais: number[] = [];
      for(const dia of diasDoMes) {
          let total = 0;

          for(const dado of dados) {
            if(dado.dia.getDate() === dia) {
              total = dado.total;
              break;
            }
          }

          totais.push(total);
      }

      return totais;
  }

  private configurarDiasMes() {
    const mesRef = new Date();

    mesRef.setMonth(mesRef.getMonth() + 1);
    mesRef.setDate(0);

    const quantidade = mesRef.getDate();

    const dias: number[] = [];

    for(let i = 1; i <= quantidade; i++) {
        dias.push(i);
    }

    return dias;
  }
}
