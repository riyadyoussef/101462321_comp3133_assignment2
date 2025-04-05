import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  searchDept: string = '';
  searchDesignation: string = '';
  error: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (result: any) => {
        this.employees = result.data.getAllEmployees;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to fetch employee list';
      }
    });
  }

  search() {
    this.employeeService.searchEmployees(this.searchDept, this.searchDesignation).subscribe({
      next: (result: any) => {
        this.employees = result.data.searchEmployeeByDesignationOrDepartment;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to search employees';
      }
    });
  }

  updateEmployee(id: string) {
    this.router.navigate([`/employees/${id}/update`]);
  }
  

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees(); // Refresh list
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to delete employee';
        }
      });
    }
  }

  viewEmployee(id: string) {
    this.router.navigate([`/employees/${id}`]);
  }

  navigateToAdd() {
    this.router.navigate(['/employees/add']);
  }
}
