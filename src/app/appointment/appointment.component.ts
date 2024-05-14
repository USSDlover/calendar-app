import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import {
  MatCalendar,
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButton,
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit {
  form?: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    })
  };

  onFormSubmit(): void {
    console.log('Create the appointment');
  }
}
