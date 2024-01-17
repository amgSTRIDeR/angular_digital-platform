import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationService } from '../../core/authorization.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnDestroy, OnInit {
  signUpForm!: FormGroup;
  currentEmail = this.authorizationService.getCurrentCredentials()[0];
  currentPassword = this.authorizationService.getCurrentCredentials()[1];

  constructor(private authorizationService: AuthorizationService) {}

  ngOnInit(): void {
    // this.signUpForm = new FormGroup({
    //   email: new FormControl(
    //     this.authorizationService.getCurrentCredentials()[0],
    //     [Validators.required, Validators.email]
    //   ),
    //   password: new FormControl(
    //     this.authorizationService.getCurrentCredentials()[1],
    //     [Validators.required, this.passwordValidator]
    //   ),
    //   phoneNumber: new FormControl(null, [Validators.required, this.phoneValidator]),
    //   position: new FormControl('student'),
    // });

    this.signUpForm = new FormBuilder().group({
      email: [this.currentEmail, [Validators.required, Validators.email]],
      password: [
        this.currentPassword,
        [Validators.required, this.passwordValidator],
      ],
      phoneNumber: ['', [Validators.required, this.phoneValidator]],
      position: ['student', Validators.required],
    });

    if (this.currentEmail) {
      this.signUpForm.get('email')?.markAsTouched();
      this.signUpForm.get('email')?.markAsDirty();
    }
    if (this.currentPassword) {
      this.signUpForm.markAsTouched();
      this.signUpForm.get('password')?.markAsTouched();
      this.signUpForm.get('password')?.markAsDirty();
    }
  }

  passwordValidator(control: FormControl): { [s: string]: boolean } {
    const passwordPattern =
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+{}\\[\\]:;,.?/~\\\\-]).{8,}$';
    if (control.value && !control.value.match(passwordPattern)) {
      return { passwordError: true };
    }
    return null!;
  }

  phoneValidator(control: FormControl): { [s: string]: boolean } {
    const phonePattern = '^[0-9]{10}$';
    if (control.value && !control.value.match(phonePattern)) {
      return { phoneError: true };
    }
    return null!;
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    this.authorizationService.signUp(email, password).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error),
    });
    this.onClearForm();
  }

  onClearForm() {
    this.signUpForm.patchValue(
      {
        email: '',
        password: '',
        phoneNumber: '',
        position: 'student',
      },
      { emitEvent: false }
    );
  }

  ngOnDestroy(): void {
    this.authorizationService.setCurrentCredentials(
      this.signUpForm.value.email,
      this.signUpForm.value.password
    );
  }
}
