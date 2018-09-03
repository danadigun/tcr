$(function(){

    $.ajax({
        url: '/api/data',
        type: 'GET',
        success : function(data) {
            console.log(data);
            
          
            var ctx = document.getElementById("myChart").getContext('2d');
            var ctx_1 = document.getElementById("myBarChart").getContext('2d');
            const data_pie = {
                datasets: [{
                    data: [data.loss, data.gain],
                    backgroundColor: ["#ef6c00", "#0277bd"]
                }],
        
                labels: [
                    'loss',
                    'gain'
                ],
            };

            const data_bar = {
                labels: ["Opeining_level", "Closing_level"],
                datasets: [{
                    label: `Tank ${data.tank} closing Levels`,
                    data: [data.opening_level, data.closing_level],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        '#ffb74d',
                        
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        '#ef6c00',
                    ],
                    borderWidth: 1
                }]
            }
            var myPieChart = new Chart(ctx,{
                type: 'pie',
                data: data_pie,
                options: {
                    cutoutPercentage : 50,
                }  
            });

            

            var myBarChart = new Chart(ctx_1, {
                type: 'bar',
                data: data_bar,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }
    })
    
   
})

