import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMyFlightComponent } from './find-my-flight.component';

describe('FindMyFlightComponent', () => {
  let component: FindMyFlightComponent;
  let fixture: ComponentFixture<FindMyFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindMyFlightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindMyFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
