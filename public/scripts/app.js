//Execute code in strict method
'use strict';


let basketList;


if (localStorage.getItem('basket')){
	basketList = JSON.parse(localStorage.getItem('basket'));
}
else{
	basketList = new Array();
}

localStorage.setItem('basket', JSON.stringify(basketList));


function addJson(ProductNo, Qty){

	basketList = JSON.parse(localStorage.getItem('basket'));
	console.log(ProductNo);
	console.log(Qty)
	console.log("0")

	let isFound = false;

	//Add to basket array
	for(var i = 0; i < basketList.length; i++){

	const parsedList = JSON.parse(basketList[i]);
	
	if(parsedList.Item.ProductNo == ProductNo){
		alert('This product is already in your basket, please try selecting a different quantuity');
		isFound = true;
	}
	else{
		i = i + 1
		
		
	}}
	
	if(isFound === false){
	basketList.push('{"Item":{"ProductNo" :"' + ProductNo + '", "Quantity" :"' + Qty + '"}}');
		let bg = document.getElementById(ProductNo + "add");
		bg.style.backgroundColor = "#ba68c8";
		localStorage.setItem('basket', JSON.stringify(basketList));
	}
	
}

function removeFromBasket(ProductNo){
	for(var i = basketList.length - 1; i >= 0; i--) {
	
	const parsedList = JSON.parse(basketList[i]);
    if(parsedList.Item.ProductNo == ProductNo) {
        basketList.splice(i, 1);
        let bg = document.getElementById(ProductNo + "add");
		bg.style.backgroundColor = "#ee98fb";
        alert('Removed ' + ProductNo + 'from your basket');
        localStorage.setItem('basket', JSON.stringify(basketList));
    }
}
}

function clearBasket(){
	localStorage.clear();
	console.log("Cleared basket");
	basketList = new Array();
}


function showBasket(){
	console.log(basketList);
	console.log("Showing basket");
}
function sendBasket(){
	console.log('Sending' + basketList + 'To email');
	
	
	
	sendOrderRecievedEmail();
}
function sendOrderRecievedEmail(){
	
}

function init() {
  // Get the location list, and update the UI.
  console.log("Here")
  
  
  const refreshButton = document.getElementById('butRefresh');
	refreshButton.addEventListener('click', notif);
  
};

 function notif(){
 	Notification.requestPermission(result => {
  if (result === 'granted') {
    showNotification('So nice to have you here!', 'Hey there!')
  }
 })}

$.getJSON("/products.json", function(json){


console.log(json)


$.each(json.data, function (index, item) {

   
   	
    var img = "<img class = 'cardImage' src = '" + item.imageURL + "'/>";
    var h2 = "<h2 class = 'card-title'>" + item.productName + "</h2>";
    var p = "<p class = 'card-text'>" + item.productInfo + "</p>";
    var input = "<input type = 'number' class = 'input' id = 'inp"+item.productNo+"'></input>";
    var submit = "<input type = 'submit' id = 'sub"+item.productNo+"'></input>"
    var a = "<a class = 'card-button-link' id = '" + item.productNo + "add" + "' onclick = 'addJson(" + item.productNo + ")'>" + "Add to Basket </a>";
    var r = "<a class = 'card-button-link' id = '" + item.productNo + "rem" + "' onclick = 'removeFromBasket(" + item.productNo + ")'>" + "Remove from basket </a>";
    
    
    var prod = "<div class = 'card'>" + img + h2 + p + input + submit + a + r +"</div>";
    
    
    $(".grid-product").append(prod);
});

});

  // Set up the event handlers for all of the buttons.
  //document.getElementById('butRefresh').addEventListener('click', doSomethingRefresh());
  //document.getElementById('butAdd').addEventListener('click', doSomethingAdd);



function showNotification(title, message) {
  if ('Notification' in window) {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(title, {
        body: message,
        tag: 'vibration-sample'
      });
    });
  }
}

function getValues(){
	alert("submission");
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
