var Acronym    	= require('./Acronym');
var ac 					= new Acronym();

// https://stackoverflow.com/questions/2001920/calling-a-class-prototype-method-by-a-setinterval-event
//timer = setInterval(function(){ac.getAcronymAndName();}, 1000); // wow

var m = ac.getAcronymAndName();

var num = Math.floor(Math.random() * 4) + 1;
var t = "";

if (num == 2) {																									// print 2, 3 or 4 words or word groups
	t = m.acronym2 + "  " + m.two;
} else if (num == 3) {
	t = m.acronym3 + "  " + m.three;
} else {
	t = m.acronym4 + "  " + m.four;
}

console.log();
console.log(m);
console.log();
console.log(t);
console.log();