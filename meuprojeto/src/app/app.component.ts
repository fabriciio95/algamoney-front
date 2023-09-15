import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  funcionarios: any[] = [];

  aoAdicionar(funcionario: any){
    this.funcionarios.push(funcionario)
  }
}
