import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean;

  constructor() {
    const loggedIn = localStorage.getItem('loggedIn');
    this.isAuthenticated = loggedIn === null ? false : loggedIn === 'true';
  }

  login(username: string, password: string) {
    const authenticated = localStorage.getItem('loggedIn')
    if (authenticated === null || authenticated === 'false') {
      this.isAuthenticated = true;
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
