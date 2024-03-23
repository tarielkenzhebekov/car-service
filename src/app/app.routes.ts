import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SuccessPageComponent } from './components/success/success.component';
import {RegistrationComponent} from "./components/registration/registration.component";

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'success', component: SuccessPageComponent},
    {path: 'registration', component: RegistrationComponent},
];
