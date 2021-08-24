'use strict';

const express = require('express');
const app = express();

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const browserMiddleware = require('./middleware/browser')
const loggerMiddleware = require('./middleware/logger')

app.use(express.json());
app.use(browserMiddleware);
app.use(loggerMiddleware)

function square(n) {
    return (req, res, next) => {
        if(typeof n !== 'number'){
            next('Not a number')
        }else{
            // square the num
            let result = n * n;
            req.square = result;
            next();
        }
    }
    // return n * n;
}


// use query string
app.get('/hello', (req, res) => {
    // console.log(req)
    res.status(200).send(`Hi`)
})

app.get('/bad', (req, res) => {
    res.status(500).send(error)
})

// use URL params

app.get('/hello/:name', (req, res) => {
    res.send(`Hi, ${req.params.name}`)
})

app.post('/hello', (req, res) => {
    console.log(req.body)
    res.send(`Hi from params, ${req.body.name}`)
})

app.get('/browser', (req, res) => {
    res.send(`Hi from browser ${req.browser}`)
})

app.get('/square',square(5), (req, res) => {
    res.send(`number square - ${req.square}`)
})

app.get('/both',browserMiddleware, square(5), (req, res) => {
    res.send(`number square - ${req.square}`)
})

app.use('*', notFoundHandler)
app.use(errorHandler)

module.exports = {
    server: app,
    start: port => {
        app.listen(port, () => {
            console.log(`Server is up on port ${port}`)
        })
    }
}