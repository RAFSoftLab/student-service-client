import { Component, OnInit } from '@angular/core';
import { IspitniRok, SkolskaGodina } from 'src/app/model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-ispitni-rok',
  templateUrl: './ispitni-rok.component.html',
  styleUrls: ['./ispitni-rok.component.css']
})
export class IspitniRokComponent implements OnInit{
  
  studentService: StudentService;
  aktivnaSkolskaGodina!: SkolskaGodina;
  ispitniRokovi!: IspitniRok[];
  noviIspitniRok!: IspitniRok;
  
  
  constructor(studentService : StudentService) {
      this.studentService = studentService
      this.noviIspitniRok = <IspitniRok>{ }
  }
  
  ngOnInit(){
    this.getIspitniRokovi()
    this.studentService.getAktivnaSkolskaGodina().subscribe(
      aktivnaSkolskaGodina => { 
        this.noviIspitniRok.skolskaGodina = aktivnaSkolskaGodina  
      }
    )
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
