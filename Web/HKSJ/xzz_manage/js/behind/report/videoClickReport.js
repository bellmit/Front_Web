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
	 $.post('queryVideoClickNumByDay.do',{StartTime:StartTime,endtime:endtime},function(data){
		 var arrayDate = new Array();//日期
		 var arrayNum = new Array();//视频播放数量
		 var arrayClickNum = new Array();//视频有效点播次数
		 for (var i = 0; i < data.length; i++) 
		 {
			arrayDate.push(data[i].VIDEO_DAY);
			arrayNum.push(data[i].CLICK_TIMES);
			arrayClickNum.push(data[i].count);
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
		            text: '视频点播，播放次数统计',
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
		            valueSuffix: '次'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: [{
		            name: '视频播放次数',
		            data: arrayNum
		        }, {
		            name: '视频有效点击次数',
		            data: arrayClickNum
		        }]
		    });
	 })
 }