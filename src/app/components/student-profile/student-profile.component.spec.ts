import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentProfileComponent } from './student-profile.component';
import { StudentService } from 'src/app/services/student.service';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock StudentService
class MockStudentService {
  getStudijskiProgrami() {
    return of([]);
  }

  saveStudent(student: any) {
    return of(1);
  }

  saveIndeks(indeks: any) {
    return of(1);
  }

  uploadImage(studentId: number, formData: FormData) {
    return of({ success: true });
  }

  getStudentProfile(indeksId: number) {
    return of({ indeks: { student: { slika: '' } } });
  }

  getUploadedImage(studentId: number) {
    return of(new Uint8Array());
  }
}

describe('StudentProfileComponent', () => {
  let component: StudentProfileComponent;
  let fixture: ComponentFixture<StudentProfileComponent>;
  let mockStudentService: MockStudentService;

  beforeEach(async () => {
    mockStudentService = new MockStudentService();

    await TestBed.configureTestingModule({
      declarations: [StudentProfileComponent],
      providers: [
        { provide: StudentService, useValue: mockStudentService },
        DatePipe,
      ],
      imports: [FormsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProfileComponent);
    component = fixture.componentInstance;
    component.studentProfile = {
      indeks: {
        id: undefined,
        student: { slika: '' },
        studProgramOznaka: '',
        nacinFinansiranja: '',
      },
    } as any;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch studijski programi on init', () => {
    const spy = spyOn(mockStudentService, 'getStudijskiProgrami').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.studijskiProgrami).toEqual([]);
  });

  it('should handle file selection and preview', () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file] } };

    component.onFileSelected(event);

    expect(component.selectedFile).toBe(file);
  });

  it('should call saveStudent and saveIndeks on saveNewStudent', () => {
    const saveStudentSpy = spyOn(mockStudentService, 'saveStudent').and.callThrough();
    const saveIndeksSpy = spyOn(mockStudentService, 'saveIndeks').and.callThrough();

    component.saveNewStudent();

    expect(saveStudentSpy).toHaveBeenCalled();
    expect(saveIndeksSpy).toHaveBeenCalled();
  });

  it('should alert when no file is selected', () => {
    spyOn(window, 'alert');
    component.selectedFile = null;
    component.saveNewStudent();
    expect(window.alert).toHaveBeenCalledWith('Morate prvo izabrati sliku!');
  });

  it('should generate default image URL when no image is available', () => {
    const defaultImage = 'https://cdn-icons-png.flaticon.com/512/12058/12058199.png';
    component.studentProfile.indeks.student.slika = '';
    component.imagePreview = null;

    const result = component.getImage();
    expect(result).toBe(defaultImage);
  });

  it('should use uploaded image URL when available', () => {
    const mockImage = 'mockBase64Image';
    component.studentProfile.indeks.student.slika = mockImage;
    component.studentProfile.indeks.id = 1

    const result = component.getImage();
    expect(result).toBe(mockImage);
  });
});
