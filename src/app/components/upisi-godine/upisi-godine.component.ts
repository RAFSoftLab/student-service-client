import { Component, Input } from '@angular/core';
import { StudentProfile } from 'src/app/model';

@Component({
  selector: 'app-upisi-godine',
  templateUrl: './upisi-godine.component.html',
  styleUrls: ['./upisi-godine.component.css']
})
export class UpisiGodineComponent {
  @Input()
  studentProfile!: StudentProfile;
}
