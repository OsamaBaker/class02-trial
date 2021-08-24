'use strict';

module.exports = (req, res, next) => {
    console.log('Request LOGGGGGER:', req.method, new Date());
    next();
}