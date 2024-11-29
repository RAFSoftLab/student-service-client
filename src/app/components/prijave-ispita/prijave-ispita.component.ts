import { Component, Input, OnInit } from '@angular/core';
import { StudentProfile } from 'src/app/model';

@Component({
  selector: 'app-prijave-ispita',
  templateUrl: './prijave-ispita.component.html',
  styleUrls: ['./prijave-ispita.component.css']
})
export class PrijaveIspitaComponent{

  @Input()
  studentProfile!: StudentProfile;
}
