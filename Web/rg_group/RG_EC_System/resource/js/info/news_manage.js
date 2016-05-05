/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'common':'js/common/common',
		'dialog':'js/lib/artDialog/dialog',
		'pagination':'js/plugins/easyui_page/pagination',
		'querydata':'js/widgets/querydata',
	},
	shim:{
		'bootstrap':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery']
		},
		'dialog':{
				deps:['jquery']
		},
		'pagination':{
				deps:['jquery']
		},
		'querydata':{
				deps:['jquery','dialog']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','common','dialog','pagination','querydata'], function($,$strap,undefined,undefined,undefined,undefined) {
	$(function() {
		/*页面元素引用*/
		var $news_griddata=$('#news_griddata'),
				$news_page=$('#news_page'),
				$title=$('#title'),
				$grid_querybtn=$('#grid_querybtn');
				
				
		//html模板
		var htmlcontent='<tr><td><a href="$url">查看</a></td><td>$title</td></tr>';
				

		//查询搜索
		$grid_querybtn.queryListData([$title],2000,function(sparam){
				//sparam 为一个带有参与联合查询的字符数组，可用于ajax的参数
				
				//to do
				//开发时开启下部代码
				$.ajax({
						url:'请求地址',
						type:'post',
						dataType:"json",
						data:'相关请求参数',
						success: function(data){
								var temphtml=[],
										tempstr=htmlcontent;
								if(data){
										$.each(data,function(index){
												temphtml.push(tempstr.replace('$url',data[index]['url'])
												.replace('$title',data[index]['title']));
										});
										$news_griddata.html(temphtml.join(''));
								}else{
									$news_griddata.html('<tr><td colspan="2">暂无数据</td></tr>');
								}
						},
						error: function(){
								$news_griddata.html('<tr><td colspan="2">暂无数据</td></tr>');
						}
				});
		});
		
		
		//分页 easy-ui pagination
		$news_page.pagination({
			pageSize:20,
			onSelectPage:function(pageNumber,pageSize){
					console.log('当前页：'+pageNumber);
					console.log('每页记录数：'+pageSize);
					//to do 
					//分页处理
			}
		});
		


		
	});
});
