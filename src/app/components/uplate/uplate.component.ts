import { Component, Input } from '@angular/core';
import { StudentProfile } from 'src/app/model';

@Component({
  selector: 'app-uplate',
  templateUrl: './uplate.component.html',
  styleUrls: ['./uplate.component.css']
})
export class UplateComponent {
  @Input()
  studentProfile!: StudentProfile;
}
