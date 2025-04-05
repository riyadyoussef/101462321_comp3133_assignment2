import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apollo: Apollo, private router: Router) {}

  signup(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          signup(username: "${username}", email: "${email}", password: "${password}") {
            username
            email
            created_at
          }
        }
      `
    });
  }

  login(username: string, email: string, password: string) {
    const LOGIN = gql`
      query {
        login(username: "${username}", email: "${email}", password: "${password}")
      }
    `;

    return this.apollo.query({ query: LOGIN });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
