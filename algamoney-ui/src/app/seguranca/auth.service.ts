import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  oauthAuthorizeUrl: string;
  tokensRevokeUrl: string;
  jwtPayload: any;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {
      this.oauthTokenUrl = `${environment.apiUrl}/oauth2/token`;
      this.oauthAuthorizeUrl = `${environment.apiUrl}/oauth2/authorize`;
      this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
      this.carregarToken();
  }

  login() {
      const state = this.gerarStringAleatoria(40);
      const codeVerifier = this.gerarStringAleatoria(128);

      localStorage.setItem('state', state);
      localStorage.setItem('codeVerifier', codeVerifier);

      const challengeMethod = 'S256';
      const codeChallenge = CryptoJS.SHA256(codeVerifier)
          .toString(CryptoJS.enc.Base64url);

      const redirect_uri = environment.oauthCallbackUrl;

      const clientId = 'angular';
      const scope = "READ+WRITE"
      const responseType =  'code';

      const params = [
        'response_type=' + responseType,
        'client_id=' + clientId,
        'scope=' + scope,
        'code_challenge=' + codeChallenge,
        'code_challenge_method=' + challengeMethod,
        'state=' + state,
        'redirect_uri=' + redirect_uri
      ]

      window.location.href = this.oauthAuthorizeUrl + "?" + params.join('&')
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

  private gerarStringAleatoria(tamanho: number) {
    let resultado = '';

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(let i = 0; i < tamanho; i++) {
       resultado += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return resultado;
  }

  logout() {
    return this.http.delete(`${this.tokensRevokeUrl}`, { withCredentials: true }).toPromise()
      .then(() =>{
        localStorage.removeItem('token');
        this.jwtPayload = null;
      });
  }
}
