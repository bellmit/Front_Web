if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {//手机访问
    var EventName = {"click": "tap"};
}else{ //电脑访问
    var EventName = {"click": "click"};
}
(function($){
	$(function(){
		var countid=null;
		var $rg_tip=$('#rg_tipwrap'),$rg_fpwd2_wv=$('#rg_findpwd2_wayvalue'),rg_spwd=$('#rg_set_pwd'),rg_stxt=$('#rg_strong_txt');	
		/*获取密码*/
		$('#rg_reg_mpbtn,#rg_findpwd2_mpbtn,#rg_findpwd3_mpbtn').on(EventName.click,function(e){
			var $c=$(this),cid=e.target.id;
			if($c.attr('disabled')=='disabled'){
				return false;
			}
			var $ctip=$c.parent().next(),$cpre=$c.prev();
			if(cid=='rg_reg_mpbtn'){
				var ctxt=trimSpace($cpre.val()),cn=$cpre.attr("name"),crule=$cpre.attr('data-rule');
				if(ctxt==''){
					$ctip.html(rg_valid.rg_vobj[cn]['require']);
					return false;
				}
				if(crule){
					var trule=rg_valid.rg_vrule[cn],j=0;
					for(var i=0;i<trule.length;i++){
						if(!eval(trule[i]).test(ctxt)){
							$ctip.html(rg_valid.rg_vobj[cn]['rule'][i]);
							return false;
						}else{
							j++;	
						}
					}
					
					if(j==trule.length){
						/*验证手机是否已经被注册*/
						//to do ajax
					}
				}
			}else if(cid=='rg_findpwd2_mpbtn'){
				var temptxt=trimSpace($('#rg_findpwd2pn').val()),crule=rg_valid.rg_vrule['MobilePhone'][0];
				if(temptxt==''){
					$ctip.html(rg_valid.rg_vobj['MobilePhone']['require']);
					return false;
				}else if(temptxt!=''&&eval(crule).test(temptxt)){
					/*验证手机是否已经被注册*/
					//to do ajax
				}
			}else if(cid=='rg_findpwd3_mpbtn'){
				var ctar=rg_spwd.val(),ctype=rg_spwd.attr('type');
				if(ctype=='text'){
					rg_spwd.attr({'type':'password'});
					$c.html('显示星号');
				}else if(ctype=='password'){
					rg_spwd.attr({'type':'text'});
					$c.html('显示明文');
				}
			}
		});
		/*表单校验*/
		/*
		#rg_reg_submit,
		#rg_login_submit,
		#rg_succlogin_submit,
		#rg_findpwd1_submit,
		#rg_findpwd2_submit,
		#rg_findpwd3_submit,
		#rg_modifypwd_submit,
		#rg_personinfo_submit,
		#rg_addressedit_submit
		*/
		$('#rg_reg_submit,#rg_login_submit,#rg_succlogin_submit,#rg_findpwd1_submit,#rg_findpwd2_submit,#rg_findpwd3_submit,#rg_modifypwd_submit,#rg_personinfo_submit,#rg_wechatpayment_submit').on(EventName.click,function(e){
				var $this=$(this),cid=e.target.id.slice(3,-7),$cproxy,isvalid='',$forms,params=[],tips=[],nodes=[];
				/*适配有表单和无表单情况*/
				if($('#rg_'+cid+'_form').length!=0){
					/*有表单*/
					$cproxy=$('#rg_'+cid+'_form');
					isvalid=$cproxy.attr('data-valid');
					$forms=$cproxy.get(0);
				}else{
					/*无表单*/
					$cproxy=$this.closest('ul');
					isvalid=$cproxy.attr('data-valid');
					if(isvalid==null||isvalid=='null'){
						/*修正其他布局下不能找到表单元素情况*/
						$cproxy=$this.closest('ul').prev();
						isvalid=$cproxy.attr('data-valid');
					}
					$forms=$cproxy.find('input,textarea,select');
				}
				var i=0,flen=$forms.length,valided=0,hvalid=0;
				if(isvalid=='novalid'){
					for(i;i<flen;i++){
						var tobj=$($forms[i]);
						var tvalue=trimSpace(tobj.val());
						var ttype=tobj.attr('type'),tname=tobj.attr('name');
						if(tobj.attr('data-valid')){
							hvalid++;
							tres=doCheckValid($,tobj);
							if(tres=='valided'){
								valided++;
							}
						}
						if(ttype=='checkbox'){
							tvalue=tobj.is(':checked') ? 1 : 0;
						}
						/*将表单数据放入序列数组中*/
						params.push(tvalue);
						if(tname!==''){
							nodes.push(tobj);
							tips.push(tobj.parent().next());
						}
					}
				}
				if(hvalid==valided){
					switch(cid){
						case 'reg':
							/*注册ajax*/
							modal({
								title: '温馨提示',
								content:'注册',
								ok: '确认',
								okfn: function () {
									$('#form').submit();
								}
							}, 1);
							break;
						case 'login':
							/*登录ajax*/
							modal({
								title: '温馨提示',
								content:'登陆',
								ok: '确认',
								okfn: function () {
									$('#form').submit();
								}
							}, 1);
							break;
						case 'succlogin':
							/*注册成功提交*/
							modal({
								title: '温馨提示',
								content:'注册成功',
								ok: '确认',
								okfn: function () {
									$('#form').submit();
								}
							}, 1);
							break;
						case 'findpwd1':
							/*找回密码1 ajax*/
							modal({
								title: '温馨提示',
								content:'找回密码1',
								ok: '确认',
								okfn: function () {
									$('#form').submit();
								}
							}, 1);
							break;
						case 'findpwd2':
							/*找回密码2 ajax*/
							modal({
								title: '温馨提示',
								content:'找回密码2',
								ok: '确认',
								okfn: function () {
									$('#form').submit();
								}
							}, 1);
							break;
						case 'findpwd3':
							/*找回密码3 ajax*/
							modal({
								title: '温馨提示',
								content:'找回密码3',
								ok: '确认',
								okfn: function () {
									$('#form').submit();
								}
							}, 1);
							break;
						case 'modifypwd':
							/*修改密码 ajax*/
							modal({
								title: '温馨提示',
								content:'修改密码',
								ok: '确认',
								okfn: function () {
									$('#form').submit();
								}
							}, 1);
							break;
						case 'personinfo':
							/*个人信息 ajax*/
							modal({
								title: '温馨提示',
								content:'个人信息',
								ok: '确认',
								okfn: function () {
									$('#form').submit();
								}
							}, 1);
							break;
						case 'addressedit':
							/*收货地址 ajax*/
							modal({
								title: '温馨提示',
								content:'收货地址',
								ok: '确认',
								okfn: function () {
									$('#form').submit();
								}
							}, 1);
							break;
						case 'wechatpayment':
							/*微信支付 ajax*/
							modal({
								title: '温馨提示',
								content:'微信支付',
								ok: '确认',
								okfn: function () {
									$('#form').submit();
								}
							}, 1);
							break;
					}
				}else{
					return false;
				}
				e.preventDefault();
				return false;
		});

		/*密码强度*/
		$('.rg-strong-value').on('keyup',function(){
			pwdStrong($(this),rg_stxt,[6,15]);
		})
		
		
	});
})(Zepto);
