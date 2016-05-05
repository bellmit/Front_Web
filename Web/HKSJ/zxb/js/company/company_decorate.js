/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/common',
		'gallery_query':'widgets/gallery_query',
		'pagination':'plugins/pagination.min',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'city_select':'widgets/city_select',
		'cookie':'plugins/cookie',
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
					$queryitem_dechousestyle=$('#queryitem_dechousestyle'),
					$queryitem_decarea=$('#queryitem_decarea'),
					$queryitem_decprice=$('#queryitem_decprice'),
					$queryitem_expertisestyle=$('#queryitem_expertisestyle'),
					$queryitem_inarea=$('#queryitem_inarea'),
					$queryitem_more=$('#queryitem_more'),
					$query_orderby=$('#query_orderby'),
					$query_listwrap=$('#query_listwrap'),
					$query_pagewrap=$('#query_pagewrap'),
					$miniportal_form1=$('#miniportal_form1'),
					$miniportal_form2=$('#miniportal_form2'),
					$miniportal_form3=$('#miniportal_form3'),
					$customarea1=$('#customarea1'),
					$customarea3=$('#customarea3'),
					$customcity1=$('#customcity1'),
					$customprovince1=$('#customprovince1'),
					$customprovince_text1=$('#customprovince_text1'),
					$customcity_text1=$('#customcity_text1'),
					$customcity2=$('#customcity2'),
					$customprovince2=$('#customprovince2'),
					$customprovince_text2=$('#customprovince_text2'),
					$customcity_text2=$('#customcity_text2'),
					$customname2=$('#customname2'),
					$custommobile2=$('#custommobile2'),
					$customcity3=$('#customcity3'),
					$customprovince3=$('#customprovince3'),
					$customprovince_text3=$('#customprovince_text3'),
					$customcity_text3=$('#customcity_text3'),
					$mask_hxwrap=$('#mask_hxwrap'),
					$mask_bjwrap=$('#mask_bjwrap'),
					$mask_hxclosebtn=$('#mask_hxclosebtn'),
					$mask_bjclosebtn=$('#mask_bjclosebtn'),
					dia=dialog({
							cancel:false
					}),
					validobj1=null,
					validobj2=null,
					validobj3=null;
					
					
					//校验规则
			var ruleobj1=[{
						ele:$customarea1,
						datatype:"*",
						nullmsg: "建筑面积不能为空",
						errormsg: "建筑面积信息不正确",
						sucmsg: ""
					},{
							ele:$customprovince_text1,
							datatype:"*",
							nullmsg: "所在省市不能为空",
							errormsg: "所在省市信息不正确",
							sucmsg: ""
					},{
							ele:$customcity_text1,
							datatype:"*",
							nullmsg: "所在地区不能为空",
							errormsg: "所在地区信息不正确",
							sucmsg: ""
					}],
					ruleobj2=[{
						ele:$customname2,
						datatype:"*",
						nullmsg: "用户名不能为空",
						errormsg: "用户名信息不正确",
						sucmsg: ""
					},{
						ele:$custommobile2,
						datatype:"selfmobile",
						nullmsg: "手机号码不能为空",
						errormsg: "手机号码格式不正确",
						sucmsg: ""
					},{
							ele:$customprovince_text2,
							datatype:"*",
							nullmsg: "所在省市不能为空",
							errormsg: "所在省市信息不正确",
							sucmsg: ""
					},{
							ele:$customcity_text2,
							datatype:"*",
							nullmsg: "所在地区不能为空",
							errormsg: "所在地区信息不正确",
							sucmsg: ""
					}],
					ruleobj3=[{
						ele:$customarea3,
						datatype:"*",
						nullmsg: "建筑面积不能为空",
						errormsg: "建筑面积信息不正确",
						sucmsg: ""
					},{
							ele:$customprovince_text3,
							datatype:"*",
							nullmsg: "所在省市不能为空",
							errormsg: "所在省市信息不正确",
							sucmsg: ""
					},{
							ele:$customcity_text3,
							datatype:"*",
							nullmsg: "所在地区不能为空",
							errormsg: "所在地区信息不正确",
							sucmsg: ""
					}];
					
			
			//需加载的文本模板
			var	htmltemplate='<li>'+
					'		<a href="$href" data-id="$id" class="company-griditem1">'+
					'			<img src="$url">'+
					'		</a>'+
					'		<dl class="company-griditem2">'+
					'			<dt>$decName</dt>'+
					'			<dd>'+
					'				<div><span></span>营业执照</div>'+
					'				<p><span></span>$decAddress</p>'+
					'				<a data-id="$id" href="$signNumbehref">案例数：<span>$signNumber个</span></a>'+
					'				<a data-id="$id" href="$designerSizehref">设计师：<span>$designerSize个</span></a>'+
					'				<a data-id="$id" href="$commentSizehref">评论：<span>$commentSize条</span></a>'+
					'				<em>本周促销活动：$specialService</em>'+
					'			</dd>'+
					'		</dl>'+
					'		<div class="company-griditem3">'+
					'			<a data-id="$id" href="$wordMouthValuehref">口碑值<span>$wordMouthValue</span></a>'+
					'		</div>'+
					'		<div class="company-griditem4">'+
					'			<div>免费帮我做设计</div>'+
					'			<p>免费帮我出报价</p>'+
					'			<span>已有<i>$look</i>人浏览</span>'+
					'		</div>'+
					'</li>';
					

			//联合查询
			GalleryQuery.queryItem({
						numberwrap:$query_result,
						listwrap:$query_listwrap,
						orderbywrap:$query_orderby,
						pagewrap:$query_pagewrap,
						itemmore:$queryitem_more,
						pageSize:10,
						cookie:'company_params',
						itemwrap:{
							'dechousestyle':$queryitem_dechousestyle,
							'decarea':$queryitem_decarea,
							'decprice':$queryitem_decprice,
							'expertisestyle':$queryitem_expertisestyle,
							'inarea':$queryitem_inarea
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
			
			
			//表单省份和城市选择
			City_Select.areaSelect({
					$province:$customprovince1,
					$city:$customcity1,
					$area:null
			});
			
			//表单省份和城市选择
			City_Select.areaSelect({
					$province:$customprovince2,
					$city:$customcity2,
					$area:null
			});
			
			//表单省份和城市选择
			City_Select.areaSelect({
					$province:$customprovince3,
					$city:$customcity3,
					$area:null
			});
			
			$query_listwrap.delegate('div.company-griditem4 > div,div.company-griditem4 > p','click',function(e){
					var types=e.target.nodeName.toLowerCase();
					if(types=='div'){
							//绑定户型设计
							$mask_hxwrap.removeClass('g-d-hidei');
					}else if(types=='p'){
						//绑定户型获取报价
							$mask_bjwrap.removeClass('g-d-hidei');
					}
				
			});
			
			
			//绑定户型设计和收藏隐藏
			$.each([$mask_hxclosebtn,$mask_bjclosebtn],function(){
					
					if(this.selector.indexOf('mask_hx')!=-1){
							this.on('click',function(){
								$mask_hxwrap.addClass('g-d-hidei');
							});
					}else if(this.selector.indexOf('mask_bj')!=-1){
							this.on('click',function(){
									$mask_bjwrap.addClass('g-d-hidei');
							});
					}
			});
			
			
			
			//表单验证1(to do)
			var issucces1=false;
		  validobj1=$miniportal_form1.Validform({
					ajaxPost: true,
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
												issucces1=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces1=false;
												dia.content('<span class="g-c-red4">保存失败</span>').show();
										}
								},
								error: function(){
										issucces1=false;
										dia.content('<span class="g-c-red4">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces1){
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
								if(cid=='customprovince_text1'){
									curitem.parent().next().next().text(msg);
								}else if(cid=='customcity_text1'){
									curitem.parent().next().text(msg);
								}else{
									curitem.parent().next().text(msg);
								}
						}else if(curtype==2){
								if(cid=='customprovince_text1'){
									curitem.parent().next().next().text('');
								}else if(cid=='customcity_text1'){
									curitem.parent().next().text('');
								}else{
									curitem.parent().next().text('');
								}
						}
					}
			});
			validobj1.addRule(ruleobj1);
			
			//表单验证1(to do)
			var issucces2=false;
		  validobj2=$miniportal_form2.Validform({
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
												issucces2=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces2=false;
												dia.content('<span class="g-c-red4">保存失败</span>').show();
										}
								},
								error: function(){
										issucces2=false;
										dia.content('<span class="g-c-red4">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces2){
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
								if(cid=='customprovince_text2'){
									curitem.parent().next().next().text(msg);
								}else if(cid=='customcity_text2'){
									curitem.parent().next().text(msg);
								}else{
									curitem.parent().next().text(msg);
								}
						}else if(curtype==2){
								if(cid=='customprovince_text2'){
									curitem.parent().next().next().text('');
								}else if(cid=='customcity_text2'){
									curitem.parent().next().text('');
								}else{
									curitem.parent().next().text('');
								}
						}
					}
			});
			validobj2.addRule(ruleobj2);
			
			//表单验证1(to do)
			var issucces3=false;
		  validobj3=$miniportal_form3.Validform({
					ajaxPost: true,
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
												issucces3=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces3=false;
												dia.content('<span class="g-c-red4">保存失败</span>').show();
										}
								},
								error: function(){
										issucces3=false;
										dia.content('<span class="g-c-red4">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces3){
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
								if(cid=='customprovince_text3'){
									curitem.parent().next().next().text(msg);
								}else if(cid=='customcity_text3'){
									curitem.parent().next().text(msg);
								}else{
									curitem.parent().next().text(msg);
								}
						}else if(curtype==2){
								if(cid=='customprovince_text3'){
									curitem.parent().next().next().text('');
								}else if(cid=='customcity_text3'){
									curitem.parent().next().text('');
								}else{
									curitem.parent().next().text('');
								}
						}
					}
			});
			validobj3.addRule(ruleobj3);
			
			
			
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
			params['orderby']=opt.orderby;
			params['pagenum']=opt.pageNum;
			paramstr+='pagenum='+opt.pageNum+'&';
			paramstr+='orderby='+opt.orderby;
	
			$.ajax({
					url:'../../json/company_decorate.json',
					dataType:"json",
					data:params,
					type:'get',
					async:false,
					success: function(result){
							if(result.total!==0){
								listdata=result.companyList;	
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
			if(len==0){
					flow.html('');
					return false;
			}
			for(i;i<len;i++){
				htmlstr=template;
					resultset.push(htmlstr.replace(/\$id/g,listdata[i]['id'])
					.replace('$href',listdata[i]['href'])
					.replace('$url',listdata[i]['url'])
					.replace('$decName',listdata[i]['decName'])
					.replace('$decAddress',listdata[i]['decAddress'])
					.replace('$signNumberhref',listdata[i]['signNumberhref'])
					.replace('$designerSizehref',listdata[i]['designerSizehref'])
					.replace('$commentSizehref',listdata[i]['commentSizehref'])
					.replace('$signNumber',listdata[i]['signNumber'])
					.replace('$designerSize',listdata[i]['designerSize'])
					.replace('$commentSize',listdata[i]['commentSize'])
					.replace('$specialService',listdata[i]['specialService'])
					.replace('$wordMouthValuehref',listdata[i]['wordMouthValuehref'])
					.replace('$wordMouthValue',listdata[i]['wordMouthValue'])
					.replace('$look',listdata[i]['look']));
			}


			$(resultset.join('')).appendTo(opt.listwrap.html(''));
			resultset.length=0;
			return true;
	}
});


