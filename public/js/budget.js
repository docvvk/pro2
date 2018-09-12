$("#submit").on("click", function(event) {
  event.preventDefault();

  // Make a newTransaction object
  var newTransaction = {
    name: $("#name")
      .val()
      .trim(),
    type: $("#type").val(),
    from: $("#from").val(),
    amount: $("#amount")
      .val()
      .trim(),
    category: $("#category")
      .val()
      .trim(),
    notes: $("#notes")
      .val()
      .trim()
    // created_at: moment().format("YYYY-MM-DD HH:mm:ss")
  };

  console.log(newTransaction);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newTransaction)
    // On success, run the following code
    .then(function() {

      var row = $("<div>");
      row.addClass("transaction");

      location.reload();
      row.append(
        "<h5> Time:  " +
          moment(newTransaction.created_at).format("h:mma DD/MMM/YYYY") +
          "</h5><hr>"
      );

      $("#transaction-area").prepend(row);
    });

  // Empty each input box by replacing the value with an empty string
  $("#author").val("");
  $("#type").val("");
  $("#from").val("");
  $("#amount").val("");
  $("#category").val("");
  $("#notes").val("");
});

$.get("/api/all", function(data) {
  if (data.length !== 0) {

    
    var showing = data.length;
    var i = 0;

    if(data.length > 4){
      i = data.length - 5;
    }

    for (i; i < showing; i++) {

      var row = $("<div>");
      row.addClass("transaction");

      row.append(`<h5 class=recentTran${i}>`)
      row.append(`${moment(data[i].created_at).format("DD/MMM/YYYY")} `)
      row.append(`${data[i].name} `)
      row.append(`${data[i].type} `)
      row.append(`${data[i].amount}   `)
      row.append(`<button type=button class=\"btn btn-primary\" data-toggle=modal data-target=\"#exampleModalCenter\">...`)

      $("#transaction-area").prepend(row);
  }
}
});


