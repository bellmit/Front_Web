define('common',['jquery'],function($){
		var res={};
		
		//菜单初始化
		(function(){
				var $mainmenu=$('#mainmenu'),
				$mainbtn=$('#mainbtn'),
				winpath=window.location.pathname.split('/'),
				i=0,
				parts=[],
				page='',
				len=winpath.length,
				part='',
				current='',
				$mainitem=$mainmenu.find('li'),
				itemsize=$mainitem.length;
				
				//主导航展现
				$mainbtn.on('click',function(){
						$mainmenu.toggle();
				});
				
				$(window).resize(function(){
						var $this=$(this),
						winwidth=$this.width();
						if(winwidth>640&&$mainmenu.css('display')=='none'){
								$mainmenu.show();
						}
				});
				
				//主导航高亮
				if(len!=0){
					var tempcurrent=winpath[len-1];
					if(tempcurrent.indexOf('.')!=-1){
						tempcurrent=tempcurrent.split('.');
						page=tempcurrent[0];
					}else{
						page=tempcurrent;
					}
					for(i;i<len;i++){
							if(winpath[i]==''){
									winpath.splice(i,1);
									len=winpath.length;
							}
							if(winpath[i].indexOf('.')!=-1){
									current=winpath[i];
									winpath.splice(i,1);
									len=winpath.length;
							}
					}
					part=winpath[len-1];
					$mainitem.each(function(index, element) {
							var $this=$(this),
									$a=$this.find('a'),
									data_part=$a.attr('data-part');
									if(data_part==part){
											$this.addClass('menu-active');
											return false;
									}
									data_part==undefined?parts.push(0):parts.push(data_part);
					});
					if(parts.length==itemsize&&$.inArray(parts)==-1){
							$mainitem.eq(0).addClass('menu-active');
					}
					//最终数据
					res['parts']=parts;
					res['page']=page;
					res['part']=part;
				}else{
					part='';
					$mainitem.eq(0).addClass('menu-active');
					//最终数据
					res['parts']=parts;
					res['page']=page;
					res['part']=part;
				}

		}());
		
		
		//绑定头部查询
		$('#searchbtn').queryListData([$('#searchtxt')],2000,function(sparam){
				//开发时开启下部代码
				//其中sparam 可作为参数
				console.log(sparam);
				$.ajax({
						url:'请求地址',
						type:'post',
						dataType:"json",
						data:'相关请求参数',
						success: function(data){
								if(data){
										//to do
										//放结果集
								}else{
										//to do
										//放结果集
								}
						},
						error: function(){
								//to do
								//放结果集
						}
				});
		});
		
		
		//头部登录、注册时间绑定
		$(function(){
				//页面元素引用
				var $header_loginbtn=$('#header_loginbtn'),
						$header_loginwrap=$('#header_loginwrap'),
						$header_logintab=$('#header_logintab'),
						$header_loginform=$('#header_loginform'),
						$header_registerbtn=$('#header_registerbtn'),
						$header_registerwrap=$('#header_registerwrap'),
						$header_registertab=$('#header_registertab'),
						$header_registerform=$('#header_registerform');
						
						
				//表单元素
				var $login_storeform=$('#login_storeform'),
						$login_storeusername=$('#login_storeusername'),
						$login_storepassword=$('#login_storepassword'),
						$login_storevalidcode=$('#login_storevalidcode'),
						$login_storeobj=null;
						
				var	$login_memberform=$('#login_memberform'),
						$login_memberusername=$('#login_memberusername'),
						$login_memberpassword=$('#login_memberpassword'),
						$login_membervalidcode=$('#login_membervalidcode'),
						$login_memberobj=null;
				
				var $register_storeform=$('#register_storeform'),
						$register_storeusername=$('#register_storeusername'),
						$register_storepassword=$('#register_storepassword'),
						$register_storevalidcode=$('#register_storevalidcode'),
						$register_storeobj=null;
						
				var	$register_memberform=$('#register_memberform'),
						$register_memberusername=$('#register_memberusername'),
						$register_memberpassword=$('#register_memberpassword'),
						$register_membervalidcode=$('#register_membervalidcode'),
						$register_memberobj=null;	
				

				//校验规则
				var login_storerule=[{
							ele:$login_storeusername,
							datatype: "*",
							nullmsg: "专卖店登录用户名不能为空",
							errormsg: "专卖店登录用户名信息不正确",
							sucmsg: ""
						},{
							ele:$login_storepassword,
							datatype: "*8-16",
							nullmsg: "专卖店登录密码不能为空",
							errormsg: "专卖店登录密码必须是8-16字符",
							sucmsg: ""
						},{
							ele:$login_storevalidcode,
							datatype: "*",
							nullmsg: "专卖店登录验证码不能为空",
							errormsg: "专卖店登录验证码不正确",
							sucmsg: ""
						}],
						login_memberrule=[{
							ele:$login_memberusername,
							datatype: "*",
							nullmsg: "会员登录用户名不能为空",
							errormsg: "会员登录用户名信息不正确",
							sucmsg: ""
						},{
							ele:$login_memberpassword,
							datatype: "*8-16",
							nullmsg: "会员登录密码不能为空",
							errormsg: "会员登录密码必须是8-16字符",
							sucmsg: ""
						},{
							ele:$login_membervalidcode,
							datatype: "*",
							nullmsg: "会员登录验证码不能为空",
							errormsg: "会员登录验证码不正确",
							sucmsg: ""
						}],
						register_storerule=[{
							ele:$register_storeusername,
							datatype: "*",
							nullmsg: "专卖店注册用户名不能为空",
							errormsg: "专卖店注册用户名信息不正确",
							sucmsg: ""
						},{
							ele:$register_storepassword,
							datatype: "*8-16",
							nullmsg: "专卖店注册密码不能为空",
							errormsg: "专卖店注册密码必须是8-16字符",
							sucmsg: ""
						},{
							ele:$register_storevalidcode,
							datatype: "*",
							nullmsg: "专卖店注册验证码不能为空",
							errormsg: "专卖店注册验证码不正确",
							sucmsg: ""
						}],
						register_memberrule=[{
							ele:$register_memberusername,
							datatype: "*",
							nullmsg: "会员注册用户名不能为空",
							errormsg: "会员注册用户名信息不正确",
							sucmsg: ""
						},{
							ele:$register_memberpassword,
							datatype: "*8-16",
							nullmsg: "会员注册密码不能为空",
							errormsg: "会员注册密码必须是8-16字符",
							sucmsg: ""
						},{
							ele:$register_membervalidcode,
							datatype: "*",
							nullmsg: "会员注册验证码不能为空",
							errormsg: "会员注册验证码不正确",
							sucmsg: ""
						}];
						
						
				//表单验证序列
				var formitemlist=[
				[$login_storeusername,$login_storepassword,$login_storevalidcode],
				[$login_memberusername,$login_memberpassword,$login_membervalidcode],
				[$register_storeusername,$register_storepassword,$register_storevalidcode],
				[$register_memberusername,$register_memberpassword,$register_membervalidcode]
				],
						validlist=[$login_storeobj,$login_memberobj,$register_storeobj,$register_memberobj],
						rulelist=[login_storerule,login_memberrule,register_storerule,register_memberrule];
						tipobj=['','','',''];
						
				//登录、注册框显示
				$.each([$header_loginbtn,$header_registerbtn],function(){
						var selector=this.selector;
						
						this.on('click',function(e){
								e.preventDefault();
								if(selector=='#header_loginbtn'){
									$header_loginwrap.removeClass('g-d-hidei');
									$header_registerwrap.addClass('g-d-hidei');
								}else if(selector=='#header_registerbtn'){
									$header_loginwrap.addClass('g-d-hidei');
									$header_registerwrap.removeClass('g-d-hidei');
								}
								return false;
						});
				});
				
				
				//登录注册框切换操作
				$.each([$header_logintab,$header_registertab],function(index,value){
						var selector=this.selector;
						
						this.delegate('li','click',function(){
								var $this=$(this),
										type=$this.attr('data-type');
										
								if(type=='store'||type=='member'){
									var $li=selector=='#header_logintab'?$header_loginform.find('li'):$header_registerform.find('li');
									
									$this.addClass('entrytab-active').siblings().removeClass('entrytab-active');
									$li.each(function(index, element) {
											var $liitem=$(this),
											litype=$liitem.attr('data-type');
											
											if(litype==type){
												 $liitem.removeClass('g-d-hide').siblings().addClass('g-d-hide');
												 return false;
											}
									});	
								}else if(type=='close'){
									$header_loginwrap.addClass('g-d-hidei');
									$header_registerwrap.addClass('g-d-hidei');
									//重置校验规则与样式
									$.each(formitemlist,function(i,v){
											//清除
											$.each(this,function(j,m){
													var $subitem=this;
													$subitem.removeAttr('datatype')
													.removeAttr('nullmsg')
													.removeAttr('errormsg')
													.removeAttr('sucmsg');
													$subitem.removeClass('Validform_error').parent().next().text('');
											});
											//重置
											validlist[i].addRule(rulelist[i]);
									});
								}
						});
				});
				
				
				//登录、注册框绑定校验
				$.each([$login_storeform,$login_memberform,$register_storeform,$register_memberform],function(index,value){
						var selector=this.selector;
						
						validlist[index]=this.Validform({
							ajaxPost: true,
							datatype:{},
							beforeSubmit: function(curform) {
								//selector路由
								var urls='',
								params='';
								if(selector=='#login_storeform'){
									//路由：专卖店登录，注意：此处可以添加不同请求地址，在开发阶段
									//to do
									
									urls='请填充请求地址1';
									params='请填充请求参数1';
								}else if(selector=='#login_memberform'){
									//路由：会员登录，注意：此处可以添加不同请求地址，在开发阶段
									//to do
									
									urls='请填充请求地址2';
									params='请填充请求参数2';
								}else if(selector=='#register_storeform'){
									//路由：专卖店注册，注意：此处可以添加不同请求地址，在开发阶段
									//to do
									
									urls='请填充请求地址3';
									params='请填充请求参数3';
								}else if(selector=='#register_memberform'){
									//路由：会员登录，注意：此处可以添加不同请求地址，在开发阶段
									//to do
									
									urls='请填充请求地址4';
									params='请填充请求参数4';
								}

								if(typeof tipobj[index]==='string'){
									tipobj[index]=dialog({title:'温馨提示',cancel:false,width:200,content:''});
								}
								var issucces=false;
								$.ajax({
										url:urls,
										type:'post',
										dataType:"json",
										data:params,
										success: function(data){
												if(data){	
														tipobj[index].content('<span class="g-c-cyan1">保存成功</span>').show();
														issucces=true;
												}else{
														tipobj[index].content('<span class="g-c-red4">保存失败</span>').show();
														issucces=false;
												}
										},
										error: function(){
												tipobj[index].content('<span class="g-c-red4">保存失败</span>').show();
												issucces=false;
										}
								});
								setTimeout(function(){
									tipobj[index].close();
									if(issucces){
										/*to do*/
										//开发阶段请填充跳转地址或者其他业务逻辑
										
									}
								},3000);
								return false;
							},
							tiptype: function(msg,o) { 
								var curtype=o.type,
										curitem=o.obj;
								if(curtype==1||curtype==3){
										curitem.parent().next().text(msg);
								}else if(curtype==2){
										curitem.parent().next().text('');
								}
							}
					});
					//添加规则
					validlist[index].addRule(rulelist[index]);
				});
				
				
				
				
				
		});
		
		
		//侧边栏高亮
		(function(){
				var $quickmenu=$('#quickmenu'),
						part=$quickmenu.attr('data-part');
						
						if(part!==''){
							$quickmenu.find('li').each(function(index, element) {
                	var $this=$(this),
											items=$this.attr('data-part');
									if(items===part){
										$this.addClass('quickmenu-active');
										return true;
									}
              });
						}
				
		}());
		
		
		//to do others
		
		return res;
});







