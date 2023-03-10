const util = require("../helpers/utils/util");
const auth = require("../helpers/utils/auth");
const userDB = require("../helpers/dbHelpers/user");

const bcrypt = require("bcryptjs");

exports.login = async (requestBody) => {
    const username = requestBody.username;
    const password = requestBody.password;
    const expiry = requestBody.expiry;
 
    // checks if a username or password has been sent, returns 401 and error message if not
    if (!username || !password) {
        return util.buildResponse(401, {
            message: "username and password are required",
        });
    }
    
    const dynamoUser = await userDB.getUser(username);
    
    // checks if username matches username in database, returns 401 and error message if not
    if (!dynamoUser || !dynamoUser.username) {
        return util.buildResponse(401, {
            message: "incorrect username"
        });
    }

    // checks if password matches database, returns 401 and error message if not
    if (!bcrypt.compareSync(password, dynamoUser.password)) {
        return util.buildResponse(401, {
            message: "incorrect password"
        });
    }

    const loginInfo = {
        username: dynamoUser.username,
        name: dynamoUser.name,
        expiry: expiry
    };

    const token = auth.generateToken(loginInfo);

    const response = {
        login: loginInfo,
        token: token,
    };

    return util.buildResponse(200, response)
};