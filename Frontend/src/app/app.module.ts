import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ✅ Required for ngModel
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './employees/view-employee/view-employee.component';
import { UpdateEmployeeComponent } from './employees/update-employee/update-employee.component';

import { HeaderComponent } from './shared/header/header.component';
import { AuthGuard } from './shared/auth.guard';

import { GraphQLModule } from './graphql/graphql.module';
import { ApolloConfigModule } from './graphql/graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    UpdateEmployeeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GraphQLModule,
    ApolloConfigModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
