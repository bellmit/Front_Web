/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/manage_common',
		'date97':'plugins/My97DatePicker/WdatePicker',
		'cookie':'plugins/cookie',
		'datepick':'widgets/datepick',
		'querydata':'widgets/querydata'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'datepick':{
			deps:['jquery','date97']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','cookie','date97','datepick','querydata','common'],
function($,undefined,undefined,undefined,undefined,undefined,Common) {
	$(function() {
			//页面元素获取
			var $business_start=$('#business_start'),
					$business_end=$('#business_end'),
					$state=$('#state'),
					$business_search=$('#business_search'),
					$griddata=$('#griddata'),
					dia=dialog();
			
		
			
			
			//时间日历对象调用
			$.datePick([$business_start,$business_end],true);
			



			//查询绑定
			$business_search.queryListData([$business_start,$business_end,$state],2000,function(sparam){
													
				//sparam 为一个带有参与联合查询的字符数组，可用于ajax的参数
				console.log(sparam);
				
				//拼合参数
				var datas={},
						len=sparam.length,
						i=0;
				for(i;i<len;i++){
						datas[sparam[i]['name']]=sparam[i]['value'];
				}
				
				//to do
				//开发时开启下部代码
				$.ajax({
						url:'../../json/merchant/business_manage.json',
						type:'post',
						dataType:"json",
						data:datas,
						success: function(data){
								var temphtml=[],
										result=data.businessList,
										datalen=result.length;
								if(datalen!=0){
										var j=0,str='';
										for(j;j<datalen;j++){
											//to do
											//拼接具体的json数据对象
											str+='<tr>'+
											'<td>'+result[j]['datetime']+'</td>'+
											'<td>'+result[j]['name']+'</td>'+
											'<td>'+result[j]['code']+'</td>'+
											'<td><img src="'+result[j]['url']+'" alt=""/></td>'+
											'</tr>';
										}
										$(str).appendTo($griddata.html(''));
								}else{
									$griddata.html('<tr><td colspan="4">暂无数据</td></tr>');
								}
						},
						error: function(){
								$griddata.html('<tr><td colspan="4">暂无数据</td></tr>');
						}
				});
				
			},true);
			
			
			
			

			
			
			
	});
});
