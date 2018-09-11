$("#submit").on("click", function(event) {
  event.preventDefault();

  // Make a newChirp object
  var newTransaction = {
    author: $("#author").val().trim(),
    type: $("#type").val().trim(),
    from: $("#from").val().trim(),
    amount: $("#amount").val().trim(),
    category: $("#category").val().trim(),
    notes: $("#notes").val().trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss")
  };

  console.log(newTransaction);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newTransaction)
    // On success, run the following code
    .then(function() {

      var row = $("<div>");
      row.addClass("transaction");

      row.append("<p>" + newTransaction.author + " Transaction: </p>");
      row.append("<p>" + newTransaction.type + "</p>");
      row.append("<p>" + newTransaction.from + "</p>");
      row.append("<p>" + newTransaction.amount + "</p>");
      row.append("<p>" + newTransaction.category + "</p>");
      row.append("<p>" + newTransaction.notes + "</p>");

      row.append("<p>At " + moment(newTransaction.created_at).format("h:mma on dddd") + "</p>");

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

    for (var i = 0; i < data.length; i++) {

      var row = $("<div>");
      row.addClass("transaction");

      row.append("<p>" + data[i].author + " transaction.. </p>");
      row.append("<p>" + data[i].type + "</p>");
      row.append("<p>" + data[i].from + "</p>");
      row.append("<p>" + data[i].amount + "</p>");
      row.append("<p>" + data[i].category + "</p>");
      row.append("<p>" + data[i].notes + "</p>");
      row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");

      $("#transaction-area").prepend(row);

    }

  }

});
