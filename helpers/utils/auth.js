const jwt = require ("jsonwebtoken");

exports.generateToken = (userInfo) => {
    if (!userInfo) {
        return null;
    }
// TODO: make expiresIn a variable
    return jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

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