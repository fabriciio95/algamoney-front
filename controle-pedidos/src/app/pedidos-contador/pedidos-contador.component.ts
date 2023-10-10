import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pedido } from '../models/pedido';


@Component({
  selector: 'app-pedidos-contador',
  templateUrl: './pedidos-contador.component.html',
  styleUrls: ['./pedidos-contador.component.css']
})
export class PedidosContadorComponent implements OnChanges {

 @Input() novoPedido: Pedido = {id: 0, cliente: '', telefone: '', valor: '', pedido: '', observacoes: ''}
 totalPedidos: number = 0;
 pedidosPagos: number = 0;
 pedidosEmPreparacao: number = 0;
 pedidosEntregues: number = 0;
 valorTotalPedidos: number = 0;

 ngOnChanges(changes: SimpleChanges): void {
  if (changes['novoPedido'] && !changes['novoPedido'].firstChange) {
        if(this.novoPedido.status === 'PAGO') {
            this.pedidosPagos+=1;
            this.valorTotalPedidos = this.valorTotalPedidos + Number(this.novoPedido.valor);
        }

        if(this.novoPedido.status === 'PREPARANDO') {
          this.pedidosPagos-=1;
          this.pedidosEmPreparacao+=1;
        }

        if(this.novoPedido.status === 'ENTREGUE') {
          this.pedidosEmPreparacao-=1;
          this.pedidosEntregues+=1;
        }
        
        this.totalPedidos = this.pedidosPagos + this.pedidosEmPreparacao + this.pedidosEntregues;
   }
 }


}
