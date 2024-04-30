src="https://code.jquery.com/jquery-3.4.1.min.js"
src="Script.js"
//Funksjon for å kjøpe billett
function kjopBillett() {
    //Henter verdiene fra input i HTML
    const Film = document.getElementById("film").value;
    const AntallInn = document.getElementById("Antall").value;
    const Fornavn = document.getElementById("Fornavn").value;
    const Etternavn = document.getElementById("Etternavn").value;
    const TlfInn = document.getElementById("Telefonnr").value;
    const Epost = document.getElementById("Epost").value;
    const Antall = Number(AntallInn);
    const Telefonnummer = Number(TlfInn);



    //Setter feilmeldinger til null
    document.getElementById("ikkeValgtFilm").innerHTML = "";
    document.getElementById("ikkeAntall").innerHTML = "";
    document.getElementById("ikkeFornavn").innerHTML = "";
    document.getElementById("ikkeEtternavn").innerHTML = "";
    document.getElementById("ikkeTlf").innerHTML = "";
    document.getElementById("ikkeEpost").innerHTML = "";

    //Sjekker om verdiene fra HTML er av typen vi ønsker
    let erGyldig = true;

    if (Film === "Ingen") {
        document.getElementById("ikkeValgtFilm").innerHTML = "Velg en film.".fontcolor("red");
        erGyldig = false;
    }
    if (!Film){
        document.getElementById("ikkeValgtFilm").innerHTML = "Velg en film.".fontcolor("red");
        erGyldig = false;
    }
    if (isNaN(Antall)) {
        document.getElementById("ikkeAntall").innerHTML = "Skriv inn et tall over 0.".fontcolor("red");
        erGyldig = false;
    }
    if (Antall === 0) {
        document.getElementById("ikkeAntall").innerHTML = "Skriv inn et tall over 0.".fontcolor("red");
        erGyldig = false;
    }
    if (!Fornavn) {
        document.getElementById("ikkeFornavn").innerHTML = "Skriv inn et fornavn.".fontcolor("red");
        erGyldig = false;
    }
    if (!Etternavn) {
        document.getElementById("ikkeEtternavn").innerHTML = "Skriv inn etternavn.".fontcolor("red");
        erGyldig = false;
    }
    if (isNaN(Telefonnummer)) {
        document.getElementById("ikkeTlf").innerHTML = "Skriv inn et gyldig telefonnummer".fontcolor("red");
        erGyldig = false;
    }
    if (Telefonnummer === 0) {
        document.getElementById("ikkeTlf").innerHTML = "Skriv inn et gyldig telefonnummer".fontcolor("red");
        erGyldig = false;
    }
    if (!Epost.includes("@")) {
        document.getElementById("ikkeEpost").innerHTML = "E-post adresse må inneholde @.".fontcolor("red");
        erGyldig = false;
    }
    if (!Epost){
        document.getElementById("ikkeEpost").innerHTML = "Skriv inn E-post.".fontcolor("red");
        erGyldig = false;
    }
    if (!erGyldig) {
        return;
    }
    //Legger inn en bestilling som billett, som deretter skal pushes inn i Billetter-arrayet.
    const enBillett = {
        fornavn : document.getElementById("Fornavn").value,
        etternavn : document.getElementById("Etternavn").value,
        film : document.getElementById("film").value,
        antall : parseInt(document.getElementById("Antall").value),
        telefon : parseInt(document.getElementById("Telefonnr").value),
        epost : document.getElementById("Epost").value,
    }
    console.log(enBillett);
    $.post("/lagre", enBillett, function () {
        console.log(enBillett);
        hentAlle();
    });


    //AltUt();

    //Setter verdien i input til defult.
    document.getElementById("film").value = "Ingen";
    document.getElementById("Antall").value = "";
    document.getElementById("Fornavn").value = "";
    document.getElementById("Etternavn").value = "";
    document.getElementById("Telefonnr").value = "";
    document.getElementById("Epost").value = "";
}
//Funksjon for utskrift
function hentAlle(){
    $.get("/hent", function (data) {
        AltUt(data);
        console.log(data);
    });
}
function AltUt(data){
    let ut = "<table><tr><td>Film:</td><td>Antall:</td><td>Fornavn:</td><td>Etternavn:</td>"+
        "<td>Telefonnummer:</td><td>E-post:</td></tr>"
    if(!data){
        ut = "Ingen billetter."
    }
    else{
        for(const billett of data){
            ut += "<tr><td>"+billett.film+"</td><td>"+billett.antall+"</td><td>"+billett.fornavn+"</td><td>"+billett.etternavn+"</td><td>"+billett.telefon+"</td><td>"+billett.epost+"</td></tr>";
        }
    }


   document.getElementById("AlleBilletter").innerHTML = ut;
}
//Funksjon for å tømme arrayet, slette utskriften, fjerne feilmeldinger og sette input til defult.
function slettAlle(){
    $.ajax({
        url : "/slett",
        type : "DELETE",
        success: function(){
            document.getElementById("AlleBilletter").innerHTML = "";
        }
    })
}