import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contato } from 'src/app/core/model';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent  {

  @Input() contatos!:Array<Contato>;
  exibindoFormularioContato = false;
  contato!: Contato;
  contatoIndex!: number;

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
  }

  confirmarContato(frm: NgForm) {

      this.contatos[this.contatoIndex] = { ...this.contato  };

      this.exibindoFormularioContato = false;

      frm.reset();
  }

  removerContato(index: number) {
    this.contatos.splice(index, 1);
  }

  prepararEdicaoContato(contato: Contato, index: number) {
      this.contato = { ...contato };

      this.exibindoFormularioContato = true;

      this.contatoIndex = index;
  }

  get editando() {
    return this.contato && this.contato.codigo;
  }
}
