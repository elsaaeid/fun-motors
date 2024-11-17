import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Error404ViewsComponent } from './error404-views.component';

describe('Error404ViewsComponent', () => {
  let component: Error404ViewsComponent;
  let fixture: ComponentFixture<Error404ViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Error404ViewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Error404ViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
