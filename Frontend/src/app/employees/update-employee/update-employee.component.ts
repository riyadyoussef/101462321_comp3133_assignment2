import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employee: any = {
    first_name: '',
    last_name: '',
    designation: '',
    department: '',
    salary: 0
  };

  success: string = '';
  error: string = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe({
        next: (result: any) => {
          this.employee = result.data.searchEmployeeById;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load employee';
        }
      });
    } else {
      this.error = 'Invalid employee ID';
    }
  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    if (!id) {
      this.error = 'Invalid employee ID';
      return;
    }

    this.employeeService.updateEmployee(id, this.employee).subscribe({
      next: () => {
        this.success = 'Employee updated successfully';
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to update employee';
      }
    });
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}
