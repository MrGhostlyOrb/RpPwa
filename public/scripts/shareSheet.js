document.addEventListener('DOMContentLoaded', () => {
    console.log("Loaded")
    let sheet = document.getElementById("shareSheet");

    sheet.addEventListener('click', () => {
        console.log("clicked")
        if (navigator.share && navigator.userAgent.match(/Android/i)) {
            console.log("Navigator Share Supported")
            try {
                navigator.share({
                    title: document.title,
                    url: document.location.href
                }).then(r => {
                    console.log("Sharing complete");
                    mdtoast('Shared Successfully', {type: mdtoast.SUCCESS});
                }).catch((e) => {
                    console.log(e);
                    mdtoast('Link not shared', {type: mdtoast.ERROR});
                })
            } catch (err) {
                console.log(err);
            }
        } else {
            //copy to clipboard and toast
            console.log("Navigator sharing not supported")
            navigator.clipboard.writeText(window.location.href)
            console.log("Successfully copied link to clipboard");
            mdtoast('Link copied to clipboard', {type: mdtoast.SUCCESS});
        }
    })
})



