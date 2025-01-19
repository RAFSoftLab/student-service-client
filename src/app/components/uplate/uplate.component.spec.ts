import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UplateComponent } from './uplate.component';
import { Student, StudentIndeks, StudentProfile } from 'src/app/model';

describe('UplateComponent', () => {
  let component: UplateComponent;
  let fixture: ComponentFixture<UplateComponent>;

    beforeEach(async () => {
      const studentProfile : StudentProfile = {
          indeks: { id: 1, student: { id: 123 } as unknown as Student, indeks: '2020/001' } as unknown as StudentIndeks
      } as unknown as StudentProfile
      await TestBed.configureTestingModule({
        declarations: [UplateComponent]
      }).compileComponents();
  
      fixture = TestBed.createComponent(UplateComponent);
      component = fixture.componentInstance;
  
      // Podesi @Input studentProfile
      component.studentProfile = studentProfile
  
      fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept studentProfile as input', () => {
    const mockStudentProfile: StudentProfile = {
        indeks: { id: 1, student: { id: 123 } as unknown as Student, indeks: '2020/001' } as unknown as StudentIndeks
    } as unknown as StudentProfile
    
    component.studentProfile = mockStudentProfile;
    fixture.detectChanges();
    
    expect(component.studentProfile).toEqual(mockStudentProfile);
  });
});