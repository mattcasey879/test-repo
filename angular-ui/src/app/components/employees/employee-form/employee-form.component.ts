import { ToastService } from './../../../shared/services/toast.service';
import { Employee } from '../../../models/Employee.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { states } from './employee-form-constants';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  states: string[] = states;
  id!: number;
  invalidSubmit = false;
  firstNameTest = 'Test';
  editMode = false;
  loading = false;
  formFields: string[] = [];
  employee: any = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    homePhone: '',
    cellPhone: '',
  };
  employeeForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private toastService: ToastService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    });
    this.initEmployeeForm();
  }

  get f() {
    return this.employeeForm.controls;
  }

  initEmployeeForm() {
    let form: any = {};
    Object.keys(this.employee).forEach((key) => {
      this.formFields.push(key);
      switch (key) {
        case 'firstName':
        case 'lastName':
          form[key] = new FormControl(this.employee[key], [
            Validators.required,
            Validators.pattern(/^[a-zA-Z ]+$/),
            Validators.minLength(2),
            Validators.maxLength(35),
          ]);
          break;
        case 'email':
          form[key] = new FormControl(this.employee[key], [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9]*@[a-zA-Z]+\.[a-zA-Z]+$/),
            Validators.minLength(8),
            Validators.maxLength(35),
          ]);
          break;
        case 'address':
          form[key] = new FormControl(this.employee[key], [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/),
            Validators.minLength(10),
            Validators.maxLength(50),
          ]);
          break;
        case 'city':
          form[key] = new FormControl(this.employee[key], [
            Validators.required,
            Validators.pattern(/^[a-zA-z]+( [a-zA-Z]+)*$/),
            Validators.minLength(5),
            Validators.maxLength(50),
          ]);
          break;
        case 'state':
          form[key] = new FormControl(this.employee[key], [
            Validators.required,
          ]);
          break;
        case 'zip':
          form[key] = new FormControl(this.employee[key], [
            Validators.required,
            Validators.pattern(/^[0-9]+$/),
            Validators.minLength(5),
            Validators.maxLength(9),
          ]);
          break;
        case 'homePhone':
        case 'cellPhone':
          form[key] = new FormControl(this.employee[key], [
            Validators.required,
            Validators.pattern(/^\d{3}[-]\d{3}[-]\d{4}$/),
            Validators.maxLength(12),
          ]);
      }
    });

    this.employeeForm = new FormGroup(form);
    if (this.editMode) {
      this.employeeService
        .getEmployeeById(this.id)
        .subscribe((employee: Employee) => {
          this.employee = employee;
          let k: keyof Employee;

          for (k in employee) {
            this.employeeForm.patchValue({
              [k]: employee[k],
            });
          }
        });
    }
  }

  patternValidationMessages(field: string) {
    if (field == 'cellPhone' || field == 'homePhone') {
      return 'Only digits and a XXX-XXX-XXXX pattern are allowed';
    } else {
      return 'Invalid Format';
    }
  }

  formatField(field: string): string {
    return field
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, field[0].toUpperCase());
  }
  onSubmit() {
    if (this.editMode && this.employeeForm.valid) {
      this.employeeService
        .updateEmployee(this.employeeForm.value, this.id)
        .subscribe({
          next: () => {
            this.toastService.showSuccess("Employee Updated Successfully!")
            this.router.navigate(['/employees'])
          },
          error: (err) => {
            this.toastService.showError(err.error)
          }
        });
    } else if (this.employeeForm.valid) {
      this.employeeService
        .saveNewEmployee(this.employeeForm.value)
        .subscribe({
          next: () => {
            this.toastService.showSuccess("Employee Created Successfully!")
            this.router.navigate(['/employees'])
          },
           error: (err) => {
            this.toastService.showError(err.error.message)
            this.employeeForm.reset()
           }
        });
    } else {
      this.invalidSubmit = true;
    }
  }
}
