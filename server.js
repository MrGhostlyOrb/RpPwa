//Code will be executed in strict mode
'use strict';

//Imports for node modules
const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const http = require('http');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

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
app.use(express.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
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

app.get('/basket/',function(req,res)
{  
  res.render('basket', {title:'Basket', message:'Basket List'});
});

app.get('/cust/',function(req,res)
{  
  res.render('basket', {title:'Basket', message:'Basket List'});
});

//Start the server
  
 var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}
  
app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
  
http.createServer(app).listen(3000);
//https.createServer(options, app).listen(3001);
console.log("Server running on port 3000/3001")

};

app.post("/basket/"), function(req, res){

	var bod = req.body;
	console.log(bod);
}

app.post("/foo/", function(req, res) {

    var myObject = req.body;

    console.log(myObject);
    
    for(var i = 0; i < myObject.length; i++){
    	var parsed = JSON.parse(myObject[i])
    	console.log(parsed.Item.ProductNo);
    	console.log(parsed.Item.Quantity);
    }
	
	var transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: 'orders@richmondpapersupply.co.uk',
    pass: 'rICHMOND1155'
  }
});

var mailOptions = {
  from: 'orders@richmondpapersupply.co.uk',
  to: 'bassbencooper999@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!' + parsed.Item.ProductNo
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

    res.send("I am done");
});

startServer();
