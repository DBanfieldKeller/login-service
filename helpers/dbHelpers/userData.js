// load the AWS SDK for node
const AWS = require("aws-sdk");

// Set the region
AWS.config.update({ region: "us-east-2"});

// Create DynamoDB document client
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10"});

const userDataTable = "userdata";

exports.getUserData = async (username, dataType) =>{
    const params = {
        TableName: userDataTable,
        Key: {
            username: username,
            datatype: dataType
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
                console.log("error fetching user data", error);
            }
        )
};


// DB update
exports.updateUserData = async (username, dataType, newData) => {
    const params = {
        TableName: userDataTable,
        Key: {
            username: username,
            datatype: dataType
        },
        UpdateExpression: `set dataValue = :x`,
        ExpressionAttributeValues: {
            ":x": `${newData}`
        }
    };

    return await dynamoDB
        .update(params)
        .promise()
        .then(
            (response) => {
                console.log(response)
                return true;
            },
            (error) => {
                console.log(error);
            }
        )
};