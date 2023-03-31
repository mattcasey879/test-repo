import { adminsOnlyGuard, authGuard } from '../shared/services/route-guards.service';

import { EmployeeFormComponent } from '../components/employees/employee-form/employee-form.component';
import { EmployeesComponent } from '../components/employees/employees.component';
import { LoginComponent } from '../components/login/login.component';
import {Routes, RouterModule} from '@angular/router'
import { NgModule } from "@angular/core";



const appRoutes: Routes = [
    {path: '', component: LoginComponent },
    {path: 'employees', component: EmployeesComponent, canActivate: [authGuard] },
    {path: 'edit-employee/:id', component: EmployeeFormComponent, canActivate: [adminsOnlyGuard]},
    {path: 'new-employee', component: EmployeeFormComponent, canActivate:[authGuard, adminsOnlyGuard]},
    {path: '**', redirectTo: ""}
]

@NgModule({
    imports:[ RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class RoutesModule { }

