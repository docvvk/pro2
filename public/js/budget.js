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

      row.append("<h5> TRANSACTION DETAILS: </h5>");
      row.append("<h5> Name: " + newTransaction.name + "</h5>");
      row.append("<h5> Type: " + newTransaction.type + "</h5>");
      row.append("<h5> From: " + newTransaction.from + "</h5>");
      row.append("<h5> Amount: " + newTransaction.amount + "</h5>");
      row.append("<h5> Category: " + newTransaction.category + "</h5>");
      row.append("<h5> Notes: " + newTransaction.notes + "</h5>");

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
    for (var i = 0; i < data.length; i++) {
      var row = $("<div>");
      row.addClass("transaction");

      row.append("<h5> Name: " + data[i].name + "</h5>");
      row.append("<h5> Type: " + data[i].type + "</h5>");
      row.append("<h5> From: " + data[i].from + "</h5>");
      row.append("<h5> Amount: " + data[i].amount + "</h5>");
      row.append("<h5> Category: " + data[i].category + "</h5>");
      row.append("<h5> Notes: " + data[i].notes + "</h5>");
      row.append(
        "<h5> Time: " +
          moment(data[i].created_at).format("h:mma DD/MMM/YYYY") +
          "</h5><hr>"
      );
      $("#transaction-area").prepend(row);
    }
  }
});
