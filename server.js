//Code will be executed in strict mode
'use strict';

//Imports for node modules
const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const http = require('http');
const https = require('https');
const http2 = require('http2');
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
var userName = "";
var userPhone = "";
var total = "";

let productList = JSON.parse(fs.readFileSync('productList.json'));
//Function to begin server and serve pages
let grid = "";
for(let i = 0; i < productList.data.length; i++){
				
	let item = productList.data[i];
	let loc = '"/product' + item.productNumber + '"';
	let img = "<img class = 'cardImage' alt = 'Product Image' src = '" + item.imageURL + "'/>";
    let h2 = "<h2 class = 'card-title'>" + item.productName + "</h2>";
    let p = "<p class = 'card-text'>£" + item.productPrice + "</p>";
    let lab = "<label for='inp"+item.productNumber+"'>Quantity : </label>"
    let input = "<input type = 'number' placeholder = 'Quantity' class = 'input' min = '1' max = '999' value = '1' id = 'inp"+item.productNumber+"'></input>";
    let submit = "<button type = 'sumbit' class = 'card-button-link' onclick = 'addJson(" + item.productNumber + ");checkBasket()' value = 'Add to Basket' id = 'sub"+item.productNumber+"'>Add to Basket</button>"
    let r = "<button class = 'card-button-link' value = 'View Product' id = '" + item.productNumber + "rem" + "' onclick = 'location.href = " + loc + "'>" + "View Product</button>";
	
	let gridItem = "<div class = 'card'>" + img + h2 + p + lab + input + submit + r +"</div>"
			grid = grid + gridItem
			
}
let payment = "<script> paypal.Buttons({createOrder: function (data, actions) {return fetch('/my-server/create-order', {method: 'POST'}).then(function(res) {return res.json();}).then(function(data) {return data.id;});},onApprove: function (data, actions) {return fetch('/my-server/capture-order/' + data.orderID, {method: 'POST'}).then(function(res) {if (!res.ok) {alert('Something went wrong');}});}}).render('#paypal-button-container');</script>"
function startServer() {

	app.get('/', function(req,res){
		res.render('index');
	});

	app.get('/option1',function(req,res)
		{  

  			res.render('option1', 
  			{
  				title:'Option1', 
  				message:'This is the option 1 home page',
  				grid: grid
  				
  			});
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
  			res.render('basket', {title:'Basket', message:'Basket List', pay:payment});
		});
	app.get('/confirmation', function(req,res){
		res.render('confirmation', {title:'Confirmation', message:'Confirmation Page'})
	})
	
	
	for(let i = 0; i < productList.data.length; i++){
		app.get('/product' + productList.data[i].productNumber, (req,res) => {
			
			var item = productList.data[i];
			
			res.render('product', 
				{
					product:item.productNumber,
					productDescription:item.productInfo,
					
				});
		})
	}
	
	
	
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
	var sendMail = true;
   	app.post("/foo/", function(req, res) { 
   		
   		setTimeout(() => {
   		console.log('About to send mail');
   		var list = [];
   		var myObject = req.body;      
   		console.log(myObject); 
   		for(var i = 0; i < myObject.length; i++){ 
   			var parsed = JSON.parse(myObject[i]);
   			
   			if(parsed.Item.Quantity === "undefined"){
   				console.log("Don't send")
   				sendMail = false;
   			}        
   			list.push('Item Number : ' + parsed.Item.ProductNo);
   			list.push('Quantity :' + parsed.Item.Quantity);
   		} 
   		var transporter = nodemailer.createTransport({   
   			service: 'Outlook365',   
   			auth: {     
   				user: cred.email,     
   				pass: cred.password
   				} 
   		});
   		var mailOptions = {
  			from: cred.email,
  			to: cred.email,
  			subject: 'New Online Order From ' + userEmail,
  			text: 'Their email : ' + userEmail + ', Their name : ' + userName + ', Their phone number : ' + userPhone + ', Their total : £' + Math.round((total + Number.EPSILON) * 100) / 100 + '\n \n They bought : ' + list.toString()
		};
		if(sendMail == true){
			transporter.sendMail(mailOptions, function(error, info){
  				if (error) {
    				console.log(error);
  				} 
  				else {
    				console.log('Email sent: ' + info.response);
  				}
			});
		}
   	}, 5000)})

   	app.post("/foo2/", function(req, res) { 
   		var myObject = req.body;      
   		console.log(myObject); 
   		userEmail = myObject.email;
   		userName = myObject.name;
   		userPhone = myObject.phone;
   		total = myObject.total;
   	})
   	
   	app.post("/foo3/", function(req, res) { 
   		var myObject = req.body;      
   		console.log(myObject); 
   		let buyerName = myObject.name;
   		var transporter = nodemailer.createTransport({   
   			service: 'Outlook365',   
   			auth: {     
   				user: cred.email,     
   				pass: cred.password
   				} 
   		});
   		var mailOptions = {
  			from: cred.email,
  			to: cred.email,
  			subject: 'New Payment From ' + userEmail,
  			text: 'Confirmed Payment From : ' + buyerName
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
   	
   	app.post('/price', (req,res) => {
   		let total = 0;
   		var body = req.body;
   		console.log(body[0]);
   		if(body[0] != undefined){

   		console.log(JSON.parse(body[0]).Item);
   		for(let i = 0; i < productList.data.length; i++){
   			for(let j = 0; j < body.length; j++){
   				console.log(JSON.parse(body[j]).Item.ProductNo);
   				console.log(productList.data[i].productNumber);
   				if(JSON.parse(body[j]).Item.ProductNo == productList.data[i].productNumber){
   					console.log('Found product');
   					console.log(productList.data[i].productPrice);
   					total = total + (productList.data[i].productPrice * JSON.parse(body[j]).Item.Quantity);
   					console.log(total);

   				}
   				else{
   					console.log('no');
   				}
   			}
   			
   		
   		}}else{
   		console.log('nah');
   		}
   		console.log(total);
   		res.json({"total":total});
   		
   	
   	})
   	
   	app.post("/feedback", function(req, res) { 
   		var myObject = req.body;      
   		console.log(myObject); 
   		let feedback = myObject.feedBack;
   		var transporter = nodemailer.createTransport({   
   			service: 'Outlook365',   
   			auth: {     
   				user: cred.email,     
   				pass: cred.password
   				} 
   		});
   		var mailOptions = {
  			from: cred.email,
  			to: cred.email,
  			subject: 'New Feedback about website',
  			text: feedback
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
   	
   	app.post("/getInfo", function(req, res) { 
   		var myObject = req.body;      
   		var resJson;
   		console.log(myObject); 
   		let ProductNo = myObject.ProductNo;
   		
   		for(let i = 0; i < productList.data.length; i++){
   			
   		
   			if(productList.data[i].productNumber == ProductNo){
   				let prodName = productList.data[i].productName;
   				let prodPrice = productList.data[i].productPrice;
   				let prodImg = productList.data[i].imageURL;
   				
   				resJson = {
   					"prodName":prodName,
   					"prodPrice":prodPrice,
   					"prodImg":prodImg
   				}
   			}
   		
   		}
   		console.log(resJson);
   		res.json(resJson);
   		
		
   		
   	})

startServer();
