import jwtDecode from 'jwt-decode';
import { ToastService } from '../../shared/services/toast.service';
import { AuthService } from '../../shared/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { DecodedJWT } from 'src/app/models/DecodedJWT.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}
  ngOnInit() {
    if (localStorage.getItem('Auth')) {
      if (this.authService.checkToken()) {
        this.router.navigate(['/employees']);
      }
    }
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(process.env.NG_APP_ENV)
      this.authService.attemptLogin(form.value).subscribe({
        next: (res: HttpResponse<any>) => {
          const token: string = res.headers.get('Authorization')!;
          localStorage.setItem('Auth', token);
          const tokenData: DecodedJWT = jwtDecode(token);
          this.authService.loggedIn.next(true);
          this.authService.role.next(tokenData.ROLE);
          this.router.navigate(['/employees']);
          this.toastService.showSuccess('Logged in Successfully!');
        },
        error: (err: HttpErrorResponse) => {
          this.toastService.showError(err.error);
        },
      });
    }
  }
}
