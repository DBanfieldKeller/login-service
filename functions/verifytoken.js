const util = require ("../helpers/utils/util");
const auth = require ("../helpers/utils/auth");
const userDB = require ("../helpers/dbHelpers/user");

exports.verifyToken = async (requestHeader) => {
    const token = requestHeader.token;
    if(!token) {
        return util.buildResponse(401, {
            verified: false,
            message: "No token",
        });
    }

    const user = auth.userFromToken(token);
    const username = user.username
    console.log(token)
    console.log(user)
    console.log(username)

    const dynamoUser = await userDB.getUser(username)

    if (!dynamoUser) {
        return util.buildResponse(401, {
            verified: false,
            message: "invalid username",
        });
    }

    return util.buildResponse(200, {
        verified: true,
        message: "success",
        username: username,
    });
};