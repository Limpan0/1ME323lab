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
    
    let images = new ImageViewer("imgViewer");
    document.querySelector("#categoryMenu").addEventListener("change",
        function() {
            images.requestImages("xml/images" + this.selectedIndex + ".xml");
            this.selectedIndex = 0;
        }
    );
    document.querySelector("#prevBtn").addEventListener("click", function() {
        images.prevImg();
    });
    document.querySelector("#nextBtn").addEventListener("click", function() {
        images.nextImg();
    });

    // ----- Extramerit -----
    document.querySelector("#autoBtn").addEventListener("click",
    		function(e) {
    			images.autoImage(e,3000);
    		}
    	);
    

    // ----- Guldstjärna -----
    //		Här ska du lägga kod, om du gör guldstjärneuppgiften

} // End init
window.addEventListener("load", init);

// ---------------------------------------------------------------
// ----- Funktioner för bildspelet -----

class ImageViewer {
    //klassens constructor
    constructor(id) {
        this.list = {
            imgUrls: "img/blank.png",
            imgCaptions: ""
        };
        this.imgIx = 0;
        this.timer = null;
        this.titleElem = document.querySelector("#" + id + " h3");
        this.imgElem = document.querySelector("#" + id + " img");
        this.captionElems = document.querySelector("#" + id + " p");
    }
    // Gör ett Ajax-anrop för att läsa in begärd fil
    requestImages(file) {
        let self = this; //sparar objektet som en ny variabel
        let request = new XMLHttpRequest(); // Object för Ajax-anropet
        request.open("GET", file, true);
        request.send(null); // Skicka begäran till servern
        request.onreadystatechange = function() {
            if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
                if (request.status == 200)
                    self.getImages(request.responseXML); // status 200 (OK) --> filen fanns
                else
                    document.getElementById("result").innerHTML = "Den begärda resursen fanns inte.";
        };
    }
    // Funktion för att tolka XML-koden och lägga in innehållet i variablerna för bilderna i bildspelet
    getImages(XMLcode) {
        this.titleElem.innerHTML = XMLcode.getElementsByTagName("category")[0].firstChild.data;
        let urlElems = XMLcode.getElementsByTagName("url"); // Alla url-element
        let captionElems = XMLcode.getElementsByTagName("caption"); // Alla caption-element
        this.list = []; // Nya tomma arrayer för bilder
        for (let i = 0; i < urlElems.length; i++) {
            this.list.push({
                imgUrls: urlElems[i].firstChild.data,
                imgCaptions: captionElems[i].firstChild.data
            });
        }
        this.imgIx = 0;
        this.showImg(); // Visa första bilden
    }
    // Visa bilden med index imgIx
    showImg() {

        this.imgElem.src = this.list[this.imgIx].imgUrls;
        this.captionElems.innerHTML = (this.imgIx + 1) + ". " + this.list[this.imgIx].imgCaptions;
    }
    // Visa föregående bild
    prevImg() {
        if (this.imgIx > 0)
            this.imgIx--;
        else
            this.imgIx = this.list.length - 1; // Gå runt till sista bilden
        this.showImg();
    }
    // Visa nästa bild
    nextImg() {
        if (this.imgIx < this.list.length - 1)
            this.imgIx++;
        else
            this.imgIx = 0; // Gå runt till första bilden
        this.showImg();
    }

    //funktion som byter bilder automatiskt
	autoImage(e,interval) {
		let self = this; //sparar objektet som en ny variabel
		if (this.timer == null) { // Startar timern
			this.timer = setInterval(function(){self.nextImg()},interval);
			if (e) e.currentTarget.style.backgroundColor = "green";
		}
		else { // Stopp
			clearInterval(this.timer);
			this.timer = null;
			if (e) e.currentTarget.style.backgroundColor = "white";
		}
	}
}






// ----- Extramerit -----
/* Ta bort kommentaren kring koden, för att testa funktionaliteten för extrameriten
// Starta/stoppa automatisk bildvisning
function autoImage(e,interval) {
	if (timer == null) { // Start
		timer = setInterval(nextImage,interval);
		if (e) e.currentTarget.style.backgroundColor = "green";
	}
	else { // Stopp
		clearInterval(timer);
		timer = null;
		if (e) e.currentTarget.style.backgroundColor = "white";
	}
} // End autoImage
*/