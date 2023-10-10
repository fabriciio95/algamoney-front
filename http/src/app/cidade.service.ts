import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cidade } from './app.component';


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
}
