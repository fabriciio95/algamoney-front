export const environment = {
  production: true,
  apiUrl: 'https://localhost:8080',
  tokenAllowedDomains: [ 'localhost:8080' ],
  tokenDisallowedRoutes: [ 'http://localhost:8080/oauth2/token' ],
  oauthCallbackUrl: 'https://oidcdebugger.com/debugger'
};
