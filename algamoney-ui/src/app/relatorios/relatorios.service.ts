import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(private httpClient: HttpClient,
              private datePipe: DatePipe) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`
  }


  relatoriosLancamentosPorPessoa(inicio: Date, fim: Date) {
    const params = new HttpParams()
        .set('inicio', this.datePipe.transform(inicio, 'yyyy-MM-dd')!)
        .set('fim', this.datePipe.transform(fim, 'yyyy-MM-dd')!);

    return this.httpClient.get(`${this.lancamentosUrl}/relatorios/por-pessoa`, { params, responseType: 'blob'})
        .toPromise();
  }
}
