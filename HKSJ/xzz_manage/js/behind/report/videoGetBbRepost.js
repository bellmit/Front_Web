
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
	 var chickVideoBb = new Array();//点击视频获取播币
	 var uploadVideoBb = new Array();//上传视频获取播币
	 $.post('queryVideoGetBbRepost.do',{StartTime:StartTime,endtime:endtime},function(data){
		 for (var i = 0; i < data.length; i++) {
			 arrayDate.push(data[i].CREATE_TIME);
			 if(data[i].INTEGRATION_TYPE == 4){
				 chickVideoBb.push(data[i].SUMBB);
			 }else{
				 uploadVideoBb.push(data[i].SUMBB);
			 }
		}
		 jsonArray.push({name:"点击视频获取播币",data:chickVideoBb}); 
		 jsonArray.push({name:"上传视频获取播币",data:uploadVideoBb}); 
		
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
		 	},chart: {
		            type: 'column'
		        },
		        title: {
		            text: '点击，上传视频获取播币统计'
		        },

		        xAxis: {
		            categories:arrayDate
		        },

		        yAxis: {
		            allowDecimals: false,
		            min: 0,
		            title: {
		                text: '数量'
		            }
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
		                stacking: 'normal'
		            }
		        },

		        series: [{
		            name: '点播获取播币数',
		            data: chickVideoBb,
		            stack: 'male'
		        }, {
		            name: '上传获取播币数',
		            data: uploadVideoBb,
		            stack: 'female'
		        }]
		    });
	 });
 }