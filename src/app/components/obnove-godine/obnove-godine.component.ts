import { Component, Input } from '@angular/core';
import { StudentProfile } from 'src/app/model';

@Component({
  selector: 'app-obnove-godine',
  templateUrl: './obnove-godine.component.html',
  styleUrls: ['./obnove-godine.component.css']
})
export class ObnoveGodineComponent {
  @Input()
  studentProfile!: StudentProfile;
}
