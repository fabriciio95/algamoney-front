import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento } from '../core/model';
import { environment } from 'src/environments/environment';


export class LancamentoFiltro {
  descricao!: string;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  pagina = 0;
  itensPorPagina = 5;
}
@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl: string;

  constructor(private http: HttpClient, private datePipe: DatePipe) {
      this.lancamentosUrl = `${environment.apiUrl}/lancamentos`
   }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if(filtro.descricao) {
        params = params.set('descricao', filtro.descricao)
    }

    if(filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd')!);
    }

    if(filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!)
    }

     return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
        .toPromise()
        .then((response: any) =>  {
            const lancamentos = response.content;

            const resultado = {
                lancamentos,
                total: response.totalElements
            };

            return resultado;
        });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete<void>(`${this.lancamentosUrl}/${codigo}`)
       .toPromise();
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento | undefined> {
        return this.http.post<Lancamento>(this.lancamentosUrl, lancamento).toPromise();
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento | undefined> {
      return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
        .toPromise()
        .then(lancamento => {
            this.converterStringsParaDatas([lancamento!]);

            return lancamento;
        });
  }

  buscarPorCodigo(codigo: number): Promise<Lancamento | undefined> {
    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
          .toPromise()
          .then(lancamento => {
            this.converterStringsParaDatas([ lancamento! ]);

            return lancamento
          });
  }

  uploadHeaders() {
    return new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  urlUploadAnexo() {
    return `${this.lancamentosUrl}/anexo`
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
      for(const lancamento of lancamentos) {
          let offset = new Date().getTimezoneOffset() * 60000;

          lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento!).getTime() + offset);

          if(lancamento.dataPagamento) {
            lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
          }
      }
  }
}
