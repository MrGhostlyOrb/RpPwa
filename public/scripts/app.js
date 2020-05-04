//Execute code in strict method
'use strict';

let basketList = [];
function addJson(ProductNo, Qty){
	console.log(ProductNo);
	console.log(Qty)
	//Add to basket array
	basketList.push(ProductNo);
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
  $("button").click( function() {
 
});
  

$.getJSON("/products.json", function(json){


console.log(json)


$.each(json.data, function (index, item) {

   
   	
    var img = "<img class = 'cardImage' src = '" + item.imageURL + "'/>";
    var h2 = "<h2 class = 'card-title'>" + item.productName + "</h2>";
    var p = "<p class = 'card-text'>" + item.productInfo + "</p>";
    var a = "<a class = 'card-button-link' onclick = 'addJson(" + item.productNo + ")>" + "</a>";
    
    
    var prod = "<div class = 'card'>" + img + h2 + p + a + "</div>";
    
    
    $(".grid-product").append(prod);
});

});

  // Set up the event handlers for all of the buttons.
  //document.getElementById('butRefresh').addEventListener('click', doSomethingRefresh());
  //document.getElementById('butAdd').addEventListener('click', doSomethingAdd);

}

init();
