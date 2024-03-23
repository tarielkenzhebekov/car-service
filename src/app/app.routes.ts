import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SuccessPageComponent } from './components/success/success.component';
import {RegistrationComponent} from "./components/registration/registration.component";
import { IpComponent } from './components/ip/ip.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/ip', pathMatch: 'full'},
    {path: 'success', component: SuccessPageComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'ip', component: IpComponent},
];
