/* Globala variabler
var titleElem;		// Referens till element för bildspelets titel
var imgElem;		// Referens till img-element för bildspelet
var captionElem;	// Referens till element för bildtext
var imgUrls;		// Array med url:er för valda bilder
var imgCaptions;	// Array med bildtexter till valda bilder
var imgIx;			// Index för aktuell bild
var timer;			// Referens till timern för bildspelet
*/
// Initiering av globala variabler och händelsehanterare
function init() {
    requestSongs();

} // End init
window.addEventListener("load", init);

// ---------------------------------------------------------------
// ----- Funktioner för bildspelet -----



// Gör ett Ajax-anrop för att läsa in begärd fil
function requestSongs() {
    let request = new XMLHttpRequest(); // Object för Ajax-anropet
    request.open("GET", "json/lab1genres.json", true);
    request.send(null); // Skicka begäran till servern
    request.onreadystatechange = function () {
        if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
            if (request.status == 200)
                getData(request.responseText); // status 200 (OK) --> filen fanns
            else
                alert("kunde inte hitta JSON filen");
    };
}
// Funktion för att tolka XML-koden och lägga in innehållet i variablerna för bilderna i bildspelet
function getData(JSONtext) {
    let song = JSON.parse(JSONtext).song; //hämtar sången från JSON-filen
    let display = document.getElementById("display"); //refererar till display elementet i HTML-koden
    let HTMLcode = ""; //ny variabel där all text ska sparas och sedan skrivas ut
    for (let i = 0; i < song.length; i++) {
        HTMLcode += "<h2>" + song[i].title + "</h2>";
        if (song[i].group) {
            HTMLcode += "<p> Group: " + song[i].group.groupname + "<br> formed: " + song[i].group.formed;
        }
        else {
            HTMLcode += "<p> Artist: " + song[i].artist.name + "<br> Birthdate: " + song[i].artist.birth + "<br> gender: " + song[i].artist.gender;
        }
        HTMLcode += " <br><a href='" + song[i].link.url + "' target='_blank'>Link to song</a> <br> album cover: <br> <img src='" + song[i].album.img + " 'alt='" + song[i].album.caption + "'> <br> release date: " + song[i].release_date + "<br> duration: " + song[i].duration + "</p> <hr>";
    }
    display.innerHTML = HTMLcode;
}




