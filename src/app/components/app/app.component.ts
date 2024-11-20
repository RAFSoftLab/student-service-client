import {Component, OnInit} from '@angular/core';
import {StudentService} from "../../services/student.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  indeks : string;
  studentService: StudentService;

  constructor(studentService : StudentService) {
    this.indeks = ''
    this.studentService = studentService
  }
  pretraziPoIndeksu(){
    this.studentService.findStudent(this.indeks).subscribe(response => {
      console.log(response.student.ime)
    })

  }

  ngOnInit(): void {
  }
}


