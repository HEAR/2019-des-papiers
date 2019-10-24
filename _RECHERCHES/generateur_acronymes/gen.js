var fs        	= require('fs');

var first 			= [];
var firstgen 		= [];
var second   		= [];
var third				= [];
var fourth			= [];

var a 					= '';
var b 					= '';
var c 					= '';
var d 					= '';

var stopwords 	= ['de', 'et', 'la', 'du', 'des'];
var timer     	= null;

var avecpoints 	= false;

/* -------- Load texts into arrays -------- */

one = function(err, d) { 
	first = d.split('\n'); 
};

two = function(err, d) {
	second = d.split('\n');
};

three = function(err, d) {
	third = d.split('\n');
};

four = function(err, d) {
	fourth = d.split('\n');
};

fs.readFile('texts/first2.txt', 'utf8', one);
fs.readFile('texts/second2.txt', 'utf8', two);
fs.readFile('texts/third2.txt', 'utf8', three);
fs.readFile('texts/fourth2.txt', 'utf8', four);


/* --------- Create acronym and name ---------- */

getacronym = function(wordphrase) {
	var wplist = wordphrase.split(' ');

	var acro = '';

	for (var i = 0; i < wplist.length; i++) {		
		if (!stopwords.includes(wplist[i])) {	

			var s = wplist[i].charAt(0).toUpperCase();

			if (s == 'É') s = 'E'; 

			if (avecpoints) {
				acro += s + '.';
			} else {
				acro += s;
			}
		}
	}

	return acro;
};

getAcronymAndName = function() {
	var temp 				= choice(first).split(',');
	var temp2 			= choice(second).split(',');

	a 							= temp[0].trim(); 																									// FIRST WORD(S)

																																											// SECOND WORD(S) adj
	if ((temp[1].trim() === "m") && (temp[2].trim() === "s")) {												  // masc sing
		b = temp2[0].trim();

	} else if ((temp[1].trim() === "f") && (temp[2].trim() === "s")) {									// fem sing
		b = temp2[1].trim();

	} else if ((temp[1].trim() === "m") && (temp[2].trim() === "p")) {									// masc plur
		b = temp2[2].trim();

	} else {
		b = temp2[3].trim();																													 		// fem plur
	}

	var temp3 				= choice(third).split(',');
	var temp4 				= choice(fourth).split(',');

	c 								= temp3[0].trim(); 																					  		// THIRD WORD(S)

																																											// FOURTH WORD(S) adj
	if ((temp3[1].trim() === "m") && (temp3[2].trim() === "s")) {												// masc sing
		d = temp4[0].trim();

	} else if ((temp3[1].trim() === "f") && (temp3[2].trim() === "s")) {								// fem sing
		d = temp4[1].trim();

	} else if ((temp3[1].trim() === "m") && (temp3[2].trim() === "p")) {								// masc plur
		d = temp4[2].trim();

	} else {
		d = temp4[3].trim();																															// fem plur
	}

	var aacro 			= getacronym(a);
	var bacro 			= getacronym(b);
	var cacro 			= getacronym(c);
	var dacro 			= getacronym(d);

	var num = Math.floor(Math.random() * 4) + 1;																				// random num

	var t = '';

	if (num == 2) {																											// print 2, 3 or 4 words or word groups
		t = aacro + bacro + '    ' + a + ' ' + b;
	} else if (num == 3) {
		t = aacro + bacro + cacro + '    ' + a + ' ' + b + ' ' + c;
	} else {
		t = aacro + bacro + cacro + dacro + '    ' + a + ' ' + b + ' ' + c + ' ' + d;
	}

	console.log(t);
};


timer = setInterval(getAcronymAndName, 1000);


/* --------- Helpers --------- */

choice = function(somelist) {
  var i = Math.floor(Math.random()*somelist.length);
  return somelist[i];
};

String.prototype.capitalize = function() {
   return this.charAt(0).toUpperCase() + this.slice(1);
};


// -----
// if then b = else b = 
// b = (temp[1].trim() == "m") ? temp2[0].trim() : temp2[1].trim(); 	// second word
