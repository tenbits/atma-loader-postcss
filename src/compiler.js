(function(){
	var _PostCSS;
			
	module.exports = {
		compile: function(source, path, options){
			try {						
				var opts = prepair(path, options);					
				var result = opts.processor.process(source, opts.options);
				return {
					content: result.css
				};
			}
			catch (error) {
				return { 
					content: error.toString(),
					error: error
				};
			}
		},
		compileAsync: function(source, path, options, fn){
			var opts = prepair(path, options);
			opts
				.processor
				.process(source, opts.settings)
				.then(function(data){
					var out = {
						content: data.css,
						sourceMap: data.map
					};
					fn(null, out);
				}, function(error) {
					fn({
						content: error.toString(),
						error: error
					});
				});
		}
	};

	function prepair (path, options) {
		if (_PostCSS == null) {
			_PostCSS = require('postcss');
		}
			
		var uri = new net.Uri(path),
			paths = [ uri.toLocalDir() ],
			out = {
				error: null,
				content: null,
				sourceMap: null
			};
			
		var css, parser;
		var base = options && options.base || '/';

		if (base[0] === '/') {
			base = net.Uri.combine(process.cwd(), base);
		}

		paths.push(new net.Uri(base).toLocalDir());

		var plugins = options.plugins.map(function(name){
			return require(name);
		});

		return {
			plugins: plugins,
			processor: _PostCSS(plugins),
			settings: {
				from: uri.toLocalFile()
			}
		};
	}
				
	
	function error_format(error) {
		return error.message
			+ '\n\tat ('
			+ error.filename
			+ ':'
			+ error.line
			+ error.column
			+ ')';
	}
}());