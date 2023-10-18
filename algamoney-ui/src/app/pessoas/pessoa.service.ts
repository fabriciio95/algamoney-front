import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoasFiltro {
  nome?: string;
  itensPorPagina = 5;
  pagina = 0;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  urlBase = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }


  pesquisar(filtro: PessoasFiltro): Promise<any> {

    const headers = new HttpHeaders()
          .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if(filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.urlBase}`, { headers, params})
        .toPromise()
        .then((response: any) => {
          return {
            pessoas: response.content,
            total: response.totalElements
          }
        })
  }


  listarTodas(): Promise<any> {
     const headers = new HttpHeaders()
           .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.urlBase}`, { headers })
       .toPromise()
       .then((response: any) => response.content);
  }

  excluir(codigo: number): Promise<void>  {
    const headers = new HttpHeaders()
           .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete<void>(`${this.urlBase}/${codigo}`, { headers }).toPromise();
  }

  alterarStatus(codigo:number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.urlBase}/${codigo}/ativo`, ativo, { headers }).toPromise();
  }
}
