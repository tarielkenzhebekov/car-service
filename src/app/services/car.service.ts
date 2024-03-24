import { Injectable } from '@angular/core';
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

  static create(carData: any) {
    return axios.post(`${this.getUrl()}/api/car/create`, carData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  }
}
