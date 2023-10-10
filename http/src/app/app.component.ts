import { CidadeService } from './cidade.service';
import { Component, OnInit } from '@angular/core';

export interface Cidade {
  id: number,
  nome: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  cidades: Cidade[] = [];
 
  constructor(private cidadeService: CidadeService) {}
 
  ngOnInit(): void {
    this.consultar();
  }
  
  consultar() {
    this.cidadeService.consultar()
      .then(dados => this.cidades = dados);
  }

  adicionar(nome: string) {
    this.cidadeService.adicionar({ nome })
      .then(cidade => {
        alert(`Cidade "${cidade.nome}" adicionada com código ${cidade.id}!`);
        this.consultar();
      });
  }

  excluir(id: number) {
    alert(id);
  }

  atualizar(cidade: any) {
    alert(JSON.stringify(cidade));
  }
  
}
