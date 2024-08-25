# HelpDesk - Aplikacija za pomoč uporabnikom

HelpDesk je aplikacija za pomoč uporabnikom, razvita z uporabo ogrodja Fastify in TypeScript. Podatki aplikacije se shranjujejo v PostgreSQL bazi podatkov.

## Kazalo vsebine
1. [Predpogoji](#predpogoji)
2. [Namestitev in nastavitev](#namestitev-in-nastavitev)
3. [Konfiguracija podatkovne baze](#konfiguracija-podatkovne-baze)
4. [Zagon aplikacije](#zagon-aplikacije)
5. [Testiranje API klicev](#testiranje-api-klicev)
6. [Polnjenje baze s testnimi podatki](#polnjenje-baze-s-testnimi-podatki)

## Predpogoji

Preden začnete, se prepričajte, da imate na svojem sistemu nameščeno naslednje:

- **Node.js** verzija `20.17.0` ali višja.
- **npm** (Node Package Manager), ki je priložen Node.js.
- **PostgreSQL** verzija `16.4`. Prenesete ga lahko [tukaj](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
- **npx**, ki ga lahko globalno namestite z npm.

## Namestitev in nastavitev

Sledite spodnjim korakom, da nastavite projekt na svojem lokalnem računalniku:

1. **Klonirajte repozitorij**
   ```bash
   git clone https://github.com/yourusername/HelpDesk.git
   cd HelpDesk
2. **Namestite Node.js odvisnosti**
   ```bash
   npm install
3. **Namestite npx globalno** Če npx še nimate nameščenega globalno, ga lahko namestite z:
   ```bash
   npm install -g npx
   
## Konfiguracija podatkovne baze

1. **Namestite PostgreSQL** Prenesite in namestite PostgreSQL iz uradne strani za prenose PostgreSQL. Prepričajte se, da je PostgreSQL vklopljen in deluje.
2. **Ustvarite novo PostgreSQL bazo** Po namestitvi PostgreSQL ustvarite novo bazo podatkov za projekt HelpDesk. To lahko storite z uporabo ukazne vrstice PostgreSQL ali orodja z grafičnim uporabniškim vmesnikom, kot je pgAdmin.
3. **Konfigurirajte okoljske spremenljivke** V .env datoteki, konfigurirajte `DATABASE_URL` z povezovalnim nizom do vaše PostgreSQL baze podatkov. Oblika je naslednja:
      ```bash
      DATABASE_URL=postgresql://uporabniško_ime:geslo@localhost:5432/helpdesk_db?schema=public
      ```
     Zamenjajte uporabniško_ime, geslo in helpdesk_db z vašimi dejanskimi podatki za PostgreSQL.

## Zagon aplikacije

1. **Uporabite migracije baze** Za nastavitev začetne sheme baze podatkov zaženite naslednji ukaz:
   ```bash
   npx prisma migrate dev --name init
   ```
   Ta ukaz bo uporabil migracije in ustvaril potrebne tabele v vaši PostgreSQL bazi.
2. **Zaženite razvojni strežnik** Aplikacijo lahko zdaj zaženete v razvojnem načinu z ukazom:
   ```bash
   npm run dev
   ```
   Aplikacija bo privzeto tekla na http://localhost:3000.

## Testiranje API klicev
   Za testiranje API klicev sem pripravil Postman zbirko, ki jo lahko uvozite v Postman.
   Ta zbirka vsebuje vse potrebne API klice za interakcijo z aplikacjo HelpDesk.
1. **Uvozite Postman zbirko** Odprite Postman, kliknite `Import` v zgornjem levem kotu in izberite datoteko, ki se nahaja v projektu v mapi postman.
   Zdaj lahko uporabljate Postman za pošiljanje zahtevkov

## Polnjenje baze s testnimi podatki
   Pripravil sem endpoint, ki omogoča enostavno polnjenje baze s testnimi podatki.
   1. Pošljite `POST` zahtevo na endpoint `/fill-test-data` z uporabo postmana
   2. Baza bo napolnjena s preddefiniranimi testnimi podatki

