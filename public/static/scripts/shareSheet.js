document.addEventListener('DOMContentLoaded', () => {
    let sheet = document.getElementById("shareSheet");
    sheet.addEventListener('click', () => {
        if (navigator.share) {
            try {
                navigator.share({
                    title: document.title,
                    url: document.location.href
                }).then(r => {
                    console.log('Shared Successfully');
                }).catch((e) => {
                    console.log('Link not shared');
                })
            } catch (err) {
                console.log(err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
            console.log('Link copied to clipboard');
        }
    })
})



