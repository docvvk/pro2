// Initial chart

// function 
expInc(0, 4);

function expInc(fir, sec){

	$.get("/api/with", function(dat) {
			// console.log(dat[0].createdAt.substring(0,12))
			// console.log(dat[0].createdAt.substring(0,4), dat[0].createdAt.substring(5,7), dat[0].createdAt.substring(8,10));
			$.get("/api/dep", function(data) {
	
                var wit = tabChar(fir, sec, dat);
                var dep = tabChar(fir, sec, data);

                charting(dep[1], dep[0], wit[0])
			});
	});
}

$(".byDate").change(function(event){
	$("#myChart").empty();
    if($(".byDate").val() === "Yearly"){
			expInc(0, 4);
		}else if($(".byDate").val() === "Monthly"){
			expInc(5, 7);
		}else{
			expInc(8, 10);
		}
});



function tabChar(fir, sec, data) {
  var ini = data[0].createdAt.substring(fir, sec);
  var tabl = [0];
  var lab = [ini];
  var wher = 0;

  for (var i = 0; i < data.length; i++) {
    if (ini === data[i].createdAt.substring(fir, sec)) {
		tabl[wher] += parseInt(data[i].amount);
    } else {
        var at = parseInt(data[i].createdAt.substring(fir, sec)) - parseInt(ini);
        for (var j = 0; j < at; j++) {
            wher++;
            tabl.push(0);
            lab.push((parseInt(ini) + j + 1).toString());
        }

        ini = data[i].createdAt.substring(fir, sec);
		i -= 1;
    }
	}
	return [tabl, lab]
}



function charting(lab, data1, data2){
    var ctx = $("#myChart");
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels: lab,
            datasets: [{
                label: "Deposit",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: data1,
            },{
                label: "Withdrawl",
                backgroundColor: 'rgb(54, 162, 235, 1)',
                borderColor: 'rgb(54, 162, 235)',
                data: data2,
            }]
        },
        // Configuration options go here
        options: {}
    });
}