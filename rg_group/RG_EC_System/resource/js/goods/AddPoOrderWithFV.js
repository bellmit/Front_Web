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



/*程序入口*/
require(['jquery','bootstrap','common','dialog','rule','validform','commonfn','querydata','gridaction'], function($,$strap,undefined,undefined,Rule,undefined,CommonFn,undefined,GridAction) {
	$(function() {
		/*页面元素引用*/
		var $search=$('#search'),
				$searchbtn=$('#searchbtn'),
				$kindGrademain=$('#kindGrademain'),
				$kindGradesub=$('#kindGradesub'),
				$shopping_show=$('#shopping_show'),
				$addpoorder_griddata=$('#addpoorder_griddata'),
				$addpoorder_wrap=$('#addpoorder_wrap'),
				$poOrder=$('#poOrder'),
				$memberNo=$('#memberNo'),
				$inputAddr_recName=$('#inputAddr_recName'),
				$inputAddr_recPhone=$('#inputAddr_recPhone'),
				$address1=$('#address1'),
				$address2=$('#address2'),
				$addresswrap=$('#addresswrap'),
				$country=$('#country'),
				$province=$('#province'),
				$city=$('#city'),
				$district=$('#district'),
				$recAddr=$('#recAddr'),
				$remark=$('#remark'),
				$grid_toggleshop=$('#grid_toggleshop'),
				$grid_togglelist=$('#grid_togglelist'),
				$grid_togglefrom=$('#grid_togglefrom'),
				$count_FV=$('#count_FV'),
				$count_FD=$('#count_FD');
			

		//绑定商品模块切换
		$.each([$grid_toggleshop,$grid_togglelist,$grid_togglefrom],function(i,v){
				var $item=$(this),
						$wrap=$item.next();
				$item.on('click',function(){
					if($item.hasClass('grid-togglehide')){
						$wrap.slideUp(200);
						$item.removeClass('grid-togglehide');
					}else{
						$wrap.slideDown(100);
						$item.addClass('grid-togglehide');
					}
					//清除表单提示信息
					for(var i in addressobj){
						if(typeof addressobj[i]=='object'){
							addressobj[i].close();
						}
					};
					for(var i in tipobj){
						if(typeof tipobj[i]=='object'){
							tipobj[i].close();
						}
					};
				});
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
														$(temres.join('')).appendTo($shopping_show.html(''));
												}else{
														$shopping_show.html('');
												}
										}
								}else{
									$shopping_show.html('');
								}
						},
						error: function(){
								$shopping_show.html('');
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
																						$(temres.join('')).appendTo($shopping_show.html(''));
																				}else{
																						$shopping_show.html('');
																				}
																		}
																}else{
																	$kindGradesub.html('');
																	$shopping_show.html('');
																}
														},
														error: function(){
																$kindGradesub.html('');
																$shopping_show.html('');
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
																						$(temres.join('')).appendTo($shopping_show.html(''));
																				}else{
																						$shopping_show.html('');
																				}
																		}
																}else{
																	$kindGradesub.html('');
																	$shopping_show.html('');
																}
														},
														error: function(){
																$kindGradesub.html('');
																$shopping_show.html('');
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
																						$(temres.join('')).appendTo($shopping_show.html(''));
																				}else{
																						$shopping_show.html('');
																				}
																		}
																}else{
																	$shopping_show.html('');
																}
														},
														error: function(){
																$shopping_show.html('');
														}
												});
										}
						}
				});
				
				
		});	
		
		
		//绑定商品展示区事件
		$shopping_show.delegate('li','click',function(){
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
												var tempres='<tr><td><span data-value="'+data['数据序列号']+'" data-action="delete">删除</span></td><td><em>'+data['分公司']+'</em>/<em>'+data['仓库编号']+'</em></td><td><p>'+data['商品代码']+'</p></td><td>'+data['商品名称']+'</td><td><p>'+data['FV']+'</p></td><td><p>'+data['F$']+'</p></td><td>'+data['可用库存量']+'</td><td><input type="text" name="buys" value="'+data['购买数量']+'" class="g-wpx1 shopping-buys-number"></td><td>'+data['分期业绩']+'</td>';
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
						var tempresf='<tr><td><span data-value="1" data-action="delete">删除</span></td><td><em>深圳龙华店</em>/<em>SDF3465472</em></td><td><p>356fgshr</p></td><td>深圳公司</td><td><p>ET23456</p></td><td><p>562556</p></td><td>'+parseInt(Math.random()*100)+'</td><td><input type="text" name="buys" value="1" class="g-wpx1 shopping-buys-number"></td><td>'+parseInt(Math.random()*10)+'</td></tr>';
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
		
		
		
		//绑定已购买商品变更购买数量
		$addpoorder_griddata.delegate('td input[type="text"]', 'change', function () {
				var $this=$(this),
						txt=$this.val(),
						maxtxt=$this.parents('td').prev().text(),
						dia;

						if(/\D*/g.test(txt)){
								txt=txt.replace(/\D*/g,'');
								if(txt!=''){
									txt=parseInt(txt);
									$this.val(txt);
								}else{
									$this.val(1);
								}
						}
						
						if(txt>maxtxt){
								dia=dialog({
									content:'<span class="g-c-red2 g-btips-warn">购买数量不能大于\'可用库存量('+maxtxt+')\'</span>'
								}).showModal();
								setTimeout(function(){
										dia.close().remove();
										$this.val(maxtxt);
								},2000);
						}else if(txt<1){
							dia=dialog({
								content:'<span class="g-c-red2 g-btips-warn">购买数量不能小于1</span>'
							}).showModal();
							setTimeout(function(){
									dia.close().remove();
									$this.val(1);
							},2000);
						}
						
						//to do
						//添加其他业务逻辑
						
    });
		
		
		//会员联系电话格式化
		$inputAddr_recPhone.on('keyup',function(e){
				var val=this.value;
				val=val.replace(/\D*/g,'');
				val=CommonFn.phoneFormat(val);
				this.value=val;
		});
		
				
		//表单校验
		var addressobj={
				country:'',
				province:'',
				city:'',
				district:'',
				recAddr:''
		};
		var tipobj={
				memberNo:'',
				inputAddr_recName:''
		};
		$validobj=$poOrder.Validform({
				ajaxPost: true,
				datatype:{},
				beforeSubmit: function(curform) {
					/*to do*/
					//send ajax 填充具体业务逻辑
					//开发时开启下部代码
					var dia=null,
					issucces=false;
					$.ajax({
							url:'请求地址',
							type:'post',
							dataType:"json",
							data:'相关请求参数',
							success: function(data){
									if(data){									
											dia=dialog({
												title:'温馨提示',
												width:200,
												content:'<span class="g-c-cyan1">保存成功</span>'
											}).show();
											issucces=true;
									}else{
											dia=dialog({
												title:'温馨提示',
												width:200,
												content:'<span class="g-c-red2">保存失败</span>'
											}).show();
									}
							},
							error: function(){
									dia=dialog({
										title:'温馨提示',
										width:200,
										content:'<span class="g-c-red2">保存失败</span>'
									}).show();
							}
					});
					setTimeout(function(){
						dia.close().remove();
						if(issucces){
							window.location.href='dealer_manage.html#AddPoOrder';
						}
					},3000);
					return false;
				},
				tiptype: function(msg,o) { 
					var id=o.obj[0].id,
					curtype=o.type;
					if(curtype==1||curtype==3){
							if(typeof tipobj[id]==='string'){
									tipobj[id]=dialog({
									content:'<span class="g-c-red2 g-btips-error">'+msg+'</span>',
									align:'right',
									padding:8
								});
								tipobj[id].show(document.getElementById(id));
							}else if(typeof tipobj[id]!=='string'){
								tipobj[id].content('<span class="g-c-red2 g-btips-error">'+msg+'</span>');
								tipobj[id].show();
							}
					}else if(curtype==2){
							if(typeof tipobj[id]!=='string'){
								tipobj[id].content('<span class="g-c-cyan1 g-btips-succ"></span>');
								setTimeout(function(){
										tipobj[id].close();
								},1000);
							}
					}
				}
			});
			//添加校验规则
			var baserule=[{
				ele:$memberNo,
				datatype: "*",
				nullmsg: "经销商编号不能为空",
				errormsg: "经销商编号不存在",
				sucmsg: ""
			},{
				ele:$inputAddr_recName,
				datatype: "*",
				nullmsg: "收货人姓名不能为空",
				errormsg: "收货人姓名不存在",
				sucmsg: ""
			}],
			addressrule=[{
				ele:$country,
				datatype: "*",
				nullmsg: "所在国家不能为空",
				errormsg: "所在国家信息不正确",
				sucmsg: ""
			},
			{
				ele:$province,
				datatype: "*",
				nullmsg: "所在省份不能为空",
				errormsg: "所在身份信息不正确",
				sucmsg: ""
			},
			{
				ele:$city,
				datatype: "*",
				nullmsg: "所在城市不能为空",
				errormsg: "所在城市信息不正确",
				sucmsg: ""
			},
			{
				ele:$district,
				datatype: "*",
				nullmsg: "所在县市不能为空",
				errormsg: "所在县市信息不正确",
				sucmsg: ""
			},
			{
				ele:$recAddr,
				datatype: "*",
				nullmsg: "详细地址不能为空",
				errormsg: "详细地址信息不正确",
				sucmsg: ""
			}];
			$validobj.addRule(baserule);



		//绑定表单地址切换
		$.each([$address1,$address2],function(i,v){
					$label=this,
					selector=$label.selector.slice(1);
					
					//地址初始化
					if(selector=='address1'){
							$label.prop({'checked':true});
							$addresswrap.hide();
							$label.on('click',function(){
									var $this=$(this);
									if($this.prop('checked')){
											$addresswrap.hide();
											for(var k in addressobj){
													if(tipobj.hasOwnProperty(k)){
															addressobj[k]=tipobj[k];
															delete tipobj[k];
															if(typeof addressobj[k]!=='string'){
																	addressobj[k].close();
															}
													}
											}
											baserule.length=2;
											$validobj.addRule(baserule);
									}
							});
					}else if(selector=='address2'){
							$label.on('click',function(){
									var $this=$(this);
									if($this.prop('checked')){
											$addresswrap.show();
											for(var k in addressobj){
													if(!tipobj.hasOwnProperty(k)){
															tipobj[k]=addressobj[k];
															if(typeof addressobj[k]!=='string'){
																	addressobj[k].close();
															}
													}
											}
											if(baserule.length==2){
												$.merge(baserule,addressrule);
												$validobj.addRule(baserule);
											}
									}
							});
					}
					

			
		});



		
	});
});
