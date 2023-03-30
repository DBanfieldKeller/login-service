const util = require("../helpers/utils/util");
const auth = require("../helpers/utils/auth");
const userDataDB = require("../helpers/dbHelpers/userData");

exports.updateUserData = async (requestBody, requestHeader, dataKey) => {
    // extract data from body
    const dataType = requestBody.dataType;
    const newData = requestBody.newData;

    // extract data from token
    const tokenData = auth.userFromToken(requestHeader.token);
    const username = tokenData.username;
    const error = tokenData.error;
    
    // check for token error
    if(error) {
        return util.buildResponse(401, {
            message: `Token error: ${error}`
        })
    };

    //call update function for userdata DB
    const updatedUserData = await userDataDB.updateUserData(username, dataType, dataKey, newData);

    //check if update successful
    if(!updatedUserData) {
        return util.buildResponse(503, {message: "server error"});
    };

    return util.buildResponse(200, {newData: newData})
};