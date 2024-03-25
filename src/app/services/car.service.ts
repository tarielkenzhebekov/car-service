import {Injectable} from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  private static getUrl() {
    const host = localStorage.getItem("host");
    const port = localStorage.getItem("port");
    return `http://${host}:${port}`;
  }

  private static getAuthorization() {
    const username = localStorage.getItem('username') === null ? 'admin@nurtelecom.kg' : localStorage.getItem('username');
    const password = localStorage.getItem('password') === null ? 'qwerty123' : localStorage.getItem('password');
    // @ts-ignore
    const encodeCredentials = btoa(username.toString() + ':' + password.toString());
    return `Basic ${encodeCredentials}`;
  }

  static checkSocket(host: string, port: string) {
    return axios.head(`http://${host}:${port}/api/components/login`);
  }

  static getLogin() {
    return axios.get(`${this.getUrl()}/api/components/login`);
  }

  static getRegistration() {
    return axios.get(`${this.getUrl()}/api/components/registration`);
  }

  static login(loginData: any) {
    return axios.post(`${this.getUrl()}/api/auth/authenticate`, loginData);
  }

  static create(carData: any) {
    return axios.post(`${this.getUrl()}/api/car/create`, carData, {
      headers: {
        'content-type': 'multipart/form-data',
        'authorization': this.getAuthorization()
      }
    });
  }
}
