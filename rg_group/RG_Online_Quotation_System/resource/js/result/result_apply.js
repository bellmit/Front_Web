/*程序入口*/
(function($,w){
		$(function() {
				/*页面元素引用*/
				var $result_storebtn=$('#result_storebtn'),
						$applyaction=$('#applyaction'),
						$userid=$('#userid'),
						$username=$('#username'),
						$moneyup=$('#moneyup'),
						$money=$('#money'),
						$applysubmit=$('#applysubmit');
			

				//专卖店显示与隐藏
				$result_storebtn.on($.EventName.click,function(){
						var $this=$(this);
						$this.toggleClass('storeinfosel');
						$this.next().toggle();
				});
				
				
				//绑定金额格式化修正以及大写金额显示
				$money.on('keyup',function(){
						var val=this.value;
						val=ValidFn.moneyCorrect(val);
						this.value=val[0];
						ValidFn.cursorPos(this,val[0],'.');
						$moneyup.html(ValidFn.toUpMoney(val[1]));
				});
				
				
				//设置校验对象
				var rules=[
						[
							{selector:$userid},
							{
								require:function(str){return ValidFn.isRequire(str)},
								no:'申报顾客编号不能为空',
								yes:''
							}
						],
						[
							{selector:$username},
							{
								require:function(str){return ValidFn.isRequire(str)},
								no:'申报顾客姓名不能为空',
								yes:''
							}
						],
						[
							{selector:$money},
							{
								require:function(str){return ValidFn.isRequire(str)},
								no:'申报金额不能为空',
								yes:''
							},
							{
								rule:function(str){
										var money=ValidFn.trimSep(str,','),
										ismoney=ValidFn.isMoney(money);
										return ismoney?parseInt(money)==0?false:true:ismoney;
								},
								no:'申报金额不是有效货币格式(应为数字xx.xx格式且不能小于1元)',
								yes:''
							}
						]
						];
						
				
				
				//表单校验
				$applysubmit.on($.EventName.click,function(e){
						e.preventDefault();
						$.Validator($applyaction,rules);
						return false;
				});
				
				
				//定义回调函数
				$.ValidCallBack=function(flag){
						if(flag){
							//ajax 提交
							//to do 开发阶段请填充业绩审核业务逻辑
							
							
							//此处为测试，开发阶段可删除
							setTimeout(function(){
								var wraps=$.modal({
										content:'<span class="g-c-green5">添加业绩申报成功，资料进入审核中......</span>'
										
									},0,true);
									setTimeout(function(){
										wraps.remove();
										window.location.href='result_manage.html';
									},2000);
							},200);
							
						}else{
							//表单提交
							$applyaction.submit();
						}
				}
				
				
				
				
		});
})(Zepto,window);