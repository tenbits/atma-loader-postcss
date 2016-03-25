[PostCSS Compiler](http://postcsscss.org) (Atma Plugin)
-----
[![Build Status](https://travis-ci.org/atmajs/atma-loader-postcss.png?branch=master)](https://travis-ci.org/atmajs/atma-loader-postcss)

The Plugin extends:
- [`IncludeJS`](https://github.com/atmajs/IncludeJS) with a custom loader
- [`atma-io`](https://github.com/atmajs/atma-io) with a custom middleware to read PostCSS files
- [`atma-server`](https://github.com/atmajs/atma-server) and [`Atma Toolkit`](https://github.com/atmajs/Atma.Toolkit) with a `HTTPHandler` to serve compiled sources (with **sourceMap** support)



##### How to use

###### Embed into the Project

+ `atma plugin install atma-loader-postcss`
	
	This adds `atma-loader-postcss` npm dependency and the `package.json` would look like:
	```json
	{
		"dependency": {
			"atma-loader-postcss"
		},
		"atma": {
			"plugins": [
				"atma-loader-postcss"
			],
			"settings": {
				"atma-loader-postcss": {
					"extension": "css",
                    "plugins": ['autoprefixer']
				}
			}
		}
	}
	```
+ That's all. Now, you are ready to use 'dynamic stylesheets' in your project

##### Quick Try

+ install atma: `$ npm install atma -g`
+ install plugin: `$ atma plugin install atma-loader-postcss`
+ add `test.html` to the directory

    ```html
    <!DOCTYPE html>
    <link href='test.css' rel='stylesheet' />
    ```
+ add `test.postcss`
    
    ```css
    div { display: flex; }
    ```
+ start the server: `$ atma server`
+ open the browser: `http://localhost:5777/test.html`



----
_(c) MIT License - Atma.js Project_