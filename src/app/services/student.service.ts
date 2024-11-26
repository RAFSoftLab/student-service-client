import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StudentIndeks, StudentProfile} from "../model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly apiUrl = environment.postApi

  constructor(private httpClient: HttpClient) { }

  findStudentByIndeksShort(indeks: string): Observable<StudentIndeks> {
    return this.httpClient.get<StudentIndeks>(`${this.apiUrl}/student/fastsearch`, {params: {indeksShort: indeks}})
  }

  getStudentProfile(studentIndeksId: number): Observable<StudentProfile> {
    return this.httpClient.get<StudentProfile>(`${this.apiUrl}/student/profile/${studentIndeksId}`)
  }

}
