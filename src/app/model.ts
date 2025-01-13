export interface StudentProfile {
  indeks: Indeks
  polozeniPredmeti: PolozeniPredmeti[]
  upisiGodine: UpisGodine[]
  obnoveGodine: ObnovaGodine[]
  uplate: Uplata[]
  prijaveIspita: PrijaveIspita[]
  slusaPredmete: SlusaPredmet[]
  nepolozeniPredmeti: Predmet[]
}

export interface Indeks {
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

export interface IndeksRequest {
  godina: number
  studProgramOznaka: string
  nacinFinansiranja: any
  aktivan: boolean
  vaziOd: any
  studentId: number
}

export interface Student {
  id: number
  ime: string
  prezime: string
  srednjeIme: string
  jmbg: string
  datumRodjenja: string
  mestoRodjenja: string
  mestoPrebivalista: string
  drzavaRodjenja: string
  drzavljanstvo: any
  nacionalnost: any
  pol: string
  adresa: string
  brojTelefonaMobilni: string
  brojTelefonaFiksni: string
  slika: string
  email: string
  brojLicneKarte: any
  licnuKartuIzdao: any
  mestoStanovanja: any
  adresaStanovanja: any
  prviUpis: any
  studentIndeksId: number
}

export interface StudentDTO {
  idStudentPodaci: number
  idIndeks: number
  ime: string
  prezime: string
  godinaUpisa: number
  studProgramOznaka: string
  broj: number
}

export interface StudentPageable{
  content: StudentDTO[]
  totalPages: number
  size: number
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
  ukupnoEspb: number
}

export interface PolozeniPredmeti {
  id: number
  ocena: number
  ispit: any
  nastavnik: Nastavnik
  predmet: Predmet
  priznat: boolean
}

export interface Nastavnik {
  id: number
  ime: string
  prezime: string
  srednjeIme: string
  email: string
  brojTelefona: string
  adresa?: string
  zvanja: any[]
  datumRodjenja?: string
  pol: string
  jmbg: string
}

export interface Predmet {
  id: number
  sifra: string
  naziv: string
  opis: any
  espb: number
  semestar: number
  godinaStudija: number
  studProgram: StudijskiProgram
  fondPredavanja: number
  fondVezbe: number
  izbornaGrupa?: string
}

export interface UpisGodine {
  id: number
  studentIndeks: StudentIndeks
  datumUpisa: string
  prenosEspb: number
  godinaKojaSeUpisuje: number
  predmeti: Predmet[]
  skolskaGodina: SkolskaGodina
  napomena: any
}

export interface ObnovaGodine {
  id: number
  studentIndeks: StudentIndeks
  godinaKojuObnavlja: number
  upisujePredmete: Predmet[]
  datumObnove: string
  napomena: any
  skolskaGodina: SkolskaGodina
}

export interface StudentIndeks {
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

export interface SkolskaGodina {
  id: number
  pocetna: number
  krajnja: number
  aktivna: boolean
  datumPocetka: any
}

export interface PrijaveIspita {
  id: number
  datumPrijave: string
  studentIndeks: StudentIndeks
  ispit: Ispit
}

export interface Ispit {
  id: number
  datumOdrzavanja: string
  vremeOdrzavanja: string
  mestoOdrzavanja: any
  drziPredmet: DrziPredmet
  ispitniRok: IspitniRok
  datumPredajeZapisnika: string
  datumVerifikacije: string
}
export interface SlusaPredmet {
  id: number
  studentIndeks: StudentIndeks
  drziPredmet: DrziPredmet
}

export interface DrziPredmet {
  id: number
  skolskaGodina: SkolskaGodina2
  nastavnik: Nastavnik
  predmet: Predmet
}

export interface SkolskaGodina2 {
  id: number
  pocetna: number
  krajnja: number
  aktivna: boolean
  datumPocetka: any
}

export interface IspitniRok {
  id: number
  naziv: string
  datumPocetka: any
  datumZavrsetka: any
  datumPocetkaPrijave: any
  datumZavrsetkaPrijave: any
  skolskaGodina: SkolskaGodina
}

export interface Uplata {
  id: number
  studentIndeks: StudentIndeks
  nacinUplate: string
  iznos: number
  kurs: number
  datum: string
}