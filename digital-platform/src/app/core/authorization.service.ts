import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
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
}
