import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Добавлен импорт HttpClient
import { Router } from '@angular/router';
import {ComponentService} from "../../services/component.service";

@Component({
  selector: 'app-ip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ip.component.html',
  styleUrl: './ip.component.css'
})
export class IpComponent implements OnInit {
  ipForm!: FormGroup;

  constructor(private http: HttpClient, private router: Router) {}

  submitIp() {
    const ipAddress = this.ipForm.get('ipAddress')?.value;
    const port = this.ipForm.get('port')?.value;

    ComponentService.checkSocket(ipAddress, port)
      .then(response=> {
        localStorage.setItem("host", ipAddress);
        localStorage.setItem("port", port);
        this.router.navigate(['/login']);
      }).catch(error => {
        console.log("Server not found!");
        alert("Server not found!");
    });
  }

  ngOnInit(): void {
    this.ipForm = new FormGroup({
      'ipAddress': new FormControl('', [Validators.required, Validators.pattern('^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\\.(?!$)|$)){4}$')]),
      'port': new FormControl('', [Validators.required, Validators.pattern('^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$')]),
    });
  }
}
