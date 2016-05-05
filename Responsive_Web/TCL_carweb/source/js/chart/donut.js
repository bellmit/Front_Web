$(function () {

	var data = [5,6,6,7,8,10,11,12,15,20];
	var series = 10;
	for( var i = 0; i<series; i++)
	{
		data[i] = { label: "故障 "+(i+1), data: data[i] }
	}

	$.plot($("#donut-chart"), data,
	{
		colors: ["#00ab50", "#008164", "#007185", "#4cc3ff","#00aaff","#01456c","#ff9000","#685800","#76ad01","#006900"],
	        series: {
	            pie: { 
	                innerRadius: 0.5,
	                show: true
	            }
	        }
	});
	
});