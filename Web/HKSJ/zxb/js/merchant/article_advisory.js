/*配置依赖*/
require.config({
	baseUrl:'../../js',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/manage_common',
		'cookie':'plugins/cookie',
		'checkbox_ul':'widgets/checkbox_ul',
		'gridaction':'widgets/gridaction',
		'pagination':'plugins/pagination.min'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'pagination':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','cookie','checkbox_ul','gridaction','pagination','common'],
function($,undefined,undefined,CheckBox_UL,GridAction,Pagination,Common) {
	
	$(function() {
			//页面元素获取
			var $coupon_action=$('#coupon_action'),
					$coupon_list=$('#coupon_list'),
					$query_pagewrap=$('#query_pagewrap'),
					dia=dialog();
					
					
			//文章列表模板
			var htmltemplate='<li>'+
						'<input name="id" data-state="1" value="$id" type="checkbox">'+
						'<p>$title</p>'+
						'<span>$datetime</span>'+
						'</li>';
						
						
			//初始化查询
			_handler({
					pagewrap:$query_pagewrap,
					listwrap:$coupon_list,
					pagenum:1,
					total:0,
					id:null,
					pageSize:10,
					template:htmltemplate,
					flag:true
			});
			
		
			//绑定"添加","修改","删除"
			$coupon_action.delegate('a','click',function(e){
					var $this=$(this),
							type=$this.attr('data-action')||'',
							//获取已经选择的文章列表
							datas=CheckBox_UL.getCheckBox(),
							issucc=false;
							
							if(type=='add'){
									Common.removeParams('article_advisonry');
							}else if(type=='update'){		
									e.preventDefault();
									
									//判断修改数据是否正确
									if(datas.length>1){
											dia.content('<span class="g-c-red2 g-btips-warn">修改不支持"批量操作"！</span>').show();
											setTimeout(function(){
												dia.close();
											},3000);
											return false;
									}else if(datas.length==0){
											dia.content('<span class="g-c-red2 g-btips-warn">请"选中"需要修改的数据！</span>').show();
											setTimeout(function(){
												dia.close();
											},3000);
											return false;
									}
									
									//绑定点击事件
									GridAction.gridHandler($this,function(objs){
										if(objs.dialog){
												objs.dialog.close().remove();
										}else{
											//设置内部id
											Common.setParams('article_advisonry','id='+datas);
											//成功设置参数后然后页面跳转
											window.location.href='article_advisory_add.html';
										}
									});
									
									return false;
									
									
							}else if(type=='delete'){
								
									e.preventDefault();
									
									//绑定点击事件
									GridAction.gridAciton($this,datas,function(objs){
											//进入需要确认是否执行操作的流程
											if(objs.dialog){
													objs.dialog.close().remove();
													
													//to do 发送删除ajax
													$.ajax({
															url:'../../json/merchant/article_advisory.json',
															type:'post',
															dataType:"json",
															data:datas,
															async:false,
															success: function(res){
																	if(res.action){
																			issucc=true;
																	}else{
																			issucc=false;
																	}
															},
															error: function(){
																	issucc=false;
															}
													});
													
													if(issucc){
															dia.content('<span class="g-c-green1 g-btips-succ">删除成功</span>').show();
															//删除本地数据
															var items=CheckBox_UL.getCheckBoxItem(),
																	len=datas.length,
																	i=len-1;
															for(i;i>=0;i--){
																items[i].parent().remove();
															}
															//初始化选中数据
															CheckBox_UL.init($coupon_list);
													}else{
															dia.content('<span class="g-c-red2 g-btips-warn">删除失败！</span>').show();
													}
													
											}
											setTimeout(function(){
												dia.close();
											},3000);
									},true);
									
									
									return false;
							}
				
			});
			
			
			
			//多选框事件绑定
			//初始化
			CheckBox_UL.init($coupon_list);
			//绑定单个选中与取消
			$coupon_list.delegate('li>input:checkbox', 'click', function () {
					CheckBox_UL.inputCheck($(this));
			});
			
			
			

			
			
	});
	
	
	
	
	
	//私有函数(查询获取数据)
	function _handler(opt){
			var listdata=[],
					htmlstr='',
					resultset=[];
					
			$.ajax({
					url:'../../json/merchant/article_advisory_list.json',
					dataType:"json",
					data:(function(){
						if(opt.id){
							return opt.flag?'id='+opt.id+'&pagenum=1':'id='+opt.id+'&pagenum='+opt.pagenum;
						}else{
							return opt.flag?'pagenum=1':'pagenum='+opt.pagenum;
						}
					}()),
					type:'get',
					async:false,
					success: function(result){
							if(result.total!=0){
								listdata=result.articleList;
								opt.total=result.total;
							}else{
								opt.listwrap.html('');
								listdata.length=0;
								opt.pagewrap.html('');
							}
					},
					error:function(){
							opt.listwrap.html('');
							listdata.length=0;
							opt.pagewrap.html('');
					}
			});
			
			//填充模板
			var i=0,
					len=listdata.length;
			if(len===0){
					opt.listwrap.html('');
					return false;
			}
			for(i;i<len;i++){
					htmlstr=opt.template;
					resultset.push(htmlstr.replace(/\$id/g,listdata[i]['id'])
					.replace('$title',listdata[i]['title'])
					.replace('$datetime',listdata[i]['datetime']));
			}
			
			var $resultset=$(resultset.join(''));
			$resultset.appendTo(opt.listwrap.html(''));
			resultset.length=0;
			
			//分页调用
			opt.pagewrap.pagination({
					pageSize:opt.pageSize,
					total:opt.total,
					pageNumber:opt.pagenum,
					onSelectPage:function(pageNumber,pageSize){
							_handler({
									pagewrap:opt.pagewrap,
									listwrap:opt.listwrap,
									pagenum:pageNumber,
									pageSize:pageSize,
									total:opt.total,
									template:opt.template,
									id:opt.id?opt.id:null,
									flag:false
							});
					}
			});
			
			return true;
	}
	
	
	
	
	
	
});
