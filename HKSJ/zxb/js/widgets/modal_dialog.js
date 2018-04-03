/*
author:yipin,
name:modal_dialog
模态弹出层
*/

/*
	弹窗类型
	：
	login:登录
	price:报价
	design:设计
	company_success:找公司成功
	info_success:完善资料成功
	apply:免费申请设计
	
	*/
	
define(['jquery','dialog','rule','commonfn','validform','city_select'],function($,undefined,Rule,CommonFn,undefined,City_Select){
   return {
			/*
			初始化
			参数：需要初始化对象池序列[不必须]，回调函数[不必须]
			*/
			modalInit:function(opt){
					this.template={
						'login':$('<h3>账号登录</h3>'+
											'<form method="post" action="#" id="modal_loginform">'+
											'		<div class="item textitem">'+
											'				<input type="text" name="logInName" placeholder="用户名/手机/邮箱" id="modal_loginname">'+
											'		</div>'+
											'		<div class="item tipitem"></div>'+
											'		<div class="item textitem">'+
											'				<input type="password" name="logInPassword" placeholder="密码" id="modal_loginpassword">'+
											'		</div>'+
											'		<div class="item tipitem"></div>'+
											'		<div class="item btnitem">'+
											'				<input value="登录" type="submit">'+
											'   </div>'+
											'</form>'),
						'price':$('<h3>获取报价</h3>'+
											'<form method="post" action="#" id="modal_priceform">'+
											'		<div class="item labeltextitem">'+
											'				<label for="modal_pricename">您的称呼:</label>'+
											'				<input type="text" id="modal_pricename" name="customName">'+
											'		</div>'+
											'		<div class="item labeltipitem"></div>'+
											'		<div class="item labeltextitem">'+
											'				<label for="modal_pricemobile">您的电话:</label>'+
											'				<input maxlength="11" type="text" id="modal_pricemobile" name="customMobile">'+
											'		</div>'+
											'		<div class="item labeltipitem"></div>'+
											'		<div class="item label-mnselect">'+
											'				<label>申请城市：</label>'+
											'				<div class="mn-selectitem">'+
											'						<input type="hidden" name="customProvince" id="modal_priceprovincetext" >'+
											'						<p>请选择省份</p><span></span>'+
											'						<ul id="modal_priceprovince"></ul>'+
											'				</div>'+
											'				<div class="mn-selectitem label-mnselect1">'+
											'						<input type="hidden" name="customCity" id="modal_pricecitytext" >'+
											'						<p>请选择城市</p><span></span>'+
											'						<ul id="modal_pricecity"></ul>'+
											'				</div>'+
											'		</div>'+
											'		<div class="item labelbtnitem">'+
											'				<input value="获取报价" type="submit">'+
											'		</div>'+
											'</form>'),
						'design':$('<h3>装修设计</h3>'+
											'<form method="post" action="#" id="modal_designform">'+
											'		<div class="item labeltextitem">'+
											'				<label for="modal_designname">您的称呼:</label>'+
											'				<input type="text" id="modal_designname" name="customName">'+
											'		</div>'+
											'		<div class="item labeltipitem"></div>'+
											'		<div class="item labeltextitem">'+
											'				<label for="modal_designmobile">您的电话:</label>'+
											'				<input maxlength="11" type="text" id="modal_designmobile" name="customMobile">'+
											'		</div>'+
											'		<div class="item labeltipitem"></div>'+
											'		<div class="item label-mnselect">'+
											'				<label>申请城市：</label>'+
											'				<div class="mn-selectitem">'+
											'						<input type="hidden" name="customProvince" id="modal_designprovincetext" >'+
											'						<p>请选择省份</p><span></span>'+
											'						<ul id="modal_designprovince"></ul>'+
											'				</div>'+
											'				<div class="mn-selectitem label-mnselect1">'+
											'						<input type="hidden" name="customCity" id="modal_designcitytext" >'+
											'						<p>请选择城市</p><span></span>'+
											'						<ul id="modal_designcity"></ul>'+
											'				</div>'+
											'		</div>'+
											'		<div class="item labelbtnitem">'+
											'				<input value="免费申请" type="submit">'+
											'		</div>'+
											'</form>'),
	'company_success':$('<h3>恭喜您申请成功</h3>'+
											'<p>由于近期申请火爆，将在一个月内进行"整屋装修"的业务,我们将优先服务,当然您也可以完善资料获取更快的审核服务，感谢您的理解和支持</p>'+
											'<form method="post" action="#" id="modal_companysuccessform">'+
											'		<div class="item labelselectitem">'+
											'				<label for="modal_housetype">房屋类型:</label>'+
											'				<select name="houseType" id="modal_housetype">'+
											'						<option selected value="1">新房装修</option>'+
											'						<option value="2">旧房翻新</option>'+
											'						<option value="3">办公室装修</option>'+
											'						<option value="4">店铺装修</option>'+
											'						<option value="5">餐厅装修</option>'+
											'						<option value="6">酒店装修</option>'+
											'						<option value="7">其他类型</option>'+
											'				</select>'+
											'		</div>'+
											'		<div class="item labeltipitem"></div>'+
											'		<div class="item labeltextitem">'+
											'				<label for="modal_area">装修面积:</label>'+
											'				<input maxlength="5" type="text" placeholder="平米" id="modal_area" name="Area">'+
											'		</div>'+
											'		<div class="item labeltipitem"></div>'+
											'		<div class="item labelselectitem">'+
											'				<label for="modal_budget">装修预算:</label>'+
											'				<select name="Budget" id="modal_budget">'+
											'						<option selected value="1">3万以下</option>'+
											'						<option value="2">3-5万</option>'+
											'						<option value="3">5-8万</option>'+
											'						<option value="4">8-12万</option>'+
											'						<option value="5">12-18万</option>'+
											'						<option value="6">18-25万</option>'+
											'						<option value="7">25-30万</option>'+
											'						<option value="8">30万以上</option>'+
											'				</select>'+
											'		</div>'+
											'		<div class="item labeltipitem"></div>'+
											'		<div class="item labelselectitem">'+
											'				<label for="modal_datetime">装修时间:</label>'+
											'				<select name="DateTime" id="modal_datetime">'+
											'						<option selected value="1">半个月内</option>'+
											'						<option value="2">1个月</option>'+
											'						<option value="3">2个月</option>'+
											'						<option value="4">2个月以上</option>'+
											'				</select>'+
											'		</div>'+
											'		<div class="item labeltipitem"></div>'+
											'		<div class="item labeltextitem">'+
											'				<label for="modal_communityname">楼盘名称:</label>'+
											'				<input placeholder="平米" id="modal_communityname" name="communityName">'+
											'		</div>'+
											'		<div class="item labeltipitem"></div>'+
											'		<div class="item labelbtnitem">'+
											'				<input value="立即提交" type="submit">'+
											'		</div>'+
											'</form>'),
		 'info_success':$('<h3>恭喜您完善资料成功</h3>'+
											'<h4>装小宝将会尽快安排专属装修助理优先为您服务，请保持电话畅通</h4>'+
											'<p>您还可以使用<a href="/HKSJ/jsp/decorate/decorate_bao.html" target="_self">装小宝装修宝</a></p>'+
											'<p>先装修满意后付款<a href="/HKSJ/jsp/company/company_decorate.html" target="_self">&gt;&gt;了解详情</a></p>'),
							'apply':$('<h4>免费提供3份设计报告<br />更多选择，更加实惠</h4>'+
											'<form method="post" action="#" id="modal_applyform">'+
											'		<div class="item textitem">'+
											'				<input type="text" name="applyName" placeholder="您的称呼" id="modal_applyname">'+
											'		</div>'+
											'		<div class="item tipitem"></div>'+
											'		<div class="item textitem">'+
											'				<input maxlength="11" type="text" name="applyMobile" placeholder="手机号码" id="modal_applymobile">'+
											'		</div>'+
											'		<div class="item tipitem"></div>'+
											'		<div class="item btnitem">'+
											'				<input value="立即申请" type="submit">'+
											'		</div>'+
											'</form>')
					};
					this.pool={
						/*登录*/
						'login':'',
						/*报价*/
						'price':'',
						/*设计*/
						'design':'',
						/*找公司成功*/
						'company_success':'',
						/*完善资料成功*/
						'info_success':'',
						/*免费申请设计*/
						'apply':''
					}
					this.fn=null;
					this.initExecute(opt);
			},
			/*
			参数：类型字符串
			初始化执行,
			并绑定相关校验，或下拉菜单事件
			*/
			initExecute:function(opt){
					if(opt){
							var m=0,
									len=opt.length;
							for(m;m<len;m++){
								this.modal(opt[m]);
								this.pool[opt[m]].close();
								this.valid(opt[m]);
							}
					}else{
						for(var i in this.template){
								this.modal(i);
								this.pool[i].close();
								this.valid(i);
						}
					}
					
			},
			/*
			参数：类型字符串
			模板对象校验
			to do 需填充请求地址
			*/
			valid:function(type){
					var self=this;
					switch(type){
						
						//to do
						case 'login':
						
									var $modal_loginform=$('#modal_loginform'),
											$modal_loginname=$('#modal_loginname'),
											$modal_loginpassword=$('#modal_loginpassword'),
											validobj=null;
									
									//规则对象	
									var ruleobj=[{
												ele:$modal_loginname,
												datatype:"selfname",
												nullmsg: "用户名不能为空",
												errormsg: "用户名信息不正确",
												sucmsg: ""
											},{
													ele:$modal_loginpassword,
													datatype:"*4-18",
													nullmsg: "密码不能为空",
													errormsg: "密码长度为4-18位",
													sucmsg: ""
											}];
									
									
									//校验
									validobj=$modal_loginform.Validform({
													ajaxPost: true,
													datatype:{
														'selfname':function(gets,obj,curform,regxp){
																if(CommonFn.isRequire(gets)){
																		return '用户名不能为空';
																}else{
																	if(CommonFn.isUserName(gets)){
																			return true;
																	}else{
																		if(CommonFn.isEMP(gets)){
																				return true;
																		}else{
																				return '用户名是邮箱或手机号或非特殊4-16位字符';
																		}	
																	}
																}
														}
													},
													beforeSubmit: function(curform) {
														/*to do*/
														//send ajax 填充具体业务逻辑
														//开发时开启下部代码
														if(self.fn&&typeof self.fn==='function'){
															self.fn.call(self,{
																type:type,
																loginname:$modal_loginname,
																loginpassword:$modal_loginpassword
															});
														}else{
															//to do
															$.ajax({
																	url:'请求地址',
																	type:'post',
																	dataType:"json",
																	data:'相关请求参数',
																	success: function(data){
																		//to do
																		
																		
																		//关闭窗口
																		self.modalHide();
																	},
																	error: function(){}
															});
															
														}
														return false;
													},
													tiptype: function(msg,o) { 
														var curtype=o.type,
																curitem=o.obj;
														if(curtype==1||curtype==3){
																curitem.parent().next().text(msg);
														}else if(curtype==2){
																curitem.parents().next().text('');
														}
													}
											});
									validobj.addRule(ruleobj);
									
									break;
									
						case 'price':
									var $modal_priceform=$('#modal_priceform'),
											$modal_pricename=$('#modal_pricename'),
											$modal_pricemobile=$('#modal_pricemobile'),
											$modal_priceprovince=$('#modal_priceprovince'),
											$modal_pricecity=$('#modal_pricecity'),
											$modal_priceprovincetext=$('#modal_priceprovincetext'),
											$modal_pricecitytext=$('#modal_pricecitytext'),
											validobj1=null;
											
									//自定义下拉菜单事件监听
									//表单省份和城市选择
									City_Select.areaSelect({
											$province:$modal_priceprovince,
											$city:$modal_pricecity,
											$area:null
									});
									
									//规则对象
									var ruleobj1=[{
												ele:$modal_pricename,
												datatype:"*",
												nullmsg: "姓名不能为空",
												errormsg: "姓名信息不正确",
												sucmsg: ""
											},{
													ele:$modal_pricemobile,
													datatype:"selfmobile",
													nullmsg: "手机不能为空",
													errormsg: "手机号码不正确",
													sucmsg: ""
											}];
									
									
									//校验
									validobj1=$modal_priceform.Validform({
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
												
												if(self.fn&&typeof self.fn==='function'){
													self.fn.call(self,{
														type:type,
														pricename:$modal_pricename,
														pricemobile:$modal_pricemobile,
														priceprovince:$modal_priceprovincetext,
														pricecity:$modal_pricecitytext
													});
												}else{
													//to do
													$.ajax({
															url:'请求地址',
															type:'post',
															dataType:"json",
															data:'相关请求参数',
															success: function(data){
																//to do
																
																//关闭窗口
																self.modalHide();
															},
															error: function(){}
													});
													
												}
												
												return false;
											},
											tiptype: function(msg,o) { 
												var curtype=o.type,
																curitem=o.obj;
														if(curtype==1||curtype==3){
																curitem.parent().next().text(msg);
														}else if(curtype==2){
																curitem.parents().next().text('');
														}
											}
									});
									validobj1.addRule(ruleobj1);
			
									break;
									
									
			case 'design':
									var $modal_designform=$('#modal_designform'),
											$modal_designname=$('#modal_designname'),
											$modal_designmobile=$('#modal_designmobile'),
											$modal_designprovince=$('#modal_designprovince'),
											$modal_designcity=$('#modal_designcity'),
											$modal_designprovincetext=$('#modal_designprovincetext'),
											$modal_designcitytext=$('#modal_designcitytext'),
											validobj2=null;
											
									//自定义下拉菜单事件监听
									//表单省份和城市选择
									City_Select.areaSelect({
											$province:$modal_designprovince,
											$city:$modal_designcity,
											$area:null
									});
									
									//规则对象
									var ruleobj2=[{
												ele:$modal_designname,
												datatype:"*",
												nullmsg: "姓名不能为空",
												errormsg: "姓名信息不正确",
												sucmsg: ""
											},{
													ele:$modal_designmobile,
													datatype:"selfmobile",
													nullmsg: "手机不能为空",
													errormsg: "手机号码不正确",
													sucmsg: ""
											}];
									
									
									//校验
									validobj2=$modal_designform.Validform({
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
												if(self.fn&&typeof self.fn==='function'){
													self.fn.call(self,{
														type:type,
														designname:$modal_designname,
														designmobile:$modal_designmobile,
														designprovince:$modal_designprovincetext,
														designcity:$modal_designcitytext
													});
												}else{
													//to do
													$.ajax({
															url:'请求地址',
															type:'post',
															dataType:"json",
															data:'相关请求参数',
															success: function(data){
																//to do
																
																
																//关闭窗口
																self.modalHide();
															},
															error: function(){}
													});
													
												}
												return false;
											},
											tiptype: function(msg,o) { 
												var curtype=o.type,
																curitem=o.obj;
														if(curtype==1||curtype==3){
																curitem.parent().next().text(msg);
														}else if(curtype==2){
																curitem.parents().next().text('');
														}
											}
									});
									validobj2.addRule(ruleobj2);
			
									break;
									
			case 'company_success':
									var $modal_companysuccessform=$('#modal_companysuccessform'),
											$modal_housetype=$('#modal_housetype'),
											$modal_area=$('#modal_area'),
											$modal_budget=$('#modal_budget'),
											$modal_datetime=$('#modal_datetime'),
											$modal_communityname=$('#modal_communityname'),
											validobj3=null;
											
									
									//规则对象
									var ruleobj3=[{
												ele:$modal_area,
												datatype:"n1-5",
												nullmsg: "装修面积不能为空",
												errormsg: "装修面积只能是1-5位数字",
												sucmsg: ""
											},{
													ele:$modal_communityname,
													datatype:"*",
													nullmsg: "楼盘名称不能为空",
													errormsg: "楼盘名称信息错误",
													sucmsg: ""
											}];
									
									
									//校验
									validobj3=$modal_companysuccessform.Validform({
											ajaxPost: true,
											beforeSubmit: function(curform) {
												/*to do*/
												//send ajax 填充具体业务逻辑
												//开发时开启下部代码
												if(self.fn&&typeof self.fn==='function'){
													self.fn.call(self,{
															type:type,
															housetype:$modal_housetype,
															area:$modal_area,
															budget:$modal_budget,
															datetime:$modal_datetime,
															communityname:$modal_communityname,
													});
												}else{
													//to do
													$.ajax({
															url:'请求地址',
															type:'post',
															dataType:"json",
															data:'相关请求参数',
															success: function(data){
																//to do
																
																
																//关闭窗口
																self.modalHide();
															},
															error: function(){}
													});
													
												}
												
												return false;
											},
											tiptype: function(msg,o) { 
												var curtype=o.type,
																curitem=o.obj;
														if(curtype==1||curtype==3){
																curitem.parent().next().text(msg);
														}else if(curtype==2){
																curitem.parents().next().text('');
														}
											}
									});
									validobj3.addRule(ruleobj3);
			
									break;
									
			case 'apply':
									var $modal_applyform=$('#modal_applyform'),
											$modal_applyname=$('#modal_applyname'),
											$modal_applymobile=$('#modal_applymobile'),
											validobj4=null;
											
									
									//规则对象
									var ruleobj4=[{
												ele:$modal_applyname,
												datatype:"*",
												nullmsg:"姓名不能为空",
												errormsg:"姓名信息错误",
												sucmsg: ""
											},{
													ele:$modal_applymobile,
													datatype:"selfmobile",
													nullmsg:"手机号码不能为空",
													errormsg:"手机号码不符合规范",
													sucmsg: ""
											}];
									
									
									//校验
									validobj4=$modal_applyform.Validform({
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
												if(self.fn&&typeof self.fn==='function'){
													self.fn.call(self,{
															type:type,
															applyname:$modal_applyname,
															applymobile:$modal_applymobile,
													});
												}else{
													//to do
													$.ajax({
															url:'请求地址',
															type:'post',
															dataType:"json",
															data:'相关请求参数',
															success: function(data){
																//to do
																
																
																//关闭窗口
																self.modalHide();
															},
															error: function(){}
													});
													
												}
												return false;
											},
											tiptype: function(msg,o) { 
												var curtype=o.type,
																curitem=o.obj;
														if(curtype==1||curtype==3){
																curitem.parent().next().text(msg);
														}else if(curtype==2){
																curitem.parents().next().text('');
														}
											}
									});
									validobj4.addRule(ruleobj4);
			
									break;
					}
				
			},
			/*
			参数：类型字符串
			判断对象池是否存在数据，如果有返回为true,如果没有返回为fasle,不存在则创建空池对象
			*/
			modalPool:function(type){
				if(typeof this.pool[type]==='string'){
						return false;
				}else if(typeof this.pool[type]==='undefined'){
						this[type]='';
						return false;
				}else{
						return true;
				}
			},
			/*
			参数：类型字符串
			根据类型获取对应模板对象
			*/
			getTemplate:function(type){
					return this.template[type];
			},
			/*
			参数：类型字符串
			初始化渲染弹出框对象，
			并绑定相关事件
			*/
			render:function(type){
					this.dialog=dialog({'padding':5});
					this.$wrap=$('<div class="modal-dialog-wrap"></div>');
					this.$closebtn=$('<div class="modal-dialog-closebtn"><span></span></div>');
					this.$content=$('<div class="modal-dialog-content"></div>');
					//事件绑定
					this.$closebtn.appendTo(this.$wrap);
					this.bindEvent(type);
			},
			/*
			参数：类型字符串
			事件绑定,根据类型绑定不同的校验类型
			*/
			bindEvent:function(type){
					var self=this;
					//绑定关闭事件
					this.$closebtn.on('click',function(){
							self.modalHide(type);
					});
			},
			/*
			参数：类型字符串
			弹出框显示
			*/
			modal:function(type,fn){
				var ispool=this.modalPool(type);
				if(fn&&typeof fn==='function'){
						this.fn=fn;
				}else{
						this.fn=null;
				}
				if(ispool){
						this.pool[type].showModal();
				}else{
						this.render(type);
						this.$content.append(this.template[type]);
						this.$content.appendTo(this.$wrap);
						this.dialog.content(this.$wrap);
						this.pool[type]=this.dialog;
						this.pool[type].showModal();
				}
			},
			/*
			参数：类型字符串
			弹出框隐藏
			*/
			modalHide:function(type){
					this.pool[type].close();
			}
		
	}
});