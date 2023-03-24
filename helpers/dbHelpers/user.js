// load the AWS SDK for node
const AWS = require("aws-sdk");

// Set the region
AWS.config.update({ region: "us-east-2"});

// Create DynamoDB document client
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10"});

const userTable = "users";

// DB Get Route

exports.getUser = async (username) => {
    const lowerCaseName = username.toLowerCase()
    const params = {
        TableName: userTable,
        Key: {
            username: lowerCaseName,
        },
    };
    return await dynamoDB
        .get(params)
        .promise()
        .then(
            (response) => {
                return response.Item;
            },
            (error) => {
                console.log("error fetching user", error);
            }
        );
};

// DB Put Route

exports.saveUser = async (user) => {
    const params = {
        TableName: userTable,
        Key: {
            username: user.username,
        },
        Item: user
    };

    return await dynamoDB
        .put(params)
        .promise()
        .then(
            (response) => {
                return true;
            },
            (error) => {
                console.log("Error saving user", error);
            }
        )
};
