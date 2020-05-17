//Execute code in strict method
'use strict';

//Variable to store the user's basket
let basketList;

//Check if there is a basket already in local storage
if (localStorage.getItem('basket')){
	basketList = JSON.parse(localStorage.getItem('basket'));
}
//Otherwise create a new basket locally
else{
	basketList = new Array();
}

//Save basket in local storage
localStorage.setItem('basket', JSON.stringify(basketList));

//Function to add a product to the user's basket
function addJson(ProductNo, Qty){

	basketList = JSON.parse(localStorage.getItem('basket'));
	console.log(ProductNo);
	console.log(Qty)
	//Check if the product is already in the basket
	let isFound = false;
	for(var i = 0; i < basketList.length; i++){
		const parsedList = JSON.parse(basketList[i]);
	
		if(parsedList.Item.ProductNo == ProductNo){
			alert('This product is already in your basket');
			isFound = true;
		}
		else{
			i = i + 1;
		}}
	
	if(isFound === false){
		basketList.push('{"Item":{"ProductNo" :"' + ProductNo + '", "Quantity" :"' + Qty + '"}}');
		let bg = document.getElementById("sub" + ProductNo);
		bg.style.backgroundColor = "#ba68c8";
		localStorage.setItem('basket', JSON.stringify(basketList));
	}
	
}

//Function to remove an item from the customer's basket
function removeFromBasket(ProductNo){
	for(var i = basketList.length - 1; i >= 0; i--) {
		const parsedList = JSON.parse(basketList[i]);
    	if(parsedList.Item.ProductNo == ProductNo) {
        	basketList.splice(i, 1);
        	let bg = document.getElementById("sub" + ProductNo);
			bg.style.backgroundColor = "#ee98fb";
        	alert('Removed ' + ProductNo + 'from your basket');
        	localStorage.setItem('basket', JSON.stringify(basketList));
    	}
	}
}

//Function to clear the basket from local storage
function clearBasket(){
	localStorage.clear();
	console.log("Cleared basket");
	basketList = new Array();
}

//Function for debugging to show basket
function showBasket(){
	console.log(basketList);
	console.log("Showing basket");
}

//Function to send the basket to the RP email account
function sendBasket(){
	fetch('/foo/', {
  		method: 'post',
  		headers: {
    		'Accept': 'application/json, text/plain, */*',
    		'Content-Type': 'application/json'
  		},
  		body: localStorage.getItem('basket')
	}).then(res=>res.json())
  		.then(res => console.log(res));
	console.log('Sending' + basketList + 'To email');
}

//Function to send the form data to the RP email account
function sendData(e){
	e.preventDefault();
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const phone = document.getElementById("phone").value;
	const time = document.getElementById("time").value;
	const bodyToSubmit = {
		"name": name,
		"email": email,
		"phone": phone,
		"time": time
	}
	fetch('/foo2/', {
  		method: 'post',
  		headers: {
    		'Accept': 'application/json, text/plain, */*',
    		'Content-Type': 'application/json'
  		},
  		body: JSON.stringify(bodyToSubmit)
	}).then(res=>res.json())
  		.then(res => console.log(res));
}

//Function for basic page interactions
function init() {
  	const refreshButton = document.getElementById('butRefresh');
	refreshButton.addEventListener('click', notif);
};

//Function to send a test notification to the user when the refersh button is clicked
function notif(){
	Notification.requestPermission(result => {
  		if (result === 'granted') {
    		showNotification('So nice to have you here!', 'Hey there!')
  		}
 	})
}

function productLoad(){
	var request = new XMLHttpRequest();
request.open('GET', '/products.json', true);

request.onload = function() {
  	if (this.status >= 200 && this.status < 400) {
    	// Success!
    	var json = JSON.parse(this.response);
    	for(var index = 0; index < json.data.length; index++){
    		var item = json.data[index];
    	
    		var img = "<img class = 'cardImage' alt = 'Product Image' src = '" + item.imageURL + "'/>";
    		var h2 = "<h2 class = 'card-title'>" + item.productName + "</h2>";
    		var p = "<p class = 'card-text'>" + item.productInfo + "</p>";
    		var lab = "<label for='inp"+item.productNo+"'>Quantity</label>"
    		var input = "<input type = 'number' class = 'input' id = 'inp"+item.productNo+"'></input>";
    		var submit = "<button type = 'submit' class = 'card-button-link' onclick = 'addJson(" + item.productNo + ")' value = 'Add to Basket' id = 'sub"+item.productNo+"'>Add to Basket</button>"
    		var r = "<button class = 'card-button-link' value = 'Remove From Basket' id = '" + item.productNo + "rem" + "' onclick = 'removeFromBasket(" + item.productNo + ")'>" + "Remove From Basket</button>";
    		//Add all variables to build the HTML element
    		var prod = "<div class = 'card'>" + img + h2 + p + lab + input + submit + r +"</div>";
    		//Append the HTML element to the page
    		if(document.getElementById("grid-product").innerHTML == null){
    			document.getElementById("grid-product").innerHTML = prod
    		}
    		else{
    			document.getElementById("grid-product").innerHTML = document.getElementById("grid-product").innerHTML + prod
    		}
    	}
  	}	 
  	else {
    // We reached our target server, but it returned an error
	console.log("There was an error");
  	}	
};

request.onerror = function() {
	console.log("Connection error")
};

request.send();
}



//Function to show a notification
function showNotification(title, message) {
  	if ('Notification' in window) {
    	navigator.serviceWorker.ready.then(registration => {
      		registration.showNotification(title, {
        		body: message,
        		tag: 'vibration-sample'
        		//image, icon
      		});
    	});
  	}
}

//Function to get the user's selected quantity of item
function getValues(){
	const inputs = document.getElementsByClassName('input');
	console.log(inputs);
	for(var i = 0; i < inputs.length; i++){
		if(inputs[i].value === ""){
			continue
		}
		else{
			console.log("found input")
			var productNumber = inputs[i].id.substr(3);
			if (localStorage.getItem('basket')){
				var basketList2 = JSON.parse(localStorage.getItem('basket'));
				addQty(productNumber, basketList2, inputs[i].value);
			}
			else{
				alert("There is nothing in your basket")
			}
		}
	}
}

//Function to add quantity to the basket
function addQty(productNumber, basketList2, quantity){
	for(let j = 0; j < basketList2.length; j++){
		const parsedList = JSON.parse(basketList[j]);
		if(parsedList.Item.ProductNo == productNumber){
			console.log("found item");
			parsedList.Item.Quantity = quantity;
			console.log(parsedList.Item.Quantity);
			console.log(parsedList);
			basketList2[j] = JSON.stringify(parsedList);
			console.log(basketList2[j])
			localStorage.setItem('basket', JSON.stringify(basketList2));
		}
		else{
			console.log("not found item");
		}
	}
}

init();
