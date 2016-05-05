if(typeof define === "function" && define.amd) {
	/*AMD模块支持*/
	define(['validrule'],function(VR){
			var email=VR.email,
			mobilephone=VR.mobilephone;
			return {
				/*去空格*/
				trim:function(str){
					return str.replace(/\s*/g,'');
				},
				/*是否为邮箱*/
				isEmail:function(str){
					var values=this.trim(str);
					return email.test(values)?true:false;
				},
				/*是否为手机*/
				isMobilePhone:function(str){
					var values=this.trim(str);
					return mobilephone.test(values)?true:false;
				},
				/*是否为邮箱或手机*/
				isEorMP:function(str){
					if((!this.isEmail(str)&&this.isMobilePhone(str))||(this.isEmail(str)&&!this.isMobilePhone(str))||(this.isEmail(str)&&this.isMobilePhone(str))){
							return true;
					}else{
							return false;
					}
				}
			}
	});
}