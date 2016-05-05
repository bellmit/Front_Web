(function($,w){	
	/*提示对象*/
	var rg_vobj={
			ValidCode:{
				'require':'验证码不能为空',
			},
			MobilePhone:{
				'require':'手机号不能为空',
				'rule':['手机号格式不合法']
			},
			MPPassWord:{
				'require':'短信验证码不能为空',
				'len':'短信验证码长度为6位'
			},
			UserName:{
				'require':'用户名不能为空',
			},
			NickName:{
				'require':'昵称不能为空',
			},
			PassWord:{
				'require':'密码不能为空',
				'minmax':['密码不能小于6位','密码不能大于15位']
			},
			LPWD:{
				'require':'登录密码不能为空',
				'minmax':['登录密码不能小于6位','登录密码不能大于15位']
			},
			SPWD:{
				'require':'新密码不能为空',
				'minmax':['新密码不能小于6位','新密码不能大于15位']
			},
			reLPWD:{
				'require':'确认登录密码不能为空',
				'minmax':['确认登录密码不能小于6位','确认登录密码不能大于15位'],
				'equal':'确认登录密码与登录密码不一致'
			},
			reSPWD:{
				'require':'确认新密码不能为空',
				'minmax':['确认新密码不能小于6位','确认新密码不能大于15位'],
				'equal':'确认新密码与新密码不一致'
			},
			AreaInfo:{
				'require':'地区信息不能为空'
			},
			AddressInfo:{
				'require':'街道地址不能为空'
			},
			UserEmail:{
				'require':'邮箱不能为空',
				'rule':['邮箱格式不合法']
			},
			ZipCode:{
				'require':'邮编不能为空',
				'rule':['邮编格式不合法']
			},
			WechatPWD:{
				'require':'支付密码不能为空'
			},
			rg_default:{
				'require':'输入值不能为空',
				'len':'输入值长度有限制',
				'minmax':['输入值长度不能小于最小值','输入项长度不能大于最大值'],
				'rule':['输入项不符合规则']
			}
		}
	/*规则对象*/
	var rg_vrule={
			MobilePhone:['/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/'],
			UserEmail:['/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z0-9]{2,7}((\\.[a-z]{2})|(\\.(com|net)))?)$/'],
			ZipCode:['/^[0-9]\\d{5}$/'],
			PassWord:{
				'minmax':[6,15]
			},
			MPPassWord:{
				'len':6
			},
			LPWD:{
				'minmax':[6,15]
			},
			SPWD:{
				'minmax':[6,15]
			},
			reLPWD:{
				'minmax':[6,15],
				'equal':'succ_lpwd'
			},
			reSPWD:{
				'minmax':[6,15],
				'equal':'rg_set_pwd'
			},
			rg_default:{
				'len':10,
				'minmax':[6,20]
			}
		};
		
	var rg_valid={
		rg_vobj:rg_vobj,
		rg_vrule:rg_vrule
	}
	w.rg_valid=rg_valid;
	/*定时器*/
	w.rgTimers=(function(){var c=0;return function(){return ++c;}}());
	/*去除空格*/
	w.trimSpace=function(str){
		return str.replace(/\s*/g,'');
	}
	/*遮罩提示*/
	$.fn.tipMashShow=function(str){
		if(typeof str==='undefined'||str===undefined||str==null){
			return this.html('').closest('table').show();
		}else{
			return this.html(str).closest('table').show();
		}
	}
	$.fn.tipMashHide=function(url){
		var cur=this;
		if(typeof url==='undefined'){
			setTimeout(function(){
				cur.html('').closest('table').hide();
			},2000);
		}else{
			if(typeof url==='string'){
				setTimeout(function(){
					cur.html('').closest('table').hide();
					window.location.href=url;
				},2000);
			}
		}
		return cur;
	}
	/*判断验证码状态*/
	w.validCodeSwitch=function(data,obj){
		switch (data.status) {
			case '0':
				//后台验证手机号码不能为空	
				obj.ctip.html(data.message);
				//obj.cpre.focus();
				break;
			case '1':
				//后台验证手机号码格式！
				obj.ctip.html(data.message);
				//obj.cpre.val('').focus();
				break;
			case '2':
				//后台验证手机号码不能为空
				obj.ctip.html(data.message);
				//obj.cpre.focus();
				break;
			case '3':
				/*to do*/
				obj.ctip.html(data.message);
				break;
			case '4':
				obj.ctip.html(data.message);
				break;
			case '5':
				//后台验证手机号码格式！
				obj.ctip.html(data.message);
				setTimeout(function(){
					obj.ctip.html('');
				},2000);
				/*读秒操作*/
				togrgTimer(obj.count,obj.c);
				break;
		}
	}
	/*读秒*/
	w.togrgTimer=function(tid,o){
		var count=1;
		o.html('120秒后可重新获取');
		o.addClass("rg-reg-mpbtndis").attr({"disabled":"disabled"});
		tid=setInterval(function(){
			count=rgTimers();
			count<=120?count=count:count=count%120;
			o.html((120-count)+'秒后可重新获取');
			if(count==120||count==0){
				clearInterval(tid);
				tid=null;
				o.removeClass("rg-reg-mpbtndis").removeAttr("disabled").html('获取短信验证码');
			};
		},1000);
	}
	/*密码强度*/
	w.pwdStrong=function(ro,to,slen){
			var txt=trimSpace(ro.val()),tlen=txt.length,tscore=0;
			var reg1=/[a-zA-Z]+/,reg2=/[0-9]+/,reg3=/\W+\D+/;
			if(tlen>=slen[0]&&tlen<=slen[1]){
				if(reg1.test(txt) && reg2.test(txt) && reg3.test(txt)) {
					tscore=90;
				}else if(reg1.test(txt) || reg2.test(txt) || reg3.test(txt)) {
					if(reg1.test(txt) && reg2.test(txt)){
						tscore=60;
					}else if(reg1.test(txt) && reg3.test(txt)) {
						tscore=60;
					}else if(reg2.test(txt) && reg3.test(txt)) {
						tscore=60;
					}else{
						tscore=30;
					}
				}
				if(tscore<=50){
					to.removeClass('rg-c-gray2 rg-c-orange rg-c-red').addClass('rg-c-gray2').html('低级');
				}else if(tscore<=79&&50<tscore){
					to.removeClass('rg-c-gray2 rg-c-orange rg-c-red').addClass('rg-c-orange').html('中级');
				}else if(tscore>=80){
					to.removeClass('rg-c-gray2 rg-c-orange rg-c-red').addClass('rg-c-red').html('高级');
				}
			}else if(txt==""||txt=="null"){
			  to.removeClass('rg-c-gray2 rg-c-orange rg-c-red').addClass('rg-c-gray2').html('');
			}else if(txt!=""&&tlen<slen[0]){
				to.removeClass('rg-c-gray2 rg-c-orange rg-c-red').addClass('rg-c-red').html('密码长度至少大于'+slen[0]+'位');
			}else{
			  to.removeClass('rg-c-gray2 rg-c-orange rg-c-red').addClass('rg-c-gray2').html('');
			}
	}
	/*验证规则*/
	
	w.doCheckValid=function($,o){
		var $c=o,cn=$c.attr('name'),ctip=$c.parent().next(),ctype=$c.attr('type');
		var treg,ctxt,crule,cajax;
		if(ctype=='text'||ctype=='textarea'||ctype=='password'||ctype=='email'||ctype=='number'){
			ctxt=trimSpace($c.val());
			var flagobj={
				mmflag:true,
				ruleflag:true,
				lenflag:true,
				equalflag:true
			};
			var tempobj={
				tc:$c,
				tcn:cn,
				tctip:ctip,
				tctype:ctype,
				tctxt:ctxt	
			};
			if($c.attr('data-require')){
                //[向上]
                // [2014-11-10-0:18]
                // [将if(ctxt=='')改为if(ctxt=='' || ctxt == $c.attr('data-primitive-value') )]
                //原因是：如果input的值跟input的data-primitive-value一致，说明用户没有输入任何内容
				if(ctxt=='' || ctxt == $c.attr('data-primitive-value') ){
					var trequire = rg_valid.rg_vobj[cn]['require'];
					if(typeof trequire=='undefined'){
						ctip.html(rg_valid.rg_vobj['rg_default']['require']);
					}else{
						ctip.html(trequire);
					}
					return 'novalid';
				}else{
					flagobj=handlerValid($,tempobj,flagobj);
				}
			}else if($c.attr('data-require')==null){
				flagobj=handlerValid($,tempobj,flagobj);
			}
			if(flagobj.mmflag&&flagobj.ruleflag&&flagobj.lenflag&&flagobj.equalflag){
				return 'valided';
			}else if(flagobj=='novalid'){
				return 'novalid';	
			}else{
				return 'novalid';
			}
		}
	}
	/*具体业务校验*/
	w.handlerValid=function($,to,fo){
		var $c=to.tc,ctip=to.tctip,cn=to.tcn,ctxt=to.tctxt;
		ctip.html('');
		if($c.attr('data-maxlen')&&$c.attr('data-minlen')){
			var tmm=rg_valid.rg_vrule[cn]['minmax'];
			if(typeof tmm=='undefined'){
				ctip.html(rg_valid.rg_vobj['rg_default']['minmax'][0]);
				return 'novalid';
			}
			if(ctxt.length<tmm[0]){
				ctip.html(rg_valid.rg_vobj[cn]['minmax'][0]);
				fo.mmflag=false;
			}else if(ctxt.length>tmm[1]){
				ctip.html(rg_valid.rg_vobj[cn]['minmax'][1]);
				fo.mmflag=false;
			}else{
				ctip.html('');
				fo.mmflag=true;
			}
		}else if($c.attr('data-maxlen')&&$c.attr('data-minlen')==null){
			var tmm=rg_valid.rg_vrule[cn]['minmax'];
			if(typeof tmm=='undefined'){
				ctip.html(rg_valid.rg_vobj['rg_default']['minmax'][0]);
				return 'novalid';
			}
			if(ctxt.length>tmm[0]){
				ctip.html(rg_valid.rg_vobj[cn]['minmax'][0]);
				fo.mmflag=false;
			}else{
				ctip.html('');
				fo.mmflag=true;
			}
		}else if($c.attr('data-maxlen')==null&&$c.attr('data-minlen')){
			var tmm=rg_valid.rg_vrule[cn]['minmax'];
			if(typeof tmm=='undefined'){
				ctip.html(rg_valid.rg_vobj['rg_default']['minmax'][0]);
				return 'novalid';
			}
			if(ctxt.length<tmm[0]){
				ctip.html(rg_valid.rg_vobj[cn]['minmax'][0]);
				fo.mmflag=false;
			}else{
				ctip.html('');
				fo.mmflag=true;
			}
		}
		if($c.attr('data-len')){
			var tlen=rg_valid.rg_vrule[cn]['len'];
			if(typeof tlen=='undefined'){
				ctip.html(rg_valid.rg_vobj['rg_default']['len']);
				return 'novalid';
			}
			if(ctxt.length!=tlen){
				ctip.html(rg_valid.rg_vobj[cn]['len']);
				fo.lenflag=false;
			}else{
				ctip.html('');
				fo.lenflag=true;
			}
		}
		if($c.attr('data-equal')){
			var tequal=document.getElementById(rg_valid.rg_vrule[cn]['equal']).value;
			if(ctxt!=tequal){
				ctip.html(rg_valid.rg_vobj[cn]['equal']);
				fo.lenflag=false;
			}else{
				ctip.html('');
				fo.lenflag=true;
			}
		}
		if($c.attr('data-rule')){
			var j=0;
			crule=rg_valid.rg_vrule[cn];
			var i=0,ilen=crule.length;
			if(($c.attr('data-null')&&ctxt!='')||$c.attr('data-null')==null){
				for(i;i<ilen;i++){
					treg=eval(crule[i]);
					if(!treg.test(ctxt)){
						ctip.html(rg_valid.rg_vobj[cn]['rule'][i]);
						fo.ruleflag=false;
					}else{
						j++;
					}
				}
				if(j==ilen){
					fo.ruleflag=true;
					ctip.html('');
				}
			}
		}
		return fo;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})(Zepto,window);