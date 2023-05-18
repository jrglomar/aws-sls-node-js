const AWS = require('aws-sdk')
const { buildResponse } = require('../common/response');
const usersTable = process.env.USER_TABLE;

module.exports.main = async (event, context, callback) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

    return await dynamodb.scan({
        TableName: usersTable
    }).promise()
    .then(res => {
        callback(null, buildResponse(200, res.Items))
    })
    .catch(err => {
        return buildResponse(null, buildResponse(err.statusCode, err))
    });
};