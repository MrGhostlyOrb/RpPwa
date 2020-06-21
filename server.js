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

//File to pull product data from
let productList = JSON.parse(fs.readFileSync('productList.json'));

//Define grid variable to store grid of items
let grid = "";

//Add all the items in the json file to the grid
for(let i = 0; i < productList.data.length; i++){
				
	let item = productList.data[i];
	let loc = '"/product' + item.productNumber + '"';
	let img = "<img class = 'cardImage' alt = 'Product Image' src = '" + item.imageURL + "'/>";
    let h2 = "<span class = 'card-title'>" + item.productName + "</span>";
   	let p = "<p class = 'card-content'>£" + item.productPrice + "</p>";
   	let lab = "<label for='inp"+item.productNumber+"'>Quantity : </label>"
   	let input = "<input type = 'number' placeholder = 'Quantity' class = 'input' min = '1' max = '999' value = '1' id = 'inp"+item.productNumber+"'></input>";
    let submit = "<button type = 'sumbit' class = 'card-button-link' onclick = 'addJson(" + item.productNumber + ");checkBasket()' value = 'Add to Basket' id = 'sub"+item.productNumber+"'>Add to Basket</button>"
    let r = "<button class = 'card-button-link' value = 'View Product' id = '" + item.productNumber + "rem" + "' onclick = 'location.href = " + loc + "'>" + "View Product</button>";
	let gridItem = "<div class = 'card'><div class = 'card-image'>" + img + h2 + "</div>" + p + lab + input + submit + r +"</div>"
	
	//Add item to the grid
	grid = grid + gridItem	
}

//Variable to store payment script
let payment = "<script> paypal.Buttons({createOrder: function (data, actions) {return fetch('/my-server/create-order', {method: 'POST'}).then(function(res) {return res.json();}).then(function(data) {return data.id;});},onApprove: function (data, actions) {return fetch('/my-server/capture-order/' + data.orderID, {method: 'POST'}).then(function(res) {if (!res.ok) {alert('Something went wrong');}});}}).render('#paypal-button-container');</script>";

//Function to begin the server
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
  			res.render('option2', 
  			{
  				title:'Option2', 
  				message:'This is the option 2 home page', 
  				grid: grid
  			});
		});
	app.get('/option3',function(req,res)
		{  
  			res.render('option3', 
  				{
  					title:'Option3', 
  					message:'This is the option 3 home page', 
  					grid: grid
  				});
		});
	app.get('/basket',function(req,res)
		{  
  			res.render('basket', 
  			{
  				title:'Basket', 
  				message:'Basket List', 
  				pay:payment
  			});
		});
	app.get('/confirmation', function(req,res){
		res.render('confirmation', 
			{
				title:'Confirmation', 
				message:'Confirmation Page'
			});
		});
	
	for(let i = 0; i < productList.data.length; i++){
		app.get('/product' + productList.data[i].productNumber, (req,res) => {			
			var item = productList.data[i];
			res.render('product', 
				{
					product: item.productNumber,
					productDescription: item.productInfo
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
  		console.log("Express server listening on port %d in %s mode", 
  			this.address().port, 
  			app.settings.env
  		);
	});
};
	var sendMail = true;
   	app.post("/foo/", function(req, res) { 
   			console.log('Here');
   		})

   	app.post("/foo2/", function(req, res) { 
   		console.log('here2');	
   		})
   	
   	app.post("/foo3/", function(req, res) { 
   		var myObject = req.body;    
   		let basket = myObject.basket;
   		console.log('About to send mail');
   		//List to store user's items
   		var list = [];
   		
   		for(var i = 0; i < basket.length; i++){ 
   			var parsed = JSON.parse(basket[i]);
   			if(parsed.Item.Quantity === "undefined"){
   				console.log("Don't send")
   				sendMail = false;
   			}        
   			list.push('\nItem Number : ' + parsed.Item.ProductNo);
   			list.push('Quantity :' + parsed.Item.Quantity);
   		} 
   		let buyerName = myObject.name;
   		let buyerTot = myObject.total;
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
  			subject: 'New Order + Payment From ' + buyerName,
  			text: 'Confirmed Order + Payment From : ' + buyerName + ',\n Name given in app : '+ myObject.name2 +',\n Email given : '+ myObject.email +',\n Phone number given : '+ myObject.phone +',\n Reference number : '+ myObject.ref + ',\n For £' + Math.round((buyerTot.total + Number.EPSILON) * 100) / 100 + '\n \n They ordered : \n \n' + list.toString()
		};
		transporter.sendMail(mailOptions, function(error, info){
  			if (error) {
   				console.log(error);
  			}
  			else {
    			console.log('Email sent to office: ' + info.response);
  			}
		}); 
		var mailOptions = {
  			from: cred.email,
  			to: myObject.email,
  			subject: 'Richmond Paper Supply Order Confirmation ',
  			text: 'Thank you for your order on the Richmond Paper Supply website ' + buyerName + ',\n \n Your reference number for this order is : '+ myObject.ref + ' please keep this for future reference,\n \n Your order total was £' + Math.round((buyerTot.total + Number.EPSILON) * 100) / 100 + '\n \n Products ordered : \n \n' + list.toString() + '\n \n Delivery Address : ' + myObject.address + ', ' + myObject.postcode + '\n \n If you have any issues with your order please contact us on : 0151 933 1000'
		};
		transporter.sendMail(mailOptions, function(error, info){
  			if (error) {
   				console.log(error);
  			}
  			else {
    			console.log('Email sent to buyer: ' + info.response);
  			}
		});    		
   	});
   	
   	app.post('/price', (req,res) => {
   		let total = 0;
   		var body = req.body;
   		console.log(body[0]);
   		if(body[0] != undefined){
			console.log(JSON.parse(body[0]).Item);
	   		for(let i = 0; i < productList.data.length; i++){
	   			for(let j = 0; j < body.length; j++){
	   				if(JSON.parse(body[j]).Item.ProductNo == productList.data[i].productNumber){
	   					console.log('Found product');
	   					total = total + (productList.data[i].productPrice * JSON.parse(body[j]).Item.Quantity);
   					}
   				}
   			}
   		}
   		else{
   			console.log('No data sent');
   		}
   		console.log("total is : " + total);
   		res.json({"total":total});
   	});
   	
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
   	});
   	
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
   	});

//Start the server
startServer();
