import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {ComponentService} from "../../services/component.service";
import {CarService} from "../../services/car.service";

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    KeyValuePipe
  ],
})
export class RegistrationComponent {
  registrationForm!: FormGroup;
  engineTypes = new Map<string, string>([
    ["Бензиновый", "PETROL"],
    ["Дизельный", "ELECTRIC"],
    ["Электрический", "DIESEL"],
  ]);
  fileUploaded: boolean = false;
  fileName: String = '';
  components: any;
  image: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // TODO Remove
    localStorage.setItem("host", "127.0.0.1");
    localStorage.setItem("port", "8080");

    ComponentService.getRegistration()
      .then(response => this.components = response.data)
      .catch(e => console.log(e));

    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      year: ['0', [Validators.required, Validators.min(0), Validators.max((new Date()).getFullYear())]],
      price: ['0', [Validators.required, Validators.min(0)]],
      engineType: ['', [Validators.required]],
    });
  }

  changeEngineType(e: any) {
    this.registrationForm.get('engineType')?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  uploadImage(e: any) {
    // TODO Remove
    console.log(e.target.files[0]);
    this.fileUploaded = true;
    this.image = e.target.files[0];
    this.fileName = this.image.name;
    this.registrationForm.get('image')?.setValue(this.image);
  }

  onSubmit() {
    // TODO Remove
    console.log(this.registrationForm.value)
    if (this.registrationForm.valid) {

      let formData:FormData = new FormData();
      formData.append('carInfo',
        new Blob([JSON.stringify(this.registrationForm.value)], { type: 'application/json' }));
      formData.append('image', this.image, this.image.name);
      this.registrationForm.reset();

      CarService.create(formData)
        .then(response => console.log(response.data))
        .catch(e => console.log(e));
    }
  }

}
