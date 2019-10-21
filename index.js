const express 			= require('express')
const app 				= express()

// const puppeteer 		= require('puppeteer')

const fs 				= require('fs')


const Logo = require('./Logo')


console.log("des papiers ok")


logo_entete = new Logo(200,300, "Haute école des arts du Rhin", "HEAR")


logo_identite = new Logo(500,300, "Atelier Com Graph", "CG")



// console.log( logo_entete.generateLogo() )
// 
logo_entete.exportLogo()