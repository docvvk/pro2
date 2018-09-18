// Initial chart

// function 
expInc(0, 4);

$(".byDate").change(function(event){
    whatDate();
});

$(".byType").change(function(event){
    console.log($(".byType").val());
    if($(".byType").val() === "Expense By Tags"){
        $(".byDate").hide();
        expTag();
    }else{
        $(".byDate").show();
        whatDate();
    }
});

function expInc(fir, sec){
    $.get("/api/with", function(dat) {
        $("#barChart").empty();
        $("#barChart").append("<canvas id=myChart width=400 height=400></canvas>")
        // console.log(dat[0].createdAt.substring(0,12))
        // console.log(dat[0].createdAt.substring(0,4), dat[0].createdAt.substring(5,7), dat[0].createdAt.substring(8,10));
        $.get("/api/dep", function(data) {

            var wit = tabChar(fir, sec, dat);
            var dep = tabChar(fir, sec, data);

            charting(dep[1], dep[0], wit[0])
        });
    });
}

function expTag(){
    $.get("/api/with", function(dat) {
        $("#barChart").empty();
        $("#barChart").append("<canvas id=myChart width=400 height=400></canvas>")
        var expenseTags = {
            category: [],
            amount: [],
        }

        for(var i = 0; i < dat.length; i++){
            if(expenseTags.category.includes(dat[i].category)){
                expenseTags.amount[expenseTags.category.indexOf(dat[i].category)] += parseInt(dat[i].amount);
            }else{
                expenseTags.category.push(dat[i].category)
                expenseTags.amount.push(parseInt(dat[i].amount))
            }
        }
        pieExpense(expenseTags);
    });
}

function whatDate() {
    if($(".byDate").val() === "Yearly"){
		expInc(0, 4);
	}else if($(".byDate").val() === "Monthly"){
		expInc(5, 7);
	}else{
		expInc(8, 10);
	}
}

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

function pieExpense(tab){
    var ctx = $("#myChart");
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'pie',
        // The data for our dataset
        data: {
            labels: tab.category,
            datasets: [{
                data: tab.amount,
                backgroundColor: ["rgb(197,126,48)", "rgb(121,226,196)", "rgb(115,24,119)","rgb(255, 99, 132)", "rgb(54, 162, 235, 1)", "rgb(178,149,248)", "rgb(209,213,184)", "rgb(245,188,66)"]
            }]
        },
        // Configuration options go here
        options: {}
    });
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