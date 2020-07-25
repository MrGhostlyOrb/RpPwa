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
const {check, validationResult} = require('express-validator');

//Constant for credentials file
const cred = require('./cred.json');
const DELIVERY = 10;
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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//File to pull product option1 from
let productList1 = JSON.parse(fs.readFileSync('productList.json')).option1;
let productList2 = JSON.parse(fs.readFileSync('productList.json')).option2;
let productList3 = JSON.parse(fs.readFileSync('productList.json')).option3;

//Define grid variable to store grid of items

//Add all the items in the json file to the grid

function chooseProductCategory(option) {
    let grid = "";
    if (option === "option1") {


        for (let i = 0; i < productList1.length; i++) {

            let item = productList1[i];

            let loc = '"/products/' + item.productNumber + '"';
            let img = "<img class = 'cardImage materialboxed responsive-image' alt = 'Product : " + item.productName + "' src = '" + item.imageURLSmall + "' onclick = 'window.location.href = \"/products/" + item.productNumber + "\"'/>";
            let h2 = "<div class = 'card-content' onclick = 'window.location.href = \"/products/" + item.productNumber + "\"'><h6>" + item.productName + "</h6>";
            let p = "<p>£" + item.productPrice.toFixed(2) + "  * not inc VAT</p></div>";
            let lab = "<div class = 'input-field'><label for='inp" + item.productNumber + "'>Quantity : </label>"
            let input = "<input type = 'number' placeholder = 'Quantity' class = 'input validate' min = '1' max = '999' value = '1' id = 'inp" + item.productNumber + "'></input></div>";
            let submit = "<button type = 'sumbit' class = 'btn waves-effect add purple card-button-link' onclick = 'addJson(" + "\"" + item.productNumber + "\"" + ");checkBasket()' value = 'Add to Basket' id = 'sub" + item.productNumber + "'>Order Sample</button>"
            let r = "<button class = 'card-button-link purple btn waves-effect' value = 'View Product' id = '" + item.productNumber + "rem" + "' onclick = 'location.href = " + loc + "'>" + "View Product</button>";
            let gridItem = "<div class = 'card hoverable'><div class = 'card-image'>" + img + "</div>" + h2 + p + submit + r + "</div>"

            //Add item to the grid
            grid = grid + gridItem

        }
    } else if (option === "option2") {
        for (let i = 0; i < productList2.length; i++) {

            let item = productList2[i];

            let loc = '"/products/' + item.productNumber + '"';
            let img = "<img class = 'cardImage materialboxed responsive-image' alt = 'Product Image' src = '" + item.imageURLSmall + "' onclick = 'window.location.href = \"/products/" + item.productNumber + "\"'/>";
            let h2 = "<div class = 'card-content' onclick = 'window.location.href = \"/products/" + item.productNumber + "\"'><h6>" + item.productName + "</h6>";
            let p = "<p>£" + item.productPrice.toFixed(2) + "  * inc VAT</p></div>";
            let lab = "<div class = 'input-field'><label for='inp" + item.productNumber + "'>Quantity : </label>"
            let input = "<input type = 'number' placeholder = 'Quantity' class = 'input validate' min = '1' max = '999' value = '1' id = 'inp" + item.productNumber + "'></input></div>";
            let submit = "<button type = 'sumbit' class = 'btn waves-effect purple card-button-link' onclick = 'addJson(" + "\"" + item.productNumber + "\"" + ");checkBasket()' value = 'Add to Basket' id = 'sub" + item.productNumber + "'>Add to Cart</button>"
            let r = "<button class = 'card-button-link purple btn waves-effect' value = 'View Product' id = '" + item.productNumber + "rem" + "' onclick = 'location.href = " + loc + "'>" + "View Product</button>";
            let gridItem = "<div class = 'card hoverable'><div class = 'card-image'>" + img + "</div>" + h2 + p + submit + r + "</div>"

            //Add item to the grid
            grid = grid + gridItem

        }
    } else if (option === "option3") {
        for (let i = 0; i < productList3.length; i++) {

            let item = productList3[i];

            let loc = '"/products/' + item.productNumber + '"';
            let img = "<img class = 'cardImage materialboxed responsive-image' alt = 'Product Image' src = '" + item.imageURLSmall + "' onclick = 'window.location.href = \"/products/" + item.productNumber + "\"'/>";
            let h2 = "<div class = 'card-content' onclick = 'window.location.href = \"/products/" + item.productNumber + "\"'><h6>" + item.productName + "</h6>";
            let p = "<p>£" + item.productPrice.toFixed(2) + "  * inc VAT</p></div>";
            let lab = "<div class = 'input-field'><label for='inp" + item.productNumber + "'>Quantity : </label>"
            let input = "<input type = 'number' placeholder = 'Quantity' class = 'input validate' min = '1' max = '999' value = '1' id = 'inp" + item.productNumber + "'></input></div>";
            let submit = "<button type = 'sumbit' class = 'btn waves-effect purple card-button-link' onclick = 'addJson(" + "\"" + item.productNumber + "\"" + ");checkBasket()' value = 'Add to Basket' id = 'sub" + item.productNumber + "'>Add to Cart</button>"
            let r = "<button class = 'card-button-link purple btn waves-effect' value = 'View Product' id = '" + item.productNumber + "rem" + "' onclick = 'location.href = " + loc + "'>" + "View Product</button>";
            let gridItem = "<div class = 'card hoverable'><div class = 'card-image'>" + img + "</div>" + h2 + p + submit + r + "</div>"

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

    app.get('/', function (req, res) {
        res.render('index');
    });
    app.get('/option1', function (req, res) {
        res.render('option1',
            {
                title: 'Coffee Shops',
                message: 'Our products catered towards Coffee Shops',
                grid: chooseProductCategory("option1"),
                metaDescription: 'Richmond Paper Supply Co Ltd, Liverpool | Food Packaging Suppliers | Coffee Shops',
                metaKeywords: 'Trays, Coffee shop supplies, Richmond Paper, Paper Supplies, Catering Supplies, Catering Disposables, Disposable, Catering, Food Supplies, Liverpool, RPS, Richmond Liverpool, Richmond paper liverpool, catering liverpool, wholesale liverpool, Richmond paper supply, richmondpaper, merseyside'
            });
    });
    app.get('/option2', function (req, res) {
        res.render('option2',
            {
                title: 'Option2',
                message: 'This is the option 2 home page',
                grid: chooseProductCategory("option2"),
                metaDescription: 'Richmond Paper Supply Co Ltd, Liverpool | Food Packaging Suppliers',
                metaKeywords: 'Cups, Richmond Paper, Paper Supplies, Catering Supplies, Catering Disposables, Disposable, Catering, Food Supplies, Liverpool, RPS, Richmond Liverpool, Richmond paper liverpool, catering liverpool, wholesale liverpool, Richmond paper supply, richmondpaper, merseyside'
            });
    });
    app.get('/option3', function (req, res) {
        res.render('option3',
            {
                title: 'Option3',
                message: 'This is the option 3 home page',
                grid: chooseProductCategory("option3"),
                metaDescription: 'Richmond Paper Supply Co Ltd, Liverpool | Food Packaging Suppliers',
                metaKeywords: 'Bags, Richmond Paper, Paper Supplies, Catering Supplies, Catering Disposables, Disposable, Catering, Food Supplies, Liverpool, RPS, Richmond Liverpool, Richmond paper liverpool, catering liverpool, wholesale liverpool, Richmond paper supply, richmondpaper, merseyside'
            });
    });

    app.get('/privacy', (req, res) => {
        res.render('privacy', {
            title: 'Privacy Policy',
            metaDescription: 'Richmond Paper Supply Co\'s Privacy Policy',
            metaKeywords: 'Privacy, Richmond Paper, Paper Supplies, Catering Supplies, Catering Disposables, Disposable, Catering, Food Supplies, Liverpool, RPS, Richmond Liverpool, Richmond paper liverpool, catering liverpool, wholesale liverpool, Richmond paper supply, richmondpaper, merseyside'
        })
    })

    app.get('/basket', function (req, res) {
        res.render('basket',
            {
                title: 'Basket',
                message: 'Basket List',
                metaDescription: 'Richmond Paper Supply Co Ltd, Liverpool | Food Packaging Suppliers',
                metaKeywords: 'Basket, Richmond Paper, Paper Supplies, Catering Supplies, Catering Disposables, Disposable, Catering, Food Supplies, Liverpool, RPS, Richmond Liverpool, Richmond paper liverpool, catering liverpool, wholesale liverpool, Richmond paper supply, richmondpaper, merseyside'
            });
    });
    app.get('/confirmation', function (req, res) {
        res.render('confirmation',
            {
                title: 'Confirmation',
                message: 'Confirmation Page',
                metaDescription: 'Richmond Paper Supply Co Ltd, Liverpool | Food Packaging Suppliers',
                metaKeywords: 'Confirmation, Richmond Paper, Paper Supplies, Catering Supplies, Catering Disposables, Disposable, Catering, Food Supplies, Liverpool, RPS, Richmond Liverpool, Richmond paper liverpool, catering liverpool, wholesale liverpool, Richmond paper supply, richmondpaper, merseyside'
            });
    });

    app.get('/search', (req, res) => {
        res.render('search', {
            title: 'Search',
            message: 'Search',
            metaDescription: 'Richmond Paper Supply Co Ltd, Liverpool | Food Packaging Suppliers',
            metaKeywords: 'Richmond Paper, Paper Supplies, Catering Supplies, Catering Disposables, Disposable, Catering, Food Supplies, Liverpool, RPS, Richmond Liverpool, Richmond paper liverpool, catering liverpool, wholesale liverpool, Richmond paper supply, richmondpaper, merseyside'
        })
    });
    app.post('/searchResults', (req, res) => {
        console.log('Beginning search');
        let search = req.body.request;
        let resultsList = [];
        for (let i = 0; i < productList1.length; i++) {
            let pushed = false
            if (productList1[i].productNumber.toString().toLowerCase().includes(search.toLowerCase()) && pushed == false) {
                resultsList.push(productList1[i])
                console.log("Search results : " + resultsList);
                pushed = true;
            }
            if (productList1[i].productName.toString().toLowerCase().includes(search.toLowerCase()) && pushed == false) {
                resultsList.push(productList1[i])
                console.log("Search results : " + resultsList);
                pushed = true;
            }
        }
        for (let i = 0; i < productList2.length; i++) {
            let pushed = false
            if (productList2[i].productNumber.toString().toLowerCase().includes(search.toLowerCase()) && pushed == false) {
                resultsList.push(productList2[i])
                console.log("Search results : " + resultsList);
                pushed = true;
            }
            if (productList2[i].productName.toString().toLowerCase().includes(search.toLowerCase()) && pushed == false) {
                resultsList.push(productList2[i])
                console.log("Search results : " + resultsList);
                pushed = true;
            }
        }
        for (let i = 0; i < productList3.length; i++) {
            let pushed = false
            if (productList3[i].productNumber.toString().toLowerCase().includes(search.toLowerCase()) && pushed == false) {
                resultsList.push(productList3[i])
                console.log("Search results : " + resultsList);
                pushed = true;
            }
            if (productList3[i].productName.toString().toLowerCase().includes(search.toLowerCase()) && pushed == false) {
                resultsList.push(productList3[i])
                console.log("Search results : " + resultsList);
                pushed = true;
            }
        }
        let resultHTML = "";
        if (resultsList.length < 1) {
            console.log('No results');
            resultHTML = "<li>Sorry, no results found, try searching for the name of the product.</li>";
            let json = {"result": resultHTML};
            res.json(json);
        } else {
            console.log("Searching for : " + search);

            for (let i = 0; i < resultsList.length; i++) {
                let li = "<li class = 'collection-item dark'>";
                let lie = "</li>";
                let a = "<br><a href = '/products/" + resultsList[i].productNumber + "' class = 'btn-small'>";
                let ae = "Show Item</a>"
                resultHTML = resultHTML + li + resultsList[i].productName + "<br>" + resultsList[i].productInfo + "<br>" + a + ae + lie;
            }
            let json = {"result": resultHTML};
            res.json(json);
        }
    })

    for (let i = 0; i < productList1.length; i++) {
        app.get('/products/' + productList1[i].productNumber, (req, res) => {
            const item = productList1[i];
            res.render('product',
                {
                    title: item.productName,
                    product: item.productNumber,
                    productDescription: item.productInfo,
                    productPrice: item.productPrice.toFixed(2),
                    productImage: item.imageURL,
                    productName: item.productName
                });
        })
    }
    for (let i = 0; i < productList2.length; i++) {
        app.get('/products/' + productList2[i].productNumber, (req, res) => {
            const item = productList2[i];
            res.render('product',
                {
                    title: item.productName,
                    product: item.productNumber,
                    productDescription: item.productInfo,
                    productPrice: item.productPrice.toFixed(2),
                    productImage: item.imageURL,
                    productName: item.productName
                });
        })
    }
    for (let i = 0; i < productList3.length; i++) {
        app.get('/products/' + productList3[i].productNumber, (req, res) => {
            const item = productList3[i];
            res.render('product',
                {
                    title: item.productName,
                    product: item.productNumber,
                    productDescription: item.productInfo,
                    productPrice: item.productPrice.toFixed(2),
                    productImage: item.imageURL,
                    productName: item.productName
                });
        })
    }

    app.get('/products', (req, res) => {
        let tabo = "<table class = 'striped'><caption style = 'margin-bottom:3%;margin-top:3%;font-size:2em;'><b>Price List</b></caption>";
        let thead = "<thead>";
        let trow = "<tr>";
        let trowc = "</tr>";
        let theadc = "</thead>";
        let tabc = "</table>";
        let body = "<tbody>"

        for (let i = 0; i < productList1.length; i++) {

            let row = "";
            let name = "<tr><td><a class = 'dark-text' style = 'color:rgba(0, 0, 0, 0.87);' href = '/products/" + productList1[i].productNumber + "'>" + productList1[i].productName + "</td>";
            let description = "<td>" + productList1[i].productInfo + "</td>";
            let price = "<td>£" + productList1[i].productPrice.toFixed(2) + "</a></td></tr>";
            row = name + description + price
            body = body + row;

        }
        for (let i = 0; i < productList2.length; i++) {

            let row = "";
            let name = "<tr><td><a class = 'dark-text' style = 'color:rgba(0, 0, 0, 0.87);' href = '/products/" + productList1[i].productNumber + "'>" + productList2[i].productName + "</td>";
            let description = "<td>" + productList2[i].productInfo + "</td>";
            let price = "<td>£" + productList2[i].productPrice.toFixed(2) + "</a></td></tr>";
            row = name + description + price
            body = body + row;

        }
        for (let i = 0; i < productList3.length; i++) {

            let row = "";
            let name = "<tr><td><a class = 'dark-text' style = 'color:rgba(0, 0, 0, 0.87);' href = '/products/" + productList1[i].productNumber + "'>" + productList3[i].productName + "</td>";
            let description = "<td>" + productList3[i].productInfo + "</td>";
            let price = "<td>£" + productList3[i].productPrice.toFixed(2) + "</a></td></tr>";
            row = name + description + price
            body = body + row;

        }
        body = body + "</tbody>"


        let table = tabo + thead + trow + "<th>Name</th><th>Description</th><th>Price (£) not inc VAT</th>" + trowc + theadc + body
        console.log(table);

        res.render('productList', {

            title: 'Price List | Prices',
            products: table,
            metaDescription: 'Richmond Paper Supply Co Ltd, Liverpool | Food Packaging Suppliers'

        });

        let dataToWrite = "";

        for (let i = 0; i < productList1.length; i++) {
            let line = "";
            line = productList1[i].productNumber + "," + productList1[i].productName + ",£" + productList1[i].productPrice.toFixed(2) + "\n"
            dataToWrite = dataToWrite + line;
        }
        for (let i = 0; i < productList2.length; i++) {
            let line = "";
            line = productList2[i].productNumber + "," + productList2[i].productName + ",£" + productList2[i].productPrice.toFixed(2) + "\n"
            dataToWrite = dataToWrite + line;
        }
        for (let i = 0; i < productList3.length; i++) {
            let line = "";
            line = productList3[i].productNumber + "," + productList3[i].productName + ",£" + productList3[i].productPrice.toFixed(2) + "\n"
            dataToWrite = dataToWrite + line;
        }

        fs.writeFile('public/productList.csv', dataToWrite, 'utf8', (err) => {
            console.log(err);
        });
    });

    app.get('/price-list', (req, res) => {

        let tabo = "<table class = 'striped'><caption style = 'margin-bottom:3%;margin-top:3%;font-size:2em;'><b>Price List</b></caption>";
        let thead = "<thead>";
        let trow = "<tr>";
        let trowc = "</tr>";
        let theadc = "</thead>";
        let tabc = "</table>";
        let body = "<tbody>"

        for (let i = 0; i < productList1.length; i++) {

            let row = "";
            let name = "<tr><td><a class = 'dark-text' style = 'color:rgba(0, 0, 0, 0.87);' href = '/products/" + productList1[i].productNumber + "'>" + productList1[i].productName + "</td>";
            let description = "<td>" + productList1[i].productInfo + "</td>";
            let price = "<td>£" + productList1[i].productPrice.toFixed(2) + "</a></td></tr>";
            row = name + description + price
            body = body + row;

        }
        for (let i = 0; i < productList2.length; i++) {

            let row = "";
            let name = "<tr><td><a class = 'dark-text' style = 'color:rgba(0, 0, 0, 0.87);' href = '/products/" + productList1[i].productNumber + "'>" + productList2[i].productName + "</td>";
            let description = "<td>" + productList2[i].productInfo + "</td>";
            let price = "<td>£" + productList2[i].productPrice.toFixed(2) + "</a></td></tr>";
            row = name + description + price
            body = body + row;

        }
        for (let i = 0; i < productList3.length; i++) {

            let row = "";
            let name = "<tr><td><a class = 'dark-text' style = 'color:rgba(0, 0, 0, 0.87);' href = '/products/" + productList1[i].productNumber + "'>" + productList3[i].productName + "</td>";
            let description = "<td>" + productList3[i].productInfo + "</td>";
            let price = "<td>£" + productList3[i].productPrice.toFixed(2) + "</a></td></tr>";
            row = name + description + price
            body = body + row;

        }
        body = body + "</tbody>"


        let table = tabo + thead + trow + "<th>Name</th><th>Description</th><th>Price (£) not inc VAT</th>" + trowc + theadc + body
        console.log(table);

        res.render('productList', {

            title: 'Price List | Prices',
            products: table,
            metaDescription: 'Richmond Paper Supply Co Ltd, Liverpool | Food Packaging Suppliers'

        });

        let dataToWrite = "";

        for (let i = 0; i < productList1.length; i++) {
            let line = "";
            line = productList1[i].productNumber + "," + productList1[i].productName + ",£" + productList1[i].productPrice.toFixed(2) + "\n"
            dataToWrite = dataToWrite + line;
        }
        for (let i = 0; i < productList2.length; i++) {
            let line = "";
            line = productList2[i].productNumber + "," + productList2[i].productName + ",£" + productList2[i].productPrice.toFixed(2) + "\n"
            dataToWrite = dataToWrite + line;
        }
        for (let i = 0; i < productList3.length; i++) {
            let line = "";
            line = productList3[i].productNumber + "," + productList3[i].productName + ",£" + productList3[i].productPrice.toFixed(2) + "\n"
            dataToWrite = dataToWrite + line;
        }

        fs.writeFile('public/productList.csv', dataToWrite, 'utf8', (err) => {
            console.log(err);
        })

    });


    //Start the server on PORT 8080
    app.listen(process.env.PORT || 8080, function () {
        console.log("Express server listening on port %d in %s mode",
            this.address().port,
            app.settings.env
        );
    });
}

let sendMail = true;
app.post("/foo/", function (req, res) {
    console.log('Here');
})

app.post("/foo2/", function (req, res) {
    console.log('here2');
})

app.post("/foo3/", function (req, res) {
    const myObject = req.body;
    let basket = myObject.basket;
    console.log('About to send mail');
    //List to store user's items
    const list = [];
    let value = 0;
    let weight = 0;
    let length = 0;
    let width = 0;
    let height = 0;

    for (let i = 0; i < basket.length; i++) {
        const parsed = JSON.parse(basket[i]);
        if (parsed.Item.Quantity === "undefined") {
            console.log("Quantity is Undefined, not sending Email");
            sendMail = false;
        }
        list.push('\nItem Number : ' + parsed.Item.ProductNo);
        list.push('Quantity :' + parsed.Item.Quantity);

        let prodValue;
        let prodWe;

        for (let i = 0; i < productList1.length; i++) {
            if (productList1[i].productNumber === parsed.Item.ProductNo) {
                let prodName = productList1[i].productName;
                let prodPrice = productList1[i].productPrice;
                let prodImg = productList1[i].imageURL;
                let prodWeight = productList1[i].productWeight;
                length = productList1[i].productLength;
                width = productList1[i].productWidth;
                height = productList1[i].productHeight;
                prodValue = prodPrice;
                prodWe = prodWeight;
                console.log("Value of product : " + prodValue);
                console.log("Weight of product : " + prodWe);

            }

        }
        for (let i = 0; i < productList2.length; i++) {
            if (productList2[i].productNumber === parsed.Item.ProductNo) {
                let prodName = productList2[i].productName;
                let prodPrice = productList2[i].productPrice;
                let prodImg = productList2[i].imageURL;
                let prodWeight = productList2[i].productWeight;
                length = productList2[i].productLength;
                width = productList2[i].productWidth;
                height = productList2[i].productHeight;
                prodValue = prodPrice;
                prodWe = prodWeight;
                console.log("Value of product : " + prodValue);
                console.log("Weight of product : " + prodWe);


            }

        }
        for (let i = 0; i < productList3.length; i++) {
            if (productList3[i].productNumber === parsed.Item.ProductNo) {
                let prodName = productList3[i].productName;
                let prodPrice = productList3[i].productPrice;
                let prodImg = productList3[i].imageURL;
                let prodWeight = productList3[i].productWeight;
                length = productList3[i].productLength;
                width = productList3[i].productWidth;
                height = productList3[i].productHeight;
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
    const transporter = nodemailer.createTransport({
        service: 'Outlook365',
        auth: {
            user: cred.email,
            pass: cred.password
        }
    });

    let lineHeaders = 'Item Name,Value,Weight,Length,Width,Height,Name,Property,Town,PostCode,Telephone';

    let line = myObject.ref + ',' + value + ',' + weight + ',' + length + ',' + width + ',' + height + ',' + buyerName + ',' + myObject.address1 + ',' + myObject.town + ',' + myObject.postcode + ',' + myObject.phone.toString();


    let csvlines = lineHeaders + '\n' + line;
    console.log("Order : " + lineHeaders);
    console.log("Line : " + line);

    let mailOptions = {


        from: cred.email,
        to: cred.email,
        subject: 'New Order + Payment From ' + buyerName,
        text: 'Confirmed Order + Payment From : ' + buyerName + ',\n Name given in app : ' + myObject.name2 + ',\n Email given : ' + myObject.email + ',\n Phone number given : ' + myObject.phone + ',\n Reference number : ' + myObject.ref + ',\n For £' + buyerTot.total.toFixed(2) + '\n \n They ordered : \n \n' + list.toString(),
        attachments: [
            {
                filename: myObject.ref + '.csv',
                content: csvlines

            }
        ]
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error with Office email : " + error);
        } else {
            console.log('Email sent to office : ' + info.response);
        }
    });
    mailOptions = {
        from: cred.email,
        to: myObject.email,
        subject: 'Richmond Paper Supply Order Confirmation ',
        text: 'Thank you for your order on the Richmond Paper Supply website ' + buyerName + ',\n \n Your reference number for this order is : ' + myObject.ref + ' please keep this for future reference,\n \n Your order total was £' + buyerTot.total.toFixed(2) + '\n \n Products ordered : \n \n' + list.toString() + '\n \n Delivery Address : ' + myObject.address1 + ', ' + myObject.town + ',' + myObject.postcode + '\n \n If you have any issues with your order please contact us on : 0151 933 1000'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error with Buyer email : " + error);
        } else {
            console.log('Email sent to buyer : ' + info.response);
        }
    });
});

app.post('/price', (req, res) => {
    let total = 0;
    const body = req.body;
    if (body[0] !== undefined) {
        for (let i = 0; i < productList1.length; i++) {
            for (let j = 0; j < body.length; j++) {
                if (JSON.parse(body[j]).Item.ProductNo === productList1[i].productNumber) {
                    console.log('Found product : ' + productList1[i].productNumber);
                    total = total + (productList1[i].productPrice * JSON.parse(body[j]).Item.Quantity);
                }
            }
        }
        for (let i = 0; i < productList2.length; i++) {
            for (let j = 0; j < body.length; j++) {
                if (JSON.parse(body[j]).Item.ProductNo == productList2[i].productNumber) {
                    console.log('Found product : ' + productList2[i].productNumber);
                    total = total + (productList2[i].productPrice * JSON.parse(body[j]).Item.Quantity);
                }
            }
        }
        for (let i = 0; i < productList3.length; i++) {
            for (let j = 0; j < body.length; j++) {
                if (JSON.parse(body[j]).Item.ProductNo === productList3[i].productNumber) {
                    console.log('Found product : ' + productList3[i].productNumber);
                    total = total + (productList3[i].productPrice * JSON.parse(body[j]).Item.Quantity);
                }
            }
        }
    } else {
        console.log('No data sent');
    }
    total = total + DELIVERY;
    console.log("Total so far is : " + total);
    res.json({"total": total});
});

app.post("/feedback", function (req, res) {
    const myObject = req.body;
    let feedback = myObject.feedBack;
    const transporter = nodemailer.createTransport({
        service: 'Outlook365',
        auth: {
            user: cred.email,
            pass: cred.password
        }
    });
    const mailOptions = {
        from: cred.email,
        to: cred.email,
        subject: 'New Feedback about website',
        text: feedback
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Error with email : " + error);
        } else {
            console.log('Email sent with feedback : ' + info.response);
        }
    });
});

