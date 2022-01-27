// Globala variabler
var linkListElem;	// Referens till div-elementet för länkarna
var courseListElem;	// Referens till div-element där valda kurser ska läggas.

// Initiering av globala variabler och händelsehanterare.
function init() {
	linkListElem = document.getElementById("linkList");
	document.getElementById("linkBtn").addEventListener("click",listLinks);
	
	// Array med referenser till alla li-element i den andra section
	let courseElems = document.querySelectorAll("main section:nth-of-type(2) div:first-of-type li");
	for (let i = 0; i < courseElems.length; i++) {
		courseElems[i].addEventListener("click",addCourse);
		courseElems[i].style.cursor = "pointer";
	}
	courseListElem = document.getElementById("courseList");
	
	document.getElementById("teacherBtn").addEventListener("click",addTeachers); // Används i extramerit
} // End init
window.addEventListener("load",init); // init aktiveras då sidan är inladdad
// ---------------------------------------------------------------
// Kopiera alla länkar ur huvudtexten och lägg upp dem i en lista.
function listLinks() {

	// links blir en array med alla länkar från P elementet
	let links = document.querySelectorAll("main section:nth-of-type(1) div:first-of-type a")
	
	for (let i = 0; i < links.length; i++){
		// cloneLink klonar alla länkar från P elementet
		let cloneLink = links[i].cloneNode(true);
		// newElem skapar ett nytt P element
		let newElem = document.createElement("p");
		cloneLink.setAttribute("target","_blank");
		newElem.appendChild(cloneLink);
		linkListElem.appendChild(newElem);
	}
} // End listLinks
// ---------------------------------------------------------------
// Den kurs användaren klickat på, läggs in överst i kurslistan.
function addCourse() {
	// course blir kursen man klickar på
	let course = this.textContent;
	// newElem skapar ett nytt P element
	let newElem = document.createElement("p");
	// newCourse skapar en text sträng med kursen
	let newCourse = document.createTextNode(course);
	// courseExists kollar ifall kursen redan finns i den nya listan
	let courseExists = false;
	newElem.appendChild(newCourse);
	newElem.addEventListener("click", removeCourse);
	newElem.style.cursor = "pointer";
	if(courseListElem.children.length == 0){
		courseListElem.appendChild(newElem);
	}
	else{
		for(let i = 0; i < courseListElem.children.length; i++){
			if(courseListElem.children[i].textContent == course){
				courseExists = true;
			}	
		}
			if(courseExists == false){
				// firstInList refererar till P elementen där kurserna ska stå
				let firstInList = document.querySelector("main section:nth-of-type(2) div:nth-of-type(2) div:first-of-type p");
				courseListElem.insertBefore(newElem, firstInList);
				}
		}
} // End addCourse

// Den kurs användaren klickat på i kurslistan, tas bort.
function removeCourse() {
	this.parentNode.removeChild(this);
} // End removeCourse
// ---------------------------------------------------------------
// ----- Extramerit -----
// Funktion som lägger till kursansvariglärare i kurslistan
function addTeachers() {
	const teachers = ["Romain Herault","Rune Körnefors","Jorge Zapico"];
	const teacherLinks = ["https://lnu.se/personal/romain.herault","http://lnu.se/personal/rune.kornefors","https://lnu.se/personal/jorgeluis.zapico/"];
	
} // End addTeachers
