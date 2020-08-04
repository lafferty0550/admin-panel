const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const nodeExternals = require('webpack-node-externals')
const nodemon = require('nodemon')
const webpack = require('webpack')
const rimraf = require('rimraf')
require('dotenv').config()

const ENV = process.env.NODE_ENV || 'production'

const _root = path.resolve()
const _src = path.join(_root, '/src')

const _front = path.join(_src, '/front')
const _back = path.join(_src, '/back')

const _frontEntry = path.join(_front, '/launcher.tsx')
const _backEntry = path.join(_back, '/launcher.js')
const _initEntry = path.join(_src, '/init/init.js')

const _build = path.join(_root, '/build')
const _output = path.join(_build, '/public')

const aliases = {
    '@front': _front,
    '@actions': path.join(_front, '/actions'),
    '@components': path.join(_front, '/components'),
    '@containers': path.join(_front, '/containers'),
    '@core': path.join(_front, '/core'),
    '@helpers': path.join(_front, '/helpers'),
    '@api': path.join(_front, '/api'),
    '@reducers': path.join(_front, '/reducers')
}

rimraf(_output, () => console.log(`=========DELETED=========  ${_output}`));

const cfg = {
    mode: ENV,
    context: _front,
    name: 'front',
    entry: _frontEntry,
    output: {
        path: _output,
        filename: '[hash].bundle.js',
        chunkFilename: '[hash].[name].bundle.js',
        publicPath: '/'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')]
                        }
                    },
                    'less-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[hash].bundle.css',
            chunkFilename: '[hash].[name].bundle.css'
        })
    ],
    resolve: {
        alias: aliases,
        extensions: ['.ts', '.tsx', '.js']
    }
};

const backcfg = {
    mode: ENV,
    name: 'back',
    target: 'node',
    externals: [nodeExternals()],
    entry: {
        back: _backEntry,
        init: _initEntry
    },
    output: {
        path: _build,
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        alias: {
            '@back': _back
        }
    }
};

let nodemonIsLaunched = false;
const compiler = webpack([cfg, backcfg]);
const statsHandler = (err, stats) => {
    if (err)
        console.log('webpack:build', err)
    if ((ENV === 'development') && !nodemonIsLaunched) {
        nodemon({
            script: 'build/back.js',
            watch: 'build/back.js'
        }).on('restart', () => {
            process.env.NODEMON_STATUS = 'restarted'
        });
        nodemonIsLaunched = true;
    }
    console.log(stats.toString({
        all: false,
        colors: true,
        errors: true,
        errorDetails: true,
        builtAt: true,
        warnings: true
    }))
}

if (ENV === 'development')
    compiler.watch({}, statsHandler)
else
    compiler.run(statsHandler)


// =============== for webstorm
module.exports = {
    resolve: {
        alias: aliases
    }
};