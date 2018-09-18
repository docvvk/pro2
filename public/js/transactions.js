
  $.get("/api/all", function(data){
    console.log(data);
    var tables = $("<tbody>");
    console.log(data[1].name)

    for(var i = 0; i < data.length; i++){
      
      
      var row = $("<tr>");

      row.append($(`<td> ${data[i].id} </td>`))
      row.append($(`<td> ${data[i].name} </td>`))
      row.append($(`<td> ${data[i].type} </td>`))
      row.append($(`<td> ${data[i].from} </td>`))
      row.append($(`<td> ${data[i].amount} </td>`))
      row.append($(`<td> ${data[i].category} </td>`))
      row.append($(`<td> ${data[i].notes} </td>`))
      row.append($(`<td> ${data[i].createdAt} </td>`))
      row.append($(`<td> ${data[i].updatedAt} </td>`))
      row.append($("</tr>"))
      tables.append(row)
    }
    $("#tansTable").append(tables);
  });