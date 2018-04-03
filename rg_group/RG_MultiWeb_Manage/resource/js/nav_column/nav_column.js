/*配置依赖*/
require.config({
	baseUrl:'../../resource/js',
	paths:{
		'jquery':'lib/jquery.min',
		'dialog':'plugins/artdialog/dialog',
		'validform':'plugins/validform',
		'column':'nav_column/nav_columnobj',
		'common':'common/common'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'column':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery']
		}
	}
});



	

/*程序入口*/
require(['jquery','dialog','validform','column','common'], function($,undefined,undefined,Column,undefined) {
	$(function() {
			/*页面元素引用*/
			var $mobile_view=$('#mobile_view'),
					$column_menu=$('#column_menu'),
					$radio_plugin=$('#radio_plugin'),
					$column_add=$('#column_add'),
					$radio_plugin=$('#radio_plugin')
					$checkbox_plugin1=$('#checkbox_plugin1'),
					$column_form=$('#column_form'),
					$columnsave=$('#columnsave'),
					$selectimg_btn=$('#selectimg_btn'),
					$selectimg_wrap=$('#selectimg_wrap');
					
					
			var $columnname=$('#columnname'),
					$columnstate=$('#columnstate'),
					$columnindex=$('#columnindex'),
					$columnid=$('#columnid'),
					$columntype=$('#columntype'),
					$columnlink=$('#columnlink'),
					$columnrongge=$('#columnrongge'),
					$columnthumbnail=$('#columnthumbnail'),
					$columninfo=$('#columninfo');
					
			var $validobj,
					formparam={
						columnname:$columnname,
						columnstate:$columnstate,
						columnindex:$columnindex,
						columnid:$columnid,
						columntype:$columntype,
						columnlink:$columnlink,
						columnrongge:$columnrongge,
						columnthumbnail:$columnthumbnail,
						columninfo:$columninfo
					},
					initobj={
						mobile_view:$mobile_view,
						column_menu:$column_menu,
						column_add:$column_add
					};
			
			/*初始化查询*/
			Column.init(initobj);
					
			/*操作手机预览面板(栏目高亮、删除)*/
			$mobile_view.on('click',function(e){
				Column.mobileHandler(e,$column_menu);
			}).delegate('div','mouseenter mouseleave',function(e){
					var $this=$(this),$span=$this.find('span');
					if(e.type=='mouseenter'){
						$span.animate({
							'bottom':0
						},200);
					}else if(e.type=='mouseleave'){
						$span.animate({
							'bottom':-20
						},200);
					}
			});
			
			
			/*操作栏目按钮(添加)*/
			$column_add.click(function(){
					/*执行默认选项*/
					Column.addColumnData($column_form,$column_menu,$mobile_view,$(this));
			});
			
			
			/*操作栏目按钮(切换已选)*/
			$column_menu.delegate('li','click',function(){
				  var $this=$(this);
					/*查询并设置表单值*/
					Column.menuHandler($this,formparam);	
			});
			
			
			/*radio选中*/
			$radio_plugin.delegate('li','click',function(){
					Column.radioHandler(this);
			});
			
			/*check选中*/
			$('#checkbox_plugin1,#checkbox_plugin2').delegate('li','click',function(){
					Column.checkboxHandler(this);
			});
			
			
			/*图片选择*/
			$selectimg_btn.click(function(){
					$selectimg_wrap.toggle();
			});
			$selectimg_wrap.click(function(e){
					var current=e.target,
							node=current.nodeName.toLowerCase(),
							cid=current.id;
					if(node=='div'&&cid==''){
						$columnthumbnail.val($(current).attr('data-src'));
					}else if(node=='img'){
						$columnthumbnail.val($(current).attr('alt'));
					}
					$selectimg_wrap.hide();
			});
			
			
			
			/*表单校验*/
			var tipobj={
				columnname:'',
				columnid:'',
				columninfo:''
			};
			$validobj=$column_form.Validform({
				ajaxPost: true,
				beforeSubmit: function(curform) {
					/*获取表单值*/
					var formdata=Column.getColumnDate(formparam);
					/*数据保存*/
					Column.saveColumnData(formdata,function(){
							var d=null;
							if(argument[0]){
								d=dialog({
									title:'温馨提示',
									content:'<span class="g-c-blue2">保存成功</span>'
								}).showModal();
								this.updateDefaultData(initobj,formdata);
							}else if(!argument[0]||argument[0]=='error'){
								d=dialog({
									title:'温馨提示',
									content:'<span class="g-c-red2">保存失败</span>'
								}).showModal();
							}
							setTimeout(function(){
								d.close().remove();
							},2000);
					});
					return false;
				},
				tiptype: function(msg,o) { 
					var id=o.obj[0].id,curtype=o.type;
					if(curtype==1||curtype==3){
							if(typeof tipobj[id]==='string'){
									tipobj[id]=dialog({
									content:'<span class="g-c-red2">'+msg+'</span>',
									align:'right'
								});
								tipobj[id].show(document.getElementById(id));
							}else if(typeof tipobj[id]!=='string'){
								tipobj[id].content('<span class="g-c-red2">'+msg+'</span>');
								tipobj[id].show();
							}
					}else if(curtype==2){
							if(typeof tipobj[id]!=='string'){
								tipobj[id].content('<span class="g-c-blue2">校验成功</span>');
								setTimeout(function(){
										tipobj[id].close();
								},1000);
							}
					}
				}
			});
			
			
			/*添加验证规则*/
			$validobj.addRule([{
				ele:$columnname,
				datatype: "*1-20",
				nullmsg: "请填写栏目名称",
				errormsg: "栏目名称在1-20个字符之间",
				sucmsg: ""
			}, {
				ele:$columnid,
				datatype: "n",
				nullmsg: "请填写排序号",
				errormsg: "排序号号码已经存在，请选择其他号码",
				sucmsg: ""
			}, {
				ele:$columninfo,
				datatype: "*",
				nullmsg: "请输入栏目简介信息",
				errormsg: "栏目简介信息不正确",
				sucmsg: ""
			}]);
			

	});
});












