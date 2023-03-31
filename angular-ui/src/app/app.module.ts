import { PrimeNGModule } from './modules/primeNG.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MessageService } from 'primeng/api'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { EmployeesComponent } from './components/employees/employees.component'
import { RoutesModule } from './modules/routing.module';
import { EmployeeComponent } from './components/employees/employee/employee.component';
import { EmployeeFormComponent } from './components/employees/employee-form/employee-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './shared/services/auth-inteceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNGModule,
    RoutesModule,
    HttpClientModule
  ],
  providers: [ MessageService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
