
// source ./RootModule.js
(function(){
	
	var _src_compiler = {};

// source ./ModuleSimplified.js
var _src_compiler;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atma_utils_1 = require("atma-utils");
var postCss;
function processFn(source, file, compiler) {
    try {
        var opts = prepair(file.uri, compiler);
        var postCssOptions = compiler.getOption('postcss');
        var result = opts.processor.process(source, postCssOptions);
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
}
exports.processFn = processFn;
;
function processFnAsync(source, file, compiler) {
    var opts = prepair(file.uri, compiler);
    return new Promise(function (resolve, reject) {
        opts
            .processor
            .process(source, opts.settings)
            .then(function (data) {
            var out = {
                content: data.css,
                sourceMap: data.map
            };
            resolve(out);
        }, function (error) {
            reject(error);
        });
    });
}
exports.processFnAsync = processFnAsync;
;
function prepair(uri, compiler) {
    var base = compiler.getOption('base') || '/';
    var pluginNames = compiler.getOption('plugins');
    var plugins = pluginNames.map(require);
    var paths = [uri.toLocalDir()];
    if (base[0] === '/') {
        base = atma_utils_1.class_Uri.combine(process.cwd(), base);
    }
    paths.push(new atma_utils_1.class_Uri(base).toLocalDir());
    if (postCss == null) {
        postCss = require('postcss');
    }
    return {
        plugins: plugins,
        processor: postCss(plugins),
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
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_compiler) && isObject(module.exports)) {
		Object.assign(_src_compiler, module.exports);
		return;
	}
	_src_compiler = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
var Base = require("atma-io-middleware-base");
var compiler_1 = _src_compiler;
module.exports = Base.create({
    name: 'atma-loader-postcss',
    textOnly: true,
    cacheable: true,
    defaultOptions: {
        mimeType: 'text/css',
        extensions: ['css'],
        plugins: []
    },
    process: compiler_1.processFn,
    processAsync: compiler_1.processFnAsync
});


}());
// end:source ./RootModule.js
