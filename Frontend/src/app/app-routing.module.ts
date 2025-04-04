import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './employees/view-employee/view-employee.component';
import { UpdateEmployeeComponent } from './employees/update-employee/update-employee.component';

import { AuthGuard } from './shared/auth.guard'; // ✅ FIXED: import the class, not a lowercase instance

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard] },
  { path: 'employees/add', component: AddEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employees/:id', component: ViewEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employees/:id/update', component: UpdateEmployeeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Optional: wildcard to catch unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
