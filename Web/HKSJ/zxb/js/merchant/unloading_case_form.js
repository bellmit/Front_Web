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
		'date97':'plugins/My97DatePicker/WdatePicker',
		'datepick':'widgets/datepick',
		'cookie':'plugins/cookie',
		'kindeditor':'plugins/kindeditor/kindeditor-all-min',
		'city_select':'widgets/manage_cityselect',
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
				deps:['jquery']
		},
		'datepick':{
			deps:['jquery','date97']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','date97','rule','commonfn','validform','city_select','cookie','common','datepick','kindeditor'],
function($,undefined,undefined,Rule,CommonFn,undefined,City_Select,undefined,Common,undefined,undefined) {
	$(function() {
		
		
			//页面元素获取
			var $unloading_case_form=$('#unloading_case_form'),
					$casename=$('#casename'),
					$caseinfo=$('#caseinfo'),
					$housetype=$('#housetype'),
					$area=$('#area'),
					$style=$('#style'),
					$style_wrap=$('#style_wrap'),
					$budget=$('#budget'),
					$address_province=$('#address_province'),
					$address_city=$('#address_city'),
					$address_area=$('#address_area'),
					$house=$('#house'),
					$belong=$('#belong'),
					$datetime=$('#datetime'),
					$casewrap=$('#casewrap'),
					stylearr=[],
					stylemap={},
					budgetmap={
							0:[0,29999],
							1:[30000,49999],
							2:[50000,79999],
							3:[80000,119999],
							4:[120000,179999],
							5:[180000,249999],
							6:[250000,299999],
							7:[300000,999999999],
					},
					designmap={
							"客厅":"kt",
							"卧室":"ws",
							"餐厅":"ct",
							"厨房":"cf",
							"卫生间":"wsj",
							"阳台":"yt",
							"书房":"sf",
							"玄关":"xg",
							"儿童房":"etf",
							"衣帽间":"ymj",
							"花园":"hy",
							"kt":{
								"name":"客厅",
								"index":0
							},
							"ws":{
								"name":"卧室",
								"index":1
							},
							"ct":{
								"name":"餐厅",
								"index":2
							},
							"cf":{
								"name":"厨房",
								"index":3
							},
							"wsj":{
								"name":"卫生间",
								"index":4
							},
							"yt":{
								"name":"阳台",
								"index":5
							},
							"sf":{
								"name":"书房",
								"index":6
							},
							"xg":{
								"name":"玄关",
								"index":7
							},
							"etf":{
								"name":"儿童房",
								"index":8
							},
							"ymj":{
								"name":"衣帽间",
								"index":9
							},
							"hy":{
								"name":"花园",
								"index":10
							}
					},
					validobj=null,
					dia=dialog();
					
					
					//jquery dom		
				var $kt_design1_title=$('#kt_design1_title'),
						$kt_design2_title=$('#kt_design2_title'),
						$kt_design3_title=$('#kt_design3_title'),
						$ws_design1_title=$('#ws_design1_title'),
						$ws_design2_title=$('#ws_design2_title'),
						$ws_design3_title=$('#ws_design3_title'),
						$ct_design1_title=$('#ct_design1_title'),
						$ct_design2_title=$('#ct_design2_title'),
						$ct_design3_title=$('#ct_design3_title'),
						$cf_design1_title=$('#cf_design1_title'),
						$cf_design2_title=$('#cf_design2_title'),
						$cf_design3_title=$('#cf_design3_title'),
						$wsj_design1_title=$('#wsj_design1_title'),
						$wsj_design2_title=$('#wsj_design2_title'),
						$wsj_design3_title=$('#wsj_design3_title'),
						$yt_design1_title=$('#yt_design1_title'),
						$yt_design2_title=$('#yt_design2_title'),
						$yt_design3_title=$('#yt_design3_title'),
						$sf_design1_title=$('#sf_design1_title'),
						$sf_design2_title=$('#sf_design2_title'),
						$sf_design3_title=$('#sf_design3_title'),
						$xg_design1_title=$('#xg_design1_title'),
						$xg_design2_title=$('#xg_design2_title'),
						$xg_design3_title=$('#xg_design3_title'),
						$etf_design1_title=$('#etf_design1_title'),
						$etf_design2_title=$('#etf_design2_title'),
						$etf_design3_title=$('#etf_design3_title'),
						$ymj_design1_title=$('#ymj_design1_title'),
						$ymj_design2_title=$('#ymj_design2_title'),
						$ymj_design3_title=$('#ymj_design3_title'),
						$hy_design1_title=$('#hy_design1_title'),
						$hy_design2_title=$('#hy_design2_title'),
						$hy_design3_title=$('#hy_design3_title');
					
					
					
					
					
			//图片上传dom序列			
			var text_item={
					'kt_design1':{
						'name':'kt_designTitle1',
						'node':$kt_design1_title,
						'value':'',
						'url':''
					},
					'kt_design2':{
						'name':'kt_designTitle2',
						'node':$kt_design2_title,
						'value':'',
						'url':''
					},
					'kt_design3':{
						'name':'kt_designTitle3',
						'node':$kt_design3_title,
						'value':'',
						'url':''
					},
					'ws_design1':{
						'name':'ws_designTitle1',
						'node':$ws_design1_title,
						'value':'',
						'url':''
					},
					'ws_design2':{
						'name':'ws_designTitle2',
						'node':$ws_design2_title,
						'value':'',
						'url':''
					},
					'ws_design3':{
						'name':'ws_designTitle3',
						'node':$ws_design3_title,
						'value':'',
						'url':''
					},
					'ct_design1':{
						'name':'ct_designTitle1',
						'node':$ct_design1_title,
						'value':'',
						'url':''
					},
					'ct_design2':{
						'name':'ct_designTitle2',
						'node':$ct_design2_title,
						'value':'',
						'url':''
					},
					'ct_design3':{
						'name':'ct_designTitle3',
						'node':$ct_design3_title,
						'value':'',
						'url':''
					},
					'cf_design1':{
						'name':'cf_designTitle1',
						'node':$cf_design1_title,
						'value':'',
						'url':''
					},
					'cf_design2':{
						'name':'cf_designTitle2',
						'node':$cf_design2_title,
						'value':'',
						'url':''
					},
					'cf_design3':{
						'name':'cf_designTitle3',
						'node':$cf_design3_title,
						'value':'',
						'url':''
					},
					'wsj_design1':{
						'name':'wsj_designTitle1',
						'node':$wsj_design1_title,
						'value':'',
						'url':''
					},
					'wsj_design2':{
						'name':'wsj_designTitle2',
						'node':$wsj_design2_title,
						'value':'',
						'url':''
					},
					'wsj_design3':{
						'name':'wsj_designTitle3',
						'node':$wsj_design3_title,
						'value':'',
						'url':''
					},
					'yt_design1':{
						'name':'yt_designTitle1',
						'node':$yt_design1_title,
						'value':'',
						'url':''
					},
					'yt_design2':{
						'name':'yt_designTitle2',
						'node':$yt_design2_title,
						'value':'',
						'url':''
					},
					'yt_design3':{
						'name':'yt_designTitle3',
						'node':$yt_design3_title,
						'value':'',
						'url':''
					},
					'sf_design1':{
						'name':'sf_designTitle1',
						'node':$sf_design1_title,
						'value':'',
						'url':''
					},
					'sf_design2':{
						'name':'sf_designTitle2',
						'node':$sf_design2_title,
						'value':'',
						'url':''
					},
					'sf_design3':{
						'name':'sf_designTitle3',
						'node':$sf_design3_title,
						'value':'',
						'url':''
					},
					'xg_design1':{
						'name':'xg_designTitle1',
						'node':$xg_design1_title,
						'value':'',
						'url':''
					},
					'xg_design2':{
						'name':'xg_designTitle2',
						'node':$xg_design2_title,
						'value':'',
						'url':''
					},
					'xg_design3':{
						'name':'xg_designTitle3',
						'node':$xg_design3_title,
						'value':'',
						'url':''
					},
					'etf_design1':{
						'name':'etf_designTitle1',
						'node':$etf_design1_title,
						'value':'',
						'url':''
					},
					'etf_design2':{
						'name':'etf_designTitle2',
						'node':$etf_design2_title,
						'value':'',
						'url':''
					},
					'etf_design3':{
						'name':'etf_designTitle3',
						'node':$etf_design3_title,
						'value':'',
						'url':''
					},
					'ymj_design1':{
						'name':'ymj_designTitle1',
						'node':$ymj_design1_title,
						'value':'',
						'url':''
					},
					'ymj_design2':{
						'name':'ymj_designTitle2',
						'node':$ymj_design2_title,
						'value':'',
						'url':''
					},
					'ymj_design3':{
						'name':'ymj_designTitle3',
						'node':$ymj_design3_title,
						'value':'',
						'url':''
					},
					'hy_design1':{
						'name':'hy_designTitle1',
						'node':$hy_design1_title,
						'value':'',
						'url':''
					},
					'hy_design2':{
						'name':'hy_designTitle2',
						'node':$hy_design2_title,
						'value':'',
						'url':''
					},
					'hy_design3':{
						'name':'hy_designTitle3',
						'node':$hy_design3_title,
						'value':'',
						'url':''
					}
			};	
			
			
			//绑定监听标题输入
			for(var j in text_item){
					(function(j){
							var tempnode=text_item[j]['node'];
							
							//事件绑定
							tempnode.on('focusout',function(){
										text_item[j]['value']=tempnode.val();
							});
					})(j);	
			}
					
			
			//初始化查询
			(function(){
					var curid=Common.getID('unloading_case_id');
					if(curid!=''&&curid){

								//to do
								//初始化查询是否为更新对象
								$.ajax({
											url:'../../json/merchant/unloading_case.json',
											type:'post',
											dataType:"json",
											data:'id='+curid,
											success: function(res){
													if(res.action){
															var list=res.caseList,
															r=parseInt(Math.random()*10),
															len=list.length,
															result;
															if(len!=0){
																	r=r>=len?len-1:r;
																	result=list[r];
															}
															
															if(result){
																
																	//设置常规文本值
																	$casename.val(result['title']);
																	$caseinfo.val(result['remark']);
																	$area.val(result['area']);
																	$budget.val(result['budget']);
																	$house.val(result['house']);
																	$area.val(result['area']);
																	$belong.val(result['decName']);
																	
																	
																	//设置常规下拉
																	if(result['houseType']!=''&&result['houseType']){
																			var $ht=$housetype.children();
																					htlen=$ht.length,
																					s=0;
																					for(s;s<htlen;s++){
																						var $tempht=$ht.eq(s);
																						if($tempht.text()==result['houseType']){
																								$tempht.prop('selected',true);
																								break
																						}
																					}
																	}
																	
																	if(result['budget']!=''&&result['budget']){
																			var $b=$budget.children(),
																			budget=parseInt(result['budget']+'0000',10);
																			for(var i in budgetmap){
																					var limit=budgetmap[i];
																					if(budget>=limit[0]&&budget<=limit[1]){
																							$b.eq(i).prop('selected',true);
																							break;
																					}
																			}
																	}
	
																	
																	//设置风格值
																	if(result['style']!=''&&result['style']){
																			var stylestr=CommonFn.trims(result['style']),
																			$li=$style_wrap.children();
																			stylestr=stylestr.replace(/[\s\，\;]/gi,',').split(','),
																			t=0,
																			stylelen=stylestr.length;
																			
																			
														styleloop:for(t;t<stylelen;t++){
																					var l=0,
																							lilen=$li.length;
																					for(l;l<lilen;l++){
																						var $this=$li.eq(l),
																								text=$this.text().replace(/\w/i,''),
																								value=$this.attr('data-value');
																							if(text==stylestr[t]){
																									stylemap[value]=value;
																									
																									//高亮
																									$this.addClass('case-fgactive');
																									continue styleloop;
																							} 
																					}
																			}
																			for(var o in stylemap){
																					stylearr.push(stylemap[o]);
																			}
																			$style.val(stylearr.join(','));
																	}
																	
																	//设置时间
																	setTimeout(function(){
																		$datetime.val(result['dateTime']);
																	},100);
																	
																	
																	//设置上传信息
																	if(result['caseImage']!=''&&result['caseImage']){
																			var caseimage=result['caseImage'],
																					imglen=caseimage.length;
																				
																					//最多取3个数据
																					imglen=imglen>3?3:imglen,
																					k=0;
																					for(k;k<imglen;k++){
																							var imgitem=caseimage[k],
																									imgkey=designmap[imgitem['name']],
																									textlen=imgitem['remark'].length,
																									urllen=imgitem['url'].length;
																									
																									textlen=textlen>3?3:textlen;
																									urllen=urllen>3?3:urllen;
																									
																									//赋值上传对象
																									for(var x=0;x<textlen;x++){
																											var text_model=text_item[imgkey+'_design'+parseInt(x+1)],
																											temp_text=imgitem['remark'][x];

																											
																											text_model['value']=temp_text;
																											text_model['node'].val(temp_text);
																									}
																									
																									for(var y=0;y<urllen;y++){
																										var img_model=text_item[imgkey+'_design'+parseInt(y+1)],
																												temp_img=imgitem['url'][y];
																												
																												img_model['url']=temp_img;
																												img_model['node'].prev().children('div').eq(0).html('<img src="'+temp_img+'" alt="" >');
																									}
																									
																									
																									
																									
																					}
																					
																	}
																	
																
															}
													}
											}
								});
					}else{
						//清空数据
						for(var j in text_item){
								(function(j){
										text_item[j]['node'].val('');
								})(j);	
						}
					}
			}());
			
			
			
			//绑定选中擅长风格
			$style_wrap.on('click',function(e){
					var current=e.target,
							nodename=current.nodeName.toLowerCase();
							
							//过滤不正确标签
							if(nodename=='ul'){
									return false
							}else{
									if(nodename=='li'||nodename=='span'){
											var $li=nodename=='span'?$(current).parent():$(current),
													value=$li.attr('data-value');
												
												//选中
												stylemap[value]=value;
												stylearr.length=0;
												for(var i in stylemap){
														stylearr.push(stylemap[i]);
												}
												if(stylearr.length!=0){
														$style.val(stylearr.join(','));
												}
												//高亮
												$li.addClass('case-fgactive');
												//清除提示信息
												if(typeof tipobj['style']!=='string'){
														tipobj['style'].close();
												}
									}else if(nodename=='em'){
										
											var $li=$(current).parent(),
													value=$li.attr('data-value');
													
											if(stylemap.hasOwnProperty(value)){
													delete stylemap[value];
											}
											stylearr.length=0;
											for(var i in stylemap){
													stylearr.push(stylemap[i]);
											}
											if(stylearr.length!=0){
													$style.val(stylearr.join(','));
											}else{
													$style.val('');
											}
											$li.removeClass('case-fgactive');
											if(typeof tipobj['style']!=='string'){
													tipobj['style'].close();
											}
									}
							}
				
			})
			
			
		
			//时间日历对象调用
			$.datePick([$datetime]);
		
		
		
			//省份和城市选择
			City_Select.areaSelect({
					$province:$address_province,
					$city:$address_city,
					$area:$address_area
			});
			
			
			//菜单伸缩
			$casewrap.on('click','div.casetitle',function(e){
				var $this=$(this),
						$item=$this.parent();
						$item.hasClass('li-listactive')?$item.removeClass('li-listactive'):$item.addClass('li-listactive');
			});
			
			
			
			
			//校验规则
			var ruleobj=[{
						ele:$casename,
						datatype:"*",
						nullmsg: "案例名称不能为空",
						errormsg: "案例名称信息不正确",
						sucmsg: ""
					},{
							ele:$caseinfo,
							datatype:"*",
							nullmsg: "案例简介不能为空",
							errormsg: "案例简介信息不正确",
							sucmsg: ""
					},{
						ele:$area,
						datatype:"n1-6",
						nullmsg: "面积不能为空",
						errormsg: "面积只能为1-6位数字",
						sucmsg: ""
					},{
							ele:$style,
							datatype:"*",
							nullmsg: "风格不能没有选择上",
							errormsg: "风格信息不正确",
							sucmsg: ""
					},{
							ele:$house,
							datatype:"*",
							nullmsg: "所在楼盘不能为空",
							errormsg: "所在楼盘信息不正确",
							sucmsg: ""
					},{
							ele:$belong,
							datatype:"*",
							nullmsg: "归属不能为空",
							errormsg: "归属信息不正确",
							sucmsg: ""
					},{
							ele:$datetime,
							datatype:"*",
							nullmsg: "需选中完工时间",
							errormsg: "完工时间信息不正确",
							sucmsg: ""
					}];
					
					
					
					
			//表单提示对象
			var tipobj={
					casename:'',
					caseinfo:'',
					area:'',
					style:'',
					house:'',
					belong:'',
					datetime:''
			};
			
					
					
					
			//表单校验
			var issucces=false;
		  validobj=$unloading_case_form.Validform({
					ajaxPost: true,
					datatype:{},
					beforeSubmit: function(curform) {
						
						
						//赋值效果图文字描述
						var result={},
								imglist=[];
						for(var m in text_item){
							var imgkey=m.split('_')[0],
									name=designmap[imgkey]['name'],
									index=designmap[imgkey]['index'];
									if(typeof imglist[index]=='undefined'){
											var tempobj={};
											tempobj[name]={
													"value":[],
													"url":[]
											}
											imglist[index]=tempobj;
									}
									imglist[index][name]['url'].push(text_item[m]['url']);
									imglist[index][name]['value'].push(text_item[m]['value']);
						}
						
						
						//拼合常规值
						result['caseName']=$casename.val();
						result['caseInfo']=$caseinfo.val();
						result['houseType']=$housetype.val();
						result['area']=$area.val();
						result['style']=$style.val();
						result['budget']=$budget.val();
						result['province']=$address_province.val();
						result['city']=$address_city.val();
						result['town']=$address_area.val();
						result['house']=$house.val();
						result['desName']=$belong.val();
						result['datetime']=$datetime.val();
						
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'../../json/merchant/unloading_case.json',
								type:'post',
								dataType:"json",
								data:result,
								success: function(data){
										if(data.action){	
												//to do 
												
																		
												issucces=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces=false;
												dia.content('<span class="g-c-red2">保存失败</span>').show();
										}
								},
								error: function(){
										issucces=false;
										dia.content('<span class="g-c-red2">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces){
								//如果需要跳转地址，请在此处填上
								
							}
						},3000);
						return false;
					},
					tiptype:function(msg,o) { 
						var id=o.obj[0].id,
						curtype=o.type;
						if(curtype==1||curtype==3){
								if(typeof tipobj[id]==='string'){
										tipobj[id]=dialog({
										content:'<span class="g-c-red2 g-btips-error">'+msg+'</span>',
										align:'right',
										padding:8
									});
									if(id=='style'){
										tipobj[id].show(document.getElementById('style_wrap'));
									}else{
										tipobj[id].show(document.getElementById(id));
									}
								}else if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-red2 g-btips-error">'+msg+'</span>');
									tipobj[id].show();
								}
						}else if(curtype==2){
								if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-green1 g-btips-succ"></span>');
									setTimeout(function(){
											tipobj[id].close();
									},1000);
								}
						}
					}
			});
			validobj.addRule(ruleobj);
			
			
			
			
			
			
			//图片上传
		(function(K){
			
				//kindeditor dom
				//图片上传dom引用
				var kt_design1=K('#kt_design1'),
						kt_design2=K('#kt_design2'),
						kt_design3=K('#kt_design3'),
						ws_design1=K('#ws_design1'),
						ws_design2=K('#ws_design2'),
						ws_design3=K('#ws_design3'),
						ct_design1=K('#ct_design1'),
						ct_design2=K('#ct_design2'),
						ct_design3=K('#ct_design3'),
						cf_design1=K('#cf_design1'),
						cf_design2=K('#cf_design2'),
						cf_design3=K('#cf_design3'),
						wsj_design1=K('#wsj_design1'),
						wsj_design2=K('#wsj_design2'),
						wsj_design3=K('#wsj_design3'),
						yt_design1=K('#yt_design1'),
						yt_design2=K('#yt_design2'),
						yt_design3=K('#yt_design3'),
						sf_design1=K('#sf_design1'),
						sf_design2=K('#sf_design2'),
						sf_design3=K('#sf_design3'),
						xg_design1=K('#xg_design1'),
						xg_design2=K('#xg_design2'),
						xg_design3=K('#xg_design3'),
						etf_design1=K('#etf_design1'),
						etf_design2=K('#etf_design2'),
						etf_design3=K('#etf_design3'),
						ymj_design1=K('#ymj_design1'),
						ymj_design2=K('#ymj_design2'),
						ymj_design3=K('#ymj_design3'),
						hy_design1=K('#hy_design1'),
						hy_design2=K('#hy_design2'),
						hy_design3=K('#hy_design3');
						
						
				var upload_item=[kt_design1,kt_design2,kt_design3,ws_design1,ws_design2,ws_design3,ct_design1,ct_design2,ct_design3,cf_design1,cf_design2,cf_design3,wsj_design1,wsj_design2,wsj_design3,yt_design1,yt_design2,yt_design3,sf_design1,sf_design2,sf_design3,xg_design1,xg_design2,xg_design3,etf_design1,etf_design2,etf_design3,ymj_design1,ymj_design2,ymj_design3,hy_design1,hy_design2,hy_design3],
				i=0,
				len=upload_item.length;

				var editor = K.editor({
						uploadJson : '地址',		
						imageSizeLimit : "8MB",
						allowFileManager : true
				});
				
				for(i;i<len;i++){
						(function(i){
								//to do
								upload_item[i].click(function(){
									
											var kthis=upload_item[i],
													self=this,
													text=text_item[self.id]['node'].val();
													
													//kthis 为相应的kindeditor对象
													//text 为相应的文字值
													
													
											editor.loadPlugin('image', function() {
														editor.plugin.imageDialog({
																showRemote : false,
																imageUrl:'',
																clickFn : function(url, title, width, height, border, align) {					
																	//to do
																	//上传之前的操作
																	//发送ajax
																	text_item[self.id]['url']=url?url:'';
																	editor.hideDialog();
																}
														});
											});
								});
						})(i);
				}

		})(KindEditor);
			

	});
});
