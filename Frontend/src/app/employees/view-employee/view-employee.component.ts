import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  employee: any;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (result: any) => {
        this.employee = result.data.searchEmployeeById;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load employee details';
      }
    });
  }
}
