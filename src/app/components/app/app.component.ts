import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../services/student.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  indeks : string;
  studentService: StudentService;
  router: Router;

  constructor(studentService : StudentService, router: Router) {
    this.indeks = ''
    this.studentService = studentService
    this.router = router
  }
  pretraziPoIndeksu(){
    
    if (this.indeks != '')
      this.router.navigate(['student', this.indeks]);
  }

  backToAppComponent(){
    this.router.navigate(['']);
  }

  ngOnInit(): void {

  }

}