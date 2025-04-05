import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
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

  onView(id: string) {
    this.router.navigate([`/employees/${id}`]);
  }

  onUpdate(id: string) {
    this.router.navigate([`/employees/${id}/update`]);
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees(); // refresh list
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to delete employee';
        }
      });
    }
  }
}
