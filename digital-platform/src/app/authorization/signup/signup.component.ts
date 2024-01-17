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

  constructor(private authorizationService: AuthorizationService) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl(
        this.authorizationService.getCurrentCredentials()[0],
        [Validators.required, Validators.email]
      ),
      password: new FormControl(
        this.authorizationService.getCurrentCredentials()[1],
        [Validators.required, this.passwordValidator]
      ),
      phoneNumber: new FormControl(null, [Validators.required, this.phoneValidator]),
      position: new FormControl('student'),
    });

    // this.signUpForm = new FormBuilder().group({
    //   email: [this.authorizationService.getCurrentCredentials()[0]],
    //   password: [this.authorizationService.getCurrentCredentials()[1]],
    //   phoneNumber: [''],
    //   position: ['student']
    // })
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
    console.log(this.signUpForm.value);
    this.signUpForm.reset();
    this.signUpForm.patchValue({
      email: '',
      password: '',
      phoneNumber: '',
      position: 'student',
    });
  }

  ngOnDestroy(): void {
    this.authorizationService.setCurrentCredentials(
      this.signUpForm.value.email,
      this.signUpForm.value.password
    );
  }
}
