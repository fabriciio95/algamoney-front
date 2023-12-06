import { Router } from '@angular/router';
import { ErrorHandlerService } from '../error-handler.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;
  usuarioLogado = '';

  constructor(private authService: AuthService,
              private errorHandler: ErrorHandlerService,
              private router: Router) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.jwtPayload?.nome;
  }

  temPermissao(permissao: string) {
    return this.authService.temPermissao(permissao);
  }

  logout() {
    this.authService.logout()
      .then(() => this.authService.login())
      .catch(error => this.errorHandler.handle(error));
  }
}
