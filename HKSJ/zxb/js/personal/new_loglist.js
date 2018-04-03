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
		'date97':'plugins/My97DatePicker/WdatePicker',
		'datepick':'widgets/datepick',
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
require(['jquery','dialog','rule','commonfn','validform','cookie','date97','datepick','common','kindeditor'],
function($,undefined,Rule,CommonFn,undefined,undefined,undefined,undefined,Common,undefined) {
	$(function() {
			
			//图片上传
			(function(K){
				var upload_btn=K('#upload_btn');
				
				
				var editor = K.editor({
							uploadJson : '地址',		
							imageSizeLimit : "8MB",
							allowFileManager : true
						});
						
						//点击事件
						upload_btn.click(function(){
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
			var $diary_form=$('#diary_form'),
					$diary_content=$('#diary_content'),
					$stage_tag=$('#stage_tag'),
					$stage=$('#stage'),
					$themelabel_tag1=$('#themelabel_tag1'),
					$themelabel_tag2=$('#themelabel_tag2'),
					$themelabel=$('#themelabel'),
					$createtime=$('#createtime'),
					$upload_btn=$('#upload_btn'),
					validobj=null,
					dia=dialog(),
					curid=Common.getID('loglist_id')||'';
			
			
			//表单提示对象
			var tipobj={
					diary_content:'',
					stage:'',
					themelabel:'',
					createtime:''
			};
			
			
			//初始化设置
			(function(){
					$diary_content.val('');
					$stage.val('');
					$themelabel.val('');
			}());
					
					
			//日历调用
			$.datePick([$createtime],true);
			
			
					
					
			
			
			
			//绑定选中装修阶段
			$stage_tag.delegate('span','click',function(){
					var $this=$(this);
					$stage.val($this.text());
					setTimeout(function(){
						$stage.focusout();
					},5);
					
					$this.addClass('list-tag1active').siblings().removeClass('list-tag1active');
			});
			
			
			//日记标签
			var tabitem=[$themelabel_tag1,$themelabel_tag2];
			for(var i=0;i<2;i++){
					(function(i){
							tabitem[i].delegate('span','click',function(){
									var $this=$(this),
											selector=tabitem[i].selector;
											
									$themelabel.val($this.text());
									setTimeout(function(){
										$themelabel.focusout();
									},5);
									$this.addClass('list-tag2active').siblings().removeClass('list-tag2active');
									if(selector.indexOf('1')!=-1){
											tabitem[1].children().removeClass('list-tag2active');
									}else if(selector.indexOf('2')!=-1){
										tabitem[0].children().removeClass('list-tag2active');
									}
							});
					})(i);
			}
			
			
			
			//校验规则
			var ruleobj=[{
						ele:$diary_content,
						datatype:"*",
						nullmsg: "日志内容不能为空",
						errormsg: "日志内容信息不正确",
						sucmsg: ""
					},{
							ele:$stage,
							datatype:"*",
							nullmsg: "装修阶段还未选择",
							errormsg: "装修阶段信息错误",
							sucmsg: ""
					},{
							ele:$themelabel,
							datatype:"*",
							nullmsg: "日记标签还未选择",
							errormsg: "日记标签信息不正确",
							sucmsg: ""
					},{
							ele:$createtime,
							datatype:"*",
							nullmsg: "日记日期不能为空",
							errormsg: "日记日期信息不正确",
							sucmsg: ""
					}];
					
					
			
			
			
			//表单校验
			var issucces=false;
		  validobj=$diary_form.Validform({
					ajaxPost: true,
					datatype:{},
					beforeSubmit: function(curform) {
						
						//合并参数
						var result={};
						result['id']=curid;
						result['diaryContents']=$diary_content.val();
						result['stage']=$stage.val();
						result['themelabel']=$themelabel.val();
						result['createtime']=$createtime.val();
							
							
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'../../json/personal/loglist.json',
								type:'post',
								dataType:"json",
								data:result,
								async:false,
								success: function(data){
										if(data.action){	
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
									if(id=='stage'){
											tipobj[id].show(document.getElementById('stage_tag'));
									}else if(id=='themelabel'){
											tipobj[id].show(document.getElementById('themelabel_tag1'));
									}else{
											tipobj[id].show(document.getElementById(id));
									}
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
