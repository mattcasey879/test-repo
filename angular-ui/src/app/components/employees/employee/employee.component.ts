import { Router } from '@angular/router';
import { EmployeeService } from './../services/employee.service';
import { ToastService } from './../../../shared/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { Employee } from './../../../models/Employee.model';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [ConfirmationService],
})
export class EmployeeComponent implements OnInit {
  constructor(
    private confirmService: ConfirmationService,
    private toastService: ToastService,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {}
  @Input()
  employee!: Employee;
  role: string = ""
  @Input()
  employees!: Employee[]

  @Output()updatedEmployees = new EventEmitter<Employee[]>();

  ngOnInit(): void {
    this.role = this.authService.role.value
  }
  confirm(event: Event) {
    this.confirmService.confirm({
      target: event.target!,
      message:
        'Are you you want to delete this employee? This cannot be undone.',
      icon: 'pi pi-exclamation-triangle text-red-600',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger p-1',
      rejectButtonStyleClass: 'p-1',
      accept: () => {
        if (this.employee.id) {
          this.employeeService.deleteEmployee(this.employee.id).subscribe({
            next: () => {
              this.toastService.showSuccess(
                `Employee ${this.employee.firstName} ${this.employee.lastName} was deleted successfully`
                );
                this.updatedEmployees.emit(this.employees.filter((em) => em.id != this.employee.id))
            },
            error:(err) => {
              let message = ""
              if (err.status == 403) {
                message = err.error
                this.router.navigate(['/'])
              } else {
                message = JSON.parse(err.error).message
              }
              this.toastService.showError(message)
            }
          })
        }
      },
    });
  }
}
