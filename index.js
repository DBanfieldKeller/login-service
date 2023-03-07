const registerPath = "/register";
const loginPath = "/login";
const verifyTokenPath = "/verifytoken"

const registerService = require("./functions/register");
const loginService = require("./functions/login");
const verifyTokenService = require("./functions/verifytoken");

const util = require("./helpers/utils/util");

exports.handler = async (event) => {
    console.log(" Request Event : ", event);
    const { httpMethod, resource} = event;
    const requestBody = JSON.parse(event.body);
    const requestHeader = event.headers

    let response;
    switch (true) {
        case httpMethod === "POST" && resource === registerPath:
            response = await registerService.register(requestBody);
            break;
        case httpMethod === "POST" && resource === loginPath:
            response = await loginService.login(requestBody);
            break;
        case httpMethod === "GET" && resource === verifyTokenPath:
            response = await verifyTokenService.verifyToken(requestHeader);
            break;
        default:
            response - util.buildResponse(404, "404 Not Found");
    }

    return response
}