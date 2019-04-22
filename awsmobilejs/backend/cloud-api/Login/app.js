/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express')
var bodyParser = require('body-parser')
var AWS = require('aws-sdk'),
  region = "eu-west-2",
  secretName = "babyshower/credentials",
  secret,
  decodedBinarySecret;
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

var client = new AWS.SecretsManager({
  region: region
});

app.get('/login', async function(req, res) {
    try{
    let data = await client.getSecretValue({SecretId: 'babyshower/credentials'}).promise();
    let password = JSON.parse(data.SecretString).babyshowerCredentials;
    if(req.query.password === password){
      res.json("OK");
    }else {
      res.json("password error");
    }
  }catch(error){
    if (error.code === 'ResourceNotFoundException') {
      console.log('The requested secret ' + secretId + ' was not found');
    } else if (error.code === 'InvalidRequestException') {
        console.log('The request was invalid due to: ' + error.message);
    } else if (error.code === 'InvalidParameterException') {
        console.log('The request had invalid params: ' + error.message);
    } else {
        console.log(error);
    };
    res.json("error");
    throw error;
  }
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
