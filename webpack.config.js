var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry : './app/index.js',
	output : {
		path : path.resolve(__dirname, 'dist'),
		filename : 'index_bundle.js',
		publicPath: "/plotter/"
	},

	module : {
		rules : [
			{ 
				test : /\.(js|jsx)$/, 
				exclude: /node_module/, 
				use:[{
					loader: 'babel-loader',
					options: {
						presets:['@babel/react'],
						plugins: ['@babel/plugin-proposal-class-properties']
					}
				}],
			},
			{ 
				test : /\.css$/, 
				use:['style-loader', 'css-loader']
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
				// Creates `style` nodes from JS strings
				'style-loader',
				// Translates CSS into CommonJS
				'css-loader',
				// Compiles Sass to CSS
				'sass-loader',
				],
			},
		]
	},

	mode: 'development',
	plugins : [
		new HtmlWebpackPlugin({
			template : 'app/index.html'
		})
	]
}