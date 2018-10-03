const webpack = require('webpack'),
    express = require('express'),
    middleware = require('webpack-dev-middleware');

const app = express(),
    compiler = webpack(require('./webpack.config'));

app.use(middleware(compiler, {}));

app.listen(9001, () => console.log('Jeopardy Application is running at localhost:9001'));