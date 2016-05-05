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
		'commonfn':'js/widgets/commonfn'
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
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','common','dialog','rule','validform','commonfn'], function($,$strap,undefined,undefined,Rule,undefined,CommonFn) {
	$(function() {
		/*页面元素引用*/
		var $fiAcApplForm=$('#fiAcApplForm'),
				$amount=$('#amount'),
				$payPassword=$('#payPassword'),
				$fees=$('#fees'),
				$sendAmt=$('#sendAmt'),
				$memo=$('#memo'),
				$amountup=$('#amountup');
				
				
		//绑定金额自动格式化以及大写	
		$amount.on('keyup',function(e){
				/*var kc=e.which;
				if(kc==8||kc==46||kc==32){
					return;
				}*/
				var val=this.value;
				val=CommonFn.moneyCorrect(val);
				this.value=val[0];
				CommonFn.cursorPos(this,val[0],'.');
				$amountup.text(CommonFn.toUpMoney(val[1]));
		});
				
				
		//表单校验
		var tipobj={
				amount:'',
				payPassword:''
		};
		$validobj=$fiAcApplForm.Validform({
				ajaxPost: true,
				datatype:{
					//自定义校验方式
					'money':function(gets,obj,curform,regxp){
							return CommonFn.isMoney(CommonFn.trimSep(gets,','));
					}
				},
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
							//注：此处需添加添加成功后跳转的页面，同时加入hash值为：#apply_recharge
							window.location.href='withdraw_manage.html#apply_withdraw';
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
			$validobj.addRule([{
				ele:$amount,
				datatype: "money",
				nullmsg: "申请金额不能为空",
				errormsg: "申请金额格式不正确，应为数字xx.xx",
				sucmsg: ""
			},
			{
				ele:$payPassword,
				datatype: "n6-20",
				nullmsg: "支付密码不能为空",
				errormsg: "支付密码应为6-20位",
				sucmsg: ""
			}]);




		
	});
});
