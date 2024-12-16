import { Component, OnInit } from '@angular/core';
import { Student, StudentDTO, StudijskiProgram } from 'src/app/model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  studentService: StudentService;
  students!: StudentDTO[]
  studijskiProgrami: StudijskiProgram[] = []
  selectedStudProgram: string = 'RN'
  brojSearch: number|null = null
  godinaSearch: number|null = null
  imeSearch: string|null = null
  prezimeSearch: string|null = null

  currentPage = 1;
  rowsPerPage = 10;
  totalPages!: number;

  constructor(studentService: StudentService){
    this.studentService = studentService
  }

  ngOnInit(): void {
    this.studentService.getStudijskiProgrami().subscribe(response => {
      this.studijskiProgrami = response
    })  
    this.searchStudents()
  }

  searchStudents() {
    this.studentService.searchStudents(
      this.currentPage - 1, 
      this.rowsPerPage, 
      this.selectedStudProgram, 
      this.brojSearch!, 
      this.godinaSearch!, 
      this.imeSearch!, 
      this.prezimeSearch!).subscribe(
      studentsPageable => {
        this.students = studentsPageable.content
        this.totalPages = studentsPageable.totalPages;
      }
    )
  }

  promenaStudijskogPrograma(){
    this.searchStudents()
  }

}
