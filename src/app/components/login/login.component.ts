import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {ComponentService} from "../../services/component.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  components: any;

  constructor() {}

  ngOnInit(): void {
    ComponentService.getLogin()
      .then(response => {
          this.components = response.data;
        }
      ).catch( error => {
        alert("Couldn't get login page components!");
        console.log("Couldn't get login page components!")
      }
    )

    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
    })
  }

  submitLogin(){
    console.log(this.loginForm.value);
    const loginData = this.loginForm.value;
    ComponentService.login(loginData)
      .then(response => {
        // TODO Remove
        console.log(response.status)
        }
      ).catch(error => {
        alert(error);
        console.log(error);
    })
  }

}
