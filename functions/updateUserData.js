const util = require("../helpers/utils/util");
const userDataDB = require("../helpers/dbHelpers/userData");

exports.updateUserData = async (requestBody, dataKey) => {
    const username = requestBody.username;
    const dataType = requestBody.dataType;
    const newData = requestBody.newData;

    const updatedUserData = await userDataDB.updateUserData(username, dataType, dataKey, newData);

    if(!updatedUserData) {
        return util.buildResponse(503, {message: "server error"});
    }

    return util.buildResponse(200, {newData: newData})
}