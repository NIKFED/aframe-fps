const express = require('express');
const multer = require('multer');
const multipart = multer();
const redis = require('redis');
const redisIo = require('ioredis');
const async = require('async');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const ejs = require('ejs');

const app = express();
const port = process.env.PORT || 3000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const host = '0.0.0.0';
// const client = redis.createClient(REDIS_PORT);
const client = redis.createClient(process.env.REDIS_URL);
const redisIoEx = new redisIo(process.env.REDIS_URL);

client.on('error', function (err) {
    console.log('Error ' + err);
});

const devServerEnabled = true;

if (devServerEnabled) {
    //reload=true:Enable auto reloading when changing JS files or content
    //timeout=1000:Time from disconnecting from server to reconnecting
    config.entry.app.unshift('webpack-hot-middleware/client?reload=true&timeout=1000');

    //Add HMR plugin
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const compiler = webpack(config);

    //Enable "webpack-dev-middleware"
    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    //Enable "webpack-hot-middleware"
    app.use(webpackHotMiddleware(compiler));
}

app.use(express.static('./'));
app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);

var username = 'defaultUser';

//Route
app.get('/game', function (req, res, next) {
    res.render('index.html');
    next();
});

app.get('/menu', function (req, res, next) {
    res.render('menu.html');
    next();
});

app.get('/results', function (req, res, next) {
    res.render('result.html');
    next();
});

// API
app.post('/api/username/register', multipart.any(), function (req, res) {
    username = req.body.username;
});

app.get('/api/username/get', function (req, res) {
    res.json({nick: username});
});

app.get('/api/results/get', function (req, res) {
    client.keys('*', function (err, keys) {
        if (err) return console.log(err);
        if(keys){
            async.map(keys, function(key, cb) {
                client.get(key, function (error, value) {
                    if (error) return cb(error);
                    var result = {};
                    result['username']=key;
                    result['score']=value;
                    cb(null, result);
                });
            }, function (error, results) {
                if (error) return console.log(error);
                res.json({data:results});
            });
        }
    });
});

app.post('/api/username/result', multipart.any(), function (req, res) {
    let username = req.body.username;
    let score = req.body.score;
    client.set(username, score, redis.print);
});

app.delete('/api/results/delete', function (req, res) {
    client.keys('*', function (err, keys) {
        if (err) return console.log(err);
        if(keys){
            keys.forEach(function (item) {
                // console.log(item);
                client.del(item);

            });
        }
    });
});

app.get('*', function (req, res) {
    res.redirect("/menu")
});

app.listen(port, host, () => {
    console.log('Server started on port:' + port);
    console.log('Server started on host:' + host);
});