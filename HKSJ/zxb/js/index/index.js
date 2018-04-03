/*配置依赖*/
require.config({
	baseUrl:'../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'slide':'widgets/slide',
		'city_select':'widgets/city_select',
		'modal_dialog':'widgets/modal_dialog',
		'cookie':'plugins/cookie'
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
require(['jquery','dialog','rule','commonfn','validform','city_select','modal_dialog','slide','cookie','common'],
function($,undefined,Rule,CommonFn,undefined,City_Select,Modal_Dialog,Slide,undefined,Common) {
	$(function() {
			//页面元素获取
			var $slide_tab=$('#slide_tab'),
					$applytype=$('#applytype'),
					$applyprovince=$('#applyprovince'),
					$applycity=$('#applycity'),
					$customprovince=$('#customprovince'),
					$customcity=$('#customcity'),
					$grid_tabtitle=$('#grid_tabtitle'),
					$decoration=$('#decoration'),
					$designer=$('#designer'),
					$applySubmit=$('#applySubmit');
			
			//表单对象
			var $miniportal_form=$('#miniportal_form'),
					$customname=$('#customname'),
					$custommobile=$('#custommobile'),
					$customprovince_text=$('#customprovince_text'),
					$customcity_text=$('#customcity_text'),
					validobj=null;
		
		
		
			//立即申请弹框
			//初始化模态窗口
			Modal_Dialog.modalInit(['company_success']);
			$applySubmit.on('click',function(){
					//申请窗口调用
					Modal_Dialog.modal('company_success',function(){
							var self=this;
							//to do
							$.ajax({
									url:'请求地址',
									type:'post',
									dataType:"json",
									data:'相关请求参数',
									success: function(data){
										//to do
										setTimeout(function(){
											//关闭窗口
											self.modalHide('company_success');
											//弹窗相关提示窗口
											self.modal('info_success');
										},200);
									},
									error: function(){}
							});
					});

				
			});
			
		
		
			
			//校验规则
			var ruleobj=[{
						ele:$customname,
						datatype:"*",
						nullmsg: "姓名不能为空",
						errormsg: "姓名信息不正确",
						sucmsg: ""
					},{
							ele:$custommobile,
							datatype:"selfmobile",
							nullmsg: "手机不能为空",
							errormsg: "手机号码不正确",
							sucmsg: ""
					},{
							ele:$customprovince_text,
							datatype:"*",
							nullmsg: "所在省市不能为空",
							errormsg: "所在省市信息不正确",
							sucmsg: ""
					},{
							ele:$customcity_text,
							datatype:"*",
							nullmsg: "所在地区不能为空",
							errormsg: "所在地区信息不正确",
							sucmsg: ""
					}];
			
					
			//表单校验
			var dia=dialog(),
			issucces=false;
		  validobj=$miniportal_form.Validform({
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
												issucces=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces=false;
												dia.content('<span class="g-c-red4">保存失败</span>').show();
										}
								},
								error: function(){
										issucces=false;
										dia.content('<span class="g-c-red4">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces){
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
								if(cid=='customprovince_text'){
									curitem.parent().next().next().text(msg);
								}else if(cid=='customcity_text'){
									curitem.parent().next().text(msg);
								}else{
									curitem.parent().next().text(msg);
								}
						}else if(curtype==2){
								if(cid=='customprovince_text'){
									curitem.parent().next().next().text('');
								}else if(cid=='customcity_text'){
									curitem.parent().next().text('');
								}else{
									curitem.parent().next().text('');
								}
						}
					}
			});
			validobj.addRule(ruleobj);
			
			
			//轮播动画
			Slide.slideToggle({
					$wrap:$('#slideimg_show'),
					$slide_img:$('#slide_img'),
					$btnwrap:$('#slideimg_btn'),
					$slide_tipwrap:$('#slide_tips'),
					minwidth:1190,
					times:6000,
					eff_time:500,
					btn_active:'slidebtn-active'
			})
			
		
			//轮播区tab选项操作
			$slide_tab.delegate('li','click',function(){
					var $this=$(this),
					value=$this.attr('data-value');
					
					$this.addClass('slide-active').siblings().removeClass('slide-active');
					$applytype.val(value);
			});
			
			
			//省份和城市选择
			City_Select.areaSelect({
					$province:$applyprovince,
					$city:$applycity,
					$area:null
			});

			//表单省份和城市选择
			City_Select.areaSelect({
					$province:$customprovince,
					$city:$customcity,
					$area:null
			});
			
			//装修公司和设计师tab切换
			$grid_tabtitle.delegate('h1','click',function(){
					var $this=$(this),
					type=$this.attr('data-type');
					
					$this.addClass('tabtitle-active').siblings('h1').removeClass('tabtitle-active');
					
					if(type==='decoration'){
						$decoration.show();
						$designer.hide();
					}else if(type==='designer'){
						$decoration.hide();
						$designer.show();
					}
					
					//to do
					
			});
			
			
			
	});
});
