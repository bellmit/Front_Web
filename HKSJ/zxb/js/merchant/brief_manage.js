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
		'kindeditor':'plugins/kindeditor/kindeditor-all-min'
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
require(['jquery','dialog','rule','commonfn','validform','cookie','common','kindeditor'],
function($,undefined,Rule,CommonFn,undefined,undefined,Common,undefined) {
	$(function() {
		
			//图片上传
			(function(K){
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
		
		
			//页面元素获取
			var $brief_manage_form=$('#brief_manage_form'),
					$remark=$('#remark'),
					$companysize=$('#companysize'),
					$customerserve=$('#customerserve'),
					$surveyroom=$('#surveyroom'),
					$earlybudget=$('#earlybudget'),
					$laterdesign=$('#laterdesign'),
					$laterbudget=$('#laterbudget'),
					$stuffquality=$('#stuffquality'),
					$companyrule=$('#companyrule'),
					$featureserve=$('#featureserve'),
					$servearea=$('#servearea'),
					$serveitem=$('#serveitem'),
					$price=$('#price'),
					$style=$('#style'),
					$info_editbtn=$('#info_editbtn'),
					$detail_editbtn=$('#detail_editbtn'),
					$serve_editbtn=$('#serve_editbtn'),
					$save_btn=$('#save_btn'),
					validobj=null,
					dia=dialog();
			
		
		//编辑组序列	
		var editbtn_items=[$info_editbtn,$detail_editbtn,$serve_editbtn],
				info_items=[$remark],
				detail_items=[$companysize,$customerserve,$surveyroom,$earlybudget,$laterdesign,$laterbudget,$stuffquality,$companyrule,$featureserve],
				serve_items=[$servearea,$serveitem,$price,$style];
			
			
			
			//校验规则
			var ruleobj=[{
						ele:$companysize,
						datatype:"*",
						nullmsg: "公司规模不能为空",
						errormsg: "公司规模信息不正确",
						sucmsg: ""
					},{
							ele:$surveyroom,
							datatype:"n1-5",
							nullmsg: "初期/设计量房不能为空",
							errormsg: "初期/设计量房只能为数字",
							sucmsg: ""
					},{
							ele:$earlybudget,
							datatype:"n1-8",
							nullmsg: "初期预算/洽谈方式不能为空",
							errormsg: "初期预算/洽谈方式信息不正确",
							sucmsg: ""
					}];
					
					
			//表单提示对象
			var tipobj={
					companysize:'',
					surveyroom:'',
					earlybudget:''
			};
			
					
			//表单校验
			var issucces=false;
		  validobj=$brief_manage_form.Validform({
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
			for(var i=0;i<3;i++){
					(function(index){
							var $items=editbtn_items[index],
									selector=$items.selector,
									formitem;
							if(selector.indexOf('info')!=-1){
									formitem=info_items;
							}else if(selector.indexOf('detail')!=-1){
									formitem=detail_items;
							}else if(selector.indexOf('serve')!=-1){
									formitem=serve_items;
							}
							$items.on('click',function(e){
									e.preventDefault();
									//清空已经存在提示状态
									for(var j in tipobj){
										if(typeof tipobj[j]!='string'){
											tipobj[j].close();
										}
									}
									//判断是否是同一状态
									var len=formitem.length,
											i=0;
									if(formitem[0].hasClass('g-d-hidei')){
										$items.text('查看');
										for(i;i<len;i++){
												formitem[i].removeClass('g-d-hidei').next().addClass('g-d-hidei');
										}
									}else{
										$items.text('编辑');
										for(i;i<len;i++){
												var temptext=formitem[i].val();
												formitem[i].addClass('g-d-hidei').next().text(temptext).removeClass('g-d-hidei');
										}
									}
									//判断当前状态十分是可提交状态
									var m=0,
											n=0;
									for(m;m<3;m++){
										if(editbtn_items[m].text().indexOf('编辑')!=-1){
												$save_btn.addClass('g-d-hidei');
												break;
										}else if(editbtn_items[m].text().indexOf('查看')!=-1){
											n++;
											if(n>=3){
												$save_btn.removeClass('g-d-hidei');
												break;
											}
										}
									}
									return false;
							});
					})(i);
			}
			
			
			

			
			
			
	});
});
