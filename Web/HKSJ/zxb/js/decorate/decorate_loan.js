/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'city_select':'widgets/city_select',
		'modal_dialog':'widgets/modal_dialog',
		'cookie':'plugins/cookie'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
			deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','rule','commonfn','validform','city_select','modal_dialog','cookie','common'],function($,undefined,Rule,CommonFn,undefined,City_Select,Modal_Dialog,undefined,Common) {
	$(function() {
			//页面元素获取
			var $decorate_form=$('#decorate_form'),
			$loanmoney=$('#loanmoney'),
			$loancycle=$('#loancycle'),
			$loanaction=$('#loanaction'),
			$loan_tip=$('#loan_tip'),
			$show_loanmonth=$('#show_loanmonth'),
			$show_loanmoney=$('#show_loanmoney'),
			$show_loanresult=$('#show_loanresult'),
			$show_loancycle=$('#show_loancycle'),
			$customprovince=$('#customprovince'),
			$customname=$('#customname'),
			$custommobile=$('#custommobile'),
			$customcity=$('#customcity'),
			$customprovince_text=$('#customprovince_text'),
			$customcity_text=$('#customcity_text'),
			$formtip=$('#formtip'),
			validobj=null,
			dia=dialog({
					cancel:false
			}),
			loan_discount_rate=0;
		
			
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
			
			
			
			
			//表单验证1
			var issucces=false;
		  validobj=$decorate_form.Validform({
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
								$formtip.text(msg);
						}else if(curtype==2){
								$formtip.text('');
						}
					}
			});
			validobj.addRule(ruleobj);
			
			
			//贷款计算器
			$loanaction.on('click',function(e){
					e.preventDefault();
					//校验数据
					var loanflag=_validLoan($loanmoney);
					if(loanflag.isloan){
						$loan_tip.text('').removeClass('Validform_error');
					}else{
						$loan_tip.text(loanflag.loantip).addClass('Validform_error');
						return false;
					}
					//计算数据
					_doLoan({
							money:$loanmoney,
							cycle:$loancycle,
							show_month:$show_loanmonth,
							show_money:$show_loanmoney,
							show_cycle:$show_loancycle,
							show_result:$show_loanresult
					});
					return false;
			});

			
			//服务滚动区
			(function(){
					var $roll_wrap=$('#roll_wrap'),
							$roll_item=$roll_wrap.children(),
							roll_size=$roll_item.size(),
							roll_height=roll_size>2?roll_size * 20:40,
							roll_index=0,
							roll_id=null,
							animate_id=null;
							//初始化
							$roll_wrap.height(roll_height);
							//滚动
							function roll_scroll(){
									roll_index++;
									if(roll_index==roll_size - 1){
										roll_index=0;
									}
									if(roll_index==0){
										$roll_wrap.css({
											 'top':-(roll_index * 20)
										});
									}else{
										animate_id=$roll_wrap.animate({
											 'top':-(roll_index * 20)
										},500);
									}	
							}
							if(roll_size>2){
								roll_id=setInterval(function(){
									roll_scroll();
								},5000);
							}
							//绑定事件
							$roll_wrap.hover(function(){
								clearInterval(roll_id);
								roll_id=null;
								$roll_wrap.stop(animate_id,true,false);
							},function(){
								roll_id=setInterval(function(){
									roll_scroll();
								},5000);
							});
			}());
			
			
	});
	
	
	//私有函数
	//处理贷款数据
	function _validLoan($input){
		var text=CommonFn.trims($input.val()),
		result={
			isloan:false,
			loantip:''
		};
		if(CommonFn.isRequire(text)){
			result.isloan=false;
			result.loantip='贷款金额不能为空';
		}else if(/^[0-9]{0,}$/g.test(text)){
			if(parseInt(text)<=200000){
				if(parseInt(text)<10000){
					result.isloan=false;
					result.loantip='贷款金额必须大于1万';
				}else{
					result.isloan=true;
					result.loantip='';
				}
			}else{
				result.isloan=false;
				result.loantip='贷款金额必须小于20万';
			}
		}else{
			result.isloan=false;
			result.loantip='贷款金额必须为整数';
		}
		return result;
	}
	
	
	//处理贷款计算
	function _doLoan(obj){
			var DAY = 30,
			loan_money = parseInt(obj.money.val(),10),
			loan_rate = 0.625/100,
			loan_cycle = parseInt(obj.cycle.val()),
			loan_result = 0,
			loan_tatal = 0;
			

		if(loan_cycle == 3) {//免息
			loan_discount_rate = 0;
		} else if(loan_cycle == 6) {
			loan_discount_rate = loan_rate*0.5;
		} else if(loan_cycle == 12) {
			loan_discount_rate = loan_rate*0.5;
		} else {
			loan_discount_rate = loan_rate;
		}
		
		loan_result = loan_money/loan_cycle+loan_money*loan_discount_rate;
		loan_tatal = loan_result*loan_cycle;
		obj.show_money.html(loan_money);
		obj.show_cycle.html(loan_cycle);
		obj.show_month.html(loan_result.toFixed(2));
		obj.show_result.html(loan_tatal.toFixed(2));
	}
	
});
