import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { StudentComponent } from './components/student/student.component';
import { StudentPolozeniPredmetiComponent } from './components/sudent-polozeni-predmeti/sudent-polozeni-predmeti.component';
import { PrijaveIspitaComponent } from './components/prijave-ispita/prijave-ispita.component';
import { NepolozeniPredmetiComponent } from './components/nepolozeni-predmeti/nepolozeni-predmeti.component';

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
    component: StudentPolozeniPredmetiComponent
  },
  {
    path: "nepolozeni-predmeti",
    component: NepolozeniPredmetiComponent
  },
  {
    path: "prijave-ispita",
    component: PrijaveIspitaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
