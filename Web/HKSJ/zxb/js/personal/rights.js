/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/manage_common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'cookie':'plugins/cookie',
		'kindeditor':'plugins/kindeditor/kindeditor-all-min'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
				deps:['jquery']
		},
		'datepick':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','rule','commonfn','validform','cookie','common','kindeditor'],
function($,undefined,Rule,CommonFn,undefined,undefined,FileUpload,Common,undefined) {
	$(function() {
		
		
		
			//图片上传
			(function(K){
				var fileupload_btn=K('#fileupload_btn'),
						fileupload_text=K('#fileupload_text');
				
				
				
				var editor = K.editor({
							uploadJson : '地址',		
							imageSizeLimit : "8MB",
							allowFileManager : true
						});
						
						//点击事件
						fileupload_btn.click(function(){
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
			
			
		
		
			//页面元素获取
			var $apply_rightsform=$('#apply_rightsform'),
					$name=$('#name'),
					$process=$('#process'),
					$company=$('#company'),
					$notes=$('#notes'),
					$sub_rights=$('#sub_rights'),
					$sub_rights=$('#sub_rights'),
					$mask_wrap=$('#mask_wrap'),
					$mask_closebtn=$('#mask_closebtn'),
					validobj=null,
					dia=dialog();
			
			
						
			

			//申请维权显示隐藏
			$sub_rights.on('click',function(){
					$mask_wrap.removeClass('g-d-hidei');
			});
			$mask_closebtn.on('click',function(){
					$mask_wrap.addClass('g-d-hidei');
					for(var i in tipobj){
							if(typeof tipobj[i]!=='string'){
								tipobj[i].close();
							}
					}
			});
			
			
			
			//校验规则
			var ruleobj=[{
						ele:$name,
						datatype:"*",
						nullmsg: "项目名称不能为空",
						errormsg: "项目名称信息不正确",
						sucmsg: ""
					},{
							ele:$process,
							datatype:"*",
							nullmsg: "项目进度不能为空",
							errormsg: "项目进信息不正确",
							sucmsg: ""
					},{
							ele:$company,
							datatype:"*",
							nullmsg: "签约公司不能为空",
							errormsg: "签约公司信息不正确",
							sucmsg: ""
					},{
							ele:$notes,
							datatype:"*",
							nullmsg: "具体描述不能为空",
							errormsg: "具体描述信息错误",
							sucmsg: ""
					}];
					
					
			//表单提示对象
			var tipobj={
					name:'',
					process:'',
					company:'',
					notes:''
			};
			
					
			//表单校验
			var issucces=false;
		  validobj=$apply_rightsform.Validform({
					ajaxPost: true,
					datatype:{},
					beforeSubmit: function(curform) {
						
						//合并参数
						var result={};
						result['projectName']=$name.val();
						result['projectProcess']=$process.val();
						result['projectCompany']=$company.val();
						result['projectRemark']=$notes.val();
						
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'../../json/personal/rights.json',
								type:'post',
								dataType:"json",
								data:result,
								success: function(data){
										if(data.action){	
												//to do 
												
																		
												issucces=true;
												dia.content('您的维权申请已<span class="g-c-green1">成功提交</span>，装小宝会尽快安排客服优先为您处理，<br />请保持电话畅通！').show();
										}else{
												issucces=false;
												dia.content('<span class="g-c-red2">您的维权申请失败</span>').show();
										}
								},
								error: function(){
										issucces=false;
										dia.content('<span class="g-c-red2">您的维权申请失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces){
									//关闭窗口
									$mask_closebtn.click();
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
			
			
		
	});
	
	
});