app.post("/getInfo", function (req, res) {
    const myObject = req.body;
    let resJson;
    let ProductNo = myObject.ProductNo;
    for (let i = 0; i < productList1.length; i++) {
        if (productList1[i].productNumber === ProductNo) {
            let prodName = productList1[i].productName;
            let prodPrice = productList1[i].productPrice;
            let prodImg = productList1[i].imageURL;
            resJson = {
                "prodName": prodName,
                "prodPrice": prodPrice,
                "prodImg": prodImg
            }
        }
    }
    for (let i = 0; i < productList2.length; i++) {
        if (productList2[i].productNumber === ProductNo) {
            let prodName = productList2[i].productName;
            let prodPrice = productList2[i].productPrice;
            let prodImg = productList2[i].imageURL;
            resJson = {
                "prodName": prodName,
                "prodPrice": prodPrice,
                "prodImg": prodImg
            }
        }
    }
    for (let i = 0; i < productList3.length; i++) {
        if (productList3[i].productNumber === ProductNo) {
            let prodName = productList3[i].productName;
            let prodPrice = productList3[i].productPrice;
            let prodImg = productList3[i].imageURL;
            resJson = {
                "prodName": prodName,
                "prodPrice": prodPrice,
                "prodImg": prodImg
            }
        }
    }
    console.log("Information requested for product : " + resJson.prodName);
    res.json(resJson);
});

//Start the server
startServer();
