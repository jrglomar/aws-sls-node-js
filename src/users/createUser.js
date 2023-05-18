const AWS = require('aws-sdk');
const { v4 : uuid } = require('uuid');
const { buildResponse } = require('../common/response');
const usersTable = process.env.USER_TABLE;

module.exports.main = async (event, context, callback) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient( { apiVersion: '2012-08-10'} )

    const { userName, password } = event.body ? JSON.parse(event.body) : event;
    const createdAt = new Date().toISOString();
    
    const data = {
        id: uuid(),
        createdAt,
        updatedAt: createdAt,
        userName,
        password,
    }

    return await dynamodb.put({
        TableName: usersTable,
        Item: data
    }).promise()
    .then(() => {
        callback(null, buildResponse(200, data))
    })
    .catch(err => {
        return buildResponse(null, buildResponse(err.statusCode, err))
    })


};