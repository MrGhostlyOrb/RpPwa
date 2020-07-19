//Execute code in strict method
'use strict';

function renderCSV(){
	let div = document.createElement('div');
	div.setAttribute('property', "schema:name");
	div.setAttribute('content', "Product List");
	let div2 = document.createElement('div');
	div2.setAttribute('property', "schema:description");
	div2.setAttribute('content', "List of all the products sold at Richmond Paper Supply");
	let div3 = document.createElement('div');
	div3.setAttribute('property', "schema:distribution.contentUrl");
	let div4 = document.createElement('div');
	div4.setAttribute('rel', "schema:url");
	div4.setAttribute('resource', "https://www.richmondpapersupply.co.uk/productList.csv");
	div3.appendChild(div4)
	document.getElementById('data').appendChild(div);
	document.getElementById('data').appendChild(div2);
	document.getElementById('data').appendChild(div3);
}

function renderCSV2(){
	let script = document.createElement('script');
	script.setAttribute('type', 'application/ld+json')
	script.innerHTML = "'@type':'Dataset'";
	
	document.getElementById('data').appendChild(script);
	
}


renderCSV2();
