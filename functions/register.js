const util = require("../helpers/utils/util");
const userDB = require("../helpers/dbHelpers/user");
const bcrypt = require("bcryptjs");

exports.register = async (userInfo) => {
    const username = userInfo.username;
    const name = userInfo.name;
    const password = userInfo.password;

    // check for blank fields
    if (!username || !password || !name) {
        return util.buildResponse(401, {
            message: "All fields are required",
        });
    }

    // access DB and check if user already exists
    const dynamoUser = await userDB.getUser(username);
    if (dynamoUser && dynamoUser.username) {
        return util.buildResponse(401, {
            message: "User already exists",
        });
    }

    // encrypt password
    const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
    // create user object
    const user = {
        name: name,
        username: username.toLowerCase(),
        password: encryptedPassword,
    };

    // store user object
    const savedUserResponse = await userDB.saveUser(user);
    if (!savedUserResponse) {
        return util.buildResponse(503, { message: "server error"});
    }

    return util.buildResponse(200, { username: username});
};