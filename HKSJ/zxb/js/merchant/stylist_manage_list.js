/*配置依赖*/
require.config({
	baseUrl:'../../js',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/manage_common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'cookie':'plugins/cookie',
		'gridaction':'widgets/gridaction',
		'pagination':'plugins/pagination.min'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
				deps:['jquery']
		},
		'pagination':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','pagination','rule','commonfn','validform','cookie','common','gridaction'],
function($,undefined,Pagination,Rule,CommonFn,undefined,undefined,Common,GridAction) {
	$(function() {

				//dom引用，其他变量
				var $stylist_body=$('#stylist_body'),
						$query_pagewrap=$('#query_pagewrap'),
						dia=dialog();
						
				var htmltemplate='<tr>'+
								'<td>'+
								'  <div class="stylist-designicon">$url</div>'+
								'</td>'+
								'<td>$desName</td>'+
								'<td>$jobTitle</td>'+
								'<td>$designExperience年</td>'+
								'<td>$goodStyle</td>'+
								'<td>$successCase</td>'+
								'<td>'+
								'  <div class="stylist-updateicon" data-value="$id" data-action="update"><span></span>修改'+
								'  </div>'+
								'  <div class="stylist-deleteicon" data-value="$id" data-action="delete"><span></span>删除'+
								'  </div>'+
								'</td>'+
								'</tr>';
						
				//初始化查询
				_handler({
						pagewrap:$query_pagewrap,
						listwrap:$stylist_body,
						pagenum:1,
						total:0,
						id:null,
						pageSize:10,
						template:htmltemplate,
						flag:true
				});

					
			
				//绑定"修改","删除"
				$stylist_body.delegate('div','click',function(){
						var $this=$(this),
								value=$this.attr('data-value');

								if(!value||value==''){
									dia.content('<span class="g-c-red2 g-btips-warn">没有选中相应的操作数据项！</span>').show();
									setTimeout(function(){
										dia.close();
									},3000);
									return false;
								}

								//是否是正确事件监听对象
								GridAction.gridHandler($this,function(opt){
										var action=opt.action;		
										if(opt.dialog){
											opt.dialog.close().remove();
										}
											
										if(action=='update'){
											
											//更新操作
											//设置内部id
											Common.setParams('stylist_design','id='+value);
											window.location.href='stylist_manage.html';
											
										}else if(action=='delete'){
											
											//删除操作
											//to do 发送删除ajax
											$.ajax({
													url:'../../json/merchant/stylist_manage.json',
													type:'post',
													dataType:"json",
													data:'id='+value,
													async:false,
													success: function(res){
															if(res.action){
																	dia.content('<span class="g-c-green1 g-btips-succ">删除成功</span>').show();
																	$this.closest('tr').remove();
															}else{
																	dia.content('<span class="g-c-red2 g-btips-warn">删除失败！</span>').show();
															}
															setTimeout(function(){
																dia.close();
															},3000);
													},
													error: function(){
														dia.content('<span class="g-c-red2 g-btips-warn">删除失败！</span>').show();
														setTimeout(function(){
															dia.close();
														},3000);
													}
											});
											
											
											
										}
								});

					
				});
				

			
	});
	
	
	
	
	
	//私有函数(查询获取数据)
	function _handler(opt){
			var listdata=[],
					htmlstr='',
					resultset=[];
					
			$.ajax({
					url:'../../json/merchant/stylist_manage_list.json',
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
								listdata=result.stylistList;
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
					opt.listwrap.html('<tr><td colspan="7">暂无数据</td></tr>');
					return false;
			}
			for(i;i<len;i++){
					htmlstr=opt.template;
					resultset.push(htmlstr.replace(/\$id/g,listdata[i]['id'])
					.replace('$url',(function(){
							var urlstr=listdata[i]['url'];
							return urlstr!=''?'<img src="'+urlstr+'" alt=""/>':'';
					})())
					.replace('$desName',listdata[i]['desName'])
					.replace('$jobTitle',listdata[i]['jobTitle'])
					.replace('$designExperience',listdata[i]['designExperience'])
					.replace('$area',listdata[i]['area'])
					.replace('$goodStyle',(function(){
							var stylestr=listdata[i]['goodStyle'];
							return stylestr.length!=0?'<div>'+stylestr.join('</div><div>')+'</div>':'';
					})())
					.replace('$successCase',(function(){
							var casestr=listdata[i]['successCase'];
							return casestr.length!=0?'<div class="stylist-case"><img src="'+casestr.join('" alt=""/></div><div class="stylist-case"><img src="')+'" alt=""/></div>':'';
					})()));
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
