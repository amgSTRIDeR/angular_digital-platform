import { Component } from '@angular/core';
import { AuthorizationService } from '../core/authorization.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isUserLoggedIn: boolean = false;
  authSubscription: Subscription;

  constructor(private authorizationService: AuthorizationService) {
    this.authSubscription = this.authorizationService.isUserLoggedIn.subscribe(
      (isUserLoggedIn) => {
        this.isUserLoggedIn = isUserLoggedIn;
      }
    );
  }

  onLogout() {
    console.log('logout');
    this.authorizationService.logout();
  }

  onLogin() {
    console.log('login');
    this.authorizationService.login();
  }
}
