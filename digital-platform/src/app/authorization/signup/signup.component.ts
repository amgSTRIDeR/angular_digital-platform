import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationService } from '../../core/authorization.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnDestroy, OnInit{
  signUpForm!: FormGroup;

  constructor(private authorizationService: AuthorizationService) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl(this.authorizationService.getCurrentCredentials()[0], [Validators.required, Validators.email]),
      password: new FormControl(this.authorizationService.getCurrentCredentials()[1], [Validators.required, Validators.minLength(6)]),
      phoneNumber: new FormControl(null, Validators.required),
      position: new FormControl('student')
    })

    // this.signUpForm = new FormBuilder().group({
    //   email: [this.authorizationService.getCurrentCredentials()[0]],
    //   password: [this.authorizationService.getCurrentCredentials()[1]],
    //   phoneNumber: [''],
    //   position: ['student']
    // })
  }

  onSubmit() {
    console.log(this.signUpForm.value);
    this.signUpForm.reset();
    this.signUpForm.patchValue({
      email: '',
      password: '',
      phoneNumber: '',
      position: 'student'
    })
  }

  ngOnDestroy(): void {
    this.authorizationService.setCurrentCredentials(
      this.signUpForm.value.email,
      this.signUpForm.value.password
    );
}
}
