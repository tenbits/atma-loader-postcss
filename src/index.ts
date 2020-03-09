import * as Base from 'atma-io-middleware-base'
import { processFn, processFnAsync } from './compiler'


export = Base.create({
    name: 'atma-loader-postcss',
    textOnly: true,
    cacheable: true,
    defaultOptions: {
        mimeType: 'text/css',
        extensions: [ 'css' ],
        plugins: []
    },
    process: processFn,
    processAsync: processFnAsync
});
