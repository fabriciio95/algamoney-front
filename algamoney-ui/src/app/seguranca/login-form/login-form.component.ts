import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(private authService: AuthService) { }

  login(usuario: string, senha: string) {
      this.authService.login(usuario, senha)
           .then(response => console.log(response))
            .catch(erro => console.log(erro));

  }

}
