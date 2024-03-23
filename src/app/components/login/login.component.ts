import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {CommonModule} from "@angular/common";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  response: any;
  firstTextArea: string = '';
  secondTextArea: string = '';
  submitText: string = '';
  ip: any;
  port: any;

  constructor(private route: ActivatedRoute) {}

  //кнопка отправки, в консоли выводит логин и пароль
  submitLogin(){
    console.log(this.loginForm.value);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.response = JSON.parse(params['response']);
      this.ip = params['ip'];
      this.port = params['port'];
    
      if (this.response && Array.isArray(this.response)) {
        this.response.forEach((item: { text: string, tag: string }) => {
          if (item.tag === 'username'){
            this.firstTextArea = item.text;
          }else if (item.tag === 'password'){
            this.secondTextArea = item.text;
          }else if (item.tag === 'login'){
            this.submitText = item.text;
          }
        });
      }
    });

      this.loginForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      })
  }

}
