let data = {"resultDescription":"SUCCESS","data":[{"orderNum":"A000","userName":"Oswaldo","value":504.74,"qty":3.0},{"orderNum":"A001","userName":"Mao","value":529.17,"qty":6.0},{"orderNum":"A002","userName":"Angeline","value":553.6,"qty":9.0},{"orderNum":"A003","userName":"Gerardo","value":578.03,"qty":12.0},{"orderNum":"A004","userName":"Nicki","value":602.46,"qty":15.0}]}

$.each(data.data, function (index, item) {
    var ul = $("<ul/>");
    var li = $("<li/>", { text: item.orderNum });
    ul.append(li);
    ul.append(li.clone().text(item.qty));
    ul.append(li.clone().text(item.userName));
    ul.append(li.clone().text(item.value));
    $(".container").append(ul);
});
