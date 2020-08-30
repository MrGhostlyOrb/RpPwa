let sheet = document.getElementById("shareSheet");

if (navigator.share) {
    navigator.share({
        title: "Title",
        url: "url"
    }).then(r => {
        //toast successful share
    }).catch(
        console.error
    )
} else {
    //copy to clipboard and toast
}