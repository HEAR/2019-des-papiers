const fs 			= require('fs')
const Acronym 		= require('./Acronym')
const path			= require('path')

class Logo {
	/**
	 * [constructor description]
	 * @param  {[type]} _width   [description]
	 * @param  {[type]} _height  [description]
	 * @param  {[type]} _name    [description]
	 * @param  {[type]} _acronym [description]
	 * @return {[type]}          [description]
	 */
	constructor(_width, _height, _name, _acronym, _id) {
		// always initialize all instance properties
		this.width 		= _width
		this.height 	= _height
		this.name 		= _name
		this.acronym 	= _acronym
		this.id 		= _id


		console.log("ID : "+ this.id)

		this.nbrShape	= 0

		this.googleFonts = [
			{
				name : `Work Sans`,
				import : `@import url('https://fonts.googleapis.com/css?family=Work+Sans&amp;display=swap');`
			},
			{
				name : `Noto Serif`,
				import : `@import url('https://fonts.googleapis.com/css?family=Noto+Serif&amp;display=swap');`
			},
		]

		this.googleFontsAcronym = [
			{
				name : `Work Sans`,
				import : `@import url('https://fonts.googleapis.com/css?family=Work+Sans&amp;display=swap');`
			},
			{
				name : `Noto Serif`,
				import : `@import url('https://fonts.googleapis.com/css?family=Noto+Serif&amp;display=swap');`
			},
			{
				name : `Rubik Mono One`,
				import : `@import url('https://fonts.googleapis.com/css?family=Rubik+Mono+One&amp;display=swap');`
			},
			{
				name : `Black Ops One`,
				import : `@import url('https://fonts.googleapis.com/css?family=Black+Ops+One&amp;display=swap');`
			},
			{
				name : `Turret Road`,
				import : `@import url('https://fonts.googleapis.com/css?family=Turret+Road:400,700&amp;display=swap');`
			},
		]

		//this.type = Math.floor( Math.random() * 3 )
		this.type = 0
		this.startSVG =  `<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"${this.width}px\" height=\"${this.height}px\" viewBox=\"0 0 ${this.width} ${this.height}\" 
		xml:space=\"preserve\">\n`

		this.styleSVG = `<style type="text/css">
				.contour{
					fill:none;
					stroke:#000000;
					stroke-miterlimit:10;
				}
				</style>\n`

		this.contentSVG = ``
		
		this.endSVG = `</svg>`

		this.ac 							= new Acronym();
		//this.objJson 					= this.ac.getAcronymAndName();

    //console.log(this.objJson);
		
		//console.log(this.getRandomAcronymAndName());
	}

	

	/**
	 * [getDim description]
	 * @return {[type]} [description]
	 */
	getDim() {
		return {
			width: this.width, 
			height: this.height
		}
	}

	/**
	 * [generateContent description]
	 * @return {[type]} [description]
	 */
	generateContent() {
		switch( this.type ){
			case 0 :
				this.generateLeftAligned()
			break
			case 1 :
				this.generateCentered()
			break
			case 2 :
				this.generateCircleLogo()
			break
			default :
				this.generateCircleLogo()
			break
		}
	}

	/**
	 * [randomNumberShape description]
	 * @param  {[type]} _max [description]
	 * @return {[type]}      [description]
	 */
	randomNumberShape(_max){
		return Math.ceil( Math.random() * _max +  1 )
	}

