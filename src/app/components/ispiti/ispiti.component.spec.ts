import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IspitiComponent } from './ispiti.component';

describe('IspitiComponent', () => {
  let component: IspitiComponent;
  let fixture: ComponentFixture<IspitiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IspitiComponent]
    });
    fixture = TestBed.createComponent(IspitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
