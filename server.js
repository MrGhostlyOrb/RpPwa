//Code will be executed in strict mode
'use strict';

//Imports for node modules
const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const http = require('http');
const https = require('https');
const fs = require('fs');

//Constant for the express app
const app = express();

//Set app to use a pug interface to display pages
app.engine('pug', require('pug').__express)
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

//Redirect HTTP to HTTPS,
app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));
//Handle requests for static files
app.use(express.static('public'));
app.use(function(request, response){
  if(!request.secure){
    response.redirect("https://" + request.headers.host + request.url);
  }
});
//Function to begin server and serve pages
function startServer() {
	
//May not need this
//function onRequest(request,response){
  //if(request.method == 'GET' && request.url == '/') {
          //response.writeHead(200,{"Content-Type":"text/html"});
          //fs.createReadStream("./index.html").pipe(response);
  //} else if(request.method == 'GET' && request.url == '/jquery-3.2.0.min.js') {
          //response.writeHead(200,{"Content-Type":"text/javascript"});
          //fs.createReadStream("./jquery-3.2.0.min.js").pipe(response);
  //} else if(request.method == 'GET' && request.url == '/app.js') {
          //response.writeHead(200,{"Content-Type":"text/javascript"});
          //fs.createReadStream("./app.js").pipe(response);
  //}
  //else if(request.method == 'GET' && request.url == '/article.json') {
          //response.writeHead(200,{"Content-Type":"text/json"});
          //fs.createReadStream("./article.json").pipe(response);
  //}


	app.get('/', function(req,res){
		res.render('index');
	});

	app.get('/option1',function(req,res)
{  
  res.render('option1', {title:'Option1', message:'This is the option 1 home page'});
});
	app.get('/option2',function(req,res)
{  
  res.render('option2', {title:'Option2', message:'This is the option 2 home page'});
});
	app.get('/option3',function(req,res)
{  
  res.render('option3', {title:'Option3', message:'This is the option 3 home page'});
});

//Start the server
  
 var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}
  
http.createServer(app).listen(8000);
https.createServer(options, app).listen(8001);
console.log("Server running on port 8000/8001")

};

startServer();
