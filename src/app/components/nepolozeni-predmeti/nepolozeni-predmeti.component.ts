import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentProfile } from 'src/app/model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-nepolozeni-predmeti',
  templateUrl: './nepolozeni-predmeti.component.html',
  styleUrls: ['./nepolozeni-predmeti.component.css']
})
export class NepolozeniPredmetiComponent{
  
  @Input()
  studentProfile!: StudentProfile;

}