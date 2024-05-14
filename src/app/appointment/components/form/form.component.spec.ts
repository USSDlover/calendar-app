import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from './form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideNativeDateAdapter } from '@angular/material/core';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [provideNativeDateAdapter()]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.form).toBeDefined();
    expect(component.form?.get('title')?.value).toBe('');
    expect(component.form?.get('date')?.value).toBe('');
    expect(component.form?.get('description')?.value).toBe('');
  });

  it('should have required validation for title and date fields', () => {
    const titleControl = component.form?.get('title');
    const dateControl = component.form?.get('date');

    titleControl?.setValue('');
    dateControl?.setValue('');
    expect(titleControl?.valid).toBeFalse();
    expect(dateControl?.valid).toBeFalse();

    titleControl?.setValue('Test Title');
    dateControl?.setValue(new Date());
    expect(titleControl?.valid).toBeTrue();
    expect(dateControl?.valid).toBeTrue();
  });

  it('should enable the submit button if the form is valid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button') as HTMLButtonElement;

    expect(submitButton.disabled).toBeTrue();

    component.form?.get('title')?.setValue('Test Title');
    component.form?.get('date')?.setValue(new Date());
    fixture.detectChanges();

    expect(submitButton.disabled).toBeFalse();
  });

  it('should call onFormSubmit when form is submitted', () => {
    spyOn(component, 'onFormSubmit');

    component.form?.get('title')?.setValue('Test Title');
    component.form?.get('date')?.setValue(new Date());
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const formElement = compiled.querySelector('form') as HTMLFormElement;
    formElement.dispatchEvent(new Event('submit'));

    expect(component.onFormSubmit).toHaveBeenCalled();
  });
});
