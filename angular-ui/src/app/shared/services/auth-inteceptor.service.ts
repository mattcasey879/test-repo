import { enviornment } from '../../../enviornments/enviornment';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url !== `${enviornment.apiUrl}loginService/**`) {
      const token = localStorage.getItem('Auth');
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', '' + token),
      });
      return next.handle(modifiedReq);
    } else {
      return next.handle(req);
    }
  }
}
