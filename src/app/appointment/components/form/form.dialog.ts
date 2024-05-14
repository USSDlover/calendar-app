import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { FormDialogData } from '../../types/form-dialog-data';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButton,
    MatDialogContent,
    MatDialogActions,
    DatePipe,
    MatDialogTitle
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './form.dialog.html',
  styleUrl: './form.dialog.scss'
})
export class FormDialog implements OnInit {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  selectedDate?: Date;
  selectedHour?: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData,
    public dialogRef: MatDialogRef<FormDialog>
  ) {}

  ngOnInit(): void {
    this.initSelectedDate();
    this.initSelectedHour();
  }

  private initSelectedDate(): void {
    if (this.data?.selectedDate) {
      this.selectedDate = this.data.selectedDate;
    }
  }

  private initSelectedHour(): void {
    if (this.data?.selectedHour?.toString()) {
      this.selectedHour = this.data.selectedHour;
    }
  }

  onFormSubmit(): void {
    this.dialogRef.close({
      ...this.form.value
    });
  }


}
