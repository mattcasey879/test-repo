import jwtDecode from 'jwt-decode';
import { map } from 'rxjs';
import { Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';
import { inject } from '@angular/core';
import { DecodedJWT } from 'src/app/models/DecodedJWT.model';
import { ToastService } from './toast.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const validToken = authService.checkToken();
  if (validToken) {
    return true;
  } else {
    return router.navigate(['/']);
  }
};

export const adminsOnlyGuard = () => {
  const router = inject(Router);
  const toastService = inject(ToastService);
  const token = localStorage.getItem('Auth');
  const tokenData: DecodedJWT = jwtDecode(token!);
  if (tokenData.ROLE != 'admin') {
    return router.navigate(['/employees']);
  } else {
    return true;
  }
};
