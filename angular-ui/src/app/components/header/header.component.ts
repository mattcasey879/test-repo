import { DecodedJWT } from '../../models/DecodedJWT.model';
import  jwtDecode  from 'jwt-decode';
import { AuthService } from '../../shared/services/auth.service';
import { Toast } from '../../models/Toast.model';
import { ToastService } from '../../shared/services/toast.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedIn: Boolean = false;
  toastSub: Subscription = new Subscription();
  loggedInSub: Subscription = new Subscription();
  roleSub: Subscription = new Subscription();
  role: string = ''
  constructor(
    private toastService: ToastService,
    private primeMsg: MessageService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.toastSub = this.toastService.toast.subscribe((val: Toast) => {
      this.primeMsg.add(val);
    });
    this.loggedInSub = this.authService.loggedIn.subscribe((val) => {
      this.loggedIn = val;
      this.role = this.authService.role.value
    });
    // logic to handle user refreshing browser
    const token = localStorage.getItem("Auth")
    if (token) {
      if (this.authService.checkToken()) {
        this.loggedIn = true
        this.router.navigate(['/employees'])
      } else {
        this.authService.loggedIn.next(false)
      }
    }
  }

  onLogout() {
    this.authService.loggedIn.next(false);
    localStorage.removeItem("Auth")
    this.router.navigate(["/"])
  }

  ngOnDestroy(): void {
    this.toastSub.unsubscribe();
    this.loggedInSub.unsubscribe();
  }
}
