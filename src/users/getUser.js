const AWS = require('aws-sdk');
const usersTable = process.env.USER_TABLE;
const { buildResponse } = require('../common/response');

module.exports.main = async (event, context, callback) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

    const { id } = event.pathParameters;
    
    return await dynamodb.get({
        TableName: usersTable,
        Key: {
            id
        }
    }).promise()
    .then(res => {
        callback(null, buildResponse(200, res.Item))
    })
    .catch(err => {
        return buildResponse(null, buildResponse(err.statusCode, err))
    });

};