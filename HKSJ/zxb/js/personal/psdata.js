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
		'city_select':'widgets/manage_cityselect',
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
require(['jquery','dialog','rule','commonfn','validform','city_select','cookie','common','kindeditor'],
function($,undefined,Rule,CommonFn,undefined,City_Select,undefined,Common,undefined) {
	$(function() {

			var $process_column=$('#process_column'),
					$psdata_form=$('#psdata_form'),
					$user_name=$('#user_name'),
					$nick_name=$('#nick_name'),
					$sex_boy=$('#sex_boy'),
					$sex_girl=$('#sex_girl'),
					$qq_num=$('#qq_num'),
					$reg_status=$('#reg_status'),
					$province_name=$('#province_name'),
					$city_name=$('#city_name'),
					$area_name=$('#area_name'),
					$address=$('#address'),
					$img_show=$('#img_show'),
					$psdata_file=$('#psdata_file'),
					$psdata_btn=$('#psdata_btn'),
					$control_img=$('#control_img'),
					$control_imgbig=$('#control_imgbig'),
					$control_imgmiddle=$('#control_imgmiddle'),
					$control_imgsmall=$('#control_imgsmall'),
					validobj=null,
					dia=dialog(),
					imagearr={
						"width":160,
						"height":160,
						"left":75,
						"top":75
					};
			
			
			//校验规则
			var ruleobj=[{
						ele:$user_name,
						datatype:"*",
						nullmsg: "用户名不能为空",
						errormsg: "用户名信息不正确",
						sucmsg: ""
					},{
						ele:$address,
						datatype:"*",
						nullmsg: "详细地址不能为空",
						errormsg: "详细地址信息不正确",
						sucmsg: ""
					},{
						ele:$psdata_file,
						datatype:"*",
						nullmsg: "当前图像不能为空",
						errormsg: "当前图像信息不正确",
						sucmsg: ""
					}];
					
					
			//表单提示对象
			var tipobj={
					user_name:'',
					address:'',
					psdata_file:''
			};
			
			
			
			//资料完整程度百分比
			(function(){
					var percent=$process_column.attr('data-process');
					$process_column.css({"width":percent}).text(percent);
			}());
				
			
			//省份和城市选择
			City_Select.areaSelect({
					$province:$province_name,
					$city:$city_name,
					$area:$area_name
			});
			
			
			//绑定查看图片大小
			(function(){
					var maxwidth=parseInt($control_img.attr('data-maxwidth')),
							minwidth=parseInt($control_img.attr('data-minwidth')),
							size=parseInt($control_img.attr('data-size')),
							step=20,
							left=(maxwidth-size)/2,
							top=left;
							parentx=parseInt($control_img.offset().left),
							parenty=parseInt($control_img.offset().top);
					
					
					
					//绑定移动事件
					$control_img.on("mousedown",function(){
								$control_img.on("mousemove",function(e){
										var mousex=parseInt(e.pageX),
										mousey=parseInt(e.pageY),
										currentx=mousex-parentx,
										currenty=mousey-parenty;
										
										if(currentx<=0){
											currentx=0;
										}else if(currentx>=maxwidth-size){
											currentx=maxwidth-size;
										}
										if(currenty<=0){
												currenty=0;
										}else if(currenty>=maxwidth-size){
												currenty=maxwidth-size;
										}
										left=currentx;
										top=currenty;
										$control_img.css({
											"left":left,
											"top":top
										});
										imagearr["width"]=size;
										imagearr["height"]=size;
										imagearr["left"]=left;
										imagearr["top"]=top;
								});
					});
					$control_img.on("mouseup",function(){
							$control_img.off('mousemove');
					})
					
					
					
					//绑定缩放事件
					$control_img.on('click',function(e){
						var current=e.target,
								nodename=current.nodeName.toLowerCase();
						
						
						if(nodename=='div'){
								return false;
						}else if(nodename=='span'){
							var $span=$(current),
									$div=$span.parent(),
									action=$span.attr('data-action');

								
								if(action=='sub'){
									if(size<=minwidth){
										return false;
									}
									//缩小操作
									size=size<=minwidth?size=minwidth:size-=step;
									if(left<=0){
										left=0;
									}
									if(top<=0){
										top=0;
									}
									$div.css({
											"width":size,
											"height":size,
											"left":left,
											"top":top
									});
								}else if(action=='add'){
									if(size>=maxwidth){
										return false;
									}
									//放大操作
									size=size>=maxwidth?size=maxwidth:size+=step;
									left-=step;
									top-=step;
									if(left<=0){
										left=0;
									}
									if(top<=0){
										top=0;
									}
									$div.css({
											"width":size,
											"height":size,
											"left":left,
											"top":top
									});
									
								}
								imagearr["width"]=size;
								imagearr["height"]=size;
								imagearr["left"]=left;
								imagearr["top"]=top;
						}
						
						
					});
							
				
			})();
			
			
			
			
			//表单校验
			var issucces=false;
		  validobj=$psdata_form.Validform({
					ajaxPost: true,
					datatype:{},
					beforeSubmit: function(curform) {
						
						//合并表单参数
						var result=$psdata_form.serializeArray();
						//合并图像剪切参数
						result.push(imagearr);
						
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'../../json/personal/psdata.json',
								type:'post',
								dataType:"json",
								data:result,
								success: function(data){
										if(data.action){	
										
												//to do 
												
												//返回缩放后的图片地址
												var $bigimg=$('<img src="'+data['bigurl']+'" alt="">'),
														$middleimg=$('<img src="'+data['middleurl']+'" alt="">'),
														$smallimg=$('<img src="'+data['smallurl']+'" alt="">'),
														percent=data['datapercent'];
														
												//更新不同尺寸的图片
												$bigimg.appendTo($control_imgbig.html(''));
												$middleimg.appendTo($control_imgmiddle.html(''));
												$smallimg.appendTo($control_imgsmall.html(''));
												$middleimg.clone().appendTo($img_show.html(''));
												
												
												//更新完善资料百分比
												$process_column.attr('data-process',percent).css({"width":percent}).text(percent);
					
																		
												
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
									if(id=="psdata_file"){
										tipobj[id].show(document.getElementById('img_show'));
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
					var psdata_btn=K('#psdata_btn'),
							psdata_file=K('#psdata_file');
					
					
					
					var editor = K.editor({
								uploadJson : '地址',		
								imageSizeLimit : "8MB",
								allowFileManager : true
							});
							
							//点击事件
							psdata_btn.click(function(){
								
										//此处为测试，开发阶段请去掉			
										var url="../../images/gallery_list/gallery_list12.jpg",
												$img=$('<img src="'+url+'" alt="">'),
												$isimg=$control_img.prev();
												
										if($isimg.is('img')){
												$isimg.attr('src',url);
										}else{
												$img.insertBefore($control_img);
										}
										$psdata_file.val(url);
										setTimeout(function(){
											$psdata_file.focusout();
										},5);

		
										//开发填充
										editor.loadPlugin('image', function() {
													editor.plugin.imageDialog({
															showRemote : false,
															imageUrl:"../../images/gallery_list/gallery_list12.jpg",
															clickFn : function(url, title, width, height, border, align) {
																
																//to do		
																var $img=$('<img src="'+url+'" alt="">'),
																		$isimg=$control_img.prev();
																		
																if($isimg.is('img')){
																		$isimg.attr('src',url);
																}else{
																		$img.insertBefore($control_img);
																}
																
															
																//上传之前的操作
																editor.hideDialog();
															}
													});
										});
							});
			})(KindEditor);
			
			
			
	});
});
