'use strict';


// change the request, by adding the name of the browser to it directly.
module.exports = (req, res, next) => {
    const borwserInfo = req.headers['user-agent'];
    req.browser = borwserInfo;

    next();
}