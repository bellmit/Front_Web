/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/manage_common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'city_select':'widgets/manage_cityselect',
		'cookie':'plugins/cookie',
		'gridaction':'widgets/gridaction'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','rule','commonfn','validform','city_select','cookie','common','gridaction'],
function($,undefined,Rule,CommonFn,undefined,City_Select,undefined,Common,GridAction) {
	$(function() {
		
		
			//页面元素获取
			var $loglist_form=$('#loglist_form'),
					$title=$('#title'),
					$housetype=$('#housetype'),
					$area=$('#area'),
					$province_name=$('#province_name'),
					$city_name=$('#city_name'),
					$area_name=$('#area_name'),
					$style=$('#style'),
					$decorate_way=$('#decorate_way'),
					$write_diary=$('#write_diary'),
					$style_wrap=$('#style_wrap'),
					$community=$('#community'),
					$company_name=$('#company_name'),
					$mask_wrap=$('#mask_wrap'),
					$mask_closebtn=$('#mask_closebtn'),
					$loglist_wrap=$('#loglist_wrap'),
					stylearr=[],
					stylemap={},
					validobj=null,
					dia=dialog();
					
					
			//表单提示对象
			var tipobj={
					title:'',
					area:'',
					style:'',
					community:''
			};
			
			
			
			//绑定编辑数据
			$loglist_wrap.delegate('table div.edit-div','click',function(){
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
											//传递参数并跳转地址
											Common.setParams('loglist_id','id='+value);
											window.location.href="new_loglist.html";
										}
								});
			});
			
			
					
					
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
				
			});
			
			
			
			//省份和城市选择
			City_Select.areaSelect({
					$province:$province_name,
					$city:$city_name,
					$area:$area_name
			});
			
			
			
			//校验规则
			var ruleobj=[{
						ele:$title,
						datatype:"*",
						nullmsg: "日志标题不能为空",
						errormsg: "日志标题信息不正确",
						sucmsg: ""
					},{
							ele:$area,
							datatype:"n1-5",
							nullmsg: "面积不能为空",
							errormsg: "面积只能是1-5位数字",
							sucmsg: ""
					},{
							ele:$style,
							datatype:"*",
							nullmsg: "风格不能为空",
							errormsg: "风格信息不正确",
							sucmsg: ""
					},{
							ele:$community,
							datatype:"*",
							nullmsg: "小区名称不能为空",
							errormsg: "小区名称信息不正确",
							sucmsg: ""
					}];
					
					
			
			
			
			//表单校验
			var issucces=false;
		  validobj=$loglist_form.Validform({
					ajaxPost: true,
					datatype:{},
					beforeSubmit: function(curform) {
						
						//合并参数
						var result={},
						curid;
						result['title']=$title.val();
						result['houseType']=$housetype.val();
						result['area']=$area.val();
						result['province']=$province_name.val();
						result['city']=$city_name.val();
						result['town']=$area_name.val();
						result['style']=$style.val();
						result['decorate_way']=$decorate_way.val();
						result['community']=$community.val();
						result['company_name']=$company_name.val();	
						
					
						
						
						
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'../../json/personal/loglist.json',
								type:'post',
								dataType:"json",
								data:result,
								async:false,
								success: function(data){
										if(data.action){	
												//to do 
												curid=data.id;						
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
									//关闭窗口
									$mask_closebtn.click();
									//传递参数并跳转地址
									Common.setParams('loglist_id','id='+curid);
									window.location.href="new_loglist.html";
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
				
						
			
			
			

			//申请维权显示隐藏
			$write_diary.on('click',function(){
					$mask_wrap.removeClass('g-d-hidei');
			});
			$mask_closebtn.on('click',function(){
					$mask_wrap.addClass('g-d-hidei');
					for(var i in tipobj){
							if(typeof tipobj[i]!=='string'){
								tipobj[i].close();
							}
					}
			});


	});
});
