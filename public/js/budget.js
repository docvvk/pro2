var uTransaction;

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
  $("#name").val("");
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

      var row = $(`<div id='${data[i].id}'>`);
      row.addClass("transaction");

      row.append(`<h5 class=recentTran${i}>`)
      row.append(`${moment(data[i].created_at).format("DD/MMM/YYYY")} `)
      row.append(`${data[i].name} `)
      row.append(`${data[i].type} `)
      row.append(`${data[i].amount}   `)
      row.append(`<button data-id="${data[i].id}" type=button class=\"btn btn-primary edit\" data-toggle=modal data-target=\"#exampleModalCenter\">...`)

      $("#transaction-area").prepend(row);

  }

  $(".edit").on("click", function(event) {
    console.log(this);
    var x = parseInt($(this).attr("data-id")) - 1;
    console.log(x);

    $(".modal-body").attr("actId", x+1);


    $("#u-name").val(data[x].name);
    $("#u-type").val(data[x].type);
    $("#u-from").val(data[x].from);
    $("#u-amount").val(data[x].amount);
    $("#u-category").val(data[x].category);
    $("#u-notes").val(data[x].notes);

    // uTransaction = {
    //   name: $("#u-name")
    //     .val()
    //     .trim(),
    //   type: $("#u-type").val(),
    //   from: $("#u-from").val(),
    //   amount: $("#u-amount")
    //     .val()
    //     .trim(),
    //   category: $("#u-category")
    //     .val()
    //     .trim(),
    //   notes: $("#u-notes")
    //     .val()
    //     .trim()
    // };
    //
    // console.log(uTransaction);


  })
}
});

$("#save").on("click", function(event) {

  uTransaction = {
    name: $("#u-name")
      .val()
      .trim(),
    type: $("#u-type").val(),
    from: $("#u-from").val(),
    amount: $("#u-amount")
      .val()
      .trim(),
    category: $("#u-category")
      .val()
      .trim(),
    notes: $("#u-notes")
      .val()
      .trim()
  };

  console.log(uTransaction);
  var id = $(".modal-body").attr("actId");

  $.ajax({
    method: "PUT",
    url: "/api/new/" + id,
    data: uTransaction
  })
    .then(function() {
      console.log(uTransaction);
      location.reload();
    });
})

$(".catWith").hide();

$("#type").change(function(event){
  console.log($("#type").val());
  if($("#type").val() === "withdrawl"){
    $(".catWith").show();
    $(".catDep").hide();
  }else{
    $(".catWith").hide();
    $(".catDep").show();
  }
})

$.get("/api/dep", function(depo){
  $.get("/api/with", function(withd){
    var types = ["checking", "saving", "gic"]
    var names = ["CHQ", "SAV", "GIC"]
    console.log(depo, withd)
    for(var i = 0; i < types.length; i++){
      var amount = sumDat(depo, types[i]) - sumDat(withd, types[i]);
      console.log(amount)
      var row = $(`<h3> ${names[i]}       ${amount}</h3>`);
      $(".net-worth").append(row)
    }
  })
})

function sumDat(data, account){
  var amount = 0;
  
  for(var i = 0; i < data.length; i++){
    if(data[i].from === account){
      amount += parseInt(data[i].amount);
    }
  }

  return amount;
}
