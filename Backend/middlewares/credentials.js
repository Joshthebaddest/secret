const allowedOrigins = require('../config/allowedOrigin');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", "true");
        res.header('Content-Type', 'application/json')
    }
    next();
}

module.exports = credentials



  
  