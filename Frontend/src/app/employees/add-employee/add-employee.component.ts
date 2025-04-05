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
  styleUrls: ['./add-employee.component.css']
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

  photoPreview: string | ArrayBuffer | null = null;
  error: string = '';
  success: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.photoPreview = reader.result;
        this.employee.employee_photo = reader.result; // Save base64 to send to backend
      };

      reader.readAsDataURL(file);
    }
  }

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

  cancel() {
    this.router.navigate(['/employees']);
  }
}
