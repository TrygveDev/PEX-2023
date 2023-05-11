# PEX 2023 - [Live Demo](https://pex-2023-s472.vercel.app/) 

### Funksjonelle krav: 

Brukerregistrering: Det skal være mulig å registrere seg som en vanlig bruker i systemet. Registreringen skal inneholde nødvendig informasjon som e-postadresse og passord. 

Innlogging: Det skal være en innloggingsside der brukere kan logge inn med brukernavn og passord. Hvis brukeren er en admin-bruker, skal de ha tilgang til en administrativ side. 

Autorisasjon: Systemet skal ha en autorisasjonsfunksjon som bestemmer hvilke deler av systemet som er tilgjengelige for forskjellige typer brukere. Admin-brukere skal ha tilgang til alle funksjoner, mens vanlige brukere skal ha begrenset tilgang. 

Forslag til endringer: Vanlige brukere skal kunne foreslå endringer i databasen. I dette tilfelle komme med forslag til bedriften igjennom en form på nettsiden. 

Godkjenning av endringer: Administratoren skal ha tilgang til en side der de kan se alle foreslåtte endringer og godkjenne eller avvise dem. Når endringer er godkjent, skal de vises på hjemmesiden. 

Sikkerhet: Logg inn-metoden skal være så sikker som mulig. Passord skal ikke lagres i klartekst, og det skal være et krav om sterke passord. Systemet skal også beskyttes mot SQL-injeksjoner og andre sikkerhetstrusler. 

 

### Skisse av IT-tjenesten: 

IT-tjenesten består av en webapplikasjon med to typer brukere; en admin-bruker og en vanlig bruker. Administratoren har full tilgang til systemet og kan utføre alle funksjoner, mens vanlige brukere bare kan foreslå endringer. Brukere må logge inn for å få tilgang til systemet. Når en vanlig bruker foreslår en endring, må en administrator godkjenne endringen før den kan implementeres i systemet. 

  

**Next.js:** Et rammeverk for React-baserte applikasjoner som gir server-side rendering og mange verktøy for utvikling og optimalisering. 

**React:** Et JavaScript-bibliotek for å bygge brukergrensesnitt. 

**TypeScript:** Et typet supersett av JavaScript som gir bedre verktøystøtte og forbedret lesbarhet. 

**Mongoose:** Et objektdatabasemodelleringsbibliotek for MongoDB. 

**Axios:** Et HTTP-klientbibliotek som gjør det enkelt å sende HTTP-forespørsler fra klienten. 

**Tailwind CSS:** Et CSS-rammeverk som gjør det enklere å lage stiliserte og responsive nettsider og applikasjoner. 

**Material-UI:** Et bibliotek med React-komponenter som følger Material Design-retningslinjene. 

**NextAuth.js:** Et rammeverk for autentisering i Next.js-applikasjoner som støtter mange autentiseringsmetoder og plattformer. 

**bcrypt:** En krypteringsfunksjon som brukes til å kryptere og dekryptere passord. 

**eslint:** En verktøy for å finne og fikse syntaksfeil og stilproblemer i koden. 

**Font Awesome:** Et ikonsett som kan brukes i webapplikasjoner. 
