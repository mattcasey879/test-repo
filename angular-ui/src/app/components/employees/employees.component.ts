import { ToastService } from './../../shared/services/toast.service';

import { Employee } from './../../models/Employee.model';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (res) => {
        this.employees = res;
      },
      error: (err) => {
        if (err.status == 403) {
          localStorage.removeItem('Auth');
          this.authService.loggedIn.next(false);
        } else {
          this.toastService.showError('There was an error in the Server.');
        }
      },
    });
  }
  updateEmployees(employees: Employee[]) {
    this.employees = employees;
  }
}
