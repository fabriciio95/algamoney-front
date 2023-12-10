import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private route: Router,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
        if(params.code) {
          this.authService.obterNovoAccessTokenComCode(params.code, params.state)
            .then(() => {
              this.route.navigate(['/'])
            })
            .catch((error: any) => this.errorHandler.handle(error));
        } else {
          this.route.navigate(['/']);
        }
    })
  }

}
