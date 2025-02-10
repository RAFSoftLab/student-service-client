import { Component, OnInit } from '@angular/core';
import { DrziPredmet, Ispit, IspitniRok } from 'src/app/model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-ispiti',
  templateUrl: './ispiti.component.html',
  styleUrls: ['./ispiti.component.css']
})
export class IspitiComponent implements OnInit{
  
  studentService: StudentService;
  ispiti!: Ispit[];
  noviIspit: Ispit = <Ispit>{ ispitniRok: {}, drziPredmet: {}}
  drziPredmet!: DrziPredmet[]
  ispitniRokovi!: IspitniRok[]
  selectedIspitniRok!: number
  selectedDrziPredmet!: number
  
  constructor(studentService : StudentService) {
    this.studentService = studentService
  }
  
  ngOnInit(){
    this.getIspiti()
    this.getDrziPredmet()
    this.getIspitniRokovi()
  }

  dodajIspit(){
    this.noviIspit.datumVerifikacije = new Date()
    this.noviIspit.datumPredajeZapisnika = new Date()
    console.log(this.noviIspit)
    this.studentService.addNewIspit(this.noviIspit).subscribe(
      response => { this.getIspiti() },
      error => { alert('Greška prilikom dodavanja novog ispita!') }
    )
  }

  getIspiti(){
    this.studentService.getIspiti().subscribe(
      response => { this.ispiti = response },
      error => { console.log('Ispiti - greska!') }
    )
  }

  getDrziPredmet(){
    this.studentService.getDrziPredmetAktivnaSkolskaGodina().subscribe(
      response => {
        this.drziPredmet = response
      }
    )
  }

  getIspitniRokovi(){
    this.studentService.getIspitniRokAktivnaSkolskaGodina().subscribe(
      response => {
        this.ispitniRokovi = response
      }
    )
  }
}