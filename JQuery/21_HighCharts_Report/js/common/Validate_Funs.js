(function($){
	$(function(){
		/*是否为正确货币格式（100元 < 提现金额 < 100万元）且保留两位小数*/
		jQuery.validator.addMethod("isLimitMoneyNumber",function(value,element){
			  var mtext=/^(([1-9]{1}\d{2,5})|0)((\.{0}(\d){0})|(\.{1}(\d){2}))$/;
			  return this.optional(element)||(mtext.test(value));
		},"金额格式不对");
		/*是否为正确货币格式且保留两位小数*/
		jQuery.validator.addMethod("isMoneyNumber",function(value,element){
			 // var mtext=/^(([1-9]{1}\d{0,})|([0]{1,}[1-9]{1}\d{0,}))((\.{0}(\d){0})|(\.{1}(\d){2}))$/;
			var mtext = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;  
			return this.optional(element)||(mtext.test(value));
		},"金额格式不对");
		/*金额小于1且保留两位小数*/
		jQuery.validator.addMethod("isMinNumber",function(value,element){
			  var mtext=/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
			  var values=value.replace(/(\s*)/g,"");
			  if(mtext.test(values)){
				 var tempvalue=parseInt(value);
				 if(tempvalue>0){
					 return true;
				 }else{
					 return false;
				 }
			  }else{
				  return false;
			  }
		},"金额不能小于1元");
		/*是否为正确手机号码*/
		jQuery.validator.addMethod("ischi_phone",function(value,element){
			  var tno = value.replace(/(\s*)/g,"");
			  var phonecode=/^(13[0-9]|15[012356789]|18[01236789]|14[57])[0-9]{8}$/;
			  return this.optional(element)||(phonecode.test(tno));
		},"手机号码不正确");
		/*是否为正确的邮箱*/
		jQuery.validator.addMethod("ischi_Email",function(value,element){
			  var emailrule=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
			  return this.optional(element) || emailrule.test(value);
		},"邮箱格式不正确");
		/*是否为合法用户名*/
		jQuery.validator.addMethod("isUserName",function(value,element){
			  var username=/^[0-9A-Za-z_\u2E80-\u9FFF]{4,16}/;
			  return this.optional(element)||(username.test(value));
		},"用户名只能由中文/数字/字母/下划线组成");
		
		
		
		
		
	});
})(jQuery);