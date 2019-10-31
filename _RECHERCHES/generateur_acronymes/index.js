const express 			= require('express')
const app 					= express()
const fs 						= require('fs')
const Logo 					= require('./Logo')

var logo_entete 		= new Logo(198, 113, "Atelier des artistes en exil", "a-ae")
//logo_identite 			= new Logo(500,300, "Atelier Com Graph", "CG")

logo_entete.exportLogo()

console.log("des papiers ok")


function coco() {
	logo_entete.exportLogo()
}


var timer = setInterval(coco, 2000);


// function setup() {

// }

// function draw() {

// }



// function mousePressed() {
// 	logo_entete.exportLogo();
// }



// const puppeteer 		= require('puppeteer')
// console.log( logo_entete.generateLogo() )

