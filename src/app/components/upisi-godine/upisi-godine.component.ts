import { Component, Input } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { StudentProfile } from 'src/app/model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-upisi-godine',
  templateUrl: './upisi-godine.component.html',
  styleUrls: ['./upisi-godine.component.css']
})
export class UpisiGodineComponent {

  @Input()
  studentProfile!: StudentProfile;

  studentService: StudentService;

  napomena!: string

  constructor(studentService : StudentService) {
    this.studentService = studentService
  }

  dodajNoviUpis(){
    this.studentService.addNewUpis(this.studentProfile.indeks.student.id, this.napomena).subscribe(
      upisId => {
        console.log('Upis godine: ' + upisId)
        this.studentService.getStudentProfile(this.studentProfile.indeks.id).subscribe(
          response => {
              this.studentProfile.upisiGodine = response.upisiGodine
              this.napomena = ''
              bootstrap.Modal.getInstance(document.getElementById('upisModal')!)?.hide();
              document.querySelector('.modal-backdrop')?.remove();
          }
        )
      },
      error => {
        alert('Greška prilikom dodavanja novog upisa!')
      }
    )
  }
}