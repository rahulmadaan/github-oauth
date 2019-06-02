const express = require("express");
const bodyParser = require("body-parser");
const request = require("superagent");
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const app = express();

const logger = function(req, res, next) {
  console.log("url", req.url);
  console.log("method", req.method);
  next();
};

const serveClientId = function(req, res) {
  res.send(CLIENT_ID);
};

const processGithubRequest = function(req, res) {
  const { code } = req.query;
  request
    .post("https://github.com/login/oauth/access_token")
    .send({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code
    })
    .set("Accept", "application/json")
    .then(function(response) {
      console.log(response.body);
    });
};

app.use(logger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

app.get("/getClientId", serveClientId);
app.get("/github/callback", processGithubRequest);

app.use(express.static("."));

module.exports = app;
