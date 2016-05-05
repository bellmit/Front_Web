/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/common',
		'marquee':'widgets/marquee_list',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'city_select':'widgets/city_select',
		'cookie':'plugins/cookie',
		'share':'plugins/share',
		'modal_dialog':'widgets/modal_dialog'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
			deps:['jquery']
		}
	},
	waitSeconds:15
});


/*程序入口*/
require(['jquery','dialog','marquee','rule','commonfn','validform','city_select','modal_dialog','cookie','share','common'],function($,undefined,Marquee,Rule,CommonFn,undefined,City_Select,Modal_Dialog,undefined,undefined,Common){
	
	//分享代码 baidu
	window._bd_share_config={
			"common":{
					"bdSnsKey":{},
					"bdText":"",
					"bdMini":"0",
					"bdPic":"",
					"bdStyle":"0",
					"bdSize":"16"
			},
			"share":{},
			"image":{
					"viewList":["qzone","tsina","huaban"],
					"viewText":"分享到：",
					"viewSize":"16"
			},
			"selectShare":{
					"bdContainerClass":null,
					"bdSelectMiniList":["qzone","tsina","huaban"]
			}
	};
	
	

	$(function() {
			//页面元素获取
			var $gallery_theme=$('#gallery_theme'),
					$marquee_show=$('#marquee_show'),
					$marquee_design=$('#marquee_design'),
					$marquee_price=$('#marquee_price'),
					$marquee_keep=$('#marquee_keep'),
					$marquee_prevbtn=$('#marquee_prevbtn'),
					$marquee_nextbtn=$('#marquee_nextbtn'),
					$marquee_image=$('#marquee_image'),
					$imageset_prev=$('#imageset_prev'),
					$imageset_currentprev=$('#imageset_currentprev'),
					$imageset_currentwrap=$('#imageset_currentwrap'),
					$imageset_currentnext=$('#imageset_currentnext'),
					$imageset_next=$('#imageset_next'),
					$mask_hxwrap=$('#mask_hxwrap'),
					$mask_bjwrap=$('#mask_bjwrap'),
					$mask_scwrap=$('#mask_scwrap'),
					$mask_hxclosebtn=$('#mask_hxclosebtn'),
					$mask_bjclosebtn=$('#mask_bjclosebtn'),
					$mask_scclosebtn=$('#mask_scclosebtn'),
					$customprovince1=$('#customprovince1'),
					$customcity1=$('#customcity1'),
					$customprovince2=$('#customprovince2'),
					$customcity2=$('#customcity2'),
					$customprovince3=$('#customprovince3'),
					$customcity3=$('#customcity3');
					
		

					//初始化调用图片浏览
					Marquee.marquee({
								marquee_theme:$gallery_theme,
								marquee_show:$marquee_show,
								marquee_prevbtn:$marquee_prevbtn,
								marquee_nextbtn:$marquee_nextbtn,
								marquee_image:$marquee_image,
								imageset_currentprev:$imageset_currentprev,
								imageset_currentwrap:$imageset_currentwrap,
								imageset_currentnext:$imageset_currentnext		
					},function(opt,flag){

							//组合参数
							$.ajax({
									url:'../../json/gallery_listdetail.json',
									dataType:"json",
									data:opt.marqueeparams,
									type:'get',
									async:false,
									success: function(result){
											if(result.total!==0){
													opt.listdata=result.galleryList;
													opt.total=result.total;
											}else{
												opt.listdata.length=0;
											}
									},
									error:function(){
										opt.listdata.length=0;
									}
							});
							if(flag){
								Marquee.initRender(flag);
							}else{
								Marquee.initRender();
							}
							
							
					});
			
			
			//绑定户型设计
			$marquee_design.on('click',function(){
					$mask_hxwrap.removeClass('g-d-hidei');
			});
			//绑定户型获取报价
			$marquee_price.on('click',function(){
					$mask_bjwrap.removeClass('g-d-hidei');
			});
			//绑定收藏
			$marquee_keep.on('click',function(){
					$mask_scwrap.removeClass('g-d-hidei');
			});
			//绑定户型设计和收藏隐藏
			$.each([$mask_hxclosebtn,$mask_bjclosebtn,$mask_scclosebtn],function(){
					
					if(this.selector.indexOf('mask_hx')!=-1){
							this.on('click',function(){
								$mask_hxwrap.addClass('g-d-hidei');
							});
					}else if(this.selector.indexOf('mask_bj')!=-1){
							this.on('click',function(){
									$mask_bjwrap.addClass('g-d-hidei');
							});
					}else if(this.selector.indexOf('mask_sc')!=-1){
							this.on('click',function(){
									$mask_scwrap.addClass('g-d-hidei');
							});
					}
			});
			

			//表单省份和城市选择
			City_Select.areaSelect({
					$province:$customprovince1,
					$city:$customcity1,
					$area:null
			});
			
			//表单省份和城市选择
			City_Select.areaSelect({
					$province:$customprovince2,
					$city:$customcity2,
					$area:null
			});
			
			//表单省份和城市选择
			City_Select.areaSelect({
					$province:$customprovince3,
					$city:$customcity3,
					$area:null
			});
			
			
			//表单对象
			var $miniportal_form1=$('#miniportal_form1'),
					$miniportal_form2=$('#miniportal_form2'),
					$miniportal_form3=$('#miniportal_form3'),
					$customname3=$('#customname3'),
					$custommobile3=$('#custommobile3'),
					$customname1=$('#customname1'),
					$custommobile1=$('#custommobile1'),
					$customarea=$('#customarea'),
					$customprovince_text1=$('#customprovince_text1'),
					$customcity_text1=$('#customcity_text1'),
					$customprovince_text2=$('#customprovince_text2'),
					$customcity_text2=$('#customcity_text2'),
					$customprovince_text3=$('#customprovince_text3'),
					$customcity_text3=$('#customcity_text3'),
					validobj1=null,
					validobj2=null,
					validobj3=null;
			//校验规则
			var ruleobj1=[{
						ele:$customname1,
						datatype:"*",
						nullmsg: "姓名不能为空",
						errormsg: "姓名信息不正确",
						sucmsg: ""
					},{
							ele:$custommobile1,
							datatype:"selfmobile",
							nullmsg: "手机不能为空",
							errormsg: "手机号码不正确",
							sucmsg: ""
					},{
							ele:$customprovince_text1,
							datatype:"*",
							nullmsg: "所在省市不能为空",
							errormsg: "所在省市信息不正确",
							sucmsg: ""
					},{
							ele:$customcity_text1,
							datatype:"*",
							nullmsg: "所在地区不能为空",
							errormsg: "所在地区信息不正确",
							sucmsg: ""
					}],
					ruleobj2=[{
						ele:$customarea,
						datatype:"*",
						nullmsg: "建筑面积不能为空",
						errormsg: "建筑面积信息不正确",
						sucmsg: ""
					},{
							ele:$customprovince_text2,
							datatype:"*",
							nullmsg: "所在省市不能为空",
							errormsg: "所在省市信息不正确",
							sucmsg: ""
					},{
							ele:$customcity_text2,
							datatype:"*",
							nullmsg: "所在地区不能为空",
							errormsg: "所在地区信息不正确",
							sucmsg: ""
					}],
					ruleobj3=[{
						ele:$customname3,
						datatype:"*",
						nullmsg: "姓名不能为空",
						errormsg: "姓名信息不正确",
						sucmsg: ""
					},{
							ele:$custommobile3,
							datatype:"selfmobile",
							nullmsg: "手机不能为空",
							errormsg: "手机号码不正确",
							sucmsg: ""
					},{
							ele:$customprovince_text3,
							datatype:"*",
							nullmsg: "所在省市不能为空",
							errormsg: "所在省市信息不正确",
							sucmsg: ""
					},{
							ele:$customcity_text3,
							datatype:"*",
							nullmsg: "所在地区不能为空",
							errormsg: "所在地区信息不正确",
							sucmsg: ""
					}];
			
					
			//表单校验
			var dia=dialog({
					cancel:false
			});
			//表单验证1
			var issucces1=false;
		  validobj1=$miniportal_form1.Validform({
					ajaxPost: true,
					datatype:{
						'selfmobile':function(gets,obj,curform,regxp){
								return CommonFn.isMobilePhone(gets);
						}
					},
					beforeSubmit: function(curform) {
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'请求地址',
								type:'post',
								dataType:"json",
								data:'相关请求参数',
								success: function(data){
										if(data){									
												issucces1=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces1=false;
												dia.content('<span class="g-c-red4">保存失败</span>').show();
										}
								},
								error: function(){
										issucces1=false;
										dia.content('<span class="g-c-red4">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces1){
								//to do
								//其他操作
							}
						},3000);
						return false;
					},
					tiptype: function(msg,o) { 
						var curtype=o.type,
								cid=id=o.obj[0].id,
								curitem=o.obj;
						if(curtype==1||curtype==3){
								if(cid=='customprovince_text1'){
									curitem.parent().next().next().text(msg);
								}else if(cid=='customcity_text1'){
									curitem.parent().next().text(msg);
								}else{
									curitem.parent().next().text(msg);
								}
						}else if(curtype==2){
								if(cid=='customprovince_text1'){
									curitem.parent().next().next().text('');
								}else if(cid=='customcity_text1'){
									curitem.parent().next().text('');
								}else{
									curitem.parent().next().text('');
								}
						}
					}
			});
			validobj1.addRule(ruleobj1);
			
			//表单验证2
			var issucces2=false;
		  validobj2=$miniportal_form2.Validform({
					ajaxPost: true,
					datatype:{},
					beforeSubmit: function(curform) {
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'请求地址',
								type:'post',
								dataType:"json",
								data:'相关请求参数',
								success: function(data){
										if(data){									
												issucces2=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces2=false;
												dia.content('<span class="g-c-red4">保存失败</span>').show();
										}
								},
								error: function(){
										issucces2=false;
										dia.content('<span class="g-c-red4">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces2){
								//to do
								//其他操作
							}
						},3000);
						return false;
					},
					tiptype: function(msg,o) { 
						var curtype=o.type,
								cid=id=o.obj[0].id,
								curitem=o.obj;
						if(curtype==1||curtype==3){
								if(cid=='customprovince_text2'){
									curitem.parent().next().next().text(msg);
								}else if(cid=='customcity_text2'){
									curitem.parent().next().text(msg);
								}else{
									curitem.parent().next().text(msg);
								}
						}else if(curtype==2){
								if(cid=='customprovince_text2'){
									curitem.parent().next().next().text('');
								}else if(cid=='customcity_text2'){
									curitem.parent().next().text('');
								}else{
									curitem.parent().next().text('');
								}
						}
					}
			});
			validobj2.addRule(ruleobj2);
			//表单验证3
			var issucces3=false;
		  validobj3=$miniportal_form3.Validform({
					ajaxPost: true,
					datatype:{
						'selfmobile':function(gets,obj,curform,regxp){
								return CommonFn.isMobilePhone(gets);
						}
					},
					beforeSubmit: function(curform) {
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'请求地址',
								type:'post',
								dataType:"json",
								data:'相关请求参数',
								success: function(data){
										if(data){									
												issucces3=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces3=false;
												dia.content('<span class="g-c-red4">保存失败</span>').show();
										}
								},
								error: function(){
										issucces3=false;
										dia.content('<span class="g-c-red4">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces3){
								//to do
								//其他操作
							}
						},3000);
						return false;
					},
					tiptype: function(msg,o) { 
						var curtype=o.type,
								cid=id=o.obj[0].id,
								curitem=o.obj;
						if(curtype==1||curtype==3){
								if(cid=='customprovince_text3'){
									curitem.parent().next().next().text(msg);
								}else if(cid=='customcity_text3'){
									curitem.parent().next().text(msg);
								}else{
									curitem.parent().next().text(msg);
								}
						}else if(curtype==2){
								if(cid=='customprovince_text3'){
									curitem.parent().next().next().text('');
								}else if(cid=='customcity_text3'){
									curitem.parent().next().text('');
								}else{
									curitem.parent().next().text('');
								}
						}
					}
			});
			validobj3.addRule(ruleobj3);
			
			

	});
});


