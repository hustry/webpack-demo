
const webpack = require('webpack');

const ExtractPlugin = require('extract-text-webpack-plugin');

const production = process.env.NODE_ENV === 'production';



var plugins = [
		new ExtractPlugin('bundle.css'),
		new webpack.optimize.CommonsChunkPlugin({
			name:'main',
			children:true,
			minChunks:2
		})
];

if(production){
	plugins.concat([
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.MinChunkSizePlugin({
			minChunkSize:51200
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle:true,
			compress:{
				warnings:false
			}
		}),
		new webpack.DefinePlugin({
			__SERVER__: !production,
			__DEVELOPMENT__: !production,
			__DEVTOOLS__: !production,
			'process.env':{
				BABEL_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	]);
}

module.exports = {

	debug: !production,

	devtool:production?false:'eval',

	entry:"./src",

	output:{
		path:'builds',
		filename:'bundle.js',
		chunkFilename:'[name]-[chunkhash].js',
		publicPath:'builds/'		
	},
	module:{
		preLoaders:[
			{
				test:/\.js/,
				loader:'eslint'
			}
		],
		loaders:[
			{
			   test:/\.js$/,
			   exclude:/node_modules/,
			   loader:'babel-loader',
			   query:{
			   		presets:['es2015']
			   }
			},
			{
				test:/\.css/,
				loader:ExtractPlugin.extract('style','css')
			},
			{
				test:/\.html/,
				loader:'html'
			},
			{
				test:/\.(png|gif|jpg|svg)$/,
				loader:'url?limit=10'
			}
		]
	},
	plugins:plugins
}