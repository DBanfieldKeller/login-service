const util = require ("../helpers/utils/util");
const auth = require ("../helpers/utils/auth");

exports.verifyToken = (requestHeader) => {
    const token = requestHeader.token;
    if(!token) {
        return util.buildResponse(401, {
            verified: false,
            message: "No token",
        });
    }

    const verification = auth.verifyToken(token);
    console.log(token)
    console.log(verification);

    if (!verification.verified) {
        return util.buildResponse(420, verification.message);
    }

    return util.buildResponse(200, {
        verified: true,
        message: "success",
        username: username,
    });
};