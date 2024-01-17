import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  currentEmail = '';
  currentPassword = '';
  ApiKey = 'AIzaSyC5q_aPDywl5x7C_XuGrjg6SxwlvVviB84';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      {
        email: email,
        password: password,
      },
      {
        params: {
          key: this.ApiKey,
        },
      }
    );
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      {
        email: email,
        password: password,
      },
      {
        params: {
          key: this.ApiKey,
        },
      }
    );
  }

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
    return [this.currentEmail, this.currentPassword];
  }

  setCurrentCredentials(email: string, password: string) {
    this.currentEmail = email;
    this.currentPassword = password;
  }
}
