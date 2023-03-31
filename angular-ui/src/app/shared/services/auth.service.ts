import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../models/User.model';
import jwtDecode from 'jwt-decode';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviornment } from 'src/enviornments/enviornment';
import { Token } from '@angular/compiler';
import { ToastService } from './toast.service';
import { DecodedJWT } from 'src/app/models/DecodedJWT.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = new BehaviorSubject<Boolean>(false);
  role = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastService: ToastService
  ) {}

  attemptLogin(data: User): Observable<any> {
    return this.http.post(enviornment.apiUrl + 'loginService/login', data, {
      observe: 'response',
      responseType: 'text' as 'json',
    });
  }

  checkToken(): Boolean {
    const token = localStorage.getItem('Auth');
    if (token) {
      const tokenData: DecodedJWT = jwtDecode(token);
      if (tokenData.exp > Date.now() / 1000) {
        this.loggedIn.next(true);
        this.role.next(tokenData.ROLE);
        return true;
      } else {
        localStorage.removeItem('Auth');
        this.toastService.showError(
          'Your session has expired. Please login again'
        );
        this.loggedIn.next(false);
        return false;
      }
    } else {
      this.toastService.showError(
        'Your session is no longer valid please log in again.'
      );
      this.loggedIn.next(false);
      return false;
    }
  }
}
