import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Добавлен импорт HttpClient
@Component({
  selector: 'app-ip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ip.component.html',
  styleUrl: './ip.component.css'
})
export class IpComponent implements OnInit {
  ipForm!: FormGroup;

  constructor(private http: HttpClient) {}

  submitIp() {
    const ipAddress = this.ipForm.get('ipAddress')?.value;
    const port = this.ipForm.get('port')?.value;

    const url = `http://${ipAddress}:${port}`;

    this.http.get(url).subscribe(
      (response) => {
        console.log('Response:', response);
      },
      (error) => {
        alert("Произошла ошибка")
        console.error('Error:', error);
      }
    );
  }

  ngOnInit(): void {
    this.ipForm = new FormGroup({
      'ipAddress': new FormControl('', [Validators.required]),
      'port': new FormControl('', [Validators.required]),
    });
  }
}
