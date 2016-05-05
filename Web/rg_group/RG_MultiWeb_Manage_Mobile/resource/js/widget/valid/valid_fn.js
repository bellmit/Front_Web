(function($,w){
	
		if(typeof Valid_Rule==='undefined'){
			var email=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z0-9]{2,7}((\.[a-z]{2})|(\.(com|net)))?)$/,mobilephone=/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/,
			num=/^[0-9]{0,}$/g;
		}else{
			var email=Valid_Rule.email,
					mobilephone=Valid_Rule.mobilephone,
					num=Valid_Rule.num;
		}
		

		var valid_fnobj=function(){
						/*密码强度*/
						this.pwdStrong=function(str,tip,scope){
									var score=0,
									txt=this.trims(str),
									len=txt==''?0:txt.length,
									reg1=/[a-zA-Z]+/,
									reg2=/[0-9]+/,
									reg3=/\W+\D+/;
									if(len>=scope[0]&&len<=scope[1]){
										if(reg1.test(txt) && reg2.test(txt) && reg3.test(txt)) {
											score=90;
										}else if(reg1.test(txt) || reg2.test(txt) || reg3.test(txt)) {
											if(reg1.test(txt) && reg2.test(txt)){
												score=60;
											}else if(reg1.test(txt) && reg3.test(txt)) {
												score=60;
											}else if(reg2.test(txt) && reg3.test(txt)) {
												score=60;
											}else{
												score=30;
											}
										}
										if(score<=50){
											tip.removeClass().addClass('g-c-gray2').html('低级');
										}else if(score<=79&&50<score){
											tip.removeClass().addClass('g-c-orange').html('中级');
										}else if(score>=80){
											tip.removeClass().addClass('g-c-red2').html('高级');
										}
									}else if(txt==""||txt=="null"){
										tip.removeClass().addClass('g-c-gray2').html('');
									}else if(txt!=""&&len<scope[0]){
										tip.removeClass().addClass('g-c-red2').html('密码长度至少大于'+scope[0]+'位');
									}else{
										tip.removeClass().addClass('g-c-gray2').html('');
									}
							}
							/*读秒*/
							this.getCount=function(tid,times,nodes){
									var count=0,
									id=tid,
									t=times,
									n=nodes;
									n.html(times+'秒后重新获取').attr({"disabled":"disabled"}),
									timer=this.getTimer();
									id=setInterval(function(){
											count=timer();
											count=count<=t?count:count%t;
											n.html((t-count)+'秒后重新获取');
											if(count==t||count==0){
												clearInterval(id);
												tid=null;
												id=null;
												n.removeAttr("disabled").html('获取验证码');
											};
									},1000);
							}
		}
				
		valid_fnobj.prototype={
					/*去除所有空格*/
					trims:function(str){
						return str.replace(/\s*/g,'');
					},
					/*去除前后空格*/
					trim:function(str){
						return str.replace(/^\s*\s*$/,'');
					},
					/*判断邮箱*/
					isEmail:function(str){
						return email.test(this.trims(str))?true:false;
					},
					/*判断手机*/
					isMobilePhone:function(str){
						return mobilephone.test(this.trims(str))?true:false;
					},
					/*判断邮箱或者手机*/
					isEMP:function(str){
						if(!this.isEmail(str)&&!this.isMobilePhone(str)){
								return false;
						}else{
								return true;
						}
					},
					/*判空*/
					isRequire:function(str){
							return this.trims(str)==''?true:false;
					},
					/*判断是否相等*/
					isEqual:function(str1,str2){
							return this.trims(str1)==this.trims(str2)?true:false;
					},
					/*判断是否是数值*/
					isNum:function(str){
							return num.test(this.trims(str))?true:false;
					},
					/*判断数据范围*/
					isMinMax:function(str,arr){
							var len=str.length;
							return (len<arr[1]||len==arr[1])&&(len>arr[0]||len==arr[0])?true:false;
					},
					/*计时器*/
					getTimer:function(){
							var i=0;
							return function(){
									return ++i;
							}; 
					}	
					
		};
		w.ValidFn=new valid_fnobj();	
})(Zepto,window);