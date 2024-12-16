import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../services/student.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  indeks : string;
  studentService: StudentService;
  router: Router;

  constructor(studentService : StudentService, router: Router) {
    this.indeks = ''
    this.studentService = studentService
    this.router = router
  }
  
  pretraziPoIndeksu(){
    if (this.indeks != ''){
      this.studentService.findStudentByIndeksShort(this.indeks).subscribe(
        studentIndeks => {
          if (studentIndeks == null){
            alert('Ne postoji student sa indeksom ' + this.indeks)
            return
          }
          this.router.navigate(['student', studentIndeks.id]);
        },
        error => {
          alert('Ne postoji student sa indeksom ' + this.indeks)
        }
      )
    }
  }

  backToAppComponent(){
    this.router.navigate(['']);
  }

}