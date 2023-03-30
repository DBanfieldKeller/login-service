// load the AWS SDK for node
const AWS = require("aws-sdk");

// Set the region
AWS.config.update({ region: "us-east-2"});

// Create DynamoDB document client
const dynamoDB = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10"});

const userDataTable = "userdata";

exports.updateUserData = async (username, dataType, dataKey, newData) => {
    const params = {
        TableName: userDataTable,
        Key: {
            username: username,
            datatype: dataType
        },
        UpdateExpression: `set ${dataKey} = :x`,
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