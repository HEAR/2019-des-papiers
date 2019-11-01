console.log("Des papiers")
console.log("v0.16")


/**
 * ------------------         LIB          ------------------
 * ne pas oublier de faire `npm install` avant le premier lancement
 */
const express 			= require('express')
const app 				= express()

const fs 				= require('fs')
const mkdirp 			= require('mkdirp')
const path 				= require('path')

const puppeteer 		= require('puppeteer')
const merge 			= require('easy-pdf-merge')
// !!! Pour utiliser easy-pdf-merge il faut installer un jdk java :
// https://www.oracle.com/technetwork/java/javase/downloads/jdk13-downloads-5672538.html
 
const bodyParser 		= require('body-parser')
const multer  			= require('multer')



// SELF CREATED
const Logo 				= require('./Logo')



/**
 * ------------------         APP          ------------------
 */
const port 				= 3000



/**
 * ------------------ GESTION DES DOSSIERS ------------------
 */
const folderOut 		= '/public/photos/'
const pdfTempOut		= './tmp/'
const pdfOut			= './assets/pdf/'
const dataOut			= '/assets/data/'

// on crée le dossier de sortie des images et des pdf
mkdirp(folderOut, function(err){})
mkdirp(pdfTempOut, function(err){})
mkdirp(pdfOut, function(err){})
mkdirp(dataOut, function(err){})
/**
 * ----------------------------------------------------------
 */




// logo_entete = new Logo(200,300, "Haute école des arts du Rhin", "HEAR")
// logo_identite = new Logo(500,300, "Atelier Com Graph", "CG")
// // console.log( logo_entete.generateLogo() )
// logo_entete.exportLogo()



/**
 * ON UTILISE PAR DEFAUT LE REPERTOIRE /public POUR LE SERVEUR
 */
app.use( express.static('public') )
app.use( bodyParser.urlencoded({ extended: false }) )
// app.use( multer({ dest: '/tmp/'}))
app.use( multer({dest:'/tmp/'}).single('file') );


app.get('/index.html', function (req, res, next) {
	res.sendFile( __dirname + "/public/" + "index.html" );
})


/**
 * SAUVEGARDE DES INFORMATIONS
 */
// https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm
app.post('/save', function (req, res) {
	// res.send('Hello World!')
	// console.log(req)
	
	console.log("req.file.name",req.file.name)
	console.log("req.file.path",req.file.path)
	console.log("req.file.type",req.file.type)

	// https://stackoverflow.com/questions/18524125/req-query-and-req-param-in-expressjs
	console.log(req.body.id)



	let uniqueID = new Date().toISOString().slice(0, 19).replace('T', ' ').replaceAll(':', '-').replace(' ', '_') + "_" + req.body.id
	// let file = __dirname + "/public/photos/" + req.file.name 
	var file = `${__dirname}${folderOut}${uniqueID}.jpg`

	fs.readFile( req.file.path, function (err, data) {
		fs.writeFile(file, data, function (err) {
			if( err ) {
				console.log( err );
			} else {
			
				//  https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
				response = {
					id: uniqueID,
					nom:req.body.nom,
					prenom:req.body.prenom,
					filename: uniqueID + ".jpg"
					// filename:req.file.name!==undefined?req.file.name:false
				}

				console.log(response)

				// on sauvegarde le fichier json
				try {
					fs.writeFileSync(path.join(__dirname, 'assets', 'data' , `${response.id}.json`), JSON.stringify(response))
				} catch (e) {
					console.log(e)
				}

			}
			res.end( JSON.stringify( response ) )
		})
	})

	// res.end( JSON.stringify( "ok "+req.body.id ) );
	
	// generatePDF( uniqueID );

	// https://stackoverflow.com/questions/19035373/how-do-i-redirect-in-expressjs-while-passing-some-context
	// res.redirect('/index.html')

	res.redirect('/generate_pdf')
})


function generatePDF(uniqueID){
	console.log(`generate PDF -> ${pdfOut}${uniqueID}.pdf`);


	// https://stackoverflow.com/questions/48510210/puppeteer-generate-pdf-from-multiple-htmls
	var rectoURL = `http://localhost:${port}/layout/recto.html`;
	var versoURL = `http://localhost:${port}/layout/verso.html`;

	var pdfUrls = [rectoURL,versoURL];


	(async () => {
		const browser 	= await puppeteer.launch()
		const page 		= await browser.newPage()

		var pdfFiles 	= []

		for(var i=0; i<pdfUrls.length; i++){
			await page.goto(pdfUrls[i], {waitUntil: 'networkidle2'});
			var pdfFileName = `${pdfTempOut}sample${i+1}.pdf`;
			pdfFiles.push(pdfFileName);
			await page.pdf({path: pdfFileName, format: 'A4', printBackground: true, preferCSSPageSize:false});
		}

		await browser.close();

		await mergeMultiplePDF(pdfFiles);
	})();

	const mergeMultiplePDF = (pdfFiles) => {
		return new Promise((resolve, reject) => {
			merge(pdfFiles,`${pdfOut}${uniqueID}.pdf`,function(err){

				if(err){
					console.log(err);
					reject(err);
				}

				console.log('Success');
				resolve();
			});
		});
	};
}


/**
 * GENERATE PDF WHEN get ADDRESS generate_pdf
 */
app.get('/generate_pdf', function(req, res){

	generatePDF("yes2");

	res.redirect('/index.html');
})

app.listen(port, function(){

	console.log(`Server "des papiers" running on port ${port}!\nhttp://localhost:${port}`)

})

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};