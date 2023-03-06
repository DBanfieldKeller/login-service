exports.buildResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type" : "application/json",
            "Token" : body.token
        },
        body: JSON.stringify(body),
    }
};