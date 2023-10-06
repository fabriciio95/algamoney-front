import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { FuncionarioCardComponent } from './funcionario-card/funcionario-card.component';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from './funcionario.service';

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
    FuncionarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
