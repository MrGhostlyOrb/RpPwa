const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
    return new mdc.ripple.MDCRipple(el);
});

const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new mdc.topAppBar.MDCTopAppBar(topAppBarElement);

const list = new mdc.list.MDCList(document.querySelector('.mdc-list'));

const cookiesDialog = new mdc.dialog.MDCDialog(document.getElementById('cookiesDialog'));
const copyrightDialog = new mdc.dialog.MDCDialog(document.getElementById('copyrightDialog'));
const copyrightButton = document.getElementById('copyrightButton')
copyrightButton.addEventListener('click', () => {
    copyrightDialog.open();
})
cookiesDialog.scrimClickAction = "";

const listItemRipples = list.listElements.map((listItemEl) => new mdc.ripple.MDCRipple(listItemEl));

const fabRipple = new mdc.ripple.MDCRipple(document.querySelector('.mdc-fab'));

function disableButton() {
    document.getElementById('butSubmit').className = document.getElementById('butSubmit').className + " disabled";
}

document.addEventListener('DOMContentLoaded', function () {
    if (!sessionStorage.getItem('pageLoad')) {
        sessionStorage.setItem('pageLoad', true);
        cookiesDialog.open();
    }
});

if (window.location.pathname === '/') {

    document.addEventListener('DOMContentLoaded', function () {
        let date = new Date();
        let hours = date.getHours();
        let day = date.getDay();
        // Monday - Thursday
        if (hours > 8 && hours < 18 && day !== 0 && day !== 6 && day !== 5) {
            document.getElementById("call-us").innerHTML = "Call Us - Available Now";

        }
        // Friday
        else if (hours > 8 && hours < 17 && day === 5) {
            document.getElementById("call-us").innerHTML = "Call Us - Available Now";
        }
        else {
            document.getElementById("call-us").innerHTML = "Call Us - Unavailable";
            document.getElementById("call-us-click").removeAttribute('onclick');
            document.getElementById("call-us-click-link").removeAttribute('href');
        }
    })

}
