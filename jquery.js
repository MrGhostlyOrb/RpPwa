let datafile = JSON.parse(products.json);
let data = datafile;


$.each(data.data, function (index, item) {
    var ul = $("<ul/>");
    var li = $("<li/>", { text: item.orderNum });
    ul.append(li);
    ul.append(li.clone().text(item.qty));
    ul.append(li.clone().text(item.userName));
    ul.append(li.clone().text(item.value));
    $(".container").append(ul);
});
