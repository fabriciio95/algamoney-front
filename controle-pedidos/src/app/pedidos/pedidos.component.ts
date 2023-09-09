import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {

  @Input() pedidos: Pedido[] = [];
  @Output() statusPedidoAlterado = new EventEmitter();
  @Output() pedidoDetalhe = new EventEmitter();

  
  alterarStatusPedido(pedido: Pedido) {
    if(pedido.status === 'PAGO') {
        pedido.status = 'PREPARANDO';
    } else if (pedido.status === 'PREPARANDO') {
        pedido.status = 'ENTREGUE';
    }

    this.statusPedidoAlterado.emit(pedido);
  }

  verDetalhePedido(pedido: Pedido) {
    this.pedidoDetalhe.emit(pedido);
  }
}
