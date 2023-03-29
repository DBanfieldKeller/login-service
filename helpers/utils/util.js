// lambda response format
exports.buildResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "token",
            "Content-Type" : "application/json",
            "token" : body.token
        },
        body: JSON.stringify(body),
    }
};