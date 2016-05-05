/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/common',
		'cookie':'plugins/cookie',
		'city_select':'widgets/city_select',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'modal_dialog':'widgets/modal_dialog',
		'pagination':'plugins/pagination.min'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
			deps:['jquery']
		},
		'pagination':{
				deps:['jquery']
		}
	},
	waitSeconds:15
});

/*程序入口*/
require(['jquery','dialog','rule','commonfn','validform','city_select','modal_dialog','cookie','common','pagination'],function($,undefined,Rule,CommonFn,undefined,City_Select,Modal_Dialog,undefined,Common,Pagination) {

	$(function() {

			//页面元素获取
			var $miniportal_form=$('#miniportal_form'),
					$customarea=$('#customarea'),
					$custommobile=$('#custommobile'),
					$customcity=$('#customcity'),
					$customprovince=$('#customprovince'),
					$customprovince_text=$('#customprovince_text'),
					$customcity_text=$('#customcity_text'),
					$comment_wrap=$('#comment_wrap'),
					$guide_orderby=$('#guide_orderby'),
					$comment_early=$('#comment_early'),
					$comment_alter=$('#comment_alter'),
					$comment_water=$('#comment_water'),
					$comment_wood=$('#comment_wood'),
					$query_pagewrap=$('#query_pagewrap'),
					dia=dialog({
							cancel:false
					}),
					validobj=null;
					
			var htmltemplate1='<dd data-id="$id">'+
			'	<div class="comment-listitem">'+
			'		<h3>'+
			'			<p class="dt-theme">$dttheme</p>$theme'+
			'			<div class="img-theme">$imgtheme'+
			'			</div>'+
			'		</h3>'+
			'		<h3>'+
			'			<div class="icon-theme">$url</div>'+
			'			<em class="reply-btn g-d-hidei">回复</em>'+
			'			<p class="dt-theme">$commentdatetime</p>$content'+
			'		</h3>'+
			'		<ul class="reply-listwrap g-d-hidei">$reply</ul>'+
			'		<div class="reply-form g-d-hidei">'+
			'			<textarea maxlength="140" name="reply"></textarea>'+
			'			<span class="reply-sure" data-id="$id">确定</span>'+
			'			<span class="reply-cance">取消</span>'+
			'		</div>'+
			'	</div>'+
			'</dd>',
					htmltemplate2='<dd data-id="$id">'+
			'	<div class="comment-imgwrap">$url</div>'+
			'	<div class="comment-listitem">'+
			'		<h3>$title'+
			'			<span>$dttheme</span> <em class="reply-btn g-d-hidei">回复</em>'+
			'		</h3>'+
			'		<p>$content</p>'+
			'		<ul class="reply-listwrap g-d-hidei">$reply</ul>'+
			'		<div class="reply-form g-d-hide">'+
			'			<textarea maxlength="140" name="reply"></textarea>'+
			'			<span class="reply-sure" data-id="$id">确定</span>'+
			'			<span class="reply-cance">取消</span>'+
			'		</div>'+
			'	</div>'+
			'</dd>';
			
			//校验规则
			var ruleobj=[{
						ele:$customarea,
						datatype:"n1-5",
						nullmsg: "建筑面积不能为空",
						errormsg: "建筑面积只能为数字",
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
					

			
			
			//表单省份和城市选择
			City_Select.areaSelect({
					$province:$customprovince,
					$city:$customcity,
					$area:null
			});
			
			
			//初始化查询及其相关初始化
			(function(){
					//初始化排序
					var $orderby=$guide_orderby.find('span:first-child'),
							orderby=$orderby.attr('data-orderby');
							$orderby.addClass('diary-titleactive').siblings().removeClass('diary-titleactive');
				
					//初始化查询各个阶段
					_handler1({
							pagewrap:$query_pagewrap,
							listwrap:[$comment_early,$comment_alter,$comment_water,$comment_wood],
							pagenum:1,
							total:0,
							id:null,
							orderby:orderby,
							pageSize:2,
							template:htmltemplate1,
							flag:true
					});
					
					//初始化查询所有
					_handler2({
							listwrap:$comment_wrap,
							id:null,
							template:htmltemplate2
					});
				
			}());
			
			
			
			
			//绑定排序操作
			$guide_orderby.on('click','span',function(){
					var $this=$(this),
							orderby=$this.attr('data-orderby');
					
					
					$this.addClass('diary-titleactive').siblings().removeClass('diary-titleactive');		
					//初始化查询各个阶段
					_handler1({
							pagewrap:$query_pagewrap,
							listwrap:[$comment_early,$comment_alter,$comment_water,$comment_wood],
							pagenum:1,
							total:0,
							id:null,
							orderby:orderby,
							pageSize:2,
							template:htmltemplate1,
							flag:true
					});
			});
			
			
			
			
			
			//表单验证1(to do)
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
								}else if(cid=='customcity_text'){
									curitem.parent().next().text(msg);
								}else{
									curitem.parent().next().text(msg);
								}
						}else if(curtype==2){
								if(cid=='customprovince_text'){
									curitem.parent().next().next().text('');
								}else if(cid=='customcity_text'){
									curitem.parent().next().text('');
								}else{
									curitem.parent().next().text('');
								}
						}
					}
			});
			validobj.addRule(ruleobj);
			
	});
	
	
	
	
	
	//私有函数(查询获取数据1)
	function _handler1(opt){
			var listdata=[],
					htmlstr='',
					resultset=[];
					
			$.ajax({
					url:'../../json/guide_diary_detail.json',
					dataType:"json",
					data:(function(){
						if(opt.id){
							return opt.flag?'id='+opt.id+'&pagenum=1&orderby='+opt.orderby:'id='+opt.id+'&pagenum='+opt.pagenum+'&orderby='+opt.orderby;
						}else{
							return opt.flag?'pagenum=1&orderby='+opt.orderby:'pagenum='+opt.pagenum+'&orderby='+opt.orderby;
						}
					}()),
					type:'get',
					async:false,
					success: function(result){
							if(result.total!=0){
								listdata.push(result.earlyList,result.alterList,result.waterList,result.woodList);
								opt.total=result.total;
							}else{
								for(var i=0,len=opt.listwrap.length;i<len;i++){
										opt.listwrap[i].html('');
								}
								listdata.length=0;
								opt.pagewrap.html('');
							}
					},
					error:function(){
							for(var i=0,len=opt.listwrap.length;i<len;i++){
									opt.listwrap[i].html('');
							}
							listdata.length=0;
							opt.pagewrap.html('');
					}
			});
			
			//填充模板
			for(var j=0,itemlen=opt.listwrap.length;j<itemlen;j++){
					(function(){
							var i=0,
									len=listdata[j].length;
							if(len===0){
									opt.listwrap[j].html('');
									return false;
							}
							for(i;i<len;i++){
								htmlstr=opt.template;
								resultset.push(htmlstr.replace(/\$id/g,listdata[j][i]['id'])
								.replace('$dttheme',listdata[j][i]['dttheme'])
								.replace('$commentdatetime',listdata[j][i]['commentdatetime'])
								.replace('$theme',listdata[j][i]['theme'])
								.replace('$url',(function(){
									var url=listdata[j][i]['url'];
									if(url){
										return '<img src="'+url+'" alt="">';
									}else{
										return '<img src="../../images/designer.jpg" alt="">';
									}
								}()))
								.replace('$content',listdata[j][i]['content'])
								.replace('$imgtheme',(function(){
										var imgtheme=listdata[j][i]['imgtheme'];
										if(imgtheme&&imgtheme.length!=0){
											return '<img src="'+imgtheme.join('" alt=""><img src="')+'" alt="">';
										}else{
											return '';
										}
								}()))
								.replace('$reply',''));
							}
							
							var $resultset=$(resultset.join(''));
							$resultset.appendTo(opt.listwrap[j].html(''));
							resultset.length=0;
					})(j);
			}
			
			//分页调用
			opt.pagewrap.pagination({
					pageSize:opt.pageSize,
					total:opt.total,
					pageNumber:opt.pagenum,
					onSelectPage:function(pageNumber,pageSize){
							_handler1({
									pagewrap:opt.pagewrap,
									listwrap:opt.listwrap,
									pagenum:pageNumber,
									pageSize:pageSize,
									total:opt.total,
									orderby:opt.orderby,
									template:opt.template,
									id:opt.id?opt.id:null,
									flag:false
							});
					}
			});
			
			return true;
	}
	
	
	
	
	//私有函数(查询获取数据2)
	function _handler2(opt){
			var listdata=[],
					htmlstr='',
					resultset=[];
					
			$.ajax({
					url:'../../json/guide_diary_detail.json',
					dataType:"json",
					data:(function(){
						if(opt.id){
							return 'id='+opt.id;
						}else{
							return '';
						}
					}()),
					type:'get',
					async:false,
					success: function(result){
							if(result.commentList.length!=0){
								listdata=result.commentList;
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
					opt.listwrap.html('');
					return false;
			}
			for(i;i<len;i++){
				htmlstr=opt.template;
				resultset.push(htmlstr.replace(/\$id/g,listdata[i]['id'])
				.replace('$dttheme',listdata[i]['dttheme'])
				.replace('$commentdatetime',listdata[i]['commentdatetime'])
				.replace('$title',listdata[i]['title'])
				.replace('$url',(function(){
							var url=listdata[i]['url'];
							if(url){
								return '<img src="'+url+'" alt="">';
							}else{
								return '<img src="../../images/designer.jpg" alt="">';
							}
				}()))
				.replace('$content',listdata[i]['content'])
				.replace('$reply',''));
			}
			
			var $resultset=$(resultset.join(''));
			$resultset.appendTo(opt.listwrap.html(''));
			resultset.length=0;
			return true;
	}
	

});


