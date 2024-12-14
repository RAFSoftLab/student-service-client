import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IndeksRequest, Student, StudentIndeks, StudentProfile, StudijskiProgram} from "../model";

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

  getStudijskiProgrami(): Observable<StudijskiProgram[]> {
    return this.httpClient.get<StudijskiProgram[]>(`${this.apiUrl}/studprogram/all/sorted`)
  }

  saveStudent(student: Student): Observable<number> {
    return this.httpClient.post<number>(`${this.apiUrl}/student/add`, student)
  }

  saveIndeks(indeks: IndeksRequest): Observable<number> {
    return this.httpClient.post<number>(`${this.apiUrl}/student/saveindeks`, indeks)
  }

  uploadImage(studentId: number, image: FormData): Observable<string> {
    return this.httpClient.post<string>(`${this.apiUrl}/student/${studentId}/uploadImage`, image)
  }

  getUploadedImage(studentId: number): Observable<Uint8Array> {
    return this.httpClient.get<Uint8Array>(`${this.apiUrl}/student/${studentId}/image`, { responseType: 'arraybuffer' as 'json' })
  }

}
