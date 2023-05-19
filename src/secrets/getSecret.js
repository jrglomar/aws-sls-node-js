const { buildResponse } = require('../common/response');
const AWS = require("aws-sdk");
const client = new AWS.SecretsManager({ region: 'us-east-1' });
const secretName = 'dev/todo_api_token';

module.exports.main = async (event, context, callback) => {

    return secretValue = await client.getSecretValue({
        SecretId: secretName
    }).promise()
        .then((data) => {
            const api_token_value = data.SecretString ? JSON.parse(data.SecretString) : data.secretString;
            callback(null, buildResponse(201, api_token_value));
        }).catch(err => {
            return buildResponse(null, buildResponse(err.statusCode, err))
        })

};