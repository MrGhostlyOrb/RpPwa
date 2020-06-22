//Execute code in strict method
'use strict';

if(window.location.pathname == '/basket'){
	document.getElementById('customerForm').addEventListener('submit', () => {setTimeout(()=>{document.getElementById('prog').style.display = 'block'},10000)})
}

let listBasket = document.getElementById("coll")
let basketList2;
let resp = [];


if (localStorage.getItem('basket')){
	basketList2 = JSON.parse(localStorage.getItem('basket'));
	showBasketList();
}
else{
	listBasket.append("<a class = 'collection-item dark'>There is nothing in your basket</a>")
}

localStorage.setItem('basket', JSON.stringify(basketList2));
const data2 = JSON.parse(localStorage.getItem('basket'));

function getOtherInfo(ProductNo){
	let bodyToSubmit = {"ProductNo":ProductNo}
	
	fetch('/getInfo', {
  		method: 'post',
  		headers: {
    		'Accept': 'application/json, text/plain, */*',
    		'Content-Type': 'application/json'
  		},
  		body: JSON.stringify(bodyToSubmit)
	}).then(res=>res.json())
  		.then(res => resp.push(res));
}

function showBasketList(){
	
	var sPath = window.location.pathname;
	console.log(sPath)
	if(sPath != '/confirmation'){
	console.log('Normal basket')
	const li1 = "<a href = '/product";
	const li2 = "' class = 'dark collection-item'>"
	const span1 = "<span left data-badge-caption = '' class='new badge'>Quantity : "
	const span2 = "</span>"
	const cli = "</a>"
	if(basketList2.length < 1){
		listBasket.innerHTML = "<a class = 'collection-item dark'>There is nothing in your basket.</a>";
		document.getElementById('butSubmit').className = document.getElementById('butSubmit').className + " disabled";
	}
	else{
	listBasket.innerHTML = "";
	for(let i = 0; i < basketList2.length; i++){
	
	const parsedList = JSON.parse(basketList2[i]);
	getOtherInfo(parsedList.Item.ProductNo);
	setTimeout(()=>{
		
		listBasket.innerHTML = listBasket.innerHTML + li1 + parsedList.Item.ProductNo + li2 + span1 + parsedList.Item.Quantity + span2 + "Product Name : " + resp[i].prodName + "<br><br>"+"Price per qty : £" + resp[i].prodPrice.toFixed(2) +"<br><br><div class = 'btn-small red waves-effect' onclick = 'removeFromBasket("+ "\"" +parsedList.Item.ProductNo+ "\"" +");setTimeout(()=>{location.reload()},1000);'>Remove</div>" + cli;
	},2000)}
	}
	}
	else{
	console.log('Not normal basket');
	let copiedBasketList2 = JSON.parse(localStorage.getItem('copiedBasket'));
	const li = "<a class = 'dark collection-item'>"
	const cli = "</a>"
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

function checkQty(e){
	e.preventDefault();
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
		alert("Please complete the transaction with Paypal or a Credit/Debit card after clicking 'OK'")
	}
	
}

