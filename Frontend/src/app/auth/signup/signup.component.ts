import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  message: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.signup(this.username, this.email, this.password).subscribe({
      next: () => {
        this.message = 'Signup successful! You can now log in.';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Signup failed. Please try again.';
      },
    });
  }
}
