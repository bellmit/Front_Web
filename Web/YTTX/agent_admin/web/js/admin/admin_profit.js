/*admin_role:角色管理*/
(function($){
	'use strict';
	$(function(){
		
		

		/*dom引用和相关变量定义*/
		var module_id='admin_profit'/*模块id，主要用于本地存储传值*/,
			dia=dialog({
				title:'温馨提示',
				okValue:'确定',
				width:300,
				ok:function(){
					this.close();
					return false;
				},
				cancel:false
			});

		/*表单对象*/
		var $profit_edit_form=$('#profit_edit_form')/*编辑表单*/,
		$profit_a=$('#profit_a')/*A级*/,
		$profit_aa=$('#profit_aa')/*AA级*/,
		$profit_aaa=$('#profit_aaa')/*AAA级*/;
		
		/*jQuery.validator.addMethod("AAA",function(value,element){
				var ele_a=parseInt($profit_a.val() * 10000,10) / 10000,
						ele_aa=parseInt($profit_aa.val() * 10000,10) / 10000,
						ele_aaa=parseInt($profit_aaa.val() * 10000,10) / 10000;
						
						
						if((ele_a===0||ele_a>=100)||(ele_aa===0||ele_aa>=100)||(ele_aaa===0||ele_aaa>=100)){
							return false;
						}else if((ele_a+ele_aaele_aaa)>100){
							return false;
						}
						return true;
		},"分销数值不合法");*/



		/*表单验证*/
		if($.isFunction($.fn.validate)) {
			/*配置信息*/
			var form_opt={};
			if(public_tool.cache.form_opt_0){
				$.extend(true,form_opt,public_tool.cache.form_opt_0,{
					submitHandler: function(form){
						var config={
								url:"../../json/admin/admin_role_update.json",
								method: 'POST',
								dataType: 'json',
								data: {
									"profit_A":$profit_a.val(),
									"profit_AA":$profit_aa.val(),
									"profit_AAA":$profit_aaa.val()
								}
							};

						$.ajax(config)
						.done(function(resp){
							if(resp.flag){
								dia.content('<span class="g-c-bs-success g-btips-succ">设置成功</span>').show();
							}else{
								dia.content('<span class="g-c-bs-warning g-btips-warn">设置失败</span>').show();
							}
							setTimeout(function () {
								dia.close();
							},2000);
						})
						.fail(function(){
							dia.content('<span class="g-c-bs-warning g-btips-warn">操作失败</span>').show();
							setTimeout(function () {
								dia.close();
							},2000)

						});

					}
				});
			}
			/*提交验证*/
			$profit_edit_form.validate(form_opt);
		}
		
		
		/*绑定限制*/
		$.each([$profit_a,$profit_aa,$profit_aaa],function(){
				this.on('keyup',function(){
					this.value=this.value.replace(/[^0-9*\-*^\.?]/g,'');
				});
		});



	});


})(jQuery);