import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the inline calendar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const matCalendar = compiled.querySelector('mat-calendar');

    expect(matCalendar).toBeTruthy();
  });

  it('should render the agenda', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const agenda = compiled.querySelector('.agenda');

    expect(agenda).toBeTruthy();
  });
});
