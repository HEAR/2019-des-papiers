const express = require('express')
const app = express()
const fs = require('fs')
const Logo2 = require('./Logo2')

console.log("des papiers Logo generator")


function coco() {
    logo_entete = new Logo2(340, 350, ["Atelier", "des artistes", "en exil"], "a-ae", "20191031-1245-90-test")
    logo_entete.exportLogo()
}

coco();


//var timer = setInterval(coco, 2000);