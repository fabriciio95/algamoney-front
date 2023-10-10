import { Component } from '@angular/core';
import { Pedido } from './models/pedido';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pedidos: Pedido[] = [];
  pedidoAdicionado: Boolean = false;
  abrirNovoPedidoForm: Boolean = true;
  novoPedido: Pedido = {
    id: 0,
    cliente: '',
    telefone: '',
    valor: '',
    pedido: '',
    observacoes: ''
  }
  pedidoDetalhe: Pedido = {
    id: 0,
    cliente: '',
    telefone: '',
    valor: '',
    pedido: '',
    observacoes: ''
  }

  novoPedidoCriado(pedido: Pedido){
    this.pedidoAdicionado = true;
    this.pedidos.push(pedido);
    this.novoPedido = pedido;
    setTimeout(() => {
      this.pedidoAdicionado = false;
    }, 2000); 
  }

  statusPedidoAlterado(pedido: Pedido) {
    this.novoPedido = {...pedido};
    if(this.pedidoDetalhe.id && this.pedidoDetalhe.id === this.novoPedido.id) {
       this.pedidoDetalhe = {...pedido};
    }
  }

  botaoDetalhePedidoClicado(pedido: Pedido) {
    this.pedidoDetalhe = {...pedido};
    this.abrirNovoPedidoForm = false;
  }

  abrirFormNovoPedido() {
    this.abrirNovoPedidoForm = !this.abrirNovoPedidoForm;
  }
}
