import { TestBed } from '@angular/core/testing';

import { AppointmentService } from './appointment.service';

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppointmentService],
    });
    service = TestBed.inject(AppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have the selected date signal', () => {
    expect(service.selectedDate).toBeTruthy();
  });

  it('should initialize with today', () => {
    const today = new Date();
    expect(service.selectedDate()).toEqual(today);
  })
});
