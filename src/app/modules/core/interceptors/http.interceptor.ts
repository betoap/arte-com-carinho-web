import { Injectable,  ErrorHandler } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, from } from 'rxjs';

import { environment } from './../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Interceptor implements HttpInterceptor, ErrorHandler {

  constructor() {}

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
       // Server or connection error happened
       if (!navigator.onLine) {
         // Handle offline error
       } else {
         // Handle Http Error (error.status === 403, 404...)
       }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  /*
  * Generate the token on the first time and after put on header for other requests
  */
  private async handleAccess(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    let changedRequest = null;

    if ( request.url.includes('assets/i18n/app') ) {
      return next.handle( request.clone() ).toPromise();
    }
    changedRequest = null;
    return next.handle(changedRequest).toPromise();
  }
}
