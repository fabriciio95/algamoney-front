import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


class Cliente {
  nome?: string;
  email?: string;
  profissao: string = '';
}
@Component({
  selector: 'app-aula-formulario',
  templateUrl: './aula-formulario.component.html',
  styleUrls: ['./aula-formulario.component.css']
})
export class AulaFormularioComponent  {

  cliente = new Cliente();
  profissoes: string[] = ['Programador', 'Empresário', 'Outra'];
  profissao = '';

  salvar(form: NgForm) {
    console.log(`${this.profissao}`)
    console.log(`Salvando bro ${form.value.nome}`)
    console.log(`${this.cliente}`)

    form.reset({ profissao: ''});
  }

}
