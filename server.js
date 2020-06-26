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
const compression = require('compression')
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
app.use(compression());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

//File to pull product option1 from
let productList1 = JSON.parse(fs.readFileSync('productList.json')).option1;
let productList2 = JSON.parse(fs.readFileSync('productList.json')).option2;
let productList3 = JSON.parse(fs.readFileSync('productList.json')).option3;

//Define grid variable to store grid of items

//Add all the items in the json file to the grid

function chooseProductCatagory(option){
	let grid = "";
	if(option == "option1"){
		

		for(let i = 0; i < productList1.length; i++){
				
			let item = productList1[i];
	
			let loc = '"/product' + item.productNumber + '"';
			let img = "<img class = 'cardImage materialboxed responsive-image' alt = 'Product Image' src = '" + item.imageURL + "' onclick = 'window.location.href = \"/product"+ item.productNumber +"\"'/>";
    		let h2 = "<div class = 'card-content' onclick = 'window.location.href = \"/product"+ item.productNumber +"\"'><h6>" + item.productName + "</h6>";
   			let p = "<p>£" + item.productPrice.toFixed(2) + "  * inc VAT</p></div>";
   			let lab = "<div class = 'input-field'><label for='inp"+item.productNumber+"'>Quantity : </label>"
   			let input = "<input type = 'number' placeholder = 'Quantity' class = 'input validate' min = '1' max = '999' value = '1' id = 'inp"+item.productNumber+"'></input></div>";
    		let submit = "<button type = 'sumbit' class = 'btn waves-effect purple card-button-link' onclick = 'addJson(" + "\"" + item.productNumber + "\"" + ");checkBasket()' value = 'Add to Basket' id = 'sub"+item.productNumber+"'>Add to Cart</button>"
    		let r = "<button class = 'card-button-link purple btn waves-effect' value = 'View Product' id = '" + item.productNumber + "rem" + "' onclick = 'location.href = " + loc + "'>" + "View Product</button>";
			let gridItem = "<div class = 'card hoverable'><div class = 'card-image'>" + img + "</div>" + h2 + p + lab + input + submit + r +"</div>"
	
	//Add item to the grid
			grid = grid + gridItem	
	
		}
	}
	else if(option == "option2"){
		for(let i = 0; i < productList2.length; i++){
				
			let item = productList2[i];
	
			let loc = '"/product' + item.productNumber + '"';
			let img = "<img class = 'cardImage materialboxed responsive-image' alt = 'Product Image' src = '" + item.imageURL + "' onclick = 'window.location.href = \"/product"+ item.productNumber +"\"'/>";
    		let h2 = "<div class = 'card-content' onclick = 'window.location.href = \"/product"+ item.productNumber +"\"'><h6>" + item.productName + "</h6>";
   			let p = "<p>£" + item.productPrice.toFixed(2) + "  * inc VAT</p></div>";
   			let lab = "<div class = 'input-field'><label for='inp"+item.productNumber+"'>Quantity : </label>"
   			let input = "<input type = 'number' placeholder = 'Quantity' class = 'input validate' min = '1' max = '999' value = '1' id = 'inp"+item.productNumber+"'></input></div>";
    		let submit = "<button type = 'sumbit' class = 'btn waves-effect purple card-button-link' onclick = 'addJson(" + "\"" + item.productNumber + "\"" + ");checkBasket()' value = 'Add to Basket' id = 'sub"+item.productNumber+"'>Add to Cart</button>"
    		let r = "<button class = 'card-button-link purple btn waves-effect' value = 'View Product' id = '" + item.productNumber + "rem" + "' onclick = 'location.href = " + loc + "'>" + "View Product</button>";
			let gridItem = "<div class = 'card hoverable'><div class = 'card-image'>" + img + "</div>" + h2 + p + lab + input + submit + r +"</div>"
	
	//Add item to the grid
			grid = grid + gridItem	
	
		}
	}
	else if(option == "option3"){
		for(let i = 0; i < productList3.length; i++){
				
			let item = productList3[i];
	
			let loc = '"/product' + item.productNumber + '"';
			let img = "<img class = 'cardImage materialboxed responsive-image' alt = 'Product Image' src = '" + item.imageURL + "' onclick = 'window.location.href = \"/product"+ item.productNumber +"\"'/>";
    		let h2 = "<div class = 'card-content' onclick = 'window.location.href = \"/product"+ item.productNumber +"\"'><h6>" + item.productName + "</h6>";
   			let p = "<p>£" + item.productPrice.toFixed(2) + "  * inc VAT</p></div>";
   			let lab = "<div class = 'input-field'><label for='inp"+item.productNumber+"'>Quantity : </label>"
   			let input = "<input type = 'number' placeholder = 'Quantity' class = 'input validate' min = '1' max = '999' value = '1' id = 'inp"+item.productNumber+"'></input></div>";
    		let submit = "<button type = 'sumbit' class = 'btn waves-effect purple card-button-link' onclick = 'addJson(" + "\"" + item.productNumber + "\"" + ");checkBasket()' value = 'Add to Basket' id = 'sub"+item.productNumber+"'>Add to Cart</button>"
    		let r = "<button class = 'card-button-link purple btn waves-effect' value = 'View Product' id = '" + item.productNumber + "rem" + "' onclick = 'location.href = " + loc + "'>" + "View Product</button>";
			let gridItem = "<div class = 'card hoverable'><div class = 'card-image'>" + img + "</div>" + h2 + p + lab + input + submit + r +"</div>"
	
	//Add item to the grid
			grid = grid + gridItem	
	
		}
	}
	return grid;
}
//Variable to store payment script
let payment = "<script> paypal.Buttons({createOrder: function (option1, actions) {return fetch('/my-server/create-order', {method: 'POST'}).then(function(res) {return res.json();}).then(function(option1) {return option1.id;});},onApprove: function (option1, actions) {return fetch('/my-server/capture-order/' + option1.orderID, {method: 'POST'}).then(function(res) {if (!res.ok) {alert('Something went wrong');}});}}).render('#paypal-button-container');</script>";

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
  					grid: chooseProductCatagory("option1")
  				});
		});
	app.get('/option2',function(req,res)
		{  
  			res.render('option2', 
  			{
  				title:'Option2', 
  				message:'This is the option 2 home page', 
  				grid: chooseProductCatagory("option2")
  			});
		});
	app.get('/option3',function(req,res)
		{  
  			res.render('option3', 
  				{
  					title:'Option3', 
  					message:'This is the option 3 home page', 
  					grid: chooseProductCatagory("option3")
  				});
		});
	app.get('/basket',function(req,res)
		{  
  			res.render('basket', 
  			{
  				title:'Basket', 
  				message:'Basket List', 
  			});
		});
	app.get('/confirmation', function(req,res){
		res.render('confirmation', 
			{
				title:'Confirmation', 
				message:'Confirmation Page'
			});
		});
		
	app.get('/search', (req, res)=>{
		res.render('search', {
			title: 'Search',
			message: 'Search'
		})
	});
	app.post('/searchResults', (req,res)=>{
		console.log('Beginning search');
		let search = req.body.request;
		let resultsList = [];
		for(let i = 0; i < productList1.length; i++){
			let pushed = false
			if(productList1[i].productNumber.toString().toLowerCase().includes(search.toLowerCase()) && pushed == false){
				resultsList.push(productList1[i])
				console.log("Search results : " + resultsList);
				pushed = true;
			}
			if(productList1[i].productName.toString().toLowerCase().includes(search.toLowerCase()) && pushed == false){
				resultsList.push(productList1[i])
				console.log("Search results : " + resultsList);
				pushed = true;
			}
		}
		for(let i = 0; i < productList2.length; i++){
			let pushed = false
			if(productList2[i].productNumber.toString().toLowerCase().includes(search.toLowerCase()) && pushed == false){
				resultsList.push(productList2[i])
				console.log("Search results : " + resultsList);
				pushed = true;
			}
			if(productList2[i].productName.toString().toLowerCase().includes(search.toLowerCase()) && pushed == false){
				resultsList.push(productList2[i])
				console.log("Search results : " + resultsList);
				pushed = true;
			}
		}
		for(let i = 0; i < productList3.length; i++){
			let pushed = false
			if(productList3[i].productNumber.toString().toLowerCase().includes(search.toLowerCase()) && pushed == false){
				resultsList.push(productList3[i])
				console.log("Search results : " + resultsList);
				pushed = true;
			}
			if(productList3[i].productName.toString().toLowerCase().includes(search.toLowerCase()) && pushed == false){
				resultsList.push(productList3[i])
				console.log("Search results : " + resultsList);
				pushed = true;
			}
		}
		let resultHTML = "";
		if(resultsList.length < 1){
			console.log('No results');
			resultHTML = "<li>Sorry, no results found, try searching for the name of the product.</li>";
			let json = {"result": resultHTML};
			res.json(json);
		}
		else{
		console.log("Searching for : " + search);

		for(let i = 0; i < resultsList.length; i++){
			let li = "<li class = 'collection-item'>";
			let lie = "</li>";
			let a = "<br><a href = '/product" + resultsList[i].productNumber + "' class = 'btn-small'>";
			let ae = "Show Item</a>"
			resultHTML = resultHTML + li + resultsList[i].productName + "<br>" + resultsList[i].productInfo + "<br>" + a + ae + lie;
		}
		let json = {"result": resultHTML};
		res.json(json);
		}
	})
	
	for(let i = 0; i < productList1.length; i++){
		app.get('/product' + productList1[i].productNumber, (req,res) => {			
			var item = productList1[i];
			res.render('product', 
				{
					title: item.productName,
					product: item.productNumber,
					productDescription: item.productInfo,
					productPrice: item.productPrice,
					productImage: item.imageURL,
					productName: item.productName
				});
			})
		}
		for(let i = 0; i < productList2.length; i++){
		app.get('/product' + productList2[i].productNumber, (req,res) => {			
			var item = productList2[i];
			res.render('product', 
				{
					product: item.productNumber,
					productDescription: item.productInfo,
					productPrice: item.productPrice,
					productImage: item.imageURL,
					productName: item.productName
				});
			})
		}
		for(let i = 0; i < productList3.length; i++){
		app.get('/product' + productList3[i].productNumber, (req,res) => {			
			var item = productList3[i];
			res.render('product', 
				{
					product: item.productNumber,
					productDescription: item.productInfo,
					productPrice: item.productPrice,
					productImage: item.imageURL,
					productName: item.productName
				});
			})
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
   		let value = 0;
   		let weight = 0;
   		let length;
   		let width;
   		let height;
   		
   		for(var i = 0; i < basket.length; i++){ 
   			var parsed = JSON.parse(basket[i]);
   			if(parsed.Item.Quantity === "undefined"){
   				console.log("Quantity is Undefined, not sending Email");
   				sendMail = false;
   			}        
   			list.push('\nItem Number : ' + parsed.Item.ProductNo);
   			list.push('Quantity :' + parsed.Item.Quantity);
   			
   			let prodValue;
   			let prodWe;
   			
   			for(let i = 0; i < productList1.length; i++){
   			if(productList1[i].productNumber == parsed.Item.ProductNo){
   				let prodName = productList1[i].productName;
   				let prodPrice = productList1[i].productPrice;
   				let prodImg = productList1[i].imageURL;
   				let prodWeight = productList1[i].productWeight;
   				prodValue = prodPrice;
   				prodWe = prodWeight;
   				console.log("Value of product : " + prodValue);
   				console.log("Weight of product : " + prodWe);

   			}
   			
   		}
   		for(let i = 0; i < productList2.length; i++){
   			if(productList2[i].productNumber == parsed.Item.ProductNo){
   				let prodName = productList2[i].productName;
   				let prodPrice = productList2[i].productPrice;
   				let prodImg = productList2[i].imageURL;
   				let prodWeight = productList2[i].productWeight;
   				prodValue = prodPrice;
   				prodWe = prodWeight;
   				console.log("Value of product : " + prodValue);
   				console.log("Weight of product : " + prodWe);

   				
   			}
   			
   		}
   		for(let i = 0; i < productList3.length; i++){
   			if(productList3[i].productNumber == parsed.Item.ProductNo){
   				let prodName = productList3[i].productName;
   				let prodPrice = productList3[i].productPrice;
   				let prodImg = productList3[i].imageURL;
   				let prodWeight = productList3[i].productWeight;
   				prodValue = prodPrice;
   				prodWe = prodWeight;
   				console.log("Value of product : " + prodValue);
   				console.log("Weight of product : " + prodWe);

   				
   			}
   			
   		}
   		
   		value = value + prodValue;
   			weight = weight + prodWe;
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
   		
   		let lineHeaders = 'Item Name,Value,Weight,Name,Property,Town,PostCode,Telephone';
   		
   		let line = myObject.ref + ',' + value + ',' + weight + ',' + buyerName + ',' + myObject.address1 + ',' + myObject.town + ',' + myObject.postcode + ',' + myObject.phone.toString();
   		
   		
   		let csvlines = lineHeaders + '\n' + line;
   		console.log("Order : " + lineHeaders);
   		console.log("Line : " + line);
   		
   		var mailOptions = {
   			
   			
   			
  			from: cred.email,
  			to: cred.email,
  			subject: 'New Order + Payment From ' + buyerName,
  			text: 'Confirmed Order + Payment From : ' + buyerName + ',\n Name given in app : '+ myObject.name2 +',\n Email given : '+ myObject.email +',\n Phone number given : '+ myObject.phone +',\n Reference number : '+ myObject.ref + ',\n For £' + buyerTot.total.toFixed(2) + '\n \n They ordered : \n \n' + list.toString(),
  			attachments: [
  				{
  					filename: myObject.ref + '.csv',
  					content: csvlines
  				
  				}
  			]
		};
		transporter.sendMail(mailOptions, function(error, info){
  			if (error) {
   				console.log("Error with Office email : " + error);
  			}
  			else {
    			console.log('Email sent to office : ' + info.response);
  			}
		}); 
		var mailOptions = {
  			from: cred.email,
  			to: myObject.email,
  			subject: 'Richmond Paper Supply Order Confirmation ',
  			text: 'Thank you for your order on the Richmond Paper Supply website ' + buyerName + ',\n \n Your reference number for this order is : '+ myObject.ref + ' please keep this for future reference,\n \n Your order total was £' + buyerTot.total.toFixed(2) + '\n \n Products ordered : \n \n' + list.toString() + '\n \n Delivery Address : ' + myObject.address1 + ', ' + myObject.town + ',' + myObject.postcode + '\n \n If you have any issues with your order please contact us on : 0151 933 1000'
		};
		transporter.sendMail(mailOptions, function(error, info){
  			if (error) {
   				console.log("Error with Buyer email : " + error);
  			}
  			else {
    			console.log('Email sent to buyer : ' + info.response);
  			}
		});    		
   	});
   	
   	app.post('/price', (req,res) => {
   		let total = 0;
   		var body = req.body;
   		if(body[0] != undefined){
	   		for(let i = 0; i < productList1.length; i++){
	   			for(let j = 0; j < body.length; j++){
	   				if(JSON.parse(body[j]).Item.ProductNo == productList1[i].productNumber){
	   					console.log('Found product : ' + productList1[i].productNumber);
	   					total = total + (productList1[i].productPrice * JSON.parse(body[j]).Item.Quantity);
   					}
   				}
   			}
   			for(let i = 0; i < productList2.length; i++){
	   			for(let j = 0; j < body.length; j++){
	   				if(JSON.parse(body[j]).Item.ProductNo == productList2[i].productNumber){
	   					console.log('Found product : ' + productList2[i].productNumber);
	   					total = total + (productList2[i].productPrice * JSON.parse(body[j]).Item.Quantity);
   					}
   				}
   			}
   			for(let i = 0; i < productList3.length; i++){
	   			for(let j = 0; j < body.length; j++){
	   				if(JSON.parse(body[j]).Item.ProductNo == productList3[i].productNumber){
	   					console.log('Found product : ' + productList3[i].productNumber);
	   					total = total + (productList3[i].productPrice * JSON.parse(body[j]).Item.Quantity);
   					}
   				}
   			}
   		}
   		else{
   			console.log('No data sent');
   		}
   		console.log("Total so far is : " + total);
   		res.json({"total":total});
   	});
   	
   	app.post("/feedback", function(req, res) { 
   		var myObject = req.body;      
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
   				console.log("Error with email : " + error);				
   			} 
  			else {
    			console.log('Email sent with feedback : ' + info.response);
  			}
		});
   	});
   	
   	app.post("/getInfo", function(req, res) { 
   		var myObject = req.body;      
   		var resJson;
   		let ProductNo = myObject.ProductNo;
   		for(let i = 0; i < productList1.length; i++){
   			if(productList1[i].productNumber == ProductNo){
   				let prodName = productList1[i].productName;
   				let prodPrice = productList1[i].productPrice;
   				let prodImg = productList1[i].imageURL;
   				resJson = {
   					"prodName":prodName,
   					"prodPrice":prodPrice,
   					"prodImg":prodImg
   				}
   			}
   		}
   		for(let i = 0; i < productList2.length; i++){
   			if(productList2[i].productNumber == ProductNo){
   				let prodName = productList2[i].productName;
   				let prodPrice = productList2[i].productPrice;
   				let prodImg = productList2[i].imageURL;
   				resJson = {
   					"prodName":prodName,
   					"prodPrice":prodPrice,
   					"prodImg":prodImg
   				}
   			}
   		}
   		for(let i = 0; i < productList3.length; i++){
   			if(productList3[i].productNumber == ProductNo){
   				let prodName = productList3[i].productName;
   				let prodPrice = productList3[i].productPrice;
   				let prodImg = productList3[i].imageURL;
   				resJson = {
   					"prodName":prodName,
   					"prodPrice":prodPrice,
   					"prodImg":prodImg
   				}
   			}
   		}
   		console.log("Information requested for product : " + resJson.prodName);
   		res.json(resJson);
   	});

//Start the server
startServer();
