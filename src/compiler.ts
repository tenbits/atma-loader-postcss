import { Compiler } from 'atma-io-middleware-base'
import { class_Uri } from 'atma-utils'

let postCss;

export function processFn (source, file, compiler: Compiler){
    try {
        let opts = prepair(file.uri, compiler);
        let postCssOptions = compiler.getOption('postcss');
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
};
export function processFnAsync (source, file, compiler: Compiler): Promise<any> {
    let opts = prepair(file.uri, compiler);
    return new Promise((resolve, reject) => {
        opts
            .processor
            .process(source, opts.settings)
            .then(function(data){
                let out = {
                    content: data.css,
                    sourceMap: data.map
                };
                resolve(out);
            }, function(error) {
                reject(error);
            });
    });
    
};


function prepair (uri: class_Uri, compiler: Compiler) {
    let base = <string> compiler.getOption('base') || '/';
    let pluginNames = <string[]> compiler.getOption('plugins');
    let plugins = pluginNames.map(require);
        
    let paths = [ uri.toLocalDir() ];
    if (base[0] === '/') {
        base = class_Uri.combine(process.cwd(), base);
    }

    paths.push(new class_Uri(base).toLocalDir());

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