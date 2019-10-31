var fs        	= require('fs');

class Acronym {

  constructor() { 
		this.first 		= fs.readFileSync('texts/first2.txt', 'utf8').split("\n");
		this.second   	= fs.readFileSync('texts/second2.txt', 'utf8').split("\n");
		this.third		= fs.readFileSync('texts/third2.txt', 'utf8').split("\n");
		this.fourth		= fs.readFileSync('texts/fourth2.txt', 'utf8').split("\n");

		this.a 			= '';
		this.b 			= '';
		this.c 			= '';
		this.d 			= '';

		this.stopwords 	= ['de', 'et', 'la', 'du', 'des'];
		this.avecpoints = false;
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
		var temp 	= this.choicer(this.first).split(',');
		var temp2 	= this.choicer(this.second).split(',');

		this.a 		= temp[0].trim(); // FIRST WORD(S)

		// SECOND WORD(S) adj
		if ((temp[1].trim() === "m") && (temp[2].trim() === "s")) { // masc sing
			this.b = temp2[0].trim();

		} else if ((temp[1].trim() === "f") && (temp[2].trim() === "s")) { // fem sing
			this.b = temp2[1].trim();

		} else if ((temp[1].trim() === "m") && (temp[2].trim() === "p")) { // masc plur
			this.b = temp2[2].trim();

		} else {
			this.b = temp2[3].trim(); // fem plur
		}

		var temp3 	= this.choicer(this.third).split(',');
		var temp4 	= this.choicer(this.fourth).split(',');

		this.c 		= temp3[0].trim(); // THIRD WORD(S)

		// FOURTH WORD(S) adj
		if ((temp3[1].trim() === "m") && (temp3[2].trim() === "s")) { // masc sing
			this.d = temp4[0].trim();

		} else if ((temp3[1].trim() === "f") && (temp3[2].trim() === "s")) { // fem sing
			this.d = temp4[1].trim();

		} else if ((temp3[1].trim() === "m") && (temp3[2].trim() === "p")) { // masc plur
			this.d = temp4[2].trim();

		} else {
			this.d = temp4[3].trim(); // fem plur
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

		return b;
	}
}

module.exports = Acronym;
