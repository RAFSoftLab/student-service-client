import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentService } from 'src/app/services/student.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms'; 
import { RouterTestingModule } from '@angular/router/testing'; 
import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let studentServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    studentServiceMock = {
      findStudentByIndeksShort: jasmine.createSpy('findStudentByIndeksShort')
    };

    routerMock = jasmine.createSpyObj('Router', ['navigate'], {
        root: {}, // mock za root
      });

    await TestBed.configureTestingModule({
          declarations: [AppComponent],
          imports: [
            HttpClientTestingModule,
            FormsModule, 
            RouterTestingModule
          ],
          providers: [
            { provide: StudentService, useValue: studentServiceMock }
          ],
        }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not call studentService if indeks is empty', () => {
    component.indeks = '';
    component.pretraziPoIndeksu();
    expect(studentServiceMock.findStudentByIndeksShort).not.toHaveBeenCalled();
  });

  it('should alert if student does not exist', () => {
    spyOn(window, 'alert');
    component.indeks = '12345';
    studentServiceMock.findStudentByIndeksShort.and.returnValue(of(null));

    component.pretraziPoIndeksu();

    expect(studentServiceMock.findStudentByIndeksShort).toHaveBeenCalledWith('12345');
    expect(window.alert).toHaveBeenCalledWith('Ne postoji student sa indeksom 12345');
  });

  it('should navigate to student details if student exists', () => {
    const navigateSpy = spyOn(component.router, 'navigate'); // Praćenje navigacije
    component.indeks = '12345';
    const studentIndeks = { id: 1 };
    studentServiceMock.findStudentByIndeksShort.and.returnValue(of(studentIndeks));

    component.pretraziPoIndeksu();

    expect(studentServiceMock.findStudentByIndeksShort).toHaveBeenCalledWith('12345');
    expect(navigateSpy).toHaveBeenCalledWith(['student', 1]);
  });

  it('should alert on error response', () => {
    spyOn(window, 'alert');
    component.indeks = '12345';
    studentServiceMock.findStudentByIndeksShort.and.returnValue(throwError(() => new Error('Error')));

    component.pretraziPoIndeksu();

    expect(studentServiceMock.findStudentByIndeksShort).toHaveBeenCalledWith('12345');
    expect(window.alert).toHaveBeenCalledWith('Ne postoji student sa indeksom 12345');
  });

  it('should navigate to the root when backToAppComponent is called', () => {
    const navigateSpy = spyOn(component.router, 'navigate'); // Praćenje navigacije
    component.backToAppComponent();

    expect(navigateSpy).toHaveBeenCalledWith(['']);
  });
});