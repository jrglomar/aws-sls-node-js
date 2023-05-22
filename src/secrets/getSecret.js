const { buildResponse } = require('../common/response');
const AWS = require("aws-sdk");
const client = new AWS.SecretsManager({ region: 'us-east-1' });

module.exports.main = async (event, context, callback) => {

    const { env, secretName } = event.pathParameters ? JSON.parse(event.pathParameters) : event;
    const secretIdValue = `${env}/${secretName}`;

    return await client.getSecretValue({
        SecretId: secretIdValue
    }).promise()
        .then((data) => {
            const api_token_value = data.SecretString ? JSON.parse(data.SecretString) : JSON.parse({ message: "Invalid credentials" });
            callback(null, buildResponse(201, api_token_value));
        }).catch(err => {
            return buildResponse(null, buildResponse(err.statusCode, err))
        })
};