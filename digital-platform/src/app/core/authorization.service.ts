import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentEmail = '';
  currentPassword = '';

  constructor() { }

  login() {
    this.isUserLoggedIn.next(true);
  }

  logout() {
    this.isUserLoggedIn.next(false);
  }

  getIsUserLoggedIn() {
    return this.isUserLoggedIn.value;
  }

  getCurrentCredentials() {
    return [ this.currentEmail, this.currentPassword ];
  }

  setCurrentCredentials(email: string, password: string) {
    this.currentEmail = email;
    this.currentPassword = password;
  }
}
