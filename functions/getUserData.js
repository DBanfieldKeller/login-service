const util = require("../helpers/utils/util");
const auth = require("../helpers/utils/auth");
const userDataDB = require("../helpers/dbHelpers/userData");

exports.getUserData = async (requestHeader) => {

    // extract data from token
    const tokenData = auth.userFromToken(requestHeader.token);
    const username = tokenData.username;
    const error = tokenData.error;

    // check for token error
    if (error) {
        return util.buildResponse(401, {
            message: `Token error: ${error}`
        })
    };
    
    const userData = await userDataDB.getUserData(username, dataType);

    return util.buildResponse(200, {"data": userData});
}