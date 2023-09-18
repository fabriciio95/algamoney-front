import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aula-pipe-component',
  templateUrl: './aula-pipe-component.component.html',
  styleUrls: ['./aula-pipe-component.component.css']
})
export class AulaPipeComponentComponent {

  nome = "Fabricio Macedo";
  dataAniversario = new Date(1990, 3, 19);
  preco = 12855.32;
  troco = 0.57392;

}
