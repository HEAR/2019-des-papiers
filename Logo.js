const fs 				= require('fs')




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

		this.type = Math.floor( Math.random() * 3 )

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
			svg += this.drawCircle()
		}

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

			svg += this.drawCircle()
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
	drawCircle(){

		let secuMargin = 10
		let minRadius = 10
		let dim = Math.min(this.width, this.height)

		var cRadius = minRadius + Math.round( (dim/2 - secuMargin - minRadius)*Math.random() )
		var cX = this.width/2
		var cY = this.height/2

		return `<circle class="contour" cx="${cX}" cy="${cY}" r="${cRadius}"/>\n`
	}

	/**
	 * [drawSquare description]
	 * @return {[type]} [description]
	 */
	drawSquare(){}

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

		// ICI on sauve le fichier
		fs.writeFile("./public/svg/test.svg", this.generateLogo() , function(err) {
			if(err) {
				return console.log(err);
			}

			console.log("le logo a été généré")
		}); 

	}


}

module.exports = Logo;