	/**
	 * [generateLeftAligned description]
	 * @return {[type]} [description]
	 */
	generateLeftAligned(){
		this.nbrShape = this.randomNumberShape(4)

		//console.log( "ferré à gauche", this.nbrShape)

		let svg = `` 

		for(let i = 0; i< this.nbrShape ; i++){

			let formeID = Math.ceil(4 * Math.random() )
			var angle = Math.random()*360

		  	var opacityMin = 0.2
			var opacityMax = 0.6
			var opacity = Math.round( opacityMin + ((opacityMax - opacityMin) * Math.random()) * 100 ) / 100

			stroke = 1
			var rngStroke = Math.round(Math.random() * 5)
			if (rngStroke == 4)
			{
				var stroke = Math.round(Math.random()*9) +1

			}
			var scaleMin = 10
			var scaleMax = 30
			var scale = Math.round( scaleMin + ((scaleMax - scaleMin) * Math.random() )) / 100

			//console.log("scale", scale)


			//console.log( "opacity", opacity )

			var fill = Math.floor(Math.random()*5)

			if (fill == 1) {
				fill = "black";
			}else{
				fill = "none"
			}

//transform:translate(-${this.width/4}px, 0px);
//transform:rotate(${angle}deg);
			switch( formeID ){
				case 1 :
					svg += this.drawCircle(i);

			this.styleSVG += 

				`<style type="text/css">
					
					.contour`+i+`{	
						fill:${fill};
						stroke:#000000;
						stroke-miterlimit:10;
						stroke-opacity:${opacity};
						stroke-width:${stroke}px; 
						fill-opacity:${opacity};
						transform:translate(${this.width/4}px, ${this.height/2}px);
					}

					</style>\n`

				break
				case 2 :
					svg += this.drawSquare(i)

				this.styleSVG += 

					`<style type="text/css">
						.contour`+i+`{	
							fill:${fill};
							stroke:#000000;
							stroke-width:${stroke}px; 
							stroke-miterlimit:10;
							stroke-opacity:${opacity};
							fill-opacity:${opacity};
							transform:translate(${100 + (this.width/4)}px, ${this.height/2}px);
							transform-origin:center center;
							transform:rotate(${angle}deg); 
						}
						</style>\n`

				break
				case 3 :

					svg += this.drawComma(i)

					//console.log("commaaaaaaa")

					this.opacityChoice = [
												{
													opacity : 0.5
												},
												{
													opacity : 1
												}
											]

					opacity = this.choicer(this.opacityChoice)

					this.styleSVG += 

				`<style type="text/css">
					
					.contour`+i+`{	
						fill:${fill};
						stroke:#000000;
						stroke-miterlimit:10;
						stroke-opacity:${opacity.opacity};
						stroke-width:${stroke}px; 
						fill-opacity:${opacity};
						transform-origin:center center;
						transform:translate(-30px, -60px) rotate(${angle}deg) scale(${scale});
						
					}

					</style>\n`

				break
				case 4 :

					svg += this.drawArrowHead(i)

					//console.log("Arrow")

					this.opacityChoice = [
												{
													opacity : 0.5
												},
												{
													opacity : 1
												}
											]

					opacity = this.choicer(this.opacityChoice)

					this.styleSVG += 

				`<style type="text/css">
					
					.contour`+i+`{	
						fill:${fill};
						stroke:#000000;
						stroke-miterlimit:10;
						stroke-opacity:${opacity.opacity};
						stroke-width:${stroke}px; 
						fill-opacity:${opacity};
						transform-origin:center center;
						transform:translate(-50px, -130px) rotate(${angle}deg) scale(${scale});
						
					}

					</style>\n`

				break
			}	
		}

		let font 		= this.choicer(this.googleFonts)
		let fontAcronym = this.choicer(this.googleFontsAcronym)

		//console.log("-------------> ",font, fontAcronym)

		this.styleSVG += 

			`<style type="text/css">
				
				.mytext{	
					transform:translate(100px, 35px);
				}

			</style>\n`

		svg += `<defs><style type="text/css">${font.import}</style></defs>`
		svg += `<defs><style type="text/css">${fontAcronym.import}</style></defs>`

		//acronyme
		svg += `<text class="mytext" x="-10" y="20" font-family="${fontAcronym.name}" font-size="30px" fill="black"  text-anchor="start">${this.objJson.a}</text>\n`

		var words = this.objJson.n.split(` `)

		this.objJson.n = ""

		for (var j = 0; j <  words.length; j++) {

			var stopwords = ['de', 'et', 'la', 'du', 'des'];

			if (stopwords.includes(words[j-1]))
			{
				this.objJson.n += " " + words[j] + " "
			}else
			{
				this.objJson.n += `<tspan x="-10" dy="1.2em">` + words[j] + `</tspan>`
			}
			//console.log("linebreak", lineBreak)
		}

		// this.objJson.n = `<tspan x="-10" dy="1.2em">`+this.objJson.n.split(` `).join(`</tspan>\n<tspan x="-10" dy="1.2em">`)+`</tspan>`



		svg += `<text class="mytext" x="-10" y="25" font-family="${font.name}" font-size="7px" fill="black" text-anchor="start" >${this.objJson.n}</text>\n`
		this.contentSVG += svg
	}

