import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  condition = true;
  arr = [1, 2, 3, 4, 5];
  content = 'Hello World';
}
