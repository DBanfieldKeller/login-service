const util = require("../helpers/utils/util");
const userDataDB = require("../helpers/dbHelpers/userData");

exports.getUserData = async (requestBody) => {
    const username = requestBody.username;
    const dataType = requestBody.dataType;

    if(!username || !dataType) {
        return util.buildResponse(401, {
            message: "Username and data type are required"
        });
    };
    
    const userData = await userDataDB.getUserData(username, dataType);

    return util.buildResponse(200, {"data": userData});
}