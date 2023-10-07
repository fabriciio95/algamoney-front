import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { FuncionarioCardComponent } from './funcionario-card/funcionario-card.component';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from './funcionario.service';
import { LogService } from './log.service';


/*const criarFuncionarioService = () => {
  return new FuncionarioAbreviadoService(2);
}**/

@NgModule({
  declarations: [
    AppComponent,
    FuncionarioCardComponent,
    FuncionarioFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    //{ provide: FuncionarioService, useClass: FuncionarioAbreviadoService }criarFuncionarioService
   // { provide: FuncionarioService, useFactory: criarFuncionarioService }
   FuncionarioService,
   LogService,
   //{ provide: 'LogPrefixo', useValue: 'LOG2' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
