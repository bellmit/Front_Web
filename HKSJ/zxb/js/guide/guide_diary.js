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
		'gallery_query':'widgets/gallery_query',
		'pagination':'plugins/pagination.min',
		'cookie':'plugins/cookie',
		'city_select':'widgets/city_select',
		'modal_dialog':'widgets/modal_dialog'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'pagination':{
				deps:['jquery']
		},
		'validform':{
			deps:['jquery']
		}
		
	}
});


/*程序入口*/
require(['jquery','dialog','rule','commonfn','validform','city_select','modal_dialog','gallery_query','pagination','cookie','common'],function($,undefined,Rule,CommonFn,undefined,City_Select,Modal_Dialog,GalleryQuery,Pagination,undefined,Common) {
	$(function() {
			//页面元素获取
			var $query_result=$('#query_result'),
					$queryitem_housetype=$('#queryitem_housetype'),
					$queryitem_area=$('#queryitem_area'),
					$queryitem_style=$('#queryitem_style'),
					$queryitem_budget=$('#queryitem_budget'),
					$query_listwrap=$('#query_listwrap'),
					$query_pagewrap=$('#query_pagewrap'),
					$case_form=$('#case_form'),	
					$miniportal_form=$('#miniportal_form'),
					$customarea=$('#customarea'),
					$custommobile=$('#custommobile'),
					$customcity=$('#customcity'),
					$customprovince=$('#customprovince'),
					$customprovince_text=$('#customprovince_text'),
					$customcity_text=$('#customcity_text'),
					dia=dialog({
							cancel:false
					}),
					validobj=null;
					
					
					//校验规则
			var ruleobj=[{
						ele:$customarea,
						datatype:"*",
						nullmsg: "建筑面积不能为空",
						errormsg: "建筑面积信息不正确",
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
					
					
					
			
			//需加载的文本模板
			var	htmltemplate=
			'<li class="$wrapclass">'+
			'	<a data-id="$id" class="case-griditem1" href="$href">'+
			'		<img src="$url" alt="">'+
			'	</a>'+
			'	<div class="case-griditem2">'+
			'		<h3>$name</h3>'+
			'		<div>'+
			'			<span>$housetype</span>'+
			'			<span>$style</span>'+
			'			<span>$aream<sup>2</sup></span>'+
			'			<span>预算：<em>$budget万元</em></span>'+
			'		</div>'+
			'	</div>'+
			'	<div class="case-griditem3">'+
			'		<div>'+
			'			<img src="$desHeadPortraitUrl" alt="">'+
			'		</div>'+
			'		<p>$decName--$desName</p>'+
			'		<a href="$greathref" class="good"><em></em>$greatNumber</span>'+
			'		<a href="$answerNumberhref" class="comment"><em></em>$answerNumber</a>'+
			'	</div>'+
			'</li>';
			
			
			
			//表单省份和城市选择
			City_Select.areaSelect({
					$province:$customprovince,
					$city:$customcity,
					$area:null
			});
			
					

			//联合查询
			GalleryQuery.queryItem({
						numberwrap:$query_result,
						listwrap:$query_listwrap,
						pagewrap:$query_pagewrap,
						cookie:'case_params',
						itemwrap:{
							'houseType':$queryitem_housetype,
							'area':$queryitem_area,
							'style':$queryitem_style,
							'budget':$queryitem_budget
						}						
			},function(opt,flag){
					//执行异步查询操作
					
					var isdata=_handler(opt,htmltemplate);
					
					if(isdata){
						//分页调用
						$query_pagewrap.pagination({
							pageSize:opt.pageSize,
							total:opt.total,
							pageNumber:opt.pageNum,
							onSelectPage:function(pageNumber,pageSize){
									opt.pageSize=pageSize;
									opt.pageNum=pageNumber;
									_handler(opt,htmltemplate);
							}
						});
						
					}else{
						opt.total=0;
						opt.pageNum=1;
						opt.pagewrap.html('');
					}
			});
			
			
			
			
			
			
			//表单验证1
			var issucces=false;
		  validobj=$miniportal_form.Validform({
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
								if(cid=='customprovince_text'){
									curitem.parent().next().next().text(msg);
								}else if(cid=='customcity_text1'){
									curitem.parent().next().text(msg);
								}else{
									curitem.parent().next().text(msg);
								}
						}else if(curtype==2){
								if(cid=='customprovince_text'){
									curitem.parent().next().next().text('');
								}else if(cid=='customcity_text1'){
									curitem.parent().next().text('');
								}else{
									curitem.parent().next().text('');
								}
						}
					}
			});
			validobj.addRule(ruleobj);
			
			
	});

	//私有函数
	function _handler(opt,template){
			var listdata=null,
					htmlstr='',
					resultset=[];
			
			//组合参数
			var params={},
			paramstr='';
			for(var j in opt.itemquery){
					params[j]=opt.itemquery[j];
					paramstr+=j+'='+opt.itemquery[j]+'&';
			}
			params['pagenum']=opt.pageNum;
			paramstr+='pagenum='+opt.pageNum;
	
	
			//开发阶段去掉这个
			return true;
	
	
	
			$.ajax({
					url:'../../json/case.json',
					dataType:"json",
					data:params,
					type:'get',
					async:false,
					success: function(result){
							if(result.total!==0){
								listdata=result.galleryList;	
								opt.total=result.total;
								opt.numberwrap.text(result.total);
								opt.itemparams=paramstr;
							}else{
								opt.listwrap.html('');
								listdata.length=0;
							}
					},
					error:function(){
							opt.listwrap.html('');
							listdata.length=0;
					}
			});
			
			
			//填充模板
			var i=0,
					len=listdata.length;
			if(len===0){
					$listwrap.html('');
					return false;
			}
			for(i;i<len;i++){
				htmlstr=template;
				resultset.push(htmlstr.replace('$wrapclass',function(){
						var j=i+1;
						return j%4===0?'case-layoutitem2':'case-layoutitem1';
				})
				.replace('$id',listdata[i]['id'])
				.replace('$href',listdata[i]['href'])
				.replace('$url',listdata[i]['url'])
				.replace('$name',listdata[i]['name'])
				.replace('$housetype',listdata[i]['housetype'])
				.replace('$style',listdata[i]['style'])
				.replace('$area',listdata[i]['area'])
				.replace('$budget',listdata[i]['budget'])
				.replace('$desHeadPortraitUrl',listdata[i]['desHeadPortraitUrl'])
				.replace('$decName',listdata[i]['decName'])
				.replace('$desName',listdata[i]['desName'])
				.replace('$greathref',listdata[i]['greathref'])
				.replace('$greatNumber',listdata[i]['greatNumber'])
				.replace('$answerNumberhref',listdata[i]['answerNumberhref'])
				.replace('$answerNumber',listdata[i]['answerNumber']));
			}
			
			var $resultset=$(resultset.join(''));
			$resultset.appendTo(opt.listwrap.html(''));
			resultset.length=0;
			return true;
	}
});


