const registerResource = "/register";
const loginResource = "/login";
const verifyTokenResource = "/verifytoken";
const userDataResource = "/userdata/{dataKey}"

const registerService = require("./functions/register");
const loginService = require("./functions/login");
const verifyTokenService = require("./functions/verifytoken");
const updateService = require("./functions/updateUserData");

const util = require("./helpers/utils/util");

exports.handler = async (event) => {
    console.log(" Request Event : ", event);
    const { httpMethod, resource, pathParameters} = event;
    const requestBody = JSON.parse(event.body);
    const requestHeader = event.headers;
    const dataKey = pathParameters.dataKey

    // determine incoming request
    let response;
    switch (true) {
        case httpMethod === "POST" && resource === registerResource:
            response = await registerService.register(requestBody);
            break;
        case httpMethod === "POST" && resource === loginResource:
            response = await loginService.login(requestBody);
            break;
        case httpMethod === "GET" && resource === verifyTokenResource:
            response = await verifyTokenService.verifyToken(requestHeader);
            break;
        case httpMethod === "PUT" && resource === userDataResource :
            response = await updateService.updateUserData(requestBody, dataKey);
            console.log(dataKey);
            break;
        default:
            response = util.buildResponse(404, "404 Not Found");
    }

    return response
}