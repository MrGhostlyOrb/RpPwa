//Execute code in strict method
'use strict';

//Variable to store the user's basket
let basketList;
let total;
let DELIVERY = 10;

if (window.matchMedia('(display-mode: standalone)').matches && window.location.pathname === '/') {
    document.getElementById('butInstall2').className = document.getElementById('butInstall2').className + " disabled";
}
if (window.matchMedia('(display-mode: standalone)').matches && window.location.pathname === '/') {
    document.getElementById('installBtn3').className = document.getElementById('installBtn3').className + " disabled";
}

if (window.location.pathname === '/search') {
    document.getElementById('butBasket').addEventListener('click', () => {
        window.location.href = '/basket'
    });
}

function disableButton() {
    document.getElementById('butSubmit').className = document.getElementById('butSubmit').className + " disabled";
}
if (window.location.pathname === '/') {

    document.addEventListener('DOMContentLoaded', function () {
        const elem = document.querySelector('#modal1');
        console.log(elem);
        let options = {
            dismissible: false,
            onCloseEnd: () => {
                mdtoast('Welcome to Richmond Paper Supply!', {duration: 3000})
            }
        }
        console.log(options);
        const instance = M.Modal.init(elem, options);
        console.log(instance);

        if (sessionStorage.getItem('pageLoad')) {
            console.log('Not first time');
        } else {
            sessionStorage.setItem('pageLoad', true);
            instance.open();
        }

    });

    document.addEventListener('DOMContentLoaded', function () {
        let date = new Date();
        let hours = date.getHours();
	let day = date.getDay();
        if (hours > 8 && hours < 17 || day === 0 || day === 6) {
            document.getElementById("callUs").innerHTML = "Call Us - Available Now";
            document.getElementById("phoneIcon").innerHTML = "phone"
        } else {
            document.getElementById("callUs").innerHTML = "Call Us - Unavailable";
            document.getElementById("phoneIcon").innerHTML = "call_end"
        }
    })

}

document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('.tooltipped');
    const instances = M.Tooltip.init(elems);
});


//Check if there is a basket already in local storage
if (localStorage.getItem('basket')) {
    basketList = JSON.parse(localStorage.getItem('basket'));
}
//Otherwise create a new basket locally
else {
    basketList = [];
}

//Save basket in local storage
localStorage.setItem('basket', JSON.stringify(basketList));

//Function to add a product to the user's basket
function addJson(ProductNo, Qty, Name) {
    console.log(ProductNo);
    console.log(Qty);
    console.log(Name);
    basketList = JSON.parse(localStorage.getItem('basket'));
    //Check if the product is already in the basket
    let isFound = false;
    for (var i = 0; i < JSON.parse(localStorage.getItem('basket')).length; i++) {
        const parsedList = JSON.parse(basketList[i]);
        if (parsedList.Item.ProductNo === ProductNo) {
            isFound = true;
            if (document.getElementById('inp' + ProductNo).value !== parsedList.Item.Quantity && document.getElementById('inp' + ProductNo).value !== 0) {
                mdtoast('Quantity has been updated', {type: mdtoast.SUCCESS});
            } else if (document.getElementById('inp' + ProductNo).value === 0) {
                removeFromBasket(ProductNo);
            } else {
                mdtoast('This product is already in your basket.', {type: mdtoast.ERROR});
            }
        }
    }
    if (isFound === false) {
        if (Qty === 0 || undefined) {
            removeFromBasket(ProductNo)
        } else {
            setTimeout(() => {
                mdtoast('Product added to your basket', {type: mdtoast.SUCCESS});
            }, 1000)
            basketList.push('{"Item":{"ProductNo" :"' + ProductNo + '", "Quantity" :"' + 1 + '"}}');
            localStorage.setItem('basket', JSON.stringify(basketList));
            setTimeout(() => {
                window.location.href = '/basket';
            }, 2000)
        }
    }
}

//Function to remove an item from the customer's basket
function removeFromBasket(ProductNo) {
    for (var i = basketList.length - 1; i >= 0; i--) {
        const parsedList = JSON.parse(basketList[i]);
        if (parsedList.Item.ProductNo === ProductNo) {
            basketList.splice(i, 1);
            mdtoast('Removed product number ' + ProductNo + ' from your basket');
            localStorage.setItem('basket', JSON.stringify(basketList));
        }
    }
}

//Function to clear the basket from local storage
function clearBasket() {
    localStorage.removeItem('basket');
    console.log("Cleared basket");
    basketList = [];
}

//Function for debugging to show basket
function showBasket() {
    console.log(basketList);
    console.log("Showing basket");
}

//Function to send the basket to the RP email account
function sendBasket() {
    console.log('Doing stuff');
    fetch('/foo/', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: localStorage.getItem('basket')
    }).then(res => res.json())
        .then(res => console.log(res));
    console.log('Sending' + basketList + 'To email');
}

//Function to send the form data to the RP email account
function sendData(e) {
    e.preventDefault();
    setTimeout(() => {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        console.log(total);
        //const time = document.getElementById("time").value;
        const bodyToSubmit = {
            "name": name,
            "email": email,
            "phone": phone,
            "total": total.total
            //"time": time
        }
        console.log(bodyToSubmit);
        fetch('/foo2/', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyToSubmit)
        }).then(res => res.json())
            .then(res => console.log(res));
    }, 100)
}

