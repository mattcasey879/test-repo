import { Employee } from 'src/app/models/Employee.model';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviornment } from 'src/enviornments/enviornment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  isLoading = new BehaviorSubject<Boolean>(false);
  dataChanged = new BehaviorSubject<Boolean>(false);

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<any> {
    return this.http.get(`${enviornment.apiUrl}employeeService/employee/all`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${enviornment.apiUrl}employeeService/employee/${id}`);
  }

  saveNewEmployee(employee: Employee): Observable<any> {
    return this.http.post(
      `${enviornment.apiUrl}employeeService/employee`,
      employee
    );
  }

  updateEmployee(employee: Employee, id: number): Observable<any> {
    return this.http.put(
      `${enviornment.apiUrl}employeeService/employee/${id}`,
      employee
    );
  }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(
      `${enviornment.apiUrl}employeeService/employee/${id}`,
      { observe: 'response', responseType: 'text' as 'json' }
    );
  }
}
