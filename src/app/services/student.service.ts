import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IndeksRequest, Student, StudentIndeks, StudentPageable, StudentProfile, StudijskiProgram} from "../model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly apiUrl = environment.postApi

  constructor(private httpClient: HttpClient) { }

  findStudentByIndeksShort(indeks: string): Observable<StudentIndeks> {
    return this.httpClient.get<StudentIndeks>(`${this.apiUrl}/student/fastsearch?indeksShort=${indeks}`)
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
    return this.httpClient.get<Uint8Array>(
      `${this.apiUrl}/student/${studentId}/image`, { responseType: 'arraybuffer' as 'json' })
  }

  searchStudents(page: number, size: number, studProgram: string, broj: number, godina: number, ime: string, prezime: string): Observable<StudentPageable> {
    var url: string = `${this.apiUrl}/student/search?page=${page}&size=${size}&studProgram=${studProgram}`
    if (broj != null)
      url += `&broj=${broj}`
    if (godina != null)
      url += `&godina=${godina}`
    if (ime != null && ime != '')
      url += `&ime=${ime}`
    if (prezime != null && prezime != '')
      url += `&prezime=${prezime}`
    return this.httpClient.get<StudentPageable>(url)
  }

  addNewUpis(studentId: number, napomena: string): Observable<number> {
    return this.httpClient.post<number>(`${this.apiUrl}/tok/upis/add`, {"studentId": studentId, "napomena": napomena})
  }

  addNewObnova(studentId: number, napomena: string): Observable<number> {
    return this.httpClient.post<number>(`${this.apiUrl}/tok/obnova/add`, {"studentId": studentId, "napomena": napomena})
  }

}