import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor() { }

  private static getUrl() {
    const host = localStorage.getItem("host");
    const port = localStorage.getItem("port");
    return `http://${host}:${port}`;
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
}
