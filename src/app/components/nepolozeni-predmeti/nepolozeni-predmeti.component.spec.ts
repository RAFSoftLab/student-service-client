import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Student, StudentIndeks, StudentProfile } from 'src/app/model';
import { NepolozeniPredmetiComponent } from './nepolozeni-predmeti.component';

describe('NepolozeniPredmetiComponent', () => {
  let component: NepolozeniPredmetiComponent;
  let fixture: ComponentFixture<NepolozeniPredmetiComponent>;

    beforeEach(async () => {
      const studentProfile : StudentProfile = {
          indeks: { id: 1, student: { id: 123 } as unknown as Student, indeks: '2020/001' } as unknown as StudentIndeks
      } as unknown as StudentProfile
  
      await TestBed.configureTestingModule({
        declarations: [NepolozeniPredmetiComponent]
      }).compileComponents();
  
      fixture = TestBed.createComponent(NepolozeniPredmetiComponent);
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