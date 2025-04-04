import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
  // styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employee: any = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    designation: '',
    salary: 0,
    date_of_joining: '',
    department: '',
    employee_photo: ''
  };

  error: string = '';
  success: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onSubmit() {
    this.employeeService.addEmployee(this.employee).subscribe({
      next: () => {
        this.success = 'Employee added successfully';
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to add employee';
      }
    });
  }
}
