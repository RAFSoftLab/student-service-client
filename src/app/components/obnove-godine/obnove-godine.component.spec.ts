import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ObnoveGodineComponent } from './obnove-godine.component';
import { StudentService } from 'src/app/services/student.service';
import { of, throwError } from 'rxjs';
import { ObnovaGodine, SkolskaGodina, Student, StudentIndeks, StudentProfile } from 'src/app/model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ObnoveGodineComponent', () => {
  let component: ObnoveGodineComponent;
  let fixture: ComponentFixture<ObnoveGodineComponent>;
  let studentServiceMock: any;

  beforeEach(async () => {
    const studentProfile : StudentProfile = {
        indeks: { 
          id: 1, 
          student: { 
            id: 123,
            ime: 'Marko', 
            prezime: 'Markovic'
          } as unknown as Student, 
          studProgramOznaka: 'IT', 
          broj: '123', 
          godina: '2023', 
          indeks: '2020/001'
        } as unknown as StudentIndeks,
        obnoveGodine: [
          {
            datumObnove: '2023-01-01',
            godinaKojuObnavlja: 1,
            skolskaGodina: { pocetna: 2022, krajnja: 2023 },
            napomena: 'Test napomena',
          },
        ]
    } as unknown as StudentProfile

    const obnoveGodine : ObnovaGodine = {
        id: 1,
        skolskaGodina:{
            pocetna: 2024
        } as unknown as SkolskaGodina,
        upisujePredmete: [
          { id: 1, naziv: 'Matematika' },
          { id: 2, naziv: 'Fizika' },
        ]
    } as unknown as ObnovaGodine

    studentServiceMock = {
      initNewObnova: jasmine.createSpy('initNewObnova').and.returnValue(of(obnoveGodine)),
      addNewObnova: jasmine.createSpy('addNewObnova').and.returnValue(of(1)),
      getStudentProfile: jasmine.createSpy('getStudentProfile').and.returnValue(of(studentProfile)),
    };

    await TestBed.configureTestingModule({
      declarations: [ObnoveGodineComponent],
      imports: [
              HttpClientTestingModule,
              FormsModule,
              RouterTestingModule
            ],
      providers: [
        { provide: StudentService, useValue: studentServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ObnoveGodineComponent);
    component = fixture.componentInstance;

    // Podesi @Input studentProfile
    component.studentProfile = studentProfile

    component.novaObnova = obnoveGodine

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize novaObnova on ngOnInit', () => {
    const mockObnova = { id: 1 } as ObnovaGodine;
    studentServiceMock.initNewObnova.and.returnValue(of(mockObnova));

    component.ngOnInit();

    expect(studentServiceMock.initNewObnova).toHaveBeenCalledWith(123, '');
    expect(component.novaObnova).toEqual(mockObnova);
  });

  it('should add new obnova and update studentProfile', () => {
    const mockObnova = {
        id: 1,
        skolskaGodina:{
            pocetna: 2024
        } as unknown as SkolskaGodina,
        upisujePredmete: [
          { id: 1, naziv: 'Matematika' },
          { id: 2, naziv: 'Fizika' },
        ]
    } as unknown as ObnovaGodine

    const updatedProfile = {
        indeks: { id: 1, student: { id: 123 } as unknown as Student, indeks: '2020/001' } as unknown as StudentIndeks,
        obnoveGodine: [mockObnova]
    } as unknown as StudentProfile;

    studentServiceMock.addNewObnova.and.returnValue(of(1));
    studentServiceMock.getStudentProfile.and.returnValue(of(updatedProfile));
    studentServiceMock.initNewObnova.and.returnValue(of(mockObnova));

    spyOn(component, 'closeModal').and.callThrough();

    component.dodajNovuObnovu();

    expect(studentServiceMock.addNewObnova).toHaveBeenCalledWith(mockObnova);
    expect(studentServiceMock.getStudentProfile).toHaveBeenCalledWith(1);
    expect(component.studentProfile.obnoveGodine).toEqual(updatedProfile.obnoveGodine);
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should alert on error during addNewObnova', () => {
    spyOn(window, 'alert');
    const mockObnova = { id: 1 } as ObnovaGodine;

    studentServiceMock.addNewObnova.and.returnValue(throwError(() => new Error('Error')));

    component.novaObnova = mockObnova;
    component.dodajNovuObnovu();

    expect(studentServiceMock.addNewObnova).toHaveBeenCalledWith(mockObnova);
    expect(window.alert).toHaveBeenCalledWith('Greška prilikom dodavanja nove obnove godine!');
  });

  //html ------------------------------------------------------------

  it('should display student profile header correctly', () => {
    const header = fixture.debugElement.query(By.css('h6')).nativeElement;
    expect(header.textContent).toContain('Marko Markovic');
    expect(header.textContent).toContain('IT123/2023');
  });

  it('should render the obnova table correctly', () => {
    const rows = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(rows.length).toBe(1);
    expect(rows[0].nativeElement.textContent).toContain('2023-01-01');
    expect(rows[0].nativeElement.textContent).toContain('1');
    expect(rows[0].nativeElement.textContent).toContain('2022/2023');
    expect(rows[0].nativeElement.textContent).toContain('Test napomena');
  });

  it('should display the list of subjects in the modal correctly', () => {
    component.openModal();
    fixture.detectChanges();

    const subjectLabels = fixture.debugElement.queryAll(By.css('.form-check-label'));
    expect(subjectLabels.length).toBe(2);
    expect(subjectLabels[0].nativeElement.textContent).toContain('Matematika');
    expect(subjectLabels[1].nativeElement.textContent).toContain('Fizika');
  });

  it('should bind textarea value correctly for napomena', () => {
    const textarea = fixture.debugElement.query(By.css('#obnovaFormControlTextarea1')).nativeElement;
    textarea.value = 'New Note';
    textarea.dispatchEvent(new Event('input'));

    expect(component.novaObnova.napomena).toBe('New Note');
  });

  it('should call dodajNovuObnovu() when save button is clicked', () => {
    spyOn(component, 'dodajNovuObnovu');

    const saveButton = fixture.debugElement.query(By.css('.modal-footer .btn-primary')).nativeElement;
    saveButton.click();

    expect(component.dodajNovuObnovu).toHaveBeenCalled();
  });
});