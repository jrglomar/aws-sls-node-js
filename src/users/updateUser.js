const AWS = require('aws-sdk');
const usersTable = process.env.USER_TABLE;
const { buildResponse } = require('../common/response');

module.exports.main = async (event, context, callback) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

    const { id } = event.pathParameters;
    const { userName, password } = event.body ? JSON.parse(event.body) : event;
    const updatedAt = new Date().toISOString();

    return await dynamodb.update({
        TableName: usersTable,
        Key: {
            id
        },
        UpdateExpression: "SET userName = :userName, password = :password, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
            ":userName": userName,
            ":password": password,
            ":updatedAt": updatedAt,
        },
        ReturnValues: "ALL_NEW"
    }).promise()
    .then(res => {
        callback(null, buildResponse(201, res.Attributes))
    })
    .catch(err => {
        return buildResponse(null, buildResponse(err.statusCode, err))
    })

};