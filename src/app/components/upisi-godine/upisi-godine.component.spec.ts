import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentService } from 'src/app/services/student.service';
import { of, throwError } from 'rxjs';
import { Predmet, SkolskaGodina, Student, StudentIndeks, StudentProfile, UpisGodine } from 'src/app/model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UpisiGodineComponent } from './upisi-godine.component';
import { By } from '@angular/platform-browser';

describe('ObnoveGodineComponent', () => {
  let component: UpisiGodineComponent;
  let fixture: ComponentFixture<UpisiGodineComponent>;
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
        upisiGodine: [
          {
            datumUpisa: '2023-01-15',
            godinaKojaSeUpisuje: 2,
            prenosEspb: 10,
            skolskaGodina: { pocetna: 2022, krajnja: 2023 },
            napomena: 'Napomena 1'
          },
          {
            datumUpisa: '2024-01-15',
            godinaKojaSeUpisuje: 3,
            prenosEspb: 12,
            skolskaGodina: { pocetna: 2023, krajnja: 2024 },
            napomena: 'Napomena 2'
          }
        ]
    } as unknown as StudentProfile

    const upisGodine : UpisGodine = {
        id: 1,
        skolskaGodina:{
            pocetna: 2024
        } as unknown as SkolskaGodina,
        predmeti: [
          { naziv: 'Matematika' } as Predmet,
          { naziv: 'Fizika' } as Predmet
        ]
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
              FormsModule,
              RouterTestingModule
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
        } as unknown as SkolskaGodina,
        predmeti: [
          { naziv: 'Matematika' } as Predmet,
          { naziv: 'Fizika' } as Predmet
        ]
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

  //html --------------------------------------------------------------------------
  
  it('should render student profile correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h6.text-black-50').textContent).toContain(
      'Marko Markovic IT123/2023'
    );
  });

  it('should render upisiGodine table rows correctly', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);

    const firstRow = rows[0].nativeElement;
    expect(firstRow.textContent).toContain('2023-01-15');
    expect(firstRow.textContent).toContain('2');
    expect(firstRow.textContent).toContain('10');
    expect(firstRow.textContent).toContain('2022/2023');
    expect(firstRow.textContent).toContain('Napomena 1');
  });

  it('should save new entry when "Sačuvaj" is clicked', () => {
    spyOn(component, 'dodajNoviUpis');

    // Open modal
    const openButton = fixture.debugElement.query(By.css('button.btn-primary'));
    openButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Trigger save
    const saveButton = fixture.debugElement.query(By.css('button.btn-primary:last-child'));
    saveButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.dodajNoviUpis).toHaveBeenCalled();
  });

  it('should update noviUpis napomena when textarea changes', () => {
    const textarea = fixture.debugElement.query(By.css('#exampleFormControlTextarea1'));
    textarea.nativeElement.value = 'Nova napomena';
    textarea.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.noviUpis.napomena).toBe('Nova napomena');
  });

  it('should render predmeti list in the modal correctly', () => {
    const button = fixture.debugElement.query(By.css('button.btn-primary'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    const predmetItems = fixture.debugElement.queryAll(By.css('ul li'));
    expect(predmetItems.length).toBe(2);
    expect(predmetItems[0].nativeElement.textContent).toContain('Matematika');
    expect(predmetItems[1].nativeElement.textContent).toContain('Fizika');
  });

});