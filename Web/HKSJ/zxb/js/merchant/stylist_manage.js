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
		'kindeditor':'plugins/kindeditor/kindeditor-all-min'
		
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
require(['jquery','dialog','rule','commonfn','validform','cookie','common','kindeditor'],
function($,undefined,Rule,CommonFn,undefined,undefined,Common,undefined) {
	$(function() {
		
		
			//图片上传
			(function(K){
						var K_fileupload_btn=K('#fileupload_btn'),
								K_fileupload_text=K('#fileupload_text');
						

						var editor = K.editor({
								uploadJson : '地址',		
								imageSizeLimit : "8MB",
								allowFileManager : true
						});
						
						K_fileupload_btn.click(function(){
									var curobj=K(this);
									editor.loadPlugin('image', function() {
												editor.plugin.imageDialog({
														showRemote : false,
														imageUrl:'',
														clickFn : function(url, title, width, height, border, align) {								
															//上传之前的操作
															editor.hideDialog();
														}
												});
									});
						});
				
			})(KindEditor);
		
			
		
			//页面元素获取
			var $stylist_form=$('#stylist_form'),
					$designname=$('#designname'),
					$designvocation=$('#designvocation'),
					$designexperience=$('#designexperience'),
					$designstyle=$('#designstyle'),
					$style_wrap=$('#style_wrap'),
					stylearr=[],
					stylemap={},
					validobj=null,
					dia=dialog();
					
			
			
			
			
			//初始化查询
			(function(){
					var curid=Common.getID('stylist_design');
					if(curid!=''){

								//to do
								//初始化查询是否为更新对象
								$.ajax({
											url:'../../json/merchant/stylist_manage.json',
											type:'post',
											dataType:"json",
											data:'id='+curid,
											success: function(res){
													if(res.action){
															var list=res.stylistList
																	stylelist=list['designStyle']||'';
															
															//赋值
															$designname.val(list['designName']);
															$designvocation.val(list['designVocation']);
															$designexperience.val(list['designExperience']);
															$designstyle.val(list['designStyle']);
															
															//初始化选中风格
															if(stylelist!=''){
																	var stylelist=stylelist.split(','),
																			i=0,
																			len=stylelist.length;
																			
																			stylearr.length=0;
																			stylearr=stylelist.splice(0);
																			
																			for(i;i<len;i++){
																					stylemap[stylearr[i]]=stylearr[i];
																					$style_wrap.find('li').each(function(index, element) {
																							var $this=$(this),
																									value=$this.attr('data-value');
																									
																							if(value==stylearr[i]){
																									$this.addClass('case-fgactive');
																									return false;
																							}
                                            
                                          });
																			}
																			
																			
															}
													}
											}
								});
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
														$designstyle.val(stylearr.join(','));
												}
												//高亮
												$li.addClass('case-fgactive');
												//清除提示信息
												if(typeof tipobj['designstyle']!=='string'){
														tipobj['designstyle'].close();
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
													$designstyle.val(stylearr.join(','));
											}else{
													$designstyle.val('');
											}
											$li.removeClass('case-fgactive');
											if(typeof tipobj['designstyle']!=='string'){
													tipobj['designstyle'].close();
											}
									}
							}
				
			})


			//校验规则
			var ruleobj=[{
						ele:$designname,
						datatype:"*",
						nullmsg: "姓名不能为空",
						errormsg: "姓名信息错误",
						sucmsg: ""
					},{
							ele:$designvocation,
							datatype:"*",
							nullmsg: "职称不能为空",
							errormsg: "职称信息错误",
							sucmsg: ""
					},{
							ele:$designexperience,
							datatype:"*",
							nullmsg: "设计经验不能为空",
							errormsg: "设计经验信息不正确",
							sucmsg: ""
					},{
							ele:$designstyle,
							datatype:"*",
							nullmsg: "擅长风格没有选中",
							errormsg: "擅长风格信息不正确",
							sucmsg: ""
					}];
					
					
			//表单提示对象
			var tipobj={
					designname:'',
					designvocation:'',
					designexperience:'',
					designstyle:''
			};
			
					
			//表单校验
			var issucces=false;
		  validobj=$stylist_form.Validform({
					ajaxPost: true,
					datatype:{},
					beforeSubmit: function(curform) {
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'../../json/merchant/stylist_manage.json',
								type:'post',
								dataType:"json",
								data:'',
								success: function(data){
										if(data){	
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
									if(id=='designstyle'){
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
			

	});
});
