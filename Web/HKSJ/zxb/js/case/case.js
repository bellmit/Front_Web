/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'gallery_query':'widgets/gallery_query',
		'pagination':'plugins/pagination.min',
		'cookie':'plugins/cookie',
		'city_select':'widgets/city_select',
		'modal_dialog':'widgets/modal_dialog'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'pagination':{
				deps:['jquery']
		},
		'validform':{
			deps:['jquery']
		}
		
	}
});


/*程序入口*/
require(['jquery','dialog','rule','commonfn','validform','city_select','modal_dialog','gallery_query','pagination','cookie','common'],function($,undefined,Rule,CommonFn,undefined,City_Select,Modal_Dialog,GalleryQuery,Pagination,undefined,Common) {
	$(function() {
			//页面元素获取
			var $query_result=$('#query_result'),
					$queryitem_housetype=$('#queryitem_housetype'),
					$queryitem_area=$('#queryitem_area'),
					$queryitem_style=$('#queryitem_style'),
					$queryitem_budget=$('#queryitem_budget'),
					$query_listwrap=$('#query_listwrap'),
					$query_pagewrap=$('#query_pagewrap');
					

			//需加载的文本模板
			var	htmltemplate=
			'<li data-id="$id" class="$wrapclass">'+
			'	<a data-id="$id" class="case-griditem1" href="$href">'+
			'		<img src="$url" alt="">'+
			'	</a>'+
			'	<div class="case-griditem2">'+
			'		<h3>$name</h3>'+
			'		<div>'+
			'			<span>$housetype</span>'+
			'			<span>$style</span>'+
			'			<span>$aream<sup>2</sup></span>'+
			'			<span>预算：<em>$budget万元</em></span>'+
			'		</div>'+
			'	</div>'+
			'	<div class="case-griditem3">'+
			'		<div>'+
			'			<img src="$desHeadPortraitUrl" alt="">'+
			'		</div>'+
			'		<p>$decName--$desName</p>'+
			'		<span class="good"><em></em>$greatNumber</span>'+
			'		<a data-id="$id" href="$answerNumberhref" class="comment"><em></em>$answerNumber</a>'+
			'	</div>'+
			'</li>';
					

			//联合查询
			GalleryQuery.queryItem({
						numberwrap:$query_result,
						listwrap:$query_listwrap,
						pagewrap:$query_pagewrap,
						cookie:'case_params',
						itemwrap:{
							'houseType':$queryitem_housetype,
							'area':$queryitem_area,
							'style':$queryitem_style,
							'budget':$queryitem_budget
						}						
			},function(opt,flag){
					//执行异步查询操作
					
					var isdata=_handler(opt,htmltemplate);
					
					if(isdata){
						//分页调用
						$query_pagewrap.pagination({
							pageSize:opt.pageSize,
							total:opt.total,
							pageNumber:opt.pageNum,
							onSelectPage:function(pageNumber,pageSize){
									opt.pageSize=pageSize;
									opt.pageNum=pageNumber;
									_handler(opt,htmltemplate);
							}
						});
						
					}else{
						opt.total=0;
						opt.pageNum=1;
						opt.pagewrap.html('');
					}
			},function(){
					var $items=this.closest('li').children('div'),
							$item2=$items.eq(0);
							$item3=$items.eq(1),
							$tempitem2=$item2.find('div').children(),
							$tempitem3=$item3.children(),
							str='';
							
					//拼接数据	
					str+='{"name":"'+$item2.find('h3').text()+'",';
					str+='"housetype":"'+$tempitem2.eq(0).text()+'",';
					str+='"style":"'+$tempitem2.eq(1).text()+'",';
					str+='"area":"'+$tempitem2.eq(2).text().replace('2','').replace('m','')+'",';
					str+='"budget":"'+$tempitem2.eq(3).find('em').text().replace('万元','')+'",';
					str+='"desHeadPortraitUrl":"'+$tempitem3.eq(0).find('img').attr('src')+'",';
					str+='"decName":"'+$tempitem3.eq(1).text().split('--')[0]+'",';
					str+='"greatNumber":"'+$tempitem3.eq(2).text()+'",';
					str+='"inArea":"",';
					str+='"Town":""}';
					
					//存入浏览器
					GalleryQuery.setParams('case_info',str);
			});
			
			
			//点赞
			$query_listwrap.delegate('span','click',function(){
					var $this=$(this),
					id=null,
					actiontype='',
					isaction=false;
					if($this.hasClass('good')){
							id=$this.closest('li').attr('data-id');
							actiontype='good';
							isaction=true;
					}
					if(isaction){
							$.ajax({
									url:'点赞请求地址',
									dataType:"json",
									data:'id='+id,
									type:'post',
									async:true,
									success: function(result){
											if(result){
												
											}else{
												
											}
									},
									error:function(){
										//需要碰到是否登录
											Modal_Dialog.modal('login',function(){
													var self=this;
						
													//to do
													$.ajax({
															url:'请求地址',
															type:'post',
															dataType:"json",
															data:'相关请求参数',
															success: function(data){

																setTimeout(function(){
																	//关闭窗口
																	self.modalHide('login');
																	//弹窗相关提示窗口
																	//to do ajax
																	//发送点赞请求
																},200);
															},
															error: function(){
																
															}
													});

											});

									}
							});
					}
					return false;
			});
			
			//评论
			
			
			

			
			
	});
	
	
	

	//私有函数
	function _handler(opt,template){
			var listdata=null,
					htmlstr='',
					resultset=[];
			
			//组合参数
			var params={},
			paramstr='';
			for(var j in opt.itemquery){
					params[j]=opt.itemquery[j];
					paramstr+=j+'='+opt.itemquery[j]+'&';
			}
			params['pagenum']=opt.pageNum;
			paramstr+='pagenum='+opt.pageNum;
	
			$.ajax({
					url:'../../json/case.json',
					dataType:"json",
					data:params,
					type:'get',
					async:false,
					success: function(result){
							if(result.total!==0){
								listdata=result.caseList;	
								opt.total=result.total;
								opt.numberwrap.text(result.total);
								opt.itemparams=paramstr;
							}else{
								opt.listwrap.html('');
								listdata.length=0;
							}
					},
					error:function(){
							opt.listwrap.html('');
							listdata.length=0;
					}
			});
			
			
			//填充模板
			var i=0,
					len=listdata.length;
			if(len===0){
					$listwrap.html('');
					return false;
			}
			for(i;i<len;i++){
				htmlstr=template;
				resultset.push(htmlstr.replace('$wrapclass',function(){
						var j=i+1;
						return j%4===0?'case-layoutitem2':'case-layoutitem1';
				})
				.replace(/\$id/g,listdata[i]['id'])
				.replace('$href',listdata[i]['href'])
				.replace('$url',listdata[i]['url'])
				.replace('$name',listdata[i]['name'])
				.replace('$housetype',listdata[i]['housetype'])
				.replace('$style',listdata[i]['style'])
				.replace('$area',listdata[i]['area'])
				.replace('$budget',listdata[i]['budget'])
				.replace('$desHeadPortraitUrl',listdata[i]['desHeadPortraitUrl'])
				.replace('$decName',listdata[i]['decName'])
				.replace('$desName',listdata[i]['desName'])
				.replace('$greatNumber',listdata[i]['greatNumber'])
				.replace('$answerNumberhref',listdata[i]['answerNumberhref'])
				.replace('$answerNumber',listdata[i]['answerNumber']));
			}
			
			var $resultset=$(resultset.join(''));
			$resultset.appendTo(opt.listwrap.html(''));
			resultset.length=0;
			return true;
	}
});


