const fs = require('fs')
const path = require('path')


var liste = []
var images = {
	"normal":[],
	"dense":[],
	"fin":[],
	"mot":[],
	"photos":[]
}



walkSync(path.join(__dirname, 'public', 'images', 'scans'), liste )


liste.forEach(function(item){

	let temp = item.split("/")

	let filename = temp[ temp.length - 1 ]
	let rotation = temp[ temp.length - 2 ]
	let position = temp[ temp.length - 3 ]
	let type	 = temp[ temp.length - 4 ]

	images[type].push( imageParam(filename, rotation, position, type) )
})


console.log(images)

fs.writeFileSync(path.join(__dirname, 'public', 'layout' , `images.json`), JSON.stringify(images))




// https://gist.github.com/kethinov/6658166
// List all files in a directory in Node.js recursively in a synchronous fashion
function walkSync(dir, filelist) {
	files 		= fs.readdirSync(dir)
	filelist 	= filelist || []

	files.forEach(function(file) {

		if (fs.statSync( path.join( dir, file) ).isDirectory() ) {

			filelist = walkSync( path.join( dir, file ), filelist )
		
		} else {
			
			if( file.search('.DS_Store') === -1 ){
				filelist.push( path.join( dir, file ) )
			}
		}
	})

	return filelist
}


function imageParam(filename, rotation, position, type){

	rotation = rotation.split('_')
	position = position.split('_')

	rMin = parseInt( rotation[0] )
	rMax = parseInt( rotation[1] )

	wMin = parseInt( position[0] )
	wMax = parseInt( position[1] )

	return {
		filename : filename,
		path : `${type}/${position.join('_')}/${rotation.join('_')}/${filename}`,
		wMin : wMin,
		wMax : wMax,
		rMin : rMin,
		rMax : rMax
	}
}

