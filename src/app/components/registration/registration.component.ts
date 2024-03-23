import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  isSubmit: boolean = false;
  engineTypes: string[] = ['Бензиновый', 'Дизельный', 'Электрический'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      year: ['0', [Validators.required, Validators.min(0), Validators.max((new Date()).getFullYear())]],
      price: ['0', [Validators.required, Validators.min(0)]],
      engineType: ['', [Validators.required]]
    });
  }

  changeEngineType(e: any) {
    // TODO Remove
    console.log(e.target.value);
    this.registrationForm.get('engineType')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }


  onSubmit() {
    // TODO Remove
    console.log(this.registrationForm.value)
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
    }
  }

}
