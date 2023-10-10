import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { PedidosContadorComponent } from './pedidos-contador/pedidos-contador.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { FormsModule } from '@angular/forms';
import { PedidoDetalheComponent } from './pedido-detalhe/pedido-detalhe.component';

@NgModule({
  declarations: [
    AppComponent,
    PedidosFormComponent,
    PedidosContadorComponent,
    PedidosComponent,
    PedidoDetalheComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
