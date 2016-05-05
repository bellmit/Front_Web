/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'share':'plugins/share',
		'dialog':'lib/artDialog/dialog',
		'common':'common/common',
		'cookie':'plugins/cookie',
		'city_select':'widgets/city_select',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'modal_dialog':'widgets/modal_dialog',
		'comment_reply':'widgets/comment_reply',
		'cashshow_serve':'case/caseshow_serve'
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
require(['jquery','share','dialog','rule','commonfn','validform','city_select','modal_dialog','cookie','comment_reply','cashshow_serve','common'],function($,undefined,undefined,Rule,CommonFn,undefined,City_Select,Modal_Dialog,undefined,Comment_Reply,CashServe,Common) {
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
			var $case_form=$('#case_form'),	
					$miniportal_form=$('#miniportal_form'),
					$customname=$('#customname'),
					$custommobile=$('#custommobile'),
					$customcity=$('#customcity'),
					$customprovince=$('#customprovince'),
					$customprovince_text=$('#customprovince_text'),
					$customcity_text=$('#customcity_text'),
					$comment_form=$('#comment_form'),
					$evacontents=$('#evacontents'),
					$comment_wrap=$('#comment_wrap'),
					$evacontents_tips=$('#evacontents_tips'),
					$evacontents_size=$('#evacontents_size'),
					dia=dialog({
							cancel:false
					}),
					validobj=null;
					
			
					
			//评论、回复服务类启动
			Comment_Reply.init({
					//评论相关参数
					comment:{
							geturl:'../../json/caseshow_comment.json',
							sendurl:'../../json/caseshow_comment.json',
							dataname:'caseList',
							action_type:'comment',
							action_template:'1',
							wrap:$comment_wrap,
							charsize:140
					},
					//回复相关参数
					reply:{
						geturl:'../../json/caseshow_reply.json',
						sendurl:'../../json/caseshow_reply.json',
						dataname:'caseList',
						action_type:'reply',
						action_template:'1'
					}
			});
			
			
			
			//案例服务类启动
			CashServe.init({
				$case_form:$case_form
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
					

			
			
			//表单省份和城市选择
			City_Select.areaSelect({
					$province:$customprovince,
					$city:$customcity,
					$area:null
			});
			
			
			
			//表单验证1(to do)
			var issucces=false;
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
			
	});
});


