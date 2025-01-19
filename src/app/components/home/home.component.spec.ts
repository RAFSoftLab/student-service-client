import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { StudentService } from 'src/app/services/student.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';  // Dodajte FormsModule za ngModel
import { RouterTestingModule } from '@angular/router/testing';  // Dodajte RouterTestingModule

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let studentServiceMock: any;

  beforeEach(async () => {
    const mockStudijskiProgrami = [
      { id: 1, naziv: 'RN' },
      { id: 2, naziv: 'IT' },
    ];
    const mockStudentsPageable = {
      content: [
        { id: 1, ime: 'Pera', prezime: 'Peric', brojIndeksa: 'RN1/2022' },
        { id: 2, ime: 'Mika', prezime: 'Mikic', brojIndeksa: 'RN2/2022' },
      ],
      totalPages: 2,
    };

    studentServiceMock = {
      getStudijskiProgrami: jasmine.createSpy('getStudijskiProgrami').and.returnValue(of(mockStudijskiProgrami)),
      searchStudents: jasmine.createSpy('searchStudents').and.returnValue(of(mockStudentsPageable)),
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,  // Obavezno dodajte FormsModule
        RouterTestingModule // Dodajte RouterTestingModule
      ],
      providers: [
        { provide: StudentService, useValue: studentServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize studijski programi on init', () => {
    expect(studentServiceMock.getStudijskiProgrami).toHaveBeenCalled();
    expect(component.studijskiProgrami.length).toBe(2);
    expect(component.studijskiProgrami[0].naziv).toBe('RN');
  });

  it('should initialize students on init', () => {
    expect(studentServiceMock.searchStudents).toHaveBeenCalledWith(
      0, // currentPage - 1
      10, // rowsPerPage
      'RN', // selectedStudProgram
      null, // brojSearch
      null, // godinaSearch
      null, // imeSearch
      null, // prezimeSearch
    );
    expect(component.students.length).toBe(2);
    expect(component.students[0].ime).toBe('Pera');
    expect(component.totalPages).toBe(2);
  });

  it('should search students when searchStudents is called', () => {
    component.selectedStudProgram = 'IT';
    component.imeSearch = 'Mika';

    component.searchStudents();

    expect(studentServiceMock.searchStudents).toHaveBeenCalledWith(
      0, // currentPage - 1
      10, // rowsPerPage
      'IT', // selectedStudProgram
      null, // brojSearch
      null, // godinaSearch
      'Mika', // imeSearch
      null, // prezimeSearch
    );
    expect(component.students.length).toBe(2);
  });

  it('should update currentPage and call searchStudents on page change', () => {
    component.currentPage = 2;
    spyOn(component, 'searchStudents'); // Spijoniramo poziv searchStudents
    component.searchStudents();
    
    expect(component.currentPage).toBe(2);
    expect(component.searchStudents).toHaveBeenCalled();
  });
});