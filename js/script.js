var btn, 
resultsDiv, 
myApiKey = "RwnD9Q7n",
city,
infoArray = [];

function init() {
    document.getElementById("formButton").addEventListener("click", checkFilter);
	city = document.getElementById("city");
    resultsDiv = document.getElementById("searchResults");
	city.selectedindex = 0;
	getInitialData();
}
window.addEventListener("load", init);

function getInitialData() {
    let request = new XMLHttpRequest();
	request.responseType = "text";
	// Object för Ajax-anropet
	request.open("GET","https://smapi.lnu.se/api/?api_key=" + myApiKey + "&controller=establishment&method=getall&debug=true&types=food&per_page=10",true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4)
			if (request.status == 200) showResults(request.responseText);
			else resultsDiv.innerHTML = "Den begärda resursen finns inte.";
	};
}

function showResults(response) {
	response = JSON.parse(response);
	let payload = response.payload;
	for (let i = 0; i < payload.length; i++) {
		let num_reviews = response.payload[i].num_reviews;
		let rating = response.payload[i].rating;
		let address = response.payload[i].address;
		let text = response.payload[i].text;
		let name = response.payload[i].name;
		let city = response.payload[i].city;
		let id = response.payload[i].id;
		let description = response.payload[i].description;
		let img = "img/restaurant1.jpg";
		resultsDiv.innerHTML += 
		"<div class=entry><h3 class=name>" + name + "</h3><p class=description>" + description + "</p><img src=" + img + " class=img><p class=text>" + text + "</p><p class=address>" + address + " " + city + "</p><div class=ratingDiv><p class=rating>" + rating + "</p><p class=num_reviews>" + num_reviews + "</p></div>";
		//addLink();
	}
}

function addLink() {
	let entryDiv = document.getElementsByClassName("entry");
	for (let i = 0; i < entryDiv.length; i++) {
		entryDiv[i].addEventListener('click', function() {
			location.href = "roulette.html"
		}, false);
	}
}

function checkFilter() {
	let city = document.getElementById("city");
	let sub_type = document.getElementById("sub_type");
	console.log(city, sub_type);
}

function getFilteredData() {
	let request = new XMLHttpRequest();
	request.responseType = "text";
	// Object för Ajax-anropet
	request.open("GET","https://smapi.lnu.se/api/?api_key=" + myApiKey + "&controller=establishment&method=getall&debug=true&per_page=5&types=food",true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4)
			if (request.status == 200) showResults(request.responseText);
			else resultsDiv.innerHTML = "Den begärda resursen finns inte.";
	};
}