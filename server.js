'use strict'

const express = require('express')
const app = express()
const port = process.env.PORT || 6060
app.set('port', port)
const request = require('request');

// MIDDLEWARE (transform stream)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/phoenixchildrens/*', (req, res) => {
  let apiCall = req.url.slice('/api/phoenixchildrens/'.length)
  let apiReq = `https://secured.phoenixchildrens.com/SharedAssets/UCWaitTimes/${apiCall}`;
  request.get(apiReq, (err, response, body) => {
    console.log(apiReq+": "+response.statusCode);
    res.send(body)
  });
});

app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)