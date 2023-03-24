const jwt = require ("jsonwebtoken");

// generate token
exports.generateToken = (loginInfo) => {
    if (!loginInfo) {
        return null;
    }
    
    let expiry
    if (!loginInfo.expiry) {
        expiry = "1h"
    } else {
        expiry = loginInfo.expiry 
    }
    return jwt.sign(loginInfo, process.env.JWT_SECRET, {
        expiresIn: expiry,
    });
};

// extract username from token
exports.userFromToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
        if (error) {
            return {
                verfied: false,
                message: "Invalid token",
                error: error,
            };
        }
        return {
             username: response.username
        };
    });
};