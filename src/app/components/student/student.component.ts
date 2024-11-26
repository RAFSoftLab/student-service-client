import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetStudentByIndeksDTO } from 'src/app/model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{

  studentService: StudentService;
  studentDto!: GetStudentByIndeksDTO;

  constructor(private route: ActivatedRoute, private router: Router, studentService : StudentService) {
    this.studentService = studentService
  }

  ngOnInit(): void {
    const indeksShort: string = <string>this.route.snapshot.paramMap.get('indeksShort');
    this.studentService.findStudent(indeksShort).subscribe(
      response => {
          this.studentDto = response
      },
      error => {
      })
    
  }
}