import { Component, Input, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { StudentProfile, UpisGodine } from 'src/app/model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-upisi-godine',
  templateUrl: './upisi-godine.component.html',
  styleUrls: ['./upisi-godine.component.css']
})
export class UpisiGodineComponent implements OnInit{

  @Input()
  studentProfile!: StudentProfile;

  studentService: StudentService;

  noviUpis!: UpisGodine;

  constructor(studentService : StudentService) {
    this.studentService = studentService
  }
  ngOnInit(){
    console.log(this.studentProfile.indeks)
    this.studentService.initNewUpis(this.studentProfile.indeks.student.id, '').subscribe(
      newUpis => {
        this.noviUpis = newUpis
        console.log(this.noviUpis)
      }
    )
  }

  openModal() {
    const modalElement = document.getElementById('upisModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('upisModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

  dodajNoviUpis(){
    
    this.studentService.addNewUpis(this.noviUpis).subscribe(
      upisId => {
        console.log('Upis godine: ' + upisId)
        this.studentService.getStudentProfile(this.studentProfile.indeks.id).subscribe(
          response => {
              this.studentProfile.upisiGodine = response.upisiGodine
              this.closeModal()
              this.studentService.initNewUpis(this.studentProfile.indeks.student.id, '').subscribe(
                newUpis => {
                  this.noviUpis = newUpis
                }
              )
          }
        )
      },
      error => {
        alert('Greška prilikom dodavanja novog upisa!')
      }
    )
  }
}