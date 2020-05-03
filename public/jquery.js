$.getJSON("/products.json", function(json){


console.log(json)


$.each(json.data, function (index, item) {

    //var ul = $("<ul/>");
    //var li = $("<li/>", { text: item.orderNum });
    //ul.append(li);
    //ul.append(li.clone().text(item.qty));
    //ul.append(li.clone().text(item.userName));
    //ul.append(li.clone().text(item.value));
    
    var order = "<li>" + item.orderNum + "</li>";
    var quantity = "<li>" + item.qty + "</li>";
    var user = "<li>" + item.userName + "</li>";
    var val = "<li>" + item.value + "</li>"
    var button = "<button onclick = 'addJson(" + item.qty + "," + item.value + ")'>Click Me</button>"

   	var ul = "<ul class = individualProductList>" + order + quantity + user + val + button + "</ul>";
    
    $(".container").append(ul);
});

});
