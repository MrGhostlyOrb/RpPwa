//Code will be executed in strict mode
'use strict';

//Imports for node modules
const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const http = require('http');
const https = require('https');
const fs = require('fs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

//Constant for credentials file
const cred = require('./cred.json');

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
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

//Variable to store user's email for orders
var userEmail = "";
//Function to begin server and serve pages
function startServer() {

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
	app.get('/basket',function(req,res)
		{  
  			res.render('basket', {title:'Basket', message:'Basket List'});
		});

	//Options for ssl  
 	var options = {
    	key: fs.readFileSync('key.pem'),
    	cert: fs.readFileSync('cert.pem')
	}
  
	//Start the server on PORT 8080
	app.listen(process.env.PORT || 8080, function(){
  		console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
	});

};

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
   				user: cred.email,     
   				pass: cred.password 
   				} 
   		});
   		var mailOptions = {
  			from: 'admin@richmondpapersupply.co.uk',
  			to: 'bassbencooper999@gmail.com',
  			subject: 'Sending Email using Node.js' + userEmail,
  			text: 'That was easy!' + userEmail + myObject
		};
		transporter.sendMail(mailOptions, function(error, info){
  			if (error) {
    			console.log(error);
  			} 
  			else {
    			console.log('Email sent: ' + info.response);
  			}
		});
   	})

   	app.post("/foo2/", function(req, res) { 
   		var myObject = req.body;      
   		console.log(myObject); 
   		userEmail = myObject.email;
   	})

startServer();
