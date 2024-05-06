import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickAirplaneComponent } from './pick-airplane.component';

describe('PickAirplaneComponent', () => {
  let component: PickAirplaneComponent;
  let fixture: ComponentFixture<PickAirplaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickAirplaneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickAirplaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
