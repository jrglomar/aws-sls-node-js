
const AWS = require('aws-sdk');
const tasksTable = process.env.TASK_TABLE;
const { buildResponse } = require('../common/response');

module.exports.main = async (event, context, callback) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

    const { id } = event.pathParameters;

    const { done } = event.body ? JSON.parse(event.body) : event;
    const updatedAt = new Date().toISOString();

    return await dynamodb.update({
        TableName: tasksTable,
        Key: { id },
        UpdateExpression: "set done = :done, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
            ":done": done,
            ":updatedAt": updatedAt,
        },
        ReturnValues: "ALL_NEW"
    }).promise()
    .then(res => {
        callback(null, buildResponse(200, res))
    })
    .catch(err => {
        return buildResponse(null, buildResponse(err.statusCode, err))
    })

};