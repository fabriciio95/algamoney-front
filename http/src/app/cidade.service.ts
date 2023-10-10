import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  urlBase: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  consultar(): Promise<any> {
    return this.http.get(`${this.urlBase}/cidades`).toPromise();
  }

  adicionar(cidade: any): Promise<any> {
      return this.http.post(`${this.urlBase}/cidades`, cidade).toPromise();
  }

  excluir(id: number): Promise<unknown> {
     return this.http.delete(`${this.urlBase}/cidades/${id}`)
      .toPromise()
      .then(() => null);
  }
}
