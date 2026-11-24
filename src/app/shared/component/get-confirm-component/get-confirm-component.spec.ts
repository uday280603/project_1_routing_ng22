import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetConfirmComponent } from './get-confirm-component';

describe('GetConfirmComponent', () => {
  let component: GetConfirmComponent;
  let fixture: ComponentFixture<GetConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetConfirmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GetConfirmComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
