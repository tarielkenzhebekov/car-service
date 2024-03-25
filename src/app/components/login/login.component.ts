import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {CarService} from "../../services/car.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

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

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    CarService.getLogin()
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
    CarService.login(loginData)
      .then(response => {
          this.authService.login(loginData.email, loginData.password);
          this.router.navigate(['/registration']);
        }
      ).catch(error => {
        alert(error);
        console.log(error);
    })
  }

}
