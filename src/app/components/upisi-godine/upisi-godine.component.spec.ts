import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentService } from 'src/app/services/student.service';
import { of, throwError } from 'rxjs';
import { SkolskaGodina, Student, StudentIndeks, StudentProfile, UpisGodine } from 'src/app/model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UpisiGodineComponent } from './upisi-godine.component';

describe('ObnoveGodineComponent', () => {
  let component: UpisiGodineComponent;
  let fixture: ComponentFixture<UpisiGodineComponent>;
  let studentServiceMock: any;

  beforeEach(async () => {
    const studentProfile : StudentProfile = {
        indeks: { id: 1, student: { id: 123 } as unknown as Student, indeks: '2020/001' } as unknown as StudentIndeks,
        upisiGodine: []
    } as unknown as StudentProfile

    const upisGodine : UpisGodine = {
        id: 1,
        skolskaGodina:{
            pocetna: 2024
        } as unknown as SkolskaGodina
    } as unknown as UpisGodine

    studentServiceMock = {
      initNewUpis: jasmine.createSpy('initNewUpis').and.returnValue(of(upisGodine)),
      addNewUpis: jasmine.createSpy('addNewUpis').and.returnValue(of(1)),
      getStudentProfile: jasmine.createSpy('getStudentProfile').and.returnValue(of(studentProfile)),
    };

    await TestBed.configureTestingModule({
      declarations: [UpisiGodineComponent],
      imports: [
              HttpClientTestingModule,
              FormsModule,  // Obavezno dodajte FormsModule
              RouterTestingModule // Dodajte RouterTestingModule
            ],
      providers: [
        { provide: StudentService, useValue: studentServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpisiGodineComponent);
    component = fixture.componentInstance;

    // Podesi @Input studentProfile
    component.studentProfile = studentProfile

    component.noviUpis = upisGodine

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize noviUpis on ngOnInit', () => {
    const mockUpis = { id: 1 } as UpisGodine;
    studentServiceMock.initNewUpis.and.returnValue(of(mockUpis));

    component.ngOnInit();

    expect(studentServiceMock.initNewUpis).toHaveBeenCalledWith(123, '');
    expect(component.noviUpis).toEqual(mockUpis);
  });

  it('should add new upis and update studentProfile', () => {
    const mockUpis = {
        id: 1,
        skolskaGodina:{
            pocetna: 2024
        } as unknown as SkolskaGodina
    } as unknown as UpisGodine

    const updatedProfile = {
        indeks: { id: 1, student: { id: 123 } as unknown as Student, indeks: '2020/001' } as unknown as StudentIndeks,
        upisiGodine: [mockUpis]
    } as unknown as StudentProfile;

    studentServiceMock.addNewUpis.and.returnValue(of(1));
    studentServiceMock.getStudentProfile.and.returnValue(of(updatedProfile));
    studentServiceMock.initNewUpis.and.returnValue(of(mockUpis));

    spyOn(component, 'closeModal').and.callThrough();

    component.dodajNoviUpis();

    expect(studentServiceMock.addNewUpis).toHaveBeenCalledWith(mockUpis);
    expect(studentServiceMock.getStudentProfile).toHaveBeenCalledWith(1);
    expect(component.studentProfile.upisiGodine).toEqual(updatedProfile.upisiGodine);
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should alert on error during addNewUpis', () => {
    spyOn(window, 'alert');
    const mockUpis = { id: 1 } as UpisGodine;

    studentServiceMock.addNewUpis.and.returnValue(throwError(() => new Error('Error')));

    component.noviUpis = mockUpis;
    component.dodajNoviUpis();

    expect(studentServiceMock.addNewUpis).toHaveBeenCalledWith(mockUpis);
    expect(window.alert).toHaveBeenCalledWith('Greška prilikom dodavanja novog upisa!');
  });
});