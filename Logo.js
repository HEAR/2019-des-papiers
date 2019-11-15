const fs = require('fs')
const path = require('path')
const Acronym = require('./Acronym')

// returns a window with a document and an svg root node
const window = require('svgdom')
const document = window.document
const {
	SVG,
	registerWindow,
} = require('@svgdotjs/svg.js')

// register window and document
registerWindow(window, document)

// import { SVG } from '@svgdotjs/svg.js'

//const SVG     = require('@svgdotjs/svg.js')

// ENVISAGER D'UTILISER :
// https://svgjs.com/docs/3.0/

// https://jsfiddle.net/nayfzv5p/

class Logo {

	constructor(_width, _height, _name, _acronym, _id) {
		// always initialize all instance properties-
		this.width = _width
		this.height = _height
		this.name = _name
		this.acronym = _acronym
		this.id = _id

		this.nbrShape = 0

		this.secuMargin = 10

		// TYPE DE LOGO
		//this.type = Math.floor( Math.random() * 3 )
		this.type = 0

		console.log("CONSTRUCT LOGO")

		// create canvas	
		this.canvas = SVG(document.documentElement).size(this.width, this.height)

		this.ac = new Acronym();


		this.googleFonts = [{
			name: `Work Sans`,
			import: `@import url('https://fonts.googleapis.com/css?family=Work+Sans&display=swap');`,
			sub: true
		}, {
			name: `Noto Serif`,
			import: `@import url('https://fonts.googleapis.com/css?family=Noto+Serif&display=swap');`,
			sub: true
		}, {
			name: `Rubik Mono One`,
			import: `@import url('https://fonts.googleapis.com/css?family=Rubik+Mono+One&display=swap');`,
			sub: false
		}, {
			name: `Black Ops One`,
			import: `@import url('https://fonts.googleapis.com/css?family=Black+Ops+One&display=swap');`,
			sub: false
		}, {
			name: `Turret Road`,
			import: `@import url('https://fonts.googleapis.com/css?family=Turret+Road:400,700&display=swap');`,
			sub: false
		}, ]
	}

	/**
	 * [randomNumberShape description]
	 * @param  {[type]} _max [description]
	 * @return {[type]}      [description]
	 */
	randomNumberShape(_max) {
		return Math.ceil(Math.random() * _max + 1)
	}


