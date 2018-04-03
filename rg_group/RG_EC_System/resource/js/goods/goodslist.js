/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'common':'js/common/common',
		'dialog':'js/lib/artDialog/dialog',
		'rule':'js/widgets/rules',
		'validform':'js/plugins/validform',
		'commonfn':'js/widgets/commonfn',
		'querydata':'js/widgets/querydata',
		'gridaction':'js/widgets/gridaction'
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
		'validform':{
				deps:['jquery']
		},
		'commonfn':{
				deps:['jquery','rule']
		},
		'querydata':{
				deps:['jquery','dialog']
		},
		'gridaction':{
				deps:['jquery','dialog']
		}
	}
});

//html元素私有绑定方法
(function(w){
		//私有方法
		w.clearGoodsChar=function(cur){
				cur.value=cur.value.replace(/[\D*]/g,'');
		}
		w.clearGoodsEmpty=function(cur){
				var temptxt=cur.value.replace(/(^00{0,}$)/g,'1');
				if(temptxt==''){
					temptxt='1';
				}
				cur.value=temptxt;
		}
}(window));



/*程序入口*/
require(['jquery','bootstrap','common','dialog','rule','validform','commonfn','querydata','gridaction'], function($,$strap,undefined,undefined,Rule,undefined,CommonFn,undefined,GridAction) {

	$(function() {
		/*页面元素引用*/
		var $search=$('#search'),
				$searchbtn=$('#searchbtn'),
				$kindGrademain=$('#kindGrademain'),
				$kindGradesub=$('#kindGradesub'),
				$goods_show=$('#goods_show'),
				$addpoorder_griddata=$('#addpoorder_griddata'),
				$addpoorder_wrap=$('#addpoorder_wrap'),
				$poOrder=$('#poOrder'),
				$count_FV=$('#count_FV'),
				$count_FD=$('#count_FD'),
				$goods_showcomment=$('.goods-showcomment',$goods_show),
				$goods_showway=$('#goods_showway');

		//初始化
		//评价初始化
		(function(){
			var $span=$goods_showcomment.find('span');
			$span.each(function(index, element) {
				var $this=$(this);
				$this.css({'width':$this.attr('data-comment')*20+'%'});
      });
		}());
		
		
		
		//绑定显示方式切换
		$goods_showway.on('click',function(){
				var $this=$(this);
				$goods_show.removeClass('showblock showlist');
				if($this.hasClass('goods-showlistbtn')){
						$this.removeClass('goods-showlistbtn');
						$goods_show.addClass('showblock');
				}else{
						$this.addClass('goods-showlistbtn');
						$goods_show.addClass('showlist');
				}
		});
		
		//查询搜索
		$searchbtn.queryListData([$search],2000,function(sparam){
				//sparam 为一个带有参与联合查询的字符数组，可用于ajax的参数
				console.log(sparam);
				//to do
				//开发阶段开启下面部分
				
				$.ajax({
						url:'请求地址',
						type:'post',
						dataType:"json",
						data:'相关请求参数',
						success: function(data){
								if(data){
										//填充查询结果集
										if('有结果集'){
												var tempres=[];
												$.each(data['结果集'],function(i,v){
														tempres.push('<li data-value="['+data['结果集']['value']+']"><img src="'+data['结果集']['图片地址']+'"><span>'+data['结果集']['商品名称']+'</span></li>');
												});
												if(tempres.length>0){
														$(temres.join('')).appendTo($goods_show.html(''));
												}else{
														$goods_show.html('');
												}
										}
								}else{
									$goods_show.html('');
								}
						},
						error: function(){
								$goods_show.html('');
						}
				});
		});
		
		
		
		
		//绑定商品快捷导航查询
		$.each([$kindGrademain,$kindGradesub],function(i,v){
				var $wrap=this,
				selector=$wrap.selector.slice(1);
				
				//初始化查询
				if(selector.indexOf('main')!=-1){
						(function(){
								var $item=$wrap.children().eq(0),
										values=$item.attr('data-value')||'';
										$item.addClass('keywrod-item-sel').siblings().removeClass('keywrod-item-sel');
										if(values!=''){
											  //to do
												//开发阶段开启下面部分
												
												$.ajax({
														url:'请求地址',
														type:'post',
														dataType:"json",
														data:'相关请求参数',
														success: function(data){
																if(data){
																		//填充子菜单
																		if('子菜单有数据'){
																				var temparr=[];
																				$.each(data['子菜单数据'],function(i,v){
																						temparr.push('<li data-value="'+data['子菜单有数据']['绑定的数据']+'">'+data['子菜单有数据']['子菜单名称']+'</li>');
																				});
																				if(temparr.length>0){
																						$(temparr.join('')).appendTo($kindGradesub.html(''));
																				}else{
																						$kindGradesub.html('');
																				}
																		}
																		//填充查询结果集
																		if('有结果集'){
																				var tempres=[];
																				$.each(data['结果集'],function(i,v){
																						tempres.push('<li data-value="['+data['结果集']['value']+']"><img src="'+data['结果集']['图片地址']+'"><span>'+data['结果集']['商品名称']+'</span></li>');
																				});
																				if(tempres.length>0){
																						$(temres.join('')).appendTo($goods_show.html(''));
																				}else{
																						$goods_show.html('');
																				}
																		}
																}else{
																	$kindGradesub.html('');
																	$goods_show.html('');
																}
														},
														error: function(){
																$kindGradesub.html('');
																//注意：开发时请开启下面注释部分，目前是为了测试静态数据
																//$goods_show.html('');
														}
												});
										}
						}());
				}
				
				//绑定点击事件
				$wrap.delegate('li','click',function(e){
						var $item=$(this),
								values=$item.attr('data-value')||'';
								
						$item.addClass('keywrod-item-sel').siblings().removeClass('keywrod-item-sel');
						
						if(selector.indexOf('main')!=-1){
								if(values!=''){
											  //to do
												//开发阶段开启下面部分
												
												$.ajax({
														url:'请求地址',
														type:'post',
														dataType:"json",
														data:'相关请求参数',
														success: function(data){
																if(data){
																		//填充子菜单
																		if('子菜单有数据'){
																				var temparr=[];
																				$.each(data['子菜单数据'],function(i,v){
																						temparr.push('<li data-value="'+data['子菜单有数据']['绑定的数据']+'">'+data['子菜单有数据']['子菜单名称']+'</li>');
																				});
																				if(temparr.length>0){
																						$(temparr.join('')).appendTo($kindGradesub.html(''));
																				}else{
																						$kindGradesub.html('');
																				}
																		}
																		//填充查询结果集
																		if('有结果集'){
																				var tempres=[];
																				$.each(data['结果集'],function(i,v){
																						tempres.push('<li data-value="['+data['结果集']['value']+']"><img src="'+data['结果集']['图片地址']+'"><span>'+data['结果集']['商品名称']+'</span></li>');
																				});
																				if(tempres.length>0){
																						$(temres.join('')).appendTo($goods_show.html(''));
																				}else{
																						$goods_show.html('');
																				}
																		}
																}else{
																	$kindGradesub.html('');
																	$goods_show.html('');
																}
														},
														error: function(){
																$kindGradesub.html('');
																$goods_show.html('');
														}
												});
										}
						}else{
								if(values!=''){
											  //to do
												//开发阶段开启下面部分
												
												$.ajax({
														url:'请求地址',
														type:'post',
														dataType:"json",
														data:'相关请求参数',
														success: function(data){
																if(data){
																		//填充查询结果集
																		if('有结果集'){
																				var tempres=[];
																				$.each(data['结果集'],function(i,v){
																						tempres.push('<li data-value="['+data['结果集']['value']+']"><img src="'+data['结果集']['图片地址']+'"><span>'+data['结果集']['商品名称']+'</span></li>');
																				});
																				if(tempres.length>0){
																						$(temres.join('')).appendTo($goods_show.html(''));
																				}else{
																						$goods_show.html('');
																				}
																		}
																}else{
																	$goods_show.html('');
																}
														},
														error: function(){
																$goods_show.html('');
														}
												});
										}
						}
				});
				
				
		});	
		
		
		//绑定商品展示区事件
		$goods_show.delegate('li','click',function(){
				var $this=$(this),
						values=$this.attr('data-value')||'',
						dia;
						
				if(values!=''){
						//to do
						//开发阶段开启下面部分
						
						$.ajax({
								url:'请求地址',
								type:'post',
								dataType:"json",
								data:'相关请求参数',
								success: function(data){
										if(data){
												//填充查询结果集
												var tempres='<tr><td><span data-value="'+data['数据序列号']+'" data-action="delete">删除</span></td><td><em>'+data['分公司']+'</em>/<em>'+data['仓库编号']+'</em></td><td><p>'+data['商品代码']+'</p></td><td>'+data['商品名称']+'</td><td><p>'+data['FV']+'</p></td><td><p>'+data['F$']+'</p></td><td>'+data['可用库存量']+'</td><td><input type="text" name="buys" value="'+data['购买数量']+'" class="g-wpx1 goods-buys-number"></td>';
												$(tempres).insertAfter($addpoorder_wrap);
										}else{
											dia=dialog({
												content:'<span class="g-c-red2  g-btips-warn">购买失败，请重新选择商品</span>'
											}).show();
										}
								},
								error: function(){
										dia=dialog({
											content:'<span class="g-c-red2  g-btips-error">对不起，发生了点小问题，请重新选择商品</span>'
										}).show();
								}
						});
						
						setTimeout(function(){
							if(typeof dia=='object'){
									dia.close().remove();
							}
						},3000);
						
						//下面是测试代码，开发阶段请删除此段代码
						var tempresf='<tr><td><span data-value="1" data-action="delete">删除</span></td><td><em>深圳龙华店</em>/<em>SDF3465472</em></td><td><p>356fgshr</p></td><td>深圳公司</td><td><p>ET23456</p></td><td><p>562556</p></td><td>'+parseInt(Math.random()*100)+'</td><td><input type="text" name="buys" value="1" class="g-wpx1 goods-buys-number"></td></tr>';
						$(tempresf).insertAfter($addpoorder_wrap);
				}
		});
		
		

		//绑定已购买商品操作按钮
		$addpoorder_griddata.delegate('td>span', 'click', function () {
				GridAction.gridHandler($(this),function(objs){
						if(objs.dialog){
								objs.dialog.close().remove();
						}
						//to do
						//填充具体业务逻辑
						
						
						
						//下面是测试代码，开发阶段请删除
						this.closest('tr').remove();
				});
    });
		

		
	});
});
