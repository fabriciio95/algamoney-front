import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nome = 'Mundo';
  adicionado: Boolean = false;
 
  adicionar() {
    this.adicionado = true;
  }
}
