const fs	= require('fs')
const Logo	= require('./Logo')

console.log("des papiers Logo generator")

var logo_entete = new Logo(198, 113, "Atelier des artistes en exil", "a-ae", "20191031-1245-90")
logo_entete.exportLogo()


function coco() {
	logo_entete.exportLogo()
}


//var timer = setInterval(coco, 2000);
