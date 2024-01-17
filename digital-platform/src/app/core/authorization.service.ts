import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

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
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentEmail = '';
  currentPassword = '';
  ApiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    this.isLoading.next(true);
    return this.http
      .post<AuthResponseData>(
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
      )
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already';
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              errorMessage = 'Too many attempts, try again later';
              break;
          }
          return throwError(() => errorMessage);
        })
      );
  }

  signIn(email: string, password: string) {
    this.isLoading.next(true);
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
    ).pipe(
      catchError((errorRes) => {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(() => errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
          case 'INVALID_LOGIN_CREDENTIALS':
            errorMessage = 'Invalid login credentials';
            break;
          case 'USER_DISABLED':
            errorMessage = 'User disabled';
            break;
        }
        return throwError(() => errorMessage);
      })
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
