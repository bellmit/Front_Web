var select;
$(function(){
	 tb = $('#div_table03').table({
			'class':'table1',	
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		events:{loaded:function(){ // loaded事件,当数据加载成功后触发,这里更新的是分页信息
			$('#spanpage',tb).empty().html('第'+tb.currentpage()+'页/共'+tb.pagecount()+'页  共'+tb.total+"条数据");
			if(tb.currentpage()==1){
				$('#span_first',tb).addClass('First');
				$('#span_prev',tb).addClass('First');
			}else{
				$('#span_first',tb).removeClass('First');
				$('#span_prev',tb).removeClass('First');
			}
			if(tb.currentpage()==tb.pagecount()){
				$('#span_first',tb).addClass('Last');
				$('#span_prev',tb).addClass('First');
			}else{
				$('#span_first',tb).removeClass('Last');
				$('#span_prev',tb).removeClass('First');
			}
			initTableLimit();
		}},
		rm:{evenclass:'rowEven',oddclass:'rowOdd',headclass:'cssth'}, //evenclass指定奇数行样式,oddclass指定偶数行样式,headclass指定表格头样式
		cm:[

			    	{ 	dataindex:'ADMIN_NAME', // 显示数据在行中的属性
					 	headtext:'审核人',
				 		render : function(i, j, c, r) {
							if(c==null)
							{
								return "";
							}
							else
							{
								if(c.length > 10){
									return "<span title='"+c+"'>"+c.substring(0,10)+"...</span>";
								}else{
									return c;
								}
							}
						}	
					},
					{
						dataindex : 'VIDEO_NAME', // 显示数据在行中的属性
						headtext : '审核视频',
						render:function(i, j, c, r) {
							if(r.COUNT_SERIES>1){
								return "<span>"+c+"第"+r.SERIES_NUM+"集</span>";
							}else{
								return "<span>"+c+"</span>";
							}
							
					 	}
					},
					{
						dataindex : 'APPROVE_CONTENT', // 显示数据在行中的属性
						headtext : '审核内容',
						render:function(i, j, c, r) {
							if(c==null)
							{
								return "";
							}
							else
							{
								if(c.length > 10){
									return "<span title='"+c+"'>"+c.substring(0,10)+"...</span>";
								}else{
									return c;
								}
							}
						}
					},
					{
						dataindex : 'APPROVE_STATUS', // 显示数据在行中的属性
						headtext : '审核状态',
						render:function(i, j, c, r) {
							if(c==3){
								return "<span>通过</span>";
							}else if(c==4){
								return "<span>不通过</span>";
							}
						}
					},
					{
						dataindex : 'appDate', // 显示数据在行中的属性
						headtext : '审核时间'
					}
			]
			,
			url:'appUserDetailed.do' ,
			autoload:true,
			total:'totalCount',
			root:'items'
			,
			footbar:{
					tag:'div','class':'pageBox pre',child:[//{tag:'a','class':'excelDoload pab',title:'导出Excel',child:'Excel'},
				     {tag:'div','class':'pages',child:[{tag:'span',child:'第1页/共0页',id:'spanpage'},
				             {tag:'span','class':'number',child:[{tag:'span',id:'span_first','class':'First Page',child:' 首页 ',
				            	 			 events:{click:function(){
				                                tb.firstpage();
      										}}},
                                          {tag:'span',id:'span_prev','class':'Prev  Page',child:'上页',events:{click:function(){
                                        	    tb.prevpage();
                                          }}},
                                          {tag:'span',id:'span_next','class':'First Page',child:' 下页 ',events:{click:function(){
                                        	    tb.nextpage();
                                          }}},
                                          {tag:'span',id:'span_last','class':'First Page',child:'尾页 ',events:{click:function(){
                                        	    tb.lastpage();
                                          }}}]},
                                          {tag:'input',type:'text',title:'请输入正确页数','class':'itext',id:'pageInput2'},
                                          {tag:'span','class':'numAll',id:'spanpagecount',child:'页'},
                                          {tag:'a','class':'ibutton',child:'跳转 ',events:{click:function(){
                                        	  var pn = tb.pagecount();
                                        	  if(isNaN($('#pageInput2').val()) || pn < $('#pageInput2').val()){
                                        		  $.messager.alert("提示",'输入错误,最大只能输入'+pn,"info");
                                        		  $('#pageInput2').val("");
                                        		  return;
                                        	  }
                                        	  tb.gopage($('#pageInput2').val()); 
                                          }}},
                                          '每页',
                                          {tag:'select',child:[{tag:'option',value:'10',child:'10'},
                                                               {tag:'option',value:'20',child:'20'},
                                                               {tag:'option',value:'30',child:'30'},
                                                               {tag:'option',value:'40',child:'40'}],
                                           events:{change:function(e){
                                        	  tb.load({start:0,limit:$(e.target).val()});
                                           }}},'条']}
								]}
		});
});


//查询
function query()
{
	tb.load({start:0,userName:$('#userName').val(),StartTime:$("#StartTime").val(),endtime:$("#endtime").val()});
}


function queryS()
{
	 queryRegisterUser($("#StartTime1").val(),$("#endtime1").val(),$("#adminName").val());
}

//时间段查询注册用户
function queryRegisterUser(StartTime,endtime,userName)
{
	if(userName == null || userName == ""){
		return alert("用户名为必填！！！");
	}
	
	 if(StartTime=="" || endtime=="")
		 return alert("请选择时间段！！！");
	 var jsonArray=new Array(); //总json数组，展示数据
	 var arrayDate = new Array();//日期
	 var appUserC = new Array();//点击视频获取播币
	 $.post('appUserStatistics.do',{StartTime:StartTime,endtime:endtime,userName:userName},function(data){
			 for (var i = 0; i < data.length; i++) {
				 arrayDate.push(data[i].appDate);
				 appUserC.push(data[i].count);
			}
			 jsonArray.push({name:"每天审核统计",data:appUserC}); 
			
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
			            text: '审核人每天审核统计'
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
			            name: '每天审核数',
			            data: appUserC,
			            stack: 'male'
			        }]
			    });
		 });
	}