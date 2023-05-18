
const AWS = require('aws-sdk');
const { v4 : uuid } = require('uuid')
const tasksTable = process.env.TASK_TABLE;
const { buildResponse } = require('../common/response');

module.exports.main = async (event, context, callback) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

    const { title, description } = event.body ? JSON.parse(event.body) : event;
    const createdAt = new Date().toISOString();

    const data = {
        id: uuid(),
        title, 
        description,
        createdAt,
        updatedAt: createdAt,
        done: false
    };

    return await dynamodb.put({
        TableName: tasksTable,
        Item: data
    }).promise()
    .then(() => {
        callback(null, buildResponse(201, data))
    })
    .catch(err => {
        return buildResponse(null, buildResponse(err.statusCode, err))
    });

};