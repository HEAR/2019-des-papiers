console.log("Des papiers")
console.log("v2.01")

// https://mensuel.framapad.org/p/WZqM6h9dVy?lang=fr
// https://drive.google.com/drive/folders/1V_fKm-64fD6_bB5ikn67HVm4rFAx79fu

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

const shell = require('shelljs')


// let fixRotation 		= require('fix-image-rotation')
// const jo 				= require('jpeg-autorotate')
const options 			= {quality: 85}


// SELF CREATED
var Logo 				= require('./Logo')
// const LogoOld 				= require('./LogoOld')



/**
 * ------------------         APP          ------------------
 */
const port 				= 3000



/**
 * ------------------ GESTION DES DOSSIERS ------------------
 */
const folderOut 		= '/public/photos/'
const dataOut			= '/public/data/'
const pdfTempOut		= './tmp/'
const pdfOut			= './assets/pdf/'

// on crée le dossier de sortie des images et des pdf
mkdirp(folderOut, function(err){})
mkdirp(pdfTempOut, function(err){})
mkdirp(pdfOut, function(err){})
mkdirp(dataOut, function(err){})
/**
 * ----------------------------------------------------------
 */


var lastID = 0;
var uniqueID;



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



	uniqueID = new Date().toISOString().slice(0, 19).replace('T', ' ').replaceAll(':', '-').replace(' ', '_') + "_" + req.body.id


	// lastID = req.body.id

	// let file = __dirname + "/public/photos/" + req.file.name 
	var file = `${__dirname}${folderOut}${uniqueID}.jpg`

	// on charge les données de la photo
	fs.readFile( req.file.path, function (err, data) {

		// let ArrayOfFilesToBeRotated = [File1, File2]
		// let myRotationFunction = async function (ArrayOfFilesToBeRotated) {
		// 	let blobOfArray = await fixRotation.fixRotation(ArrayOfFilesToBeRotated)
		// 	return blobOfArray
		// }

		// on écrit les données de la photo
		fs.writeFile(file, data, function (err) {
			if( err ) {
				console.log( err );
			} else {
			
				//  https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
				response = {
					id: uniqueID,
					nom:req.body.nom,
					prenom:req.body.prenom,
					langue: req.body.langue,
					filename: uniqueID + ".jpg"
					// filename:req.file.name!==undefined?req.file.name:false
				}

				// jo.rotate( `${__dirname}${folderOut}${uniqueID}.jpg`, options )
				// .catch((error) => {
				// 	if (error.code === jo.errors.correct_orientation) {
				// 		console.log('The orientation of this image is already correct!')
				// 	}
				// })

				console.log(response)

				// on sauvegarde le fichier json
				try {
					fs.writeFileSync(path.join(__dirname, 'public', 'data' , `${response.id}.json`), JSON.stringify(response))
				} catch (e) {
					console.log(e)
				}

				
				let logo = new Logo(351, 340, "", "", uniqueID)
				logo.exportLogo()

				delete require.cache[require.resolve('./Logo')]
				Logo = require('./Logo')

			}
			res.end( JSON.stringify( response ) )
		})
	})

	// res.end( JSON.stringify( "ok "+req.body.id ) );
	
	// generatePDF( uniqueID );

	// https://stackoverflow.com/questions/19035373/how-do-i-redirect-in-expressjs-while-passing-some-context
	// res.redirect('/index.html')

	res.redirect(`/generate_pdf/${uniqueID}/${req.body.id}`)
})

/**
 * GENERATE PDF WHEN get ADDRESS generate_pdf
 */
app.get('/generate_pdf/:uniqueID/:smallID', function(req, res){

	console.log("----------> ",req.params)

	generatePDF( req.params.uniqueID, req.params.smallID );

	res.redirect('/index.html');
})

/**
 * SEND JSON ID
 */
app.get('/get_id', function(req, res, next){
	// https://stackoverflow.com/questions/11181546/how-to-enable-cross-origin-resource-sharing-cors-in-the-express-js-framework-o
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();

	let response = {
		// id : Math.floor( Math.random() * 100 )
		id : lastID,
		logo: `http://169.254.155.152:3000/svg/${uniqueID}.svg`
	}

	console.log(`================> SHOW lastID : ${lastID}, SVG : ${response.logo}`)

	res.send(JSON.stringify( response ));
})

/**
 * START SERVER
 */
app.listen(port, function(){

	console.log(`Server "des papiers" running on port ${port}!\n> http://localhost:${port} <\n`)

})


/**
 * [generatePDF description]
 * @param  {[type]} uniqueID [description]
 * @return {[type]}          [description]
 */
function generatePDF( uniqueID, smallID ){
	console.log(`generate PDF -> ${pdfOut}${uniqueID}.pdf`);


	// https://stackoverflow.com/questions/48510210/puppeteer-generate-pdf-from-multiple-htmls
	var rectoURL = `http://localhost:${port}/layout/recto.html?uniqueID=${uniqueID}`;
	var versoURL = `http://localhost:${port}/layout/verso.html?uniqueID=${uniqueID}`;

	var pdfUrls = [rectoURL,versoURL];

	console.log(pdfUrls);


	(async () => {const browser 	= await puppeteer.launch()
		const page 		= await browser.newPage()

		var pdfFiles 	= []

		for(var i=0; i<pdfUrls.length; i++){
			await page.goto(pdfUrls[i], {waitUntil: 'networkidle2'});
			if(i == 0){
				var pdfFileName = `${pdfTempOut}${uniqueID}-recto.pdf`;
			}else if(i==1){
				var pdfFileName = `${pdfTempOut}${uniqueID}-verso.pdf`;				
			}
			// var pdfFileName = `${pdfTempOut}sample${i+1}.pdf`;
			pdfFiles.push(pdfFileName);
			await page.pdf({path: pdfFileName, format: 'A4', printBackground: true, preferCSSPageSize:false});
		}

		await browser.close();

		await mergeMultiplePDF(pdfFiles);

		lastID = smallID;
	})();

	const mergeMultiplePDF = (pdfFiles) => {
		return new Promise((resolve, reject) => {
			merge(pdfFiles,`${pdfOut}${uniqueID}.pdf`,function(err){

				if(err){
					console.log(err);
					reject(err);
				}

				console.log('Success');

				if (shell.exec(`lpr -P HP_Color_LaserJet_CP5225dn_2 -o media=A4,Lower -o sides=two-sided-short-edge ${pdfOut}${uniqueID}.pdf`).code !== 0) {
					shell.echo('Error: Cups Printing failed');
					shell.exit(1);
				}

				resolve();
			});
		});
	};
}


String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};