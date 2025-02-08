import { Component, OnInit } from '@angular/core';
import { IspitniRok } from 'src/app/model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-ispitni-rok',
  templateUrl: './ispitni-rok.component.html',
  styleUrls: ['./ispitni-rok.component.css']
})
export class IspitniRokComponent implements OnInit{
  
  studentService: StudentService;
  ispitniRokovi!: IspitniRok[];
  noviIspitniRok!: IspitniRok
  
  
  constructor(studentService : StudentService) {
      this.studentService = studentService
      this.noviIspitniRok = <IspitniRok>{skolskaGodina: {id: 15}}
  }
  
  ngOnInit(){
    this.getIspitniRokovi()
  }
  dodajIspitniRok(){
    this.studentService.addNewIspitniRok(this.noviIspitniRok).subscribe(
      response => { this.getIspitniRokovi() },
      error => { alert('Greška prilikom dodavanja novog ispitnog roka!') }
    )
  }

  getIspitniRokovi(){
    this.studentService.getIspitniRokovi().subscribe(
      response => {
          this.ispitniRokovi = response
      },
      error => {
        console.log('Ispitni rokovi - greska!')
      }
    )
  }

}
