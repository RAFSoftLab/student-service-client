import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GetStudentByIndeksDTO, Student} from "../model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly apiUrl = environment.postApi

  constructor(private httpClient: HttpClient) { }

  findStudent(indeks: string): Observable<GetStudentByIndeksDTO> {
    return this.httpClient.get<GetStudentByIndeksDTO>(`${this.apiUrl}/student/fastsearch`, {params: {indeksShort: indeks}})
  }

}
