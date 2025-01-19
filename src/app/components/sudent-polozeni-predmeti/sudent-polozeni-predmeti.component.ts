import { Component, Input, OnInit } from '@angular/core';
import { StudentProfile } from 'src/app/model';

@Component({
  selector: 'app-student-polozeni-predmeti',
  templateUrl: './sudent-polozeni-predmeti.component.html',
  styleUrls: ['./sudent-polozeni-predmeti.component.css']
})
export class StudentPolozeniPredmetiComponent{
  @Input()
  studentProfile!: StudentProfile;
}
