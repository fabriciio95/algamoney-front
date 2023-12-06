import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaoAutorizadoComponent } from '../core/nao-autorizado.component';


const routes: Routes = [
  { path: 'nao-autorizado', component: NaoAutorizadoComponent}
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SegurancaRoutingModule { }
