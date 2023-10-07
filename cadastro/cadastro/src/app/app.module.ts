import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FuncionarioFormComponent } from './funcionario/funcionario-form/funcionario-form.component';
import { FuncionarioCardComponent } from './funcionario/funcionario-card/funcionario-card.component';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from './funcionario/funcionario.service';
import { LogService } from './log.service';
import { FuncionarioModule } from './funcionario/funcionario.module';


/*const criarFuncionarioService = () => {
  return new FuncionarioAbreviadoService(2);
}**/

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FuncionarioModule
  ],
  providers: [
    //{ provide: FuncionarioService, useClass: FuncionarioAbreviadoService }criarFuncionarioService
   // { provide: FuncionarioService, useFactory: criarFuncionarioService }
  // FuncionarioService,
   LogService,
   //{ provide: 'LogPrefixo', useValue: 'LOG2' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
