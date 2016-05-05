/*配置依赖*/
require.config({
	baseUrl:'../../js',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/manage_common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'cookie':'plugins/cookie',
		'kindeditor':'plugins/kindeditor/kindeditor-all-min',
		'checkbox_ul':'widgets/checkbox_ul'
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
require(['jquery','dialog','rule','commonfn','validform','cookie','common','kindeditor','checkbox_ul'],
function($,undefined,Rule,CommonFn,undefined,undefined,Common,undefined,CheckBox_UL) {
	$(function() {
		
			//图片上传
			(function(K){
							//图片上传dom引用
							var K_fileupload_btn=K('#fileupload_btn'),
									K_fileupload_text=K('#fileupload_text');

							

							var editor = K.editor({
									uploadJson : '地址',		
									imageSizeLimit : "8MB",
									allowFileManager : true
							});
							
							K_fileupload_btn.click(function(){
										var curobj=K(this);
										editor.loadPlugin('image', function() {
													editor.plugin.imageDialog({
															showRemote : false,
															imageUrl:'',
															clickFn : function(url, title, width, height, border, align) {								
																//上传之前的操作
																editor.hideDialog();
															}
													});
										});
							});
							


				})(KindEditor);
		

				
				//文本标题以及提交按钮dom引用，其他变量
				var $contact_form=$('#contact_form'),
						$companyname=$('#companyname'),
						$address=$('#address'),
						$street=$('#street'),
						$telephone=$('#telephone'),
						$website=$('#website'),
						$info_editbtn=$('#info_editbtn'),
						$coupon_list=$('#coupon_list'),
						validobj=null,
						dia=dialog();
						
			//编辑组序列	
			info_items=[$companyname,$address,$street,$telephone,$website];		
						
				//校验规则
			var ruleobj=[{
						ele:$companyname,
						datatype:"*",
						nullmsg: "公司名称不能为空",
						errormsg: "公司名称信息不正确",
						sucmsg: ""
					},{
							ele:address,
							datatype:"*",
							nullmsg: "地址不能为空",
							errormsg: "地址信息不正确",
							sucmsg: ""
					},{
							ele:$street,
							datatype:"*",
							nullmsg: "街道不能为空",
							errormsg: "街道信息不正确",
							sucmsg: ""
					},{
							ele:$telephone,
							datatype:"selfmobile",
							nullmsg: "手机不能为空",
							errormsg: "手机号码格式不正确",
							sucmsg: ""
					},{
							ele:$website,
							datatype:"url",
							nullmsg: "网址不能为空",
							errormsg: "网址格式不正确",
							sucmsg: ""
					}];
					
					
			//表单提示对象
			var tipobj={
					companyname:'',
					address:'',
					street:'',
					telephone:'',
					website:''
			};
			
			//表单校验
			var issucces=false;
		  validobj=$contact_form.Validform({
					ajaxPost: true,
					datatype:{
						'selfmobile':function(gets,obj,curform,regxp){
								return CommonFn.isMobilePhone(gets);
						}
					},
					beforeSubmit: function(curform) {
						//拼合参数
						var i=0,
								len=info_items.length,
								datas={};
						for(i;i<len;i++){
								var names=info_items[i].attr('name'),
										value=info_items[i].val();
										
								datas[names]=value;
						}
						
						
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'../../json/merchant/contact.json',
								type:'post',
								dataType:"json",
								data:datas,
								success: function(res){
										if(res.action){	
												issucces=true;
												var list=res.contactList;
														if(list){
															
															//判断是新增还是修改
															var checkitem=CheckBox_UL.getCheckBox(),
																	isupdate=false,
																	curid=list['id'],
																	m=0;
																	
															for(m;m<checkitem.length;m++){
																	if(curid==checkitem[m]){
																		isupdate=true;
																		break;
																	}
															}
															
															if(isupdate){
																//更新操作
																checkitem[m].parent().html('<input name="id" data-state="1" value="'+list['id']+'" type="checkbox"><p>'+list['companyName']+'</p><span>'+list['createTime']+'</span>');
																dia.content('<span class="g-c-green1">更新成功</span>').show();
															}else{
																//新增操作
																$('<li><input name="id" data-state="1" value="'+list['id']+'" type="checkbox"><p>'+list['companyName']+'</p><span>'+list['createTime']+'</span></li>').appendTo($coupon_list);
																dia.content('<span class="g-c-green1">保存成功</span>').show();
															}
															
														}
										}else{
												issucces=false;
												dia.content('<span class="g-c-red2">保存失败</span>').show();
										}
								},
								error: function(){
										issucces=false;
										dia.content('<span class="g-c-red2">保存失败</span>').show();
								}
						});
						
						
						setTimeout(function(){
							dia.close();
							if(issucces){
								
							}
						},3000);
						return false;
					},
					tiptype:function(msg,o) { 
						var id=o.obj[0].id,
						curtype=o.type;
						if(curtype==1||curtype==3){
								if(typeof tipobj[id]==='string'){
										tipobj[id]=dialog({
										content:'<span class="g-c-red2 g-btips-error">'+msg+'</span>',
										align:'right',
										padding:8
									});
									tipobj[id].show(document.getElementById(id));
								}else if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-red2 g-btips-error">'+msg+'</span>');
									tipobj[id].show();
								}
						}else if(curtype==2){
								if(typeof tipobj[id]!=='string'){
									tipobj[id].content('<span class="g-c-green1 g-btips-succ"></span>');
									setTimeout(function(){
											tipobj[id].close();
									},1000);
								}
						}
					}
			});
			validobj.addRule(ruleobj);
			

			
			//切换编辑状态
			$info_editbtn.on('click',function(e){
				e.preventDefault();
				//清空已经存在提示状态
				for(var j in tipobj){
					if(typeof tipobj[j]!='string'){
						tipobj[j].close();
					}
				}
				//判断是否是同一状态
				var len=info_items.length,
						i=0;
				if(info_items[0].hasClass('g-d-hidei')){
					$info_editbtn.text('查看');
					for(i;i<len;i++){
							info_items[i].removeClass('g-d-hidei').next().addClass('g-d-hidei');
					}
				}else{
					$info_editbtn.text('编辑');
					for(i;i<len;i++){
							var temptext=info_items[i].val();
							info_items[i].addClass('g-d-hidei').next().text(temptext).removeClass('g-d-hidei');
					}
				}
				//判断当前状态十分是可提交状态
				if($info_editbtn.text().indexOf('编辑')!=-1){
						$save_btn.addClass('g-d-hidei');
						$add_btn.addClass('g-d-hidei');
				}else if($info_editbtn.text().indexOf('查看')!=-1){
						$save_btn.removeClass('g-d-hidei');
						$add_btn.removeClass('g-d-hidei');
				}
				return false;
		});
		
			
			
			
			
			//多选框事件绑定
			//初始化
			CheckBox_UL.init($coupon_list);
			//绑定单个选中与取消
			$coupon_list.delegate('li>input:checkbox', 'click', function () {
					CheckBox_UL.inputCheck($(this));
					
					var datas=CheckBox_UL.getCheckBox();
							len=datas.length,
							itemlen=info_items.length,
							i=0;
							
					if(len==0){
						//清空数据
						for(i;i<itemlen;i++){
							info_items[i].val('');
						}
					}else{
						if(len>1){
							dia.content('<span class="g-c-red2 g-btips-warn">修改不支持"批量操作"！</span>').show();
							setTimeout(function(){
								dia.close();
							},3000);
						}
						
						//获取第一条数据id，并发送请求
						$.ajax({
								url:'../../json/merchant/contact.json',
								type:'post',
								dataType:"json",
								data:'id='+datas[0],
								success: function(res){
										if(res.action){	
												var list=res.contactList;
														if(list){
															//设置值
															for(i;i<itemlen;i++){
																var names=info_items[i].attr('name');
																	info_items[i].val(list[names]).removeClass('Validform_error');
															}
															//清空已经存在提示状态
															for(var j in tipobj){
																if(typeof tipobj[j]!='string'){
																	tipobj[j].close();
																}
															}
														}
										}
								},
								error: function(){
								}
						});
					}
					
					

			});
		
			
			
	});
});
