export interface GetStudentByIndeksDTO {
  id: number
  broj: number
  godina: number
  studProgramOznaka: string
  nacinFinansiranja: any
  aktivan: boolean
  vaziOd: any
  student: Student
  studijskiProgram: StudijskiProgram
}

export interface Student {
  id: number
  ime: string
  prezime: string
  srednjeIme: string
  jmbg: string
  datumRodjenja: string
  mestoRodjenja: any
  mestoPrebivalista: string
  drzavaRodjenja: string
  drzavljanstvo: any
  nacionalnost: any
  pol: string
  adresa: string
  brojTelefonaMobilni: string
  brojTelefonaFiksni: string
  slika: any
  email: any
  brojLicneKarte: any
  licnuKartuIzdao: any
  mestoStanovanja: any
  adresaStanovanja: any
  prviUpis: any
}

export interface StudijskiProgram {
  id: number
  oznaka: string
  naziv: string
  godinaAkreditacije: number
  zvanje: any
  trajanjeGodina: number
  trajanjeSemestara: number
  vrstaStudija: string
  ukupnoEspb: any
}