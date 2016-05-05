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
		'date97':'plugins/My97DatePicker/WdatePicker',
		'datepick':'widgets/datepick',
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
				deps:['jquery']
		},
		'datepick':{
			deps:['jquery','date97']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','date97','rule','commonfn','validform','cookie','datepick','common'],
function($,undefined,undefined,Rule,CommonFn,undefined,undefined,undefined,Common) {
	$(function() {
		
			//页面元素获取
			var $register_infoform=$('#register_infoform'),
					$companyname=$('#companyname'),
					$companytype=$('#companytype'),
					$companyaddress=$('#companyaddress'),
					$companycapital=$('#companycapital'),
					$companytime=$('#companytime'),
					$companycreate=$('#companycreate'),
					$companyregister=$('#companyregister'),
					$companyserve=$('#companyserve'),
					$companycheck=$('#companycheck'),
					$companyno=$('#companyno'),
					$companylaw=$('#companylaw'),
					$info_editbtn=$('#info_editbtn'),
					$save_btn=$('#save_btn'),
					validobj=null,
					dia=dialog();
			
		
		//编辑组序列	
		var info_items=[$companyname,$companytype,$companyaddress,$companycapital,$companytime,$companycreate,$companyregister,$companyserve,$companycheck,$companyno,$companylaw];
		
		
			
			//时间日历对象调用
			$.datePick([$companytime]);
			$.datePick([$companycreate],true);
			$.datePick([$companycheck]);
			
			
			
			//校验规则
			var ruleobj=[{
						ele:$companyname,
						datatype:"*",
						nullmsg: "公司名称不能为空",
						errormsg: "公司名称信息不正确",
						sucmsg: ""
					},{
							ele:companytype,
							datatype:"*",
							nullmsg: "企业类型不能为空",
							errormsg: "企业类型信息不正确",
							sucmsg: ""
					},{
							ele:$companyaddress,
							datatype:"*",
							nullmsg: "注册地址不能为空",
							errormsg: "注册地址信息不正确",
							sucmsg: ""
					},{
							ele:$companycapital,
							datatype:"n1-8",
							nullmsg: "注册资金不能为空",
							errormsg: "注册资金只能为数字",
							sucmsg: ""
					},{
							ele:$companytime,
							datatype:"*",
							nullmsg: "营业期限不能为空",
							errormsg: "营业期限信息不正确",
							sucmsg: ""
					},{
							ele:$companyregister,
							datatype:"*",
							nullmsg: "登记机关不能为空",
							errormsg: "登记机关信息不正确",
							sucmsg: ""
					},{
							ele:$companyserve,
							datatype:"*",
							nullmsg: "营业范围不能为空",
							errormsg: "营业范围信息不正确",
							sucmsg: ""
					},{
							ele:$companycheck,
							datatype:"*",
							nullmsg: "年检时间不能为空",
							errormsg: "年检时间信息不正确",
							sucmsg: ""
					},{
							ele:$companyno,
							datatype:"*",
							nullmsg: "注册号不能为空",
							errormsg: "注册号信息不正确",
							sucmsg: ""
					},{
							ele:$companylaw,
							datatype:"*",
							nullmsg: "法定代表人不能为空",
							errormsg: "法定代表人信息不正确",
							sucmsg: ""
					}];
					
					
			//表单提示对象
			var tipobj={
					companyname:'',
					companytype:'',
					companyaddress:'',
					companycapital:'',
					companytime:'',
					companycreate:'',
					companyregister:'',
					companyserve:'',
					companycheck:'',
					companyno:'',
					companylaw:''
			};
			
					
			//表单校验
			var issucces=false;
		  validobj=$register_infoform.Validform({
					ajaxPost: true,
					datatype:{},
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
												//to do 
												
																		
												issucces=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
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
								window.location.reload();
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
				}else if($info_editbtn.text().indexOf('查看')!=-1){
						$save_btn.removeClass('g-d-hidei');
				}
				return false;
		});
			
			
			

			
			
			
	});
});
