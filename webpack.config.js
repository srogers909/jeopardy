const path = require('path'),
    webpack = require('webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: ['./src/app.js'],
        vendor: [
            'jquery/dist/jquery.js',
            'underscore/underscore.js',
            'angular/angular.js',
            'angular-animate/angular-animate.js',
            'angular-sanitize/angular-sanitize.js',
            '@uirouter/angularjs/release/angular-ui-router.js',
            'angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
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
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
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
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
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
        extensions: ['.js']
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9001
    },
};