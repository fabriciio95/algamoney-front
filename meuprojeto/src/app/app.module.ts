import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { BemVindoComponent } from './bem-vindo/bem-vindo.component';
import { FormsModule } from '@angular/forms';
import { FuncionarioCardComponent } from './funcionario-card/funcionario-card.component';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { CampoColoridoDirective } from './campo-colorido.directive';
import { AulaPipeComponentComponent } from './aula-pipe-component/aula-pipe-component.component';
import { AulaFormularioComponent } from './aula-formulario/aula-formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    BemVindoComponent,
    FuncionarioCardComponent,
    FuncionarioFormComponent,
    CampoColoridoDirective,
    AulaPipeComponentComponent,
    AulaFormularioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
