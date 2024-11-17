import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderContainerComponent } from './slider-container.component';

describe('SliderContainerComponent', () => {
  let component: SliderContainerComponent;
  let fixture: ComponentFixture<SliderContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
