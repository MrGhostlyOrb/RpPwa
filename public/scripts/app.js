//Execute code in strict method
'use strict';



let basketList = [];
function addJson(ProductNo, Qty){
	console.log(ProductNo);
	console.log(Qty)
	//Add to basket array
	if(basketList.includes(ProductNo)){
		alert('This product is already in your basket, please try selecting a different quantuity')
	}
	else{
		basketList.push(ProductNo);
		let bg = document.getElementById(ProductNo);
		bg.style.backgroundColor = "red"
		
	}
	
}

function removeFromBasket(ProductNo){
	for(var i = basketList.length - 1; i >= 0; i--) {
    if(basketList[i] === ProductNo) {
        basketList.splice(i, 1);
        let bg = document.getElementById(ProductNo);
		bg.style.backgroundColor = "grey"
        alert('Removed ' + ProductNo + 'from your basket')
    }
}


}

function showBasket(){
	console.log(basketList);
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
    var a = "<a class = 'card-button-link' id = '" + item.productNo + "' onclick = 'addJson(" + item.productNo + ")'>" + "Add to Basket </a>";
    var r = "<a class = 'card-button-link' id = '" + item.productNo + "' onclick = 'removeFromBasket(" + item.productNo + ")'>" + "Remove from basket </a>";
    
    
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
