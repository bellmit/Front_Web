/*程序入口*/
(function($,w){
	$(function() {
			//自定义插件
			var $radio_state=$('#radio_state'),
					$checkbox_index=$('#checkbox_index'),
					$selectimg_btn=$('#selectimg_btn'),
					$selectimg_wrap=$('#selectimg_wrap');
					
			//隐藏元素
			var $columnhide1=$('#columnhide1'),
				$columnhide2=$('#columnhide2'),
				$columnhide3=$('#columnhide3'),
				$columnhide4=$('#columnhide4');
			
			//表单元素
			var $columnaction=$('#columnaction'),
					$columnsubmit=$('#columnsubmit'),
					$columnid=$('#columnid'),
					$columnname=$('#columnname'),
					$columnstate=$('#columnstate'),
					$columnindex=$('#columnindex'),
					$columnorder=$('#columnorder'),
					$columntype=$('#columntype'),
					$columnrongge=$('#columnrongge'),
					$rgcolumnid=$('#rgcolumnid'),
					$columnphone=$('#columnphone'),
					$columnthumbnail=$('#columnthumbnail'),
					$columninfo=$('#columninfo');
			
			
			
			//设置校验配置对象
			var selectrules=[
				{selector:$rgcolumnid},
				{
					require:function(str){return ValidFn.isRequire(str)},
					selfrule:function($selector){
						return $selector.html()=='请选择栏目'?false:true;
					},
					no:'请选择需要关联的栏目',
					yes:''
				}
			],
			phonerules=[
				{selector:$columnphone},
				{
					require:function(str){return ValidFn.isRequire(str)},
					no:'手机号码不能为空',
					yes:''
				},
				{
					rule:function(str){return ValidFn.isMobilePhone(str)},
					no:'手机号码格式不合法',
					yes:''
				}
			];
			//设置校验配置对象
			var rules=[
			[
				{selector:$columnname},
				{
					require:function(str){return ValidFn.isRequire(str)},
					no:'用户名不能为空',
					yes:''
				}
			],
			[
				{selector:$columnstate},
				{
					require:function(str){return ValidFn.isRequire(str)},
					no:'栏目状态没有选择',
					yes:''
				}
			],
			[
				{selector:$columnthumbnail},
				{
					require:function(str){return ValidFn.isRequire(str)},
					no:'缩略图没有选择',
					yes:''
				}
			],
			[
				{selector:$columninfo},
				{
					require:function(str){return ValidFn.isRequire(str)},
					no:'栏目简介不能为空',
					yes:''
				}
			],
			selectrules
			];
			
			
			
			//设置校验全局对象           
			$.setValidtorSet({
				isajax:true
			});
			
			
			
			//单选框选择事件加载（栏目状态）
			$radio_state.radio($columnstate);
			
			//多选框选择事件加载(是否作为首页栏目)	
			$checkbox_index.checkbox($columnindex);
			
			//图像选择事件绑定
			$selectimg_btn.selectImgBtn();
			$selectimg_wrap.selectImgSel($columnthumbnail);
			
			//选择文章列表(单篇文章)或一键拨号时需要校验相关规则
			$columntype.phoneSelect({
				arr:rules,
				phonerules:phonerules,
				selectrules:selectrules,
				node1:$columnhide1,
				node2:$columnhide2,
				node3:$columnhide3,
				node4:$columnhide4
			});
			
			
			//表单校验
			$columnsubmit.on($.EventName.click,function(e){
				e.preventDefault();
				$.Validator($columnaction,rules);
				return false;
			});
			
			//定义表单提交时的回调函数
			$.ValidCallBack=function(flag){
					if(flag){
						//ajax 提交
						var saveUrl = '';
						if($columnid.val()!=''){
							//导航栏目id存在则是编辑，不存在则新建
							saveUrl = APP_SITE_URL + "/index.php?act=admin_category&op=edit";
						}else{
							saveUrl = APP_SITE_URL + "/index.php?act=admin_category&op=add";
						}
						$.ajax({
							url: saveUrl,
							async:true,
							type: 'post',
							dataType: "json",
							data: formdata,
							success: function (resp) {
								if (resp.tip_code==1) {
									$.modal({
										content:'添加成功',
										okfn:function(){
											window.location.href="nav_column_manage.html";
										}
									},1);
								} else {
									$.modal({
										content:'添加失败',
										okfn:function(){}
									},1);
								}
							},
							error: function () {
								$.modal({
									content:'添加失败,请检查数据是否填写正确！',
									okfn:function(){}
								},1);
							}
						});
						
					}else{
						//表单提交
						$columnaction.submit();
					}
			}



		});
})(Zepto,window);

