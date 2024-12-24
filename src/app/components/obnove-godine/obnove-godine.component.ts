import { Component, Input } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { StudentProfile } from 'src/app/model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-obnove-godine',
  templateUrl: './obnove-godine.component.html',
  styleUrls: ['./obnove-godine.component.css']
})
export class ObnoveGodineComponent {
  @Input()
  studentProfile!: StudentProfile;

    studentService: StudentService;
  
    napomena!: string
  
    constructor(studentService : StudentService) {
      this.studentService = studentService
    }


  dodajNovuObnovu(){
      this.studentService.addNewObnova(this.studentProfile.indeks.student.id, this.napomena).subscribe(
        obnovaId => {
          console.log('Obnova godine: ' + obnovaId)
          this.studentService.getStudentProfile(this.studentProfile.indeks.id).subscribe(
            response => {
                this.studentProfile.obnoveGodine = response.obnoveGodine
                this.napomena = ''
                bootstrap.Modal.getInstance(document.getElementById('obnovaModal')!)?.hide();
                document.querySelector('.modal-backdrop')?.remove();
            }
          )
        },
        error => {
          alert('Greška prilikom dodavanja nove obnove godine!')
        }
      )
    }
}
