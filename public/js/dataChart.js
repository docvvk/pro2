// Initial chart
$.get("/api/all/init", function(data) {
    console.log(data);
    charting($(".byType").val(), $(".byDate").val(), data);
});

$(".byType").change(function(event){
    $.get("/api/all", function(data) {
        console.log(data);
        charting($(".byType").val(), $(".byDate").val(), data);
    });
});

$(".byDate").change(function(event){
    $.get("/api/all", function(data) {
        console.log(data);
        charting($(".byType").val(), $(".byDate").val(), data);
    });
});


function charting(byType, byDate, data){
    // var dataset1 = [];
    // var dataset2 = [];
    // var label1 = "";
    // var label2 = "";


    // console.log(byType,   byDate);
    // if(byType === "Expense & Income"){
    //     if(btDate === "Yearly"){

    //     }else if(btDate === "Monthly"){

    //     }else{

    //     }
    // }else{

    // }

    var ctx = $("#myChart");
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
    
        // The data for our dataset
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "My First dataset",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [1,3,2,1],
            },{
                label: "My First dataset",
                backgroundColor: 'rgb(54, 162, 235, 1)',
                borderColor: 'rgb(54, 162, 235)',
                data: [2,2,3,4],
            }]
        },
    
        // Configuration options go here
        options: {}
    });
}