// Globala variabler
var myMap;				// Objekt för kartan
var myMarkers = [];		// Array med markeringar
var userMarker;			// Objekt för markering där användaren klickar
const markerData = [	// Data för markeringar som hör till knapparna
			{position:{lat:59.85876471543673,lng:17.637266905089383},title:"Uppsala"},
			{position:{lat:59.87560177319478, lng: 17.673236852152886},title:"Gränby"},
			{position:{lat:59.848349129188584, lng: 17.690087638113138},title:"IKEA Uppsala"},
			{position:{lat:59.858371333765916, lng: 17.63065245176048},title:"Domkyrkan"},
			{position:{lat:59.854287150544934, lng: 17.637605511051362},title:"Birger Jarl"}
		];
var mapLocationElem;			// Element för utskrift av koordinater
var myApiKey = "DIN-API-KEY";	// Ersätt DIN-API-KEY med din egen Flickr API key
var flickrImgElem;				// Referens till element där bilderna ska visas

// Initiering av programmet
function init() {
	initMap();
	mapLocationElem = document.getElementById("mapLocation");
	flickrImgElem = document.getElementById("flickrImg");
	let buttons = document.getElementById("addrBtns").getElementsByTagName("button");
	for (i = 0; i < markerData.length; i++){
		buttons[i].innerHTML = markerData[i].title;
		buttons[i].addEventListener("click", showAddrMarker);
		buttons[i].setAttribute("data-ix", i);
	}
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Skapa en karta och markeringar
function initMap() {
	myMap = new google.maps.Map(
			document.getElementById('map'),
			{
				center: {lat:59.85876471543673,lng:17.637266905089383},
				zoom: 12,
				styles: [
					{featureType:"poi", stylers:[{visibility:"off"}]},  // No points of interest.
					{featureType:"transit.station",stylers:[{visibility:"off"}]}  // No bus stations, etc.
				]
			}
		);
	for (let i = 0; i < markerData.length; i++) {
		let newMarker = new google.maps.Marker(markerData[i]); // Objekt för markering
		myMarkers.push(newMarker);
	}
	userMarker = null;
	google.maps.event.addListener(myMap,"click",newUserMarker);
} // End initMap

// Sätt markerns position till var användaren klickade och lägg in markern på kartan.
function newUserMarker(e) {
	hideMarkers();
	userMarker = new google.maps.Marker();
	userMarker.setPosition(e.latLng);
	userMarker.setMap(myMap);
	
	mapLocationElem.innerHTML = "latitude: " + e.latLng.lat() + " | longitude: " + e.latLng.lng(); //utskrift av koordinater 
} // End newUserMarker

// Visa marker för den adressknapp som användaren klickat på
function showAddrMarker() {
	hideMarkers();
	let ix = this.getAttribute("data-ix"); //hämtar indexet från knappen
	myMarkers[ix].setMap(myMap); 
} // End showAddrMarker

// Dölj alla markeringar
function hideMarkers() {
	for (let i = 0; i < myMarkers.length; i++) {
		myMarkers[i].setMap(null);
	}
	if (userMarker) userMarker.setMap(null);
} // End hideMarkers

// ----- Foton från Flickr ----- Extramerit

// Ajax-begäran av nya bilder
function requestImgsByLocation(lat,lon) {
	
} // End requestImgsByLocation

// Tolka svaret och visa upp bilderna.
function showMoreImgs(response) {
	
} // End showMoreImgs
