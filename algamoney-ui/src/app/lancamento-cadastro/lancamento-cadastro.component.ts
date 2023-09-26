import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent  {

  tipos: any[] = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ]

}
