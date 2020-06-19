//Execute code in strict method
'use strict';


let listBasket = document.getElementById("listForBasket")
let basketList2;

if (localStorage.getItem('basket')){
	basketList2 = JSON.parse(localStorage.getItem('basket'));
	showBasketList();
}
else{
	listBasket.append("<li>There is nothing in your basket</li>")
}

localStorage.setItem('basket', JSON.stringify(basketList2));
const data2 = JSON.parse(localStorage.getItem('basket'));



function showBasketList(){
	var sPath = window.location.pathname;
	console.log(sPath)
	if(sPath != '/confirmation'){
	console.log('Normal basket')
	const li = "<li class = 'listItem'>"
	const cli = "</li>"
	if(basketList2.length < 1){
		listBasket.innerHTML = "Nothing in your basket yet";
	}
	else{
	listBasket.innerHTML = "";
	for(let i = 0; i < basketList2.length; i++){
	
	const parsedList = JSON.parse(basketList2[i]);
		listBasket.innerHTML = listBasket.innerHTML + li + "Product Name : " + parsedList.Item.ProductNo + "<br>Quantity : " + parsedList.Item.Quantity + cli
	}
	}
	}
	else{
	console.log('Not normal basket');
	let copiedBasketList2 = JSON.parse(localStorage.getItem('copiedBasket'));
	const li = "<li class = 'listItem'>"
	const cli = "</li>"
	if(copiedBasketList2.length < 1){
		listBasket.innerHTML = "Nothing in your basket yet";
	}
	else{
	listBasket.innerHTML = "";
	
	for(let i = 0; i < copiedBasketList2.length; i++){
	
	const parsedCopiedList = JSON.parse(copiedBasketList2[i]);
		listBasket.innerHTML = listBasket.innerHTML + li + "Product Name : " + parsedCopiedList.Item.ProductNo + "<br>Quantity : " + parsedCopiedList.Item.Quantity + cli
	}
	}
	}
}

function checkQty(){
	var allGood = true;
	for(let i = 0; i < basketList2.length; i++){
	
	const parsedList = JSON.parse(basketList2[i]);
		if(parsedList.Item.Quantity === "undefined"){
			allGood = false;
			alert("Please add a quantity for : " + parsedList.Item.ProductName + " and re-send your order. Your order has not been sent.")
			
		}
		else{
			console.log("order will be sent")
			
		}
	}
	if(allGood === true){
		sendBasket();
		alert("Please complete the transaction with paypal or a Credit/Debit card after clicking 'OK'")
	}
	
}

