 $(function () {
	 	var d=new Date();
	 	var nowDate=d.getFullYear()+"-"+((d.getMonth()+1)<10?("0"+(d.getMonth()+1)):(d.getMonth()+1))+"-"+(d.getDate()<10?("0"+d.getDate()):d.getDate());
		$("#StartTime").val(nowDate);  
		$("#endtime").val(nowDate);
		queryRegisterUser(nowDate,nowDate);
});
 
 function query()
 {
	 queryRegisterUser($("#StartTime").val(),$("#endtime").val());
 }
 
 //时间段查询注册用户
 function queryRegisterUser(StartTime,endtime)
 {
	 if(StartTime=="" || endtime=="")
		 return;
	 var jsonArray=new Array(); //总json数组，展示数据
	 var arrayDate = new Array();//日期
	 var dshData = new Array();//待审核
	 var shtgData = new Array();//审核通过
	 var shbtgData = new Array();//审核不通过
	 $.post('queryVideoCheckRepost.do',{StartTime:StartTime,endtime:endtime},function(data){
		 for (var i = 0; i < data.length; i++) {
			 arrayDate.push(data[i].CREATE_TIME);
			 dshData.push(data[i].dshCount);
			 shtgData.push(data[i].shtgCount);
			 shbtgData.push(data[i].shbtgCount);
		}
		 jsonArray.push({name:"待审核",data:dshData}); 
		 jsonArray.push({name:"审核通过",data:shtgData}); 
		 jsonArray.push({name:"审核不通过",data:shbtgData}); 
		 
		 $('#container').highcharts({
			 lang:{ //中文
			    	printChart:"打印图表",
		          downloadJPEG: "下载JPEG图片",  
		          downloadPDF: "下载PDF文档"  ,
		         downloadPNG: "下载PNG 图片",  
		         downloadSVG: "下载SVG 矢量图" , 
		         exportButtonTitle: "导出图片"  
			    },
			    credits: { //水印
		     	text: '',//'深圳惠卡旗下马仔小自播',
		     	href: ''
		 	},
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: '视频审核'
		        },
		        xAxis: {
		            categories: arrayDate
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: '数量'
		            },
		            stackLabels: {
		                enabled: true,
		                style: {
		                    fontWeight: 'bold',
		                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
		                }
		            }
		        },
		        legend: {
		            align: 'right',
		            x: -70,
		            verticalAlign: 'top',
		            y: 20,
		            floating: true,
		            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
		            borderColor: '#CCC',
		            borderWidth: 1,
		            shadow: false
		        },
		        tooltip: {
		            formatter: function() {
		                return '<b>'+ this.x +'</b><br/>'+
		                    this.series.name +': '+ this.y +'<br/>'+
		                    '总数: '+ this.point.stackTotal;
		            }
		        },
		        plotOptions: {
		            column: {
		                stacking: 'normal',
		                dataLabels: {
		                    enabled: true,
		                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
		                }
		            }
		        },
		        series: jsonArray
		    });
	 });
 }