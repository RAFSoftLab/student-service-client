import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentProfile } from 'src/app/model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-sudent-polozeni-predmeti',
  templateUrl: './sudent-polozeni-predmeti.component.html',
  styleUrls: ['./sudent-polozeni-predmeti.component.css']
})
export class SudentPolozeniPredmetiComponent implements OnInit{

  studentService: StudentService;
  studentProfile!: StudentProfile;

  constructor(private route: ActivatedRoute, private router: Router, studentService : StudentService) {
    this.studentService = studentService
  }
  
  ngOnInit(): void {
    console.log('ngOnInit polozeni predmeti')
    const currentState = this.router.lastSuccessfulNavigation;
    this.studentProfile = <StudentProfile>currentState?.extras.state?.['data']
    /*
    const studentIndeksId: number = parseInt(<string>this.route.snapshot.paramMap.get('studentIndeksId'));
    this.studentService.getStudentProfile(studentIndeksId).subscribe(
      response => {
          this.studentProfile = response
      },
      error => {
      }
    )*/
  }

}
