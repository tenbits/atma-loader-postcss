(function(){
	
	var Loader;
	(function(module){
		//import /node_modules/atma-loader/index.js
	}(Loader = {}));
	
	var Compiler;
	(function(module){
		// import compiler.js
	}(Compiler = {}));
	
	(function(){
		
		include.exports = Loader.exports.create({
			name: 'atma-loader-postcss',
			options: {
				mimeType: 'text/css',
				extensions: [ 'css' ]
			},
		}, Compiler.exports)
		
	}());
	
}());