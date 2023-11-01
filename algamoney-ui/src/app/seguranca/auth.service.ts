import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  tokensRevokeUrl: string;
  jwtPayload: any;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {
      this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
      this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
      this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
      const headers = new HttpHeaders()
           .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
           .append('Content-Type', 'application/x-www-form-urlencoded');

      const body = `username=${usuario}&password=${senha}&grant_type=password`;


      return this.http.post<void>(this.oauthTokenUrl, body, { headers, withCredentials: true })
            .toPromise()
            .then((response: any) => {
              this.armazenarToken(response['access_token']);
            }).catch(response => {
              if(response.status === 400) {
                  if(response.error.error === 'invalid_grant') {
                    return Promise.reject('Usuário ou senha inválida!');
                  }
              }

              return Promise.reject(response);
            });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==')
      .append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true }).toPromise()
        .then((response: any) => this.armazenarToken(response?.['access_token']))
        .catch(response => {
             console.log('Erro ao renovar token.', response);
             return Promise.resolve(undefined);
        });
  }

  isAccessTokenInvalido() {
     const token = localStorage.getItem('token');
     return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
      return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles: Array<string>) {
     for(const role of roles) {
          if(this.temPermissao(role)) {
            return true;
          }
     }

     return false;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if(token) {
      this.armazenarToken(token);
    }
  }


  logout() {
    return this.http.delete(`${this.tokensRevokeUrl}`, { withCredentials: true }).toPromise()
      .then(() =>{
        localStorage.removeItem('token');
        this.jwtPayload = null;
      });
  }
}
