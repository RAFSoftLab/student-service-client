import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { StudentComponent } from './components/student/student.component';
import { SudentPolozeniPredmetiComponent } from './components/sudent-polozeni-predmeti/sudent-polozeni-predmeti.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "student/:indeksShort",
    component: StudentComponent
  },
  {
    path: "polozeni-predmeti",
    component: SudentPolozeniPredmetiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
