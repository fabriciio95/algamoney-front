import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/model';
import { environment } from 'src/environments/environment';

export class PessoasFiltro {
  nome?: string;
  itensPorPagina = 5;
  pagina = 0;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  urlBase: string;

  constructor(private http: HttpClient) {
    this.urlBase = `${environment.apiUrl}/pessoas`;
   }


  pesquisar(filtro: PessoasFiltro): Promise<any> {

    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if(filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.urlBase}`, { params})
        .toPromise()
        .then((response: any) => {
          return {
            pessoas: response.content,
            total: response.totalElements
          }
        })
  }


  listarTodas(): Promise<any> {
    return this.http.get(`${this.urlBase}`)
       .toPromise()
       .then((response: any) => response.content);
  }

  excluir(codigo: number): Promise<void>  {
    return this.http.delete<void>(`${this.urlBase}/${codigo}`).toPromise();
  }

  alterarStatus(codigo:number, ativo: boolean): Promise<void> {
    return this.http.put<void>(`${this.urlBase}/${codigo}/ativo`, ativo).toPromise();
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa | undefined> {
      return this.http.post<Pessoa>(this.urlBase, pessoa).toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa | undefined> {
    return this.http.put<Pessoa>(`${this.urlBase}/${pessoa.codigo}`, pessoa).toPromise();
  }

  buscarPessoa(codigo: number): Promise<Pessoa | undefined> {
    return this.http.get<Pessoa>(`${this.urlBase}/${codigo}`).toPromise();
  }
}
