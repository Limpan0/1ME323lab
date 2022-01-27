// Globala variabler
var subjectMenuElem, courseMenuElem;	// Referenser till select-elementen för menyerna
var subjectInfoElem, courseListElem;	// Referenser till div-elementen där inläst data ska skrivas

// Initiering av globala variabler och händelsehanterare
function init() {
	subjectMenuElem = document.getElementById("subjectMenu");
	courseMenuElem = document.getElementById("courseMenu");
	subjectInfoElem = document.getElementById("subjectInfo");
	courseListElem = document.getElementById("courseList");
	subjectMenuElem.addEventListener("change",selectSubject);
	courseMenuElem.addEventListener("change",selectCourses);

	
} // End init
window.addEventListener("load",init); // init aktiveras då sidan är inladdad

// ----- Meny 1 -----

// Avläs menyn för val av ämne
function selectSubject() {
	// det ämne användaren väljer
	let subject = subjectMenuElem.selectedIndex;
	// en förfrågan om att hämta data från XML-filen
	let request = new XMLHttpRequest();
	request.open("GET","getSubInfo.php?file=https://medieteknik.lnu.se/1me323/subjects.xml&id=" + subject,true);
	request.send(null);
	
	request.onreadystatechange = function () { 
		// Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200){
				// tom textsträng
				let HTMLcode = "";
				// en förfrågan om att hämta data från XML-filen
				let XMLcode = request.responseXML;
				// hämtar namnet från XML-dokumentet
				let name = XMLcode.getElementsByTagName("name")[0];
				// hämtar infon från XML-dokumentet
				let info = XMLcode.getElementsByTagName("info")[0];
				console.log(name);
				HTMLcode = "<h3>" + name.textContent + "</h3>" + "<p>" + info.textContent + "</p>";
				subjectInfoElem.innerHTML = HTMLcode;
			} // status 200 (OK) --> filen fanns
			else subjectInfoElem.innerHTML = "Den begärda resursen finns inte.";
	};
	subjectMenuElem.selectedIndex = 0;
} // End selectSubject


// ----- Meny 2 -----

// Avläs menyn för val av ämne för kurser
function selectCourses() {
	// den kurs användaren väljer
	let courseElem = courseMenuElem.selectedIndex;
	// en förfrågan om att hämta data från XML-filen
	let request = new XMLHttpRequest();
	request.open("GET","xml/courselist" + courseElem + ".xml",true);
	request.send(null);
	request.onreadystatechange = function () { 
		// Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200){
				// svaret från XML-dokumentet
				let XMLcode = request.responseXML;
				// en tom textsträng
				let HTMLcode = "";
				// hämar ämnet från XML-dokumentet
				let subject = XMLcode.getElementsByTagName("subject")[0];
				courseListElem.innerHTML = "<h3>" + subject.textContent + "</h3>";
				// hämtar kursen från XML-dokumentet
				let course = XMLcode.getElementsByTagName("course");
				for(let i = 0; i < course.length; i++){
					// hämtar all information och attribut från XML-dokumentet
					let code = course[i].getElementsByTagName("code")[0];
					let title = course[i].getElementsByTagName("title")[0];
					let credits = course[i].getElementsByTagName("credits")[0];
					let moreinfo = course[i].getElementsByTagName("moreinfo")[0];
					let url = moreinfo.getAttribute("url");
					let contact = course[i].getElementsByTagName("contact")[0];
					// slut på att hämta information
					
					if(contact){
						// nameInfo blir namnet från contact
						let nameInfo = contact.getElementsByTagName("name")[0];
						HTMLcode += "<p>" + code.textContent + ", <a href=" + url + " >" + title.textContent + "</a>, " + credits.textContent + "hp, Kontaktperson: " + nameInfo.textContent + "</p>";
					}
					else HTMLcode += "<p>" + code.textContent + ", <a href=" + url + " >" + title.textContent + "</a> , " + credits.textContent + "hp </p>";
				}
				
				courseListElem.innerHTML += HTMLcode;
			} // status 200 (OK) --> filen fanns
			else courseListElem.innerHTML = "Den begärda resursen finns inte.";
	};
} // End selectCourses
