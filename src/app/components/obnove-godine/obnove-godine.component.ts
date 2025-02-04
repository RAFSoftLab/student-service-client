import { Component, Input, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ObnovaGodine, Predmet, StudentProfile } from 'src/app/model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-obnove-godine',
  templateUrl: './obnove-godine.component.html',
  styleUrls: ['./obnove-godine.component.css']
})
export class ObnoveGodineComponent implements OnInit{
  @Input()
  studentProfile!: StudentProfile;

  studentService: StudentService;

  novaObnova!: ObnovaGodine;

  upisujePredmete!: Predmet[]
  
  constructor(studentService : StudentService) {
    this.studentService = studentService
  }

  ngOnInit() {
    console.log(this.studentProfile.indeks)
    this.studentService.initNewObnova(this.studentProfile.indeks.student.id, '').subscribe(
      newObnova => {
        this.novaObnova = newObnova
        this.upisujePredmete = newObnova.upisujePredmete
        this.novaObnova.upisujePredmete = []
        console.log(this.novaObnova)
      }
    )
  }

  openModal() { 
    this.ngOnInit()
    const modalElement = document.getElementById('obnovaModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('obnovaModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.novaObnova.upisujePredmete.push({ id: Number(event.target.value)} as Predmet);
    } else {
      const index = this.novaObnova.upisujePredmete.findIndex(x => x.id === event.target.value);
      this.novaObnova.upisujePredmete.splice(index, 1);
    }
    console.log(this.novaObnova.upisujePredmete)
  }


  dodajNovuObnovu(){
    console.log(this.novaObnova)
    this.studentService.addNewObnova(this.novaObnova).subscribe(
      obnovaId => {
        console.log('Obnova godine: ' + obnovaId)
        this.studentService.getStudentProfile(this.studentProfile.indeks.id).subscribe(
          response => {
              this.studentProfile.obnoveGodine = response.obnoveGodine
              this.closeModal()
              this.studentService.initNewObnova(this.studentProfile.indeks.student.id, '').subscribe(
                newObnova => {
                  this.novaObnova = newObnova
                }
              )
          }
        )
      },
      error => {
        alert('Greška prilikom dodavanja nove obnove godine!')
      }
    )
  }
}
