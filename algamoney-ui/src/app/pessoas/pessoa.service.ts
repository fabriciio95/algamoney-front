import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cidade, Estado, Pessoa } from '../core/model';
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

  pessoasUrl: string;
  cidadesUrl: string;
  estadosUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
   }


  pesquisar(filtro: PessoasFiltro): Promise<any> {

    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if(filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { params})
        .toPromise()
        .then((response: any) => {
          return {
            pessoas: response.content,
            total: response.totalElements
          }
        })
  }


  listarTodas(): Promise<any> {
    return this.http.get(`${this.pessoasUrl}`)
       .toPromise()
       .then((response: any) => response.content);
  }

  excluir(codigo: number): Promise<void>  {
    return this.http.delete<void>(`${this.pessoasUrl}/${codigo}`).toPromise();
  }

  alterarStatus(codigo:number, ativo: boolean): Promise<void> {
    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`, ativo).toPromise();
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa | undefined> {
      return this.http.post<Pessoa>(this.pessoasUrl, pessoa).toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa | undefined> {
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa).toPromise();
  }

  buscarPessoa(codigo: number): Promise<Pessoa | undefined> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`).toPromise();
  }

  listarEstados() : Promise<Estado | undefined >{
    return this.http.get<Estado>(`${this.estadosUrl}`).toPromise();
  }

  pesquisarCidades(codigoEstado: number) : Promise<Cidade[] | undefined >{
    const params = new HttpParams()
                    .append('estado', codigoEstado);
    return this.http.get<Cidade[]>(`${this.cidadesUrl}`, { params }).toPromise();
  }

}
