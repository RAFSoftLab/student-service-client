import { Component, Input } from '@angular/core';
import { StudentProfile } from 'src/app/model';

@Component({
  selector: 'app-slusa-predmete',
  templateUrl: './slusa-predmete.component.html',
  styleUrls: ['./slusa-predmete.component.css']
})
export class SlusaPredmeteComponent {
  @Input()
  studentProfile!: StudentProfile;
}
