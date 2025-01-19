import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { StudentComponent } from './student.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input } from '@angular/core';

// Mock StudentService
class MockStudentService {
  getStudentProfile(idStudentIndeks: number) {
    return of({
      indeks: {
        student: { id: 1, slika: '' },
        studijskiProgram: {}
      }
    });
  }

  getUploadedImage(studentId: number) {
    return of(new Uint8Array());
  }
}

@Component({
    selector: 'app-student-profile',
    template: ''
  })
  class MockStudentProfileComponent {
    @Input() studentProfile: any;
  }
  @Component({
    selector: 'app-student-polozeni-predmeti',
    template: ''
  })
  class MockStudentPolozeniPredmetiComponent {
    @Input() studentProfile: any;
  }
  @Component({
    selector: 'app-nepolozeni-predmeti',
    template: ''
  })
  class MockNepolozeniPredmetiComponent {
    @Input() studentProfile: any;
  }
  @Component({
    selector: 'app-slusa-predmete',
    template: ''
  })
  class MockSlusaPredmeteComponent {
    @Input() studentProfile: any;
  }
  @Component({
    selector: 'app-upisi-godine',
    template: ''
  })
  class MockUpisiGodineComponent {
    @Input() studentProfile: any;
  }
  @Component({
    selector: 'app-obnove-godine',
    template: ''
  })
  class MockObnoveGodineComponent {
    @Input() studentProfile: any;
  }
  @Component({
    selector: 'app-uplate',
    template: ''
  })
  class MockUplateComponent {
    @Input() studentProfile: any;
  }
  @Component({
    selector: 'app-prijave-ispita',
    template: ''
  })
  class MockPrijaveIspitaComponent {
    @Input() studentProfile: any;
  }

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let mockStudentService: MockStudentService;
  let mockActivatedRoute: { snapshot: any; };

  beforeEach(async () => {
    mockStudentService = new MockStudentService();
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => '1',
        },
      },
    };

    await TestBed.configureTestingModule({
      declarations: [
        StudentComponent,
        MockStudentProfileComponent, // Use mock child component
        MockStudentPolozeniPredmetiComponent,
        MockNepolozeniPredmetiComponent,
        MockSlusaPredmeteComponent,
        MockUpisiGodineComponent,
        MockObnoveGodineComponent,
        MockUplateComponent,
        MockPrijaveIspitaComponent
      ],
      providers: [
        { provide: StudentService, useValue: mockStudentService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: {} },
      ],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a new student profile when idStudentIndeks is -1', () => {
    spyOn(mockActivatedRoute.snapshot.paramMap, 'get').and.returnValue('-1');
    component.ngOnInit();

    expect(component.studentProfile).toBeDefined();
    expect(component.studentProfile.indeks.godina).toBe(2025);
  });

  it('should fetch student profile and image when idStudentIndeks is valid', () => {
    const getStudentProfileSpy = spyOn(mockStudentService, 'getStudentProfile').and.callThrough();
    const getUploadedImageSpy = spyOn(mockStudentService, 'getUploadedImage').and.callThrough();

    component.ngOnInit();

    expect(getStudentProfileSpy).toHaveBeenCalledWith(1);
    expect(getUploadedImageSpy).toHaveBeenCalledWith(1);
    expect(component.studentProfile).toBeDefined();
  });

  it('should alert when student profile is not found', () => {
    spyOn(mockStudentService, 'getStudentProfile').and.returnValue(throwError(() => new Error('Not Found')));
    spyOn(window, 'alert');

    component.ngOnInit();

    expect(window.alert).toHaveBeenCalledWith('Student nije pronađen!');
  });

  it('should correctly convert byte array to Base64 string', () => {
    const buffer = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in ASCII
    const base64String = component.arrayBufferToBase64(buffer);

    expect(base64String).toBe('data:image/jpeg;base64,SGVsbG8=');
  });
});
