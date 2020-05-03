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
