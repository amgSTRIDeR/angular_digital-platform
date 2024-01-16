import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthorizationService } from '../../core/authorization.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnDestroy, OnInit {
  // Doesn't work with router-outlet
  // @Output() onCredentialsChange = new EventEmitter<string[]>();
  // @Input('credentials') credentials: string[] = ['', ''];
  @ViewChild('f') signInForm!: NgForm;
  currentEmail: string = '';
  currentPassword: string = '';

  constructor(private authorizationService: AuthorizationService) {}

  ngOnInit(): void {
    this.currentEmail = this.authorizationService.getCurrentCredentials()[0];
    this.currentPassword = this.authorizationService.getCurrentCredentials()[1];
  }

  onSubmit() {
    console.log(this.signInForm.value);
    this.signInForm.reset();
  }

  onClearForm() {
    this.signInForm.reset();
  }

  ngOnDestroy(): void {
      this.authorizationService.setCurrentCredentials(
        this.signInForm.value.email,
        this.signInForm.value.password
      );
  }
}
