import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  constructor(){

  }

  //кнопка отправки, в консоли выводит логин и пароль
  submitLogin(){
    console.log(this.loginForm.value);
  }

  ngOnInit(): void {
      this.loginForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      })
  }

}
