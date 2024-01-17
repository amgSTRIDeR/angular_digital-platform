import { Component } from '@angular/core';
import { AuthorizationService } from './core/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'digital-platform';
  isLoading = false;

  constructor(private authorizationService: AuthorizationService) {
    this.authorizationService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    }
    );
  }
}
