import { Component, Input } from '@angular/core';
import { StudentProfile } from 'src/app/model';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent {

  @Input()
  studentProfile!: StudentProfile;
}
