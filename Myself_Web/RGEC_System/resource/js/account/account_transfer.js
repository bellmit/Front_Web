/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'dialog':'js/lib/artDialog/dialog',
		'querydata':'js/widgets/querydata',
		'validform':'js/plugins/validform',
		'common':'js/common/common',
		'submenu':'js/widgets/submenu',
		'themetitle':'js/widgets/themetitle',
		'rule':'js/widgets/rules',
		'commonfn':'js/widgets/commonfn'
	},
	shim:{
		'bootstrap':{
				deps:['jquery']
		},
		'dialog':{
				deps:['jquery']
		},
		'querydata':{
				deps:['jquery','dialog']
		},
		'validform':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery','dialog','querydata','validform']
		},
		'submenu':{
				deps:['jquery','common']
		},
		'themetitle':{
				deps:['jquery','common']
		},
		'commonfn':{
				deps:['jquery','rule']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','dialog','querydata','validform','common','submenu','themetitle','rule','commonfn'], function($,$strap,undefined,undefined,undefined,Common,undefined,undefined,Rule,CommonFn) {
	$(function() {
			//页面元素引用
			var $submenu=$('#submenu'),
					$theme_title=$('#theme_title'),
					$fiAcTransForm=$('#fiAcTransForm'),
					$balance=$('#balance'),
					$inUserCode=$('#inUserCode'),
					$outMoney=$('#outMoney'),
					$payPassword=$('#payPassword'),
					$memo=$('#memo'),
					$outMoneyup=$('#outMoneyup'),
					$balance_error=$('#balance_error');
					
			//主题标题点击
			$theme_title.ThemeTitle(undefined,true);		
			
			
			//子导航点击事件
			$submenu.subMenuItem(undefined,true);
			
			//绑定金额自动格式化以及大写
			var balancetxt=CommonFn.moneyCorrect($balance.text());
			$outMoney.on('keyup',function(e){
					var val=this.value,
					money=0.00;
					val=CommonFn.moneyCorrect(val);
					money=CommonFn.moneySub(balancetxt[1],val[1]);
					
					if(money<0){
						$balance_error.html('<span class="g-c-red4">余额不够</span>');
						this.value=balancetxt[0];
						CommonFn.cursorPos(this,balancetxt[0],'.');
						$outMoneyup.text(CommonFn.toUpMoney(balancetxt[1]));
						setTimeout(function(){
							$balance_error.html('');
						},2000);
					}else{
						$balance_error.html('');
						this.value=val[0];
						CommonFn.cursorPos(this,val[0],'.');
						$outMoneyup.text(CommonFn.toUpMoney(val[1]));
					}
			});
					
					
			//表单校验
			var tipobj={
					inUserCode:'',
					outMoney:'',
					payPassword:''
			};
			$validobj=$fiAcTransForm.Validform({
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
													content:'<span class="g-c-red4">保存失败</span>'
												}).show();
										}
								},
								error: function(){
										dia=dialog({
											title:'温馨提示',
											width:200,
											content:'<span class="g-c-red4">保存失败</span>'
										}).show();
								}
						});
						setTimeout(function(){
							dia.close().remove();
							if(issucces){
								//注：此处需添加添加成功后跳转的页面，同时加入hash值为：#apply_recharge
								window.location.href='account_query.html#apply_transfer';
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
										content:'<span class="g-c-red4 g-btips-error">'+msg+'</span>',
										align:'right',
										padding:8
									});
									tipobj[id].show(document.getElementById(id));
								}else if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-red4 g-btips-error">'+msg+'</span>');
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
					ele:$inUserCode,
					datatype: "*",
					nullmsg: "收款方用户编号不能为空",
					errormsg: "收款方用户编号不存在",
					sucmsg: ""
				},
				{
					ele:$outMoney,
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
