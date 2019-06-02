const express = require("express");
const bodyParser = require("body-parser");
const CLIENT_ID = "4ea643e3197aea49a325"; // move this to env variables

const app = express();

const logger = function(req, res, next) {
  console.log("url", req.url);
  console.log("method", req.method);
  next();
};

const serveClientId = function(req, res) {
  res.send(CLIENT_ID);
};

app.use(logger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());

app.get("/getClientId", serveClientId);
app.use(express.static("."));

module.exports = app;