//Function for basic page interactions
function init() {
    const refreshButton = document.getElementById('butRefresh');
    refreshButton.addEventListener('click', notif);
};

//Function to send a test notification to the user when the refersh button is clicked
function notif() {
    Notification.requestPermission(result => {
        if (result === 'granted') {
            showNotification('So nice to have you here!', 'Hey there!')
        }
    }).then(r => {
        console.log("Permission Granted");
    })
}


// Function to show a notification
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

let x = '15';

function sendOrder() {
    setTimeout(() => {
        console.log(total);
        paypal.Buttons({
            createOrder: function (data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: total.total.toFixed(2)
                        }
                    }]
                });
            },
            onApprove: function (data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function (details) {
                    // This function shows a transaction success message to your buyer.
                    mdtoast('Transaction successfully completed by ' + details.payer.name.given_name + ', now loading confirmation page...', {
                        type: mdtoast.SUCCESS,
                        duration: 4000
                    });
                    sendEmailConf(details.payer.name.given_name, details.id);
                    localStorage.setItem('id', details.id);
                    clearBasket();
                    setTimeout(() => {
                        window.location.href = '/confirmation'
                    }, 4000)
                });
            }
        }).render('#paypal-button-container');
    }, 500);
}

function sendEmailConf(name, id) {
    console.log('Completed');
    const name2 = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address1 = document.getElementById("address1").value;
    const town = document.getElementById("town").value;
    const postcode = document.getElementById("postcode").value;
    console.log(total);
    //const time = document.getElementById("time").value;
    const bodyToSubmit = {
        "name": name,
        "name2": name2,
        "email": email,
        "phone": phone,
        "address1": address1,
        "town": town,
        "postcode": postcode,
        "total": total,
        "ref": id,
        "basket": JSON.parse(localStorage.getItem('copiedBasket'))
    }
    console.log(bodyToSubmit);
    fetch('/foo3/', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyToSubmit)
    }).then(res => res.json())
        .then(res => console.log(res));
}

let copiedBasket;

function copyBasket() {
    console.log('copying basket');
    copiedBasket = localStorage.getItem('basket')
    localStorage.setItem('copiedBasket', copiedBasket);

}

function getValue() {
    var sPath = window.location.pathname;
    if (sPath !== '/confirmation') {
        console.log(localStorage.getItem('basket'));
        fetch('/price',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: localStorage.getItem('basket')

            }).then(res => res.json())
            .then(res => total = res).catch((err) => {
            console.log('Empty Order');
            total = '0';

        });
    } else {
        fetch('/price',
            {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: localStorage.getItem('copiedBasket')

            }).then(res => res.json())
            .then(res => total = res).catch((err) => {
            console.log('Empty Order');
            total = '0';
        });
    }
    setTimeout(() => {
        if (sPath === '/confirmation') {
            document.getElementById('tot').innerHTML = "Your total was : £" + total.total.toFixed(2);
            document.getElementById('ref').innerHTML = "Reference number : " + localStorage.getItem('id');
        } else if (sPath === '/basket') {
            document.getElementById('tot').innerHTML = "Estimated total is : £" + total.total.toFixed(2);
        } else {
            console.log("No estimate to show");
        }
    }, 250)
}

function sendFeedback() {
    console.log('Sending');
    let text = {"feedBack": document.getElementById('feedback').value};
    fetch('/feedback', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(text)
    }).then(res => res.json())
        .then(res => console.log(res));
}

//Function to get the user's selected quantity of item
function getValues() {
    setTimeout(() => {
        const inputs = document.getElementsByClassName('input');
        console.log(inputs);
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value === "") {
                continue
            } else {
                console.log("found input")
                var productNumber = inputs[i].id.substr(3);
                if (localStorage.getItem('basket')) {
                    var basketList2 = JSON.parse(localStorage.getItem('basket'));
                    addQty(productNumber, basketList2, inputs[i].value);
                } else {
                    mdtoast("There is nothing in your basket", {type: mdtoast.ERROR})
                }
            }
        }
    }, 300)
}

//Function to add quantity to the basket
function addQty(productNumber, basketList2, quantity) {
    for (let j = 0; j < basketList2.length; j++) {
        const parsedList = JSON.parse(basketList[j]);
        console.log(parsedList.Item.ProductNo);
        console.log(productNumber);
        if (parsedList.Item.ProductNo === productNumber) {
            console.log("found item");
            parsedList.Item.Quantity = quantity;
            basketList2[j] = JSON.stringify(parsedList);
            localStorage.setItem('basket', JSON.stringify(basketList2));
        } else {
            console.log("not found item");
        }
    }
}

function checkBasket() {
    let noItems = JSON.parse(localStorage.getItem('basket')).length;
    console.log(noItems);
    if (noItems >= 1) {
        let numOfButtons = document.getElementsByClassName('add');
        console.log(numOfButtons);
        console.log(numOfButtons.length)
        for (let i = 0; i < numOfButtons.length; i++) {
            numOfButtons[i].className += ' disabled';
        }
        setTimeout(() => {
            mdtoast("You can only order a single sample at a time", {type: mdtoast.WARNING})
        }, 5000);
    }
    document.getElementById('numberCircle').innerHTML = noItems;
    document.getElementById('butBasket').setAttribute('onclick', 'location.href = "/basket";');

}

init();
