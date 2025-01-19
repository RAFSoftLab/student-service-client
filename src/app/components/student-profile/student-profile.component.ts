import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { StudentProfile, StudijskiProgram } from 'src/app/model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit{

  @Input()
  studentProfile!: StudentProfile;

  studentService: StudentService;
  studijskiProgrami: StudijskiProgram[] = [];

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(studentService : StudentService, public datepipe: DatePipe) {
    this.studentService = studentService
  }
  
  ngOnInit(): void {
    this.studentService.getStudijskiProgrami().subscribe(response => {
      this.studijskiProgrami = response
    })  
  }

  saveNewStudent(){
    console.log(this.studentProfile.indeks.student)
    this.studentService.saveStudent(this.studentProfile.indeks.student).subscribe(
      studentId => {
      console.log('StudentId: ' + studentId)
      this.studentService.saveIndeks({
        godina: 2025, 
        studProgramOznaka: this.studentProfile.indeks.studProgramOznaka,
        nacinFinansiranja: this.studentProfile.indeks.nacinFinansiranja,
        aktivan: true,
        vaziOd: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
        studentId: studentId
      }).subscribe(
        indeksId => {
          
          if (!this.selectedFile) {
            alert('Morate prvo izabrati sliku!');
            return;
          }
      
          const formData = new FormData();
          formData.append('image', this.selectedFile, this.selectedFile.name);
      
          console.log(this.selectedFile)
      
          this.studentService.uploadImage(studentId, formData).subscribe(
            response => {
              console.log(response)
            },
            error => {
              console.log(error)
            }
          )

          console.log('IndeksId: ' + indeksId)
          
          alert('Uspešno ste evidentirali novog studenta!')
          
          this.studentService.getStudentProfile(indeksId).subscribe(
            response => {
              this.studentService.getUploadedImage(studentId).subscribe(
                slikaByte => {
                  response.indeks.student.slika = this.arrayBufferToBase64(slikaByte)
                  this.studentProfile = response
                }
              )
            }
          )
        },
        error => {
          console.log(error)
        }
        )
      },
      error => {
        console.log(error)
      }
    )
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Image preview (Optional)
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Convert byte array to Base64 string
  arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const length = bytes.byteLength;
    if (length === 0) return '';
    for (let i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/jpeg;base64,' + window.btoa(binary); // Change image type if necessary
  }

  getImage(){
    if (this.studentProfile.indeks.id == undefined) return "https://cdn-icons-png.flaticon.com/512/12058/12058199.png"
    if (this.studentProfile.indeks.student.slika != '') return this.studentProfile.indeks.student.slika
    if (this.imagePreview != null) return this.imagePreview
    return "https://cdn-icons-png.flaticon.com/512/12058/12058199.png"
  }
}
