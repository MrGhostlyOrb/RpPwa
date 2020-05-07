//Execute code in strict method
'use strict';


let basketList;


if (localStorage.getItem('basket')){
	basketList = JSON.parse(localStorage.getItem('basket'));
}
else{
	basketList = new Array();
}

localStorage.setItem('basket', JSON.stringify(basketList))
const data = JSON.parse(localStorage.getItem('basket'))


function addJson(ProductNo, Qty){
	console.log(ProductNo);
	console.log(Qty)

	//Add to basket array
	if(basketList.includes(ProductNo)){
		alert('This product is already in your basket, please try selecting a different quantuity')
	}
	else{
		basketList.push(ProductNo);
		let bg = document.getElementById(ProductNo + "add");
		bg.style.backgroundColor = "#ba68c8";
		localStorage.setItem('basket', JSON.stringify(basketList));
		
		
	}
	
}

function removeFromBasket(ProductNo){
	for(var i = basketList.length - 1; i >= 0; i--) {
    if(basketList[i] === ProductNo) {
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
    var a = "<a class = 'card-button-link' id = '" + item.productNo + "add" + "' onclick = 'addJson(" + item.productNo + ")'>" + "Add to Basket </a>";
    var r = "<a class = 'card-button-link' id = '" + item.productNo + "rem" + "' onclick = 'removeFromBasket(" + item.productNo + ")'>" + "Remove from basket </a>";
    
    
    var prod = "<div class = 'card'>" + img + h2 + p + a + r +"</div>";
    
    
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

init();
