# student-service-client

## Ciljevi aplikacije

### Aplikacija treba da:
  1. Omogući radnicima studentske službe efikasno vođenje i upravljanje podacima o studentima, nastavnicima, predmetima, studentskim programima, ispitima, ispitnim rokovima i rezultatima.
  2. Omogući povezivanje predmeta s nastavnicima (profesorima i asistentima).
  3. Pruži mogućnost generisanja i pregleda izveštaja (statistika, spiskovi, proseci).
  4. Obezbedi višeslojne korisničke uloge sa različitim pravima pristupa.
  5. Osigura bezbednost i integritet podataka kroz logovanje svih aktivnosti korisnika.
  6. Migrira podatke u bazi prilikom prelaska u novu skolsku godinu
## Funkcionalnosti

### Studenti:
- Unos, ažuriranje i pregled podataka o studentima, uključujući:
  - Lične podatke (ime, prezime, JMBG, adresa, itd.).
  - Pracenje toka studija(upisao prvu godinu, obnovio prvu, upisao drugu..)
  - Pracenje uplata skolarine
  - Studijske programe na koje je student upisan.
  - Broj indeksa i istoriju indeksa.
  - Položene ispite, rezultate i proseke.
  - Priznate predmete sa drugih ustanova.
  - Pretraga studenata, po imenu i broju indeksa sa prikazom svih podataka
- Brisanje neaktivnih ili pogrešno unetih studenata uz evidentiranje ko je i kada izvršio brisanje.
- Generisanje izveštaja:
  - Spisak studenata po programu, godini, ili mestu prebivališta.
  - Prosečan uspeh po predmetu i ukupno.
### Nastavnici:
- Unos, ažuriranje i pregled podataka o nastavnicima, uključujući:
  - Lične podatke (ime, prezime, zvanje, email, itd.).
  - Zvanja i oblasti rada kroz vreme.
- Povezivanje nastavnika s predmetima (jedan predmet može imati profesora i asistenta).
- Evidencija predmeta koje nastavnik predaje po školskim godinama.
- Izveštaji:
  - Spisak nastavnika po zvanju, predmetima, ili programima.
  - Pregled angažovanja nastavnika u školskim godinama.
### Predmeti i studijski programi:
- Evidencija predmeta:
  - Naziv, šifra, ESPB, semestar, fond časova.
  - Opis predispitnih obaveza i maksimalni broj bodova.
  - Povezivanje predmeta s nastavnicima (profesor i asistent).
  - Poveivanje studenata i predmeta(koji student slusa koji predmet)
- Evidencija studijskih programa:
  - Oznaka, naziv, trajanje u semestrima, vrsta studija (OAS, MAS, itd.).
  - Predmeti po programu i semestru.
- Izveštaji:
  - Pregled predmeta po studijskom programu.
  - Prosečna ocena na predmetima po periodu.
  - Predmeti s najvećim brojem nepoloženih studenata.
### Ispiti i ispitni rokovi:
- Unos i ažuriranje ispitnih rokova:
  - Naziv, datum početka i kraja.
  - Spisak predmeta i datuma ispita u roku.
- Upravljanje ispitima:
  - Zakazivanje ispita (datum, vreme, nastavnik, sala).
  - Evidencija prijavljenih studenata za ispit.
  - Unos bodova s predispitnih obaveza i rezultata ispita.
  - Zaključivanje rezultata ispita.
- Izveštaji:
  - Spisak prijavljenih studenata po predmetu i roku.
  - Prosečna ocena po ispitima i predmetima.
  - Sortirani rezultati studenata po programu, godini upisa i broju indeksa.
 
## Preduslovi za instalaciju
Pre nego što počnete sa instalacijom, uverite se da imate sledeće:
1.	Node.js i npm (Node Package Manager):
-	Preuzmite i instalirajte Node.js.
-	Proverite verzije komandom:
    ```bash
    node -v
    npm -v
    ```
2.	Angular CLI:
-	Instalirajte Angular CLI globalno:
    ```bash
    npm install -g @angular/cli
    ```
-	Proverite instalaciju:
    ```bash
    ng version
    ```

## Instalacija projekta
1. Kloniranje repozitorijuma
  Klonirajte repozitorijum projekta sa GitHub upotrebom komande:
    ```bash
    git clone https://github.com/RAFSoftLab/student-service-client.git
    cd student-service-client
    ```


2. Instalacija node_modules
  Pokrenite komandu za instalaciju node_modules  - svih potrebnih zavisnosti navedenih u fajlu package.json.
    ```bash
    npm install
    ```

3. Konfiguracija okruženja (opciono)
-	Otvorite fajl za konfiguraciju okruženja (src/environments/environment.ts).
-	Ako je potrebno, dodajte URL ka Vašem backend serveru.

4. Pokretanje aplikacije u razvojnom okruženju
  Pokrenite razvojni server koristeći Angular CLI, pozivanjem komange:
    ```bash
    ng serve
    ```
  -	Aplikacija će biti dostupna na: http://localhost:4200/.

5. Kreiranje produkcijskog build-a (opciono)
  Za generisanje build-a za produkciju koristite:
    ```bash
    ng build –prod
    ```
-	Build će biti dostupan u folderu dist/student-service-client.

## Dodatne informacije
Debugging
-	Ako se pojave greške tokom instalacije zavisnosti, pokušajte da obrišete folder node_modules i ponovo instalirate zavisnosti:
    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```

Korisni alati
-	Postman za testiranje API-ja koji koristi aplikacija.
-	Angular DevTools za debagovanje Angular aplikacija u pretraživaču.

