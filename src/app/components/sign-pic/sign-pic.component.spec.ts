import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignPicComponent } from './sign-pic.component';

describe('SignPicComponent', () => {
  let component: SignPicComponent;
  let fixture: ComponentFixture<SignPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignPicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
