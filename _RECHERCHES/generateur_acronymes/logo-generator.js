const fs = require('fs')



console.log("Logo generator")


var svgW = 200
var svgH = 200

var svg = `<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"${svgW}px\" height=\"${svgH}px\" viewBox=\"0 0 ${svgW} ${svgH}\" xml:space=\"preserve\">\n\n`

svg += `<style type="text/css">
	.contour{
		fill:none;
		stroke:#000000;
		stroke-miterlimit:10;
	}
</style>\n`


var test = Math.floor( Math.random() * 3 )



if(test == 0 || test == 2){

	console.log( test == 0 ? "cercle" : "cercle + carré"  )

	svg += randomCircle()
}


if(test == 1 || test == 2){

	console.log( test == 1 ? "carré" : "" )

	svg += randomSquare()
}


svg += `</svg>`



// ICI on sauve le fichier
fs.writeFile("./public/svg/test.svg", svg, function(err) {
	if(err) {
		return console.log(err);
	}

	console.log("le logo a été généré")
}); 








function randomCircle(){

	var cR = 20 + Math.round( (svgH/2 - 20 - 10)*Math.random() )
	var cX = svgW/2
	var cY = svgH/2

	return `<circle class="contour" cx="${cX}" cy="${cY}" r="${cR}"/>\n`
}




function randomSquare(){

	var sW = 20 + Math.round( (svgH/2 - 20 - 10)*Math.random() )
	var sH = 20 + Math.round( (svgH/2 - 20 - 10)*Math.random() )
	var sX = (svgW - sW)/2
	var sY = (svgH - sH)/2

	return `<rect x="${sX}" y="${sY}" class="contour" width="${sW}" height="${sH}"/>`
}
