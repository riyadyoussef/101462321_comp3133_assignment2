import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-employee.component.html',
  // styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employeeId: string = '';
  employee: any = {
    first_name: '',
    last_name: '',
    designation: '',
    department: '',
    salary: 0
  };

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (result: any) => {
        this.employee = result.data.searchEmployeeById;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.employeeId, this.employee).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
