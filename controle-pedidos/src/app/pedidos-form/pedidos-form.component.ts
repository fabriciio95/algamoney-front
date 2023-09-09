import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.css']
})
export class PedidosFormComponent  {

  desabilitarBotaoAdicionar: boolean = true;
  ultimoId: number = 0;
  pedido: Pedido = {
    id: 0,
    cliente: '',
    telefone: '',
    valor: '',
    pedido: '',
    observacoes: ''
  }

  @Output() novoPedido = new EventEmitter();

  adicionar() {
    this.pedido.id = ++this.ultimoId;
    this.pedido.status = 'PAGO';
    this.novoPedido.emit(this.pedido);
    this.resetarPedido();
  }

  validarForm() {
    if(this.pedido.cliente.length > 0 && this.pedido.telefone.length > 0 && this.pedido.valor.length > 0 && this.pedido.pedido.length > 0) {
        this.desabilitarBotaoAdicionar = false;
        return;
    }

    this.desabilitarBotaoAdicionar = true;
  }

   resetarPedido() {
      this.pedido = {
        id: this.ultimoId,
        cliente: '',
        telefone: '',
        valor: '',
        pedido: '',
        observacoes: ''
      }

      this.desabilitarBotaoAdicionar = true;
  }
}
