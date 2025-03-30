import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { StudentComponent } from './components/student/student.component';
import { HomeComponent } from './components/home/home.component';

import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StudentPolozeniPredmetiComponent } from './components/sudent-polozeni-predmeti/sudent-polozeni-predmeti.component';
import { PrijaveIspitaComponent } from './components/prijave-ispita/prijave-ispita.component';
import { NepolozeniPredmetiComponent } from './components/nepolozeni-predmeti/nepolozeni-predmeti.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';
import { SlusaPredmeteComponent } from './components/slusa-predmete/slusa-predmete.component';
import { UpisiGodineComponent } from './components/upisi-godine/upisi-godine.component';
import { ObnoveGodineComponent } from './components/obnove-godine/obnove-godine.component';
import { UplateComponent } from './components/uplate/uplate.component';
import { DatePipe } from '@angular/common';
import { IspitniRokComponent } from './components/ispitni-rok/ispitni-rok.component';
import { IspitiComponent } from './components/ispiti/ispiti.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    HomeComponent,
    StudentPolozeniPredmetiComponent,
    PrijaveIspitaComponent,
    NepolozeniPredmetiComponent,
    StudentProfileComponent,
    SlusaPredmeteComponent,
    UpisiGodineComponent,
    ObnoveGodineComponent,
    UplateComponent,
    IspitniRokComponent,
    IspitiComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
