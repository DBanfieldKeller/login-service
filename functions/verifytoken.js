const util = require ("../helpers/utils/util");
const auth = require ("../helpers/utils/auth");
const userDB = require ("../helpers/dbHelpers/user");

exports.verifyToken = async (requestHeader) => {
    const token = requestHeader.token;
    // check if token exists
    if(!token) {
        return util.buildResponse(401, {
            verified: false,
            message: "No token",
        });
    };

    // extract data from token
    const tokenData = auth.userFromToken(token);
    const username = tokenData.username;
    const error = tokenData.error;

    // check for token error
    if (error) {
        return util.buildResponse(401, {
            verified: false,
            message: `Error : ${error}`
        })
    };

    // check if username extracted from token matches a name in the DB
    const dynamoUser = await userDB.getUser(username)

    if (!dynamoUser) {
        return util.buildResponse(401, {
            verified: false,
            message: "invalid username",
        });
    };

    // if token works, 
    return util.buildResponse(200, {
        verified: true,
        message: "success",
        username: username,
    });
};