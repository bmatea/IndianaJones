import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');


    if(req.url.search('/signin') === -1) {
      if (token) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        });

        return next.handle(cloned);
      } else {
        //dodano : pipe(...)
        return next.handle(req).pipe(catchError(err => {
          if (err.status === 401 || err.status === 403) {
            this.router.navigate(['/login']);
          }
          const error = err.error.message || err.statusText;
          return throwError(error);
        }));
      }
    }
    return next.handle(req);
    }
}
