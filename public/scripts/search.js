console.log('Search loaded');
document.getElementById('searchForm').addEventListener('submit', (e) => {
    search(e);
})

function search(e) {
    e.preventDefault()
    fetch('/searchResults', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            "request": document.getElementById('search').value
        })
    }).then(res => res.json())
        .then(res => fun(res));
}

function fun(res) {
    console.log(res);
    document.getElementById('results').innerHTML = "<h5>Results : </h5>" + res.result;
}
