import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-aula-formulario',
  templateUrl: './aula-formulario.component.html',
  styleUrls: ['./aula-formulario.component.css']
})
export class AulaFormularioComponent  {

  profissoes: string[] = ['Programador', 'Empresário', 'Outra'];
  profissao = 'Outra';

  salvar(form: NgForm) {
    console.log(`${this.profissao}`)
    console.log(`Salvando bro ${form.value.nome}`)
  }

}
