import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.email, this.password).subscribe({
      next: (result: any) => {
        const token = result.data.login;
        this.authService.setToken(token);
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Login failed. Please check your credentials.';
      },
    });
  }
}
