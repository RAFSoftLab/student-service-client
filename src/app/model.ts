export interface StudentProfile {
  indeks: Indeks
  polozeniPredmeti: PolozeniPredmeti[]
  upisiGodine: UpisiGodine[]
  obnoveGodine: ObnoveGodine[]
  uplate: any[]
  prijaveIspita: PrijaveIspita[]
  slusaPredmete: Predmet[]
  nepolozeniPredmeti: any[]
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
  slika: any
  email: string
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

export interface UpisiGodine {
  id: number
  studentIndeks: StudentIndeks
  datumUpisa: string
  prenosEspb: number
  godinaKojaSeUpisuje: number
  predmeti: Predmet[]
  skolskaGodina: SkolskaGodina
  napomena: any
}

export interface ObnoveGodine {
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