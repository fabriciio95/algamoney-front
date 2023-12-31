import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from './funcionario/funcionario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  funcionarios: any[] = [];

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.funcionarios = this.funcionarioService.consultar();
  }
}
