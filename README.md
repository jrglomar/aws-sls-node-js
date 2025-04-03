# AWS Serverless Node.js Project

## Deployment Instructions

### Deploying to AWS
1. Ensure you have the [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/) installed.
2. Configure your AWS credentials using the AWS CLI or environment variables.
3. Run the following command to deploy the application:
   ```bash
   serverless deploy
   ```
4. After deployment, note the endpoints and resources provided in the output.

### Running Offline
1. Install the `serverless-offline` plugin if not already installed:
   ```bash
   npm install serverless-offline --save-dev
   ```
2. Start the application offline using the following command:
   ```bash
   serverless offline
   ```
3. Access the application locally at the endpoints provided in the console output.
