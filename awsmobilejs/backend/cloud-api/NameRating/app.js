/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express')
var bodyParser = require('body-parser')
var AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const mhprefix  = process.env.MOBILE_HUB_DYNAMIC_PREFIX;
const ratingsTableName = mhprefix + '-' + 'NameRatings';
const othersTableName = mhprefix + '-' + "NameIdeas";
const dynamodb = new AWS.DynamoDB.DocumentClient();

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
});


AWS.config.update({ region: process.env.REGION })

app.post('/names', function(req, res) {
  const username = req.body.username;
  const nameRatings = req.body.nameRatings;
  console.log('username : '+username);
  console.log('nameRatings : '+nameRatings);
  const data = {
    'username': username,
  }
  data[nameRatings[0].name] = nameRatings[0].rating;
  data[nameRatings[1].name] = nameRatings[1].rating;
  data[nameRatings[2].name] = nameRatings[2].rating;
  data[nameRatings[3].name] = nameRatings[3].rating;
  data[nameRatings[4].name] = nameRatings[4].rating;
  data[nameRatings[5].name] = nameRatings[5].rating;
  let putItemParams = {
    TableName: ratingsTableName,
    Item: data
  }
  dynamodb.put(putItemParams, (err, data) => {
    if(err) {
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'post call succeed!', url: req.url, data: data})
    }
  });
});


app.post('/ideas', function(req, res) {
  const username = req.body.username;
  const nameIdeas = req.body.nameIdea;
  console.log('username : '+username);
  console.log('nameIdeas : '+nameIdeas);
  let putItemParams = {
    TableName: othersTableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if(err) {
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'post call succeed!', url: req.url, data: data})
    }
  });
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
