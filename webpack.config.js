const path = require('path'),
    webpack = require('webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: ['./src/app.ts'],
        vendor: [
            'jquery/dist/jquery.js',
            'popper.js/dist/popper.js',
            'tooltip.js/dist/tooltip.js',
            'underscore/underscore.js',
            'angular/angular.js',
            'angular-animate/angular-animate.js',
            'angular-sanitize/angular-sanitize.js',
            'angular-touch/angular-touch.js',
            '@uirouter/angularjs/release/angular-ui-router.js',
            'angular1-ui-bootstrap4/dist/ui-bootstrap-tpls.js'
        ]
    },
    context: __dirname + '',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "dist"),
        sourceMapFilename: '[name].map'
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {}
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader?name=[path][name].[ext]r',
                        options: { minimize: true }
                    },
                    { loader: 'extract-loader' },
                    { loader: 'html-loader' }
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.SplitChunksPlugin({ name: 'vendor', filename: 'vendor.js' }),
        new CopyWebpackPlugin([{ from: './src/index.html', to: './index.html' }])
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9001
    },
};