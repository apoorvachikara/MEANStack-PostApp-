import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthinterceptorService implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationService.getToken();
    const authRequest = req.clone({
        headers: req.headers.set('Authorization',`Bearer ${token}`)
    })
    return next.handle(authRequest);
  }
}
