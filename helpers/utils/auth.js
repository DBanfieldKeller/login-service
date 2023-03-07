const jwt = require ("jsonwebtoken");
const userDB = require ("../dbHelpers/user");

exports.generateToken = (userInfo) => {
    if (!userInfo) {
        return null;
    }
// TODO: make expiresIn a variable
    return jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET, async (error, response) => {
        if (error) {
            return {
                verfied: false,
                message: "Invalid token",
                error: error,
            };
        }
        // lookup user name
        const dynamoUser = await userDB.getUser(response.username);
        if (response.username !== dynamoUser) {
            return {
                verified: false,
                message: "Username does not exist",
            };
        }
        return {
            verified: true,
            message: "verified",
        };
    });
};