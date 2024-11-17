import { ComponentFixture, TestBed } from '@angular/core/testing';
import { headerSearchComponent } from './headerSearch.component';



describe('headerSearchComponent', () => {
  let component: headerSearchComponent;
  let fixture: ComponentFixture<headerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [headerSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(headerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