	/**
	 * [generateLeftAligned description]
	 * @return {[type]} [description]
	 */
	generateLeftAligned() {
		this.nbrShape = this.randomNumberShape(4)

		let dim = Math.min(this.width, this.height)


		// use svg.js as normal
		// this.canvas.rect(this.width, this.height).fill("red").opacity(0.3).move(0, 0)

		console.log("ferré à gauche", this.nbrShape)


		for (let i = 0; i < this.nbrShape; i++) {

			let formeID = Math.ceil(3 * Math.random())
			let angle = Math.random() * 360

			let opacityMin = 0.2
			let opacityMax = 0.6
			let opacity = Math.round(opacityMin + ((opacityMax - opacityMin) * Math.random()) * 100) / 100

			console.log(`---------> ${formeID}`)

			console.log("opacity", opacity)

			let stroke = 1

			if (Math.random() > 0.8) {
				stroke = Math.round(Math.random() * 9) + 1
			}

			console.log("stroke", stroke)

			let scaleMin = 50
			let scaleMax = (dim - this.secuMargin)
			let scale = Math.round(scaleMin + ((scaleMax - scaleMin) * Math.random())) / 100

			console.log("scale", scale)

			let fill = "none"
			if (Math.random() > 0.8) {
				fill = "black";
			}

			console.log("fill", fill)

			let x, y

			// formeID = 4
			switch (formeID) {
				case 1:
					console.log("=> circle")

					let minRadius = 10

					// rayon
					var cRadius = minRadius + Math.round((dim / 2 - this.secuMargin - minRadius) * Math.random())

					// position
					var cX = dim / 2 - cRadius + (Math.random() * this.secuMargin - this.secuMargin / 2)
					var cY = dim / 2 - cRadius + (Math.random() * this.secuMargin - this.secuMargin / 2)

					this.canvas.circle(cRadius * 2)
						.fill(fill)
						.opacity(opacity)
						.stroke({
							color: '#000',
							width: stroke
						})
						.move(cX, cY)

					break
				case 2:
					console.log("=> square")

					let minWidth = 10

					let hypo = Math.sqrt(2 * ((dim - this.secuMargin) / 2) * ((dim - this.secuMargin) / 2))

					let w = minWidth + Math.round((dim - this.secuMargin - minWidth) * Math.random())

					if (w > hypo) {
						w = hypo
					}

					x = (dim - w) / 2 + (Math.random() * this.secuMargin - this.secuMargin / 2)
					y = (dim - w) / 2 + (Math.random() * this.secuMargin - this.secuMargin / 2)

					this.canvas.rect(w, w)
						.fill(fill)
						.opacity(opacity)
						.stroke({
							color: '#000',
							width: stroke
						})
						.move(x, y)
						.rotate(angle)

					break
				case 3:
					console.log("=> virgule")

					x = (dim - 50) / 2 + (Math.random() * this.secuMargin - this.secuMargin / 2)
					y = (dim - 100) / 2 + (Math.random() * this.secuMargin - this.secuMargin / 2)

					this.canvas.path('M0.4,6.3c17.2-2.3,40.3-6.9,32.8,31.2C29.9,54.3,13,73.2,6.5,80.7c-4.3,4.9-6.9,6.8-6.5,7.3c0,0,47.6-24.5,47.8-64.3 C47.9-16.2,0.4,6.3,0.4,6.3z')
						.fill(fill)
						.opacity(opacity)
						.attr({
							'stroke-linejoin': 'miter'
						})
						.stroke({
							color: '#000',
							width: stroke
						})
						.move(x, y)
						.rotate(angle)
						.scale(scale, scale)

					break
				case 4:
					console.log("=> fleche")

					x = 0
					y = 0

					x = (dim - 50) / 2 + (Math.random() * this.secuMargin - this.secuMargin / 2)
					y = (dim - 60) / 2 + (Math.random() * this.secuMargin - this.secuMargin / 2)

					this.canvas.polygon('24.6,0.4 0.2,60.1 24.6,45.9 49,60.1')
						.fill(fill)
						.opacity(opacity)
						.attr({
							'stroke-linejoin': 'miter'
						})
						.stroke({
							color: '#000',
							width: stroke
						})
						.move(x, y)
						.scale(scale, scale)
						.rotate(angle)

					break
				default:

					// nothing
					break;
			}
		}


		// ---------- LOGO + ACRONYME---------- 
		let fontLogo = this.choicer(this.googleFonts)

		let subFontArr = []
		this.googleFonts.forEach(font=>{
			if(font.sub == true){
				subFontArr.push(font)
			}
		})


		let fontSub = this.choicer(subFontArr)

		console.log("-------------> ", fontLogo, fontSub, fontLogo == fontSub)

		
		if(fontLogo != fontSub){
			this.canvas.style(fontLogo.import +" "+ fontSub.import)
		}else{
			this.canvas.style(fontLogo.import)
		}
		

		let xt = -10
		let yt = 20
		let logoSize = 60+Math.round( 30 * Math.random() )
		let subSize = 20
		

		let words 		= this.objJson.n
		let acronyme 	= this.objJson.a

		//  LOGO
		let logo = this.canvas.text( acronyme )

		logo.font({
			size: logoSize,
			fill: '#000',
			family: fontLogo.name
		})

		let bbox = logo.bbox()
		let logoX = (dim-bbox.width)/2
		let logoY = (dim - bbox.height) / 2

		logo.move(logoX, logoY)

		// console.log("logo w => ", bbox.width )


		console.log("words", words)

		let m = logoX //this.secuMargin
		let soustitre = this.canvas.text(function(add) {
			words.forEach((word, i) => {
				add.tspan(word).x(m).dy(subSize*1.15)
			})
		})

		soustitre.font({
			size: subSize,
			fill: '#000',
			family: fontSub.name
		}).move(this.secuMargin, logo.attr("y") + logoSize + 20)

		console.log(soustitre.attr("y"))



	}


	/**
	 * [generateContent description]
	 * @return {[type]} [description]
	 */
	generateContent() {
		this.objJson = this.ac.getAcronymAndName();

		switch (this.type) {
			case 0:
				this.generateLeftAligned()
				break
			case 1:
				this.generateCentered()
				break
			case 2:
				this.generateCircleLogo()
				break
			default:
				this.generateCircleLogo()
				break
		}
	}


	generateLogo() {
		this.generateContent()
		// return this.canvas.node.outerHTML
		return this.canvas.svg()
	}

	/**
	 * [exportLogo description]
	 * @return {[type]} [description]
	 */
	exportLogo() {

		// ICI on sauve le fichier
		console.log("save ID : " + this.id)

		var ID = this.id

		fs.writeFileSync(path.join(__dirname, 'public', 'svg', `${ID}.svg`), this.generateLogo(), function(err) {
			if (err) {
				return console.log(err);
			}

		});

		console.log(`./public/svg/${ID}.svg ======> généré`)
		delete require.cache[require.resolve('svgdom')]
	}

	choicer(somelist) {
		var i = Math.floor(Math.random() * somelist.length);
		return somelist[i];
	}

}

module.exports = Logo;