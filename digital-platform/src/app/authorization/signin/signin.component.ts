import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  // @Output() onEmailChange = new EventEmitter<string>();
  @ViewChild('f') signInForm!: NgForm;

  onSubmit() {
    console.log(this.signInForm.value);
  }

  onClearForm() {
    this.signInForm.reset();
  }
}
