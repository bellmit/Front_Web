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
require(['jquery','dialog','pagination','cookie','common','checkbox_ul','gridaction'],
function($,undefined,Pagination,undefined,Common,CheckBox_UL,GridAction) {
	$(function() {
			//页面元素获取
			var $casewrap=$('#casewrap'),
					$query_pagewrap=$('#query_pagewrap'),
					$stylist_action=$('#stylist_action'),
					dia=dialog();
					
			
			
			//页面存放数据模板
			var htmltemplate='<li class="li-list">'+
			'  <input data-state="1" name="id" value="$id" type="checkbox">'+
			'  <div class="casetitle"><p>$title</p><span></span></div>'+
			'  <div>'+
			'    <div class="case-info">'+
			'      <p>房屋信息：$houseType  $style  $area㎡</p>'+
			'      <p>预算:$budget万元</p>'+
			'      <p>所在地：$desAddress</p>'+
			'      <p>归属：$decName</p>'+
			'      <p>完工时间：$dateTime</p>'+
			'      <span data-action="update" data-value="$id">修改案例</span>'+
			'    </div>'+
			'    <div class="case-show">$caseList</div>'+
			'  </div>'+
			'</li>';
			
			
			
			//初始化查询
			_handler({
					pagewrap:$query_pagewrap,
					listwrap:$casewrap,
					pagenum:1,
					total:0,
					id:null,
					pageSize:10,
					template:htmltemplate,
					flag:true
			});
			
			
			
			
			//菜单伸缩
			$casewrap.on('click','div.casetitle',function(e){
				var $this=$(this),
						$item=$this.parent();
						$item.hasClass('li-listactive')?$item.removeClass('li-listactive'):$item.addClass('li-listactive');
			});
			
			
			
			
			//绑定'修改案例'
			$casewrap.on('click','div.case-info>span',function(e){
					var $this=$(this),
							value=$this.attr('data-value');
					
					if(!value||value==''){
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
							Common.setParams('unloading_case_id','id='+value);
							//成功设置参数后然后页面跳转
							window.location.href='unloading_case_form.html';
						}
					});
			});
			
			
			
			
			//绑定'新建案例','删除'
			$stylist_action.delegate('a','click',function(e){
						var $this=$(this),
								type=$this.attr('data-action')||'';
				
						if(type!=''){
								e.preventDefault();
								
								//获取已经选择的序列值
								var datas=CheckBox_UL.getCheckBox();
								
								//绑定点击事件
								GridAction.gridAciton($this,datas,function(objs){
										//进入需要确认是否执行操作的流程
										if(objs.dialog){
												objs.dialog.close().remove();
												

												//to do 发送删除ajax
												$.ajax({
														url:'../../json/merchant/unloading_case.json',
														type:'get',
														dataType:"json",
														data:'id='+datas.join(','),
														success: function(res){
																if(res.action){
																		dia.content('<span class="g-c-green1 g-btips-succ">删除成功</span>').show();

																		//初始化选中数据
																		CheckBox_UL.init($casewrap);
																		
																		//更新视图
																		_handler({
																				pagewrap:$query_pagewrap,
																				listwrap:$casewrap,
																				pagenum:1,
																				total:0,
																				id:null,
																				pageSize:10,
																				template:htmltemplate,
																				flag:false
																		});
																		
																}else{
																		dia.content('<span class="g-c-red2 g-btips-warn">删除失败！</span>').show();
																}
														},
														error: function(){
																dia.content('<span class="g-c-red2 g-btips-warn">删除失败！</span>').show();
														}
												});
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
			CheckBox_UL.init($casewrap);
			//绑定单个选中与取消
			$casewrap.delegate('li>input:checkbox', 'click', function () {
					CheckBox_UL.inputCheck($(this));
			});
			



	});
	
	
	
	//私有函数(查询获取数据)
	function _handler(opt){
			var listdata=[],
					htmlstr='',
					resultset=[];
					
			$.ajax({
					url:'../../json/merchant/unloading_case.json',
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
								listdata=result.caseList;
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
				.replace('$houseType',listdata[i]['houseType'])
				.replace('$style',listdata[i]['style'])
				.replace('$budget',listdata[i]['budget'])
				.replace('$area',listdata[i]['area'])
				.replace('$desAddress',listdata[i]['desAddress'])
				.replace('$decName',listdata[i]['decName'])
				.replace('$dateTime',listdata[i]['dateTime'])
				.replace('$caseList',function(){
						var imagelist=listdata[i]['caseImage'],
								sublen=imagelist.length;
						if(sublen!=0){
								var j=0,
										str='';
								for(j;j<sublen;j++){
										str+='<dl><dt>'+imagelist[j]['name']+'</dt><dd>'+(function(){
											var img=imagelist[j]['url']
													imglen=img.length,
													m=0,
													imgstr='';
													if(imglen!=0){
														for(m;m<imglen;m++){
															imgstr+='<img alt="" src="'+img[m]+'">';
														}
														return imgstr;
													}else{
														return '';
													}
										})()+'</dd></dl>';
								}
								return str;
						}else{
							return '';
						}
				}));
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
