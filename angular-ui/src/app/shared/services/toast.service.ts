import { Toast } from '../../models/Toast.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast = new Subject<Toast>();

  showSuccess(msg: string) {
    this.toast.next({ severity: 'success', summary: 'Success', detail: msg });
  }

  showError(msg: string) {
    this.toast.next({ severity: 'error', summary: 'Error', detail: msg });
  }
}