	/**
	 * [generateCentered description]
	 * @return {[type]} [description]
	 */
	generateCentered(){}
	generateCircleLogo(){

		this.nbrShape = this.randomNumberShape(4)


		//console.log( "rond", this.nbrShape )

		let svg = `` 

		for(let i = 0; i< this.nbrShape ; i++){
			svg += this.drawCircle()
		}

		this.contentSVG += svg
	}

	/**
	 * [drawCircle description]
	 * @return {[type]} [description]
	 */
	drawCircle(id){

		let secuMargin = 10
		let minRadius = 10
		let dim = Math.min(this.width, this.height)

		var cRadius = minRadius + Math.round( (dim/2 - secuMargin - minRadius)*Math.random() )
		var cX = ((Math.random() * 20) - 10)
		var cY = ((Math.random() * 20) - 10)

		//console.log(cRadius);

		return `<circle class="contour${id}" cx="${cX}" cy="${cY}" r="${cRadius}"/>\n`
	}

	/**
	 * [drawSquare description]
	 * @return {[type]} [description]
	 */
	drawSquare(id){


		let secuMargin = 20
		let minWidth = 10
		let dim = Math.min(this.width, this.height)
		
		// let dim = Math.min(this.width, this.height)

		var w = minWidth + Math.round( (dim - secuMargin - minWidth)*Math.random() )
		var x = ((this.width - w)/4) + ((Math.random() * 20) - 10)
		var y = ((this.height - w)/2) + ((Math.random() * 20) - 10)

		// console.log("id  " + id);
		// console.log(x, y, w);
		

		//id="${id}" class="contour"
		//return `<rect class="contour" x=400 y=400 width="${w}" height="${w}" transform="rotate(45)"/>\n`
		return `<rect class="contour${id}" x="${x}" y="${y}" width="${w}" height="${w}"/>\n`

	}

	/**
	 * [drawArrow description]
	 * @return {[type]} [description]
	 */
	drawArrow(){}

	/**
	 * [drawArrowHead description]
	 * @return {[type]} [description]
	 */
	drawArrowHead(id){

		return `<polygon class="contour${id}" points="100.578,55.396 0.553,300.184 100.578,242.099 200.579,300.184"/>`

	}

	/**
	 * [drawComma description]
	 * @return {[type]} [description]
	 */
	drawComma(id){
		
			 
		return`<path class="contour${id}" d="M14.7,23.9c57.5-7.6,134.7-23.1,109.6,104.4C113.2,184.5,57,247.6,35.2,272.6c-14.2,16.3-22.9,22.9-21.7,24.4c0,0,159.4-81.9,159.7-215.1S14.7,23.9,14.7,23.9z" />`



		
	}

	/**
	 * [generateLogo description]
	 * @return {[type]} [description]
	 */



	generateLogo() {
		//console.log( this.type )

		this.generateContent()

		return this.startSVG + this.styleSVG + this.contentSVG + this.endSVG
	}

	/**
	 * [exportLogo description]
	 * @return {[type]} [description]
	 */
	exportLogo(){
		
		this.styleSVG = "";
		this.contentSVG = ""
		this.objJson = this.ac.getAcronymAndName();

		// ICI on sauve le fichier
		
		console.log("save ID : "+this.id)

		var ID = this.id

		fs.writeFileSync( path.join(__dirname, 'public', 'svg' , `${ID}.svg`) /*`./public/svg/${ID}.svg`*/, this.generateLogo() , function(err) {
			if(err) {
				return console.log(err);
			}

			console.log(`./public/svg/${ID}.svg ======> généré`)
		}); 
	}

	choicer(somelist) {
		var i = Math.floor(Math.random()*somelist.length);
		return somelist[i];
	}
}

module.exports = Logo;