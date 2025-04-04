import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './employees/view-employee/view-employee.component';
import { UpdateEmployeeComponent } from './employees/update-employee/update-employee.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/add', component: AddEmployeeComponent },
  { path: 'employees/:id', component: ViewEmployeeComponent },
  { path: 'employees/:id/update', component: UpdateEmployeeComponent },
];
