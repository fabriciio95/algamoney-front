import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-pedido-detalhe',
  templateUrl: './pedido-detalhe.component.html',
  styleUrls: ['./pedido-detalhe.component.css']
})
export class PedidoDetalheComponent {

  @Output() novoPedidoForm = new EventEmitter();
  @Input() pedido: Pedido = {
    id: 0,
    cliente: '',
    telefone: '',
    valor: '',
    pedido: '',
    observacoes: ''
  }

  abrirFormNovoPedido() {
    this.novoPedidoForm.emit({});
  }
}
