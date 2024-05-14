import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButton,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
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
