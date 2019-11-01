var fs        	= require('fs');

class Acronym {

  constructor() { 
		this.first 				= fs.readFileSync('texts/first2.txt', 'utf8').split("\n");
		this.second   			= fs.readFileSync('texts/second2.txt', 'utf8').split("\n");
		this.third				= fs.readFileSync('texts/third2.txt', 'utf8').split("\n");
		this.fourth				= fs.readFileSync('texts/fourth2.txt', 'utf8').split("\n");

		this.a 						= '';
		this.b 						= '';
		this.c 						= '';
		this.d 						= '';

		this.stopwords 		= ['de', 'et', 'la', 'du', 'des'];
		this.avecpoints 	= false;
	}

	choicer(somelist) {
	  var i = Math.floor(Math.random()*somelist.length);
	  return somelist[i];
	}

	/* --------- Create acronym and name ---------- */

	getacronym(wordphrase) {
		var wplist = wordphrase.split(' ');

		var acro = '';

		for (var i = 0; i < wplist.length; i++) {		
			if (!this.stopwords.includes(wplist[i])) {	

				var s = wplist[i].charAt(0).toUpperCase();

				if (s == 'É') s = 'E'; 

				if (this.avecpoints) {
					acro += s + '.';
				} else {
					acro += s;
				}
			}
		}

		return acro;
	}

	getAcronymAndName() {
		var temp 						= this.choicer(this.first).split(',');
		var temp2 					= this.choicer(this.second).split(',');

		this.a 							= temp[0].trim(); 																							// FIRST WORD(S)

																																												// SECOND WORD(S) adj
		if ((temp[1].trim() === "m") && (temp[2].trim() === "s")) {												  // masc sing
			this.b = temp2[0].trim();

		} else if ((temp[1].trim() === "f") && (temp[2].trim() === "s")) {									// fem sing
			this.b = temp2[1].trim();

		} else if ((temp[1].trim() === "m") && (temp[2].trim() === "p")) {									// masc plur
			this.b = temp2[2].trim();

		} else {
			this.b = temp2[3].trim();																													 // fem plur
		}

		var temp3 				= this.choicer(this.third).split(',');
		var temp4 				= this.choicer(this.fourth).split(',');

		this.c 						= temp3[0].trim(); 																					      // THIRD WORD(S)

																																												// FOURTH WORD(S) adj
		if ((temp3[1].trim() === "m") && (temp3[2].trim() === "s")) {												// masc sing
			this.d = temp4[0].trim();

		} else if ((temp3[1].trim() === "f") && (temp3[2].trim() === "s")) {								// fem sing
			this.d = temp4[1].trim();

		} else if ((temp3[1].trim() === "m") && (temp3[2].trim() === "p")) {								// masc plur
			this.d = temp4[2].trim();

		} else {
			this.d = temp4[3].trim();																													// fem plur
		}

		this.aacro 			= this.getacronym(this.a);
		this.bacro 			= this.getacronym(this.b);
		this.cacro 			= this.getacronym(this.c);
		this.dacro 			= this.getacronym(this.d);

		var b = {
			acronym2: this.aacro + this.bacro, 
			acronym3: this.aacro + this.bacro + this.cacro, 
			acronym4: this.aacro + this.bacro + this.cacro + this.dacro, 
			two: this.a + " " + this.b, 
			three: this.a + " " + this.b + " " + this.c, 
			four: this.a + " " + this.b + " " + this.c + " " + this.d
		};

		var num = Math.floor(Math.random() * 4) + 1;
		var a = "";
		var n = "";

		if (num == 2) {																									// print 2, 3 or 4 words or word groups
			a = b.acronym2;
			n = b.two;
		} else if (num == 3) {
			a = b.acronym3;
			n = b.three;
		} else {
			a = b.acronym4;
			n = b.four;
		}
		return {a: a, n: n};

		//return b;
	}

	// getRandomAcronymAndName() {
	// 	var num = Math.floor(Math.random() * 4) + 1;
	// 	var a = "";
	// 	var n = "";

	// 	if (num == 2) {																									// print 2, 3 or 4 words or word groups
	// 		a = this.objJson.acronym2;
	// 		n = this.objJson.two;
	// 	} else if (num == 3) {
	// 		a = this.objJson.acronym3;
	// 		n = this.objJson.three;
	// 	} else {
	// 		a = this.objJson.acronym4;
	// 		n = this.objJson.four;
	// 	}
	// 	return {a: a, n: n};
	// }

	// getRandomName() {
	// 	var num = Math.floor(Math.random() * 4) + 1;
	// 	var t = "";

	// 	if (num == 2) {																									// print 2, 3 or 4 words or word groups
	// 		t = this.objJson.two;
	// 	} else if (num == 3) {
	// 		t = this.objJson.three;
	// 	} else {
	// 		tthis.objJson.four;
	// 	}
	// 	return t;
	// }


}

module.exports = Acronym;
