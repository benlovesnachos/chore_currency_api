const jwt = require('jsonwebtoken'),
    secret = require('../config/env.config.js').jwt_secret,
    crypto = require('crypto');

exports.verifyRefreshBodyField = (req, res, next) => {
    console.log("start verifyRefreshBodyField");
    if (req.body && req.body.refresh_token) {
        console.log("verifyRefreshBodyField passed");
        return next();
    } else {
        console.log("verifyRefreshBodyField 400");
        return res.status(400).send({error: 'need to pass refresh_token field'});
    }
};

exports.validRefreshNeeded = (req, res, next) => {
    console.log("start validRefreshNeeded");
    let b = Buffer.from(req.body.refresh_token, 'base64');
    let refresh_token = b.toString();
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest("base64");
    if (hash === refresh_token) {
        req.body = req.jwt;
        console.log("validRefreshNeeded passed");
        return next();
    } else {
        console.log("validRefreshNeeded error");
        return res.status(400).send({error: 'Invalid refresh token'});
    }
};


exports.validJWTNeeded = (req, res, next) => {
    console.log("start validJWTNeeded");
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                console.log("validJWTNeeded 401 missing Bearer");
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                console.log("validJWTNeeded passed");
                return next();
            }

        } catch (err) {
            console.log("validJWTNeeded 403");
            return res.status(403).send();
        }
    } else {
        console.log("validJWTNeeded 401");
        return res.status(401).send();
    }
};