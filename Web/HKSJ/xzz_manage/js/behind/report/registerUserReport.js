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
	 $.post('queryRegisterUser.do',{StartTime:StartTime,endtime:endtime},function(data){
		 var arrayDate = new Array();//日期
		 var arrayNum = new Array();//小自播数量
		 var arrayNumOther = new Array();//其他产品数量
		 for (var i = 0; i < data.length; i++) 
		 {
			arrayDate.push(data[i].CREATE_TIME);
			arrayNum.push(data[i].xzbCount);
			arrayNumOther.push(data[i].qtCount);
		 }
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
		        title: {
		            text: '注册用户量',
		            x: -20 //center
		        },
		        subtitle: {
		            text: '',
		            x: -20
		        },
		        xAxis: {
		            categories: arrayDate
		        },
		        yAxis: {
		            title: {
		                text: '数量'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: '人'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: '小自播注册用户',
		            data: arrayNum
		        }, {
		            name: '其他产品用户',
		            data: arrayNumOther
		        }]
		    });
	 })
 }