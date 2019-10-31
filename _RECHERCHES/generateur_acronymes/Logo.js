const fs		= require('fs')
const Acronym	= require('./Acronym')

class Logo {
	/**
	 * [constructor description]
	 * @param  {[type]} _width   [description]
	 * @param  {[type]} _height  [description]
	 * @param  {[type]} _name    [description]
	 * @param  {[type]} _acronym [description]
	 * @return {[type]}          [description]
	 */
	constructor(_width, _height, _name, _acronym) {
		// always initialize all instance properties
		this.width 		= _width
		this.height 	= _height
		this.name 		= _name
		this.acronym 	= _acronym

		this.nbrShape	= 0

		this.googleFonts = [
			{
				name : `Work Sans`,
				import : `@import url('https://fonts.googleapis.com/css?family=Work+Sans&amp;display=swap');`
			},
			{
				name : `Work Sans`,
				import : `@import url('https://fonts.googleapis.com/css?family=Work+Sans&amp;display=swap');`
			},
			{
				name : `Noto Serif`,
				import : `@import url('https://fonts.googleapis.com/css?family=Noto+Serif&amp;display=swap');`
			},
		]

		//this.type = Math.floor( Math.random() * 3 )
		this.type = 0

		this.startSVG =  `<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"${this.width}px\" height=\"${this.height}px\" viewBox=\"0 0 ${this.width} ${this.height}\" xml:space=\"preserve\">\n`

		this.styleSVG = `<style type="text/css">
				.contour{
					fill:none;
					stroke:#000000;
					stroke-miterlimit:10;
				}
				</style>\n`

		this.contentSVG = ``
		
		this.endSVG = `</svg>`

		this.ac = new Acronym();
		//this.objJson = this.ac.getAcronymAndName();

    console.log(this.objJson);
		
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
		return Math.ceil( Math.random() * _max )
	}

	/**
	 * [generateLeftAligned description]
	 * @return {[type]} [description]
	 */
	generateLeftAligned(){
		this.nbrShape = this.randomNumberShape(5)

		console.log( "ferré à gauche", this.nbrShape)

		let svg = `` 

		for(let i = 0; i< this.nbrShape ; i++){

			let formeID = Math.ceil(2 * Math.random() )
			var angle = Math.random()*360

		  var opacityMin = 0.2
			var opacityMax = 0.7
			var opacity = Math.round( opacityMin + ((opacityMax - opacityMin) * Math.random()) * 100 ) / 100

			//console.log( "opacity", opacity )

			var fill = Math.round(Math.random()*2)

			if (fill == 1) {
				fill = "none";
			}else{
				fill = "black"
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
						fill-opacity:${opacity};
						transform:translate(0px, 0px);
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
					stroke-miterlimit:10;
					stroke-opacity:${opacity};
					fill-opacity:${opacity};
					transform:translate(100px, 0px);
					transform-origin:50% 50%;

					transform:rotate(${angle}deg); 
				}
				</style>\n`

				break
			}	
		}

		let font = this.choicer(this.googleFonts)

		this.styleSVG += 

			`<style type="text/css">
				
				.mytext{	
					transform:translate(100px, 25px);
				}

			</style>\n`

		svg += `<defs><style type="text/css">${font.import}</style></defs>`

		//acronyme
		svg += `<text class="mytext" x="0" y="20" font-family="${font.name}" font-size="20px" fill="black"  text-anchor="start">${this.objJson.a}</text>\n`
		//text complet
		svg += `<text class="mytext" x="0" y="40" font-family="${font.name}" font-size="20px" fill="black" text-anchor="start" >${this.objJson.n}</text>\n`
		this.contentSVG += svg
	}

	/**
	 * [generateCentered description]
	 * @return {[type]} [description]
	 */
	generateCentered(){
		this.nbrShape = this.randomNumberShape(5)
		
		console.log( "centré", this.nbrShape )

		let svg = ``

		for(let i = 0; i< this.nbrShape ; i++){

			let formeID = Math.ceil(2 * Math.random() )

			switch( formeID ){
				case 1 :
					svg += this.drawCircle()
				break
				case 2 :
					svg += this.drawSquare()
				break
			}	

		}

		this.contentSVG += svg
	}

	/**
	 * [generateCircleLogo description]
	 * @return {[type]} [description]
	 */
	generateCircleLogo(){

		this.nbrShape = this.randomNumberShape(4)


		console.log( "rond", this.nbrShape )

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
		var cX = this.width/4
		var cY = this.height/2

		console.log(cRadius);

		return `<circle class="contour${id}" cx="${cX}" cy="${cY}" r="${cRadius}"/>\n`
	}

	/**
	 * [drawSquare description]
	 * @return {[type]} [description]
	 */
	drawSquare(id){


		let secuMargin = 10
		let minWidth = 10
		let dim = Math.min(this.width, this.height)
		
		// let dim = Math.min(this.width, this.height)

		var w = minWidth + Math.round( (dim - secuMargin - minWidth)*Math.random() )
		var x = (this.width - w)/4
		var y = (this.height - w)/2

		console.log("id  " + id);
		console.log(x, y, w);
		

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
	drawArrowHead(){}

	/**
	 * [drawComma description]
	 * @return {[type]} [description]
	 */
	drawComma(){}

	/**
	 * [generateLogo description]
	 * @return {[type]} [description]
	 */



	generateLogo() {
		console.log( this.type )

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
		this.objJson 					= this.ac.getAcronymAndName();

		// ICI on sauve le fichier
		fs.writeFile("./public/svg/test.svg", this.generateLogo() , function(err) {
			if(err) {
				return console.log(err);
			}

			console.log("le logo a été généré")
		}); 

	}

	choicer(somelist) {
		var i = Math.floor(Math.random()*somelist.length);
		return somelist[i];
	}
}

module.exports = Logo;