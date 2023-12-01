import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { urlEndpoint } from '../../utils/constant';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authdata = this.authService.userSubject.value;
    const isApiUrl = !request.url.startsWith(urlEndpoint.baseUrl + '/auth');

    console.log(authdata);
    console.log(isApiUrl);
    

    if (authdata !== null && isApiUrl) {
      console.log("auth");
      
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${authdata}`,
        },
      });
    }

    return next.handle(request);
  }
}
