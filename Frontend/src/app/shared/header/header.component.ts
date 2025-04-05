import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout() {
    // Clear token from localStorage or session
    localStorage.removeItem('token');
    
    // Redirect to login
    this.router.navigate(['/login']);
  }
}
