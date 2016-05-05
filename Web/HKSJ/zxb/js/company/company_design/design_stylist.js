/*配置依赖*/
require.config({
	baseUrl:'../../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'share':'plugins/share',
		'common':'common/common',
		'company_common':'common/company_common',
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
		
	},
	waitSeconds:15
});


/*程序入口*/
require(['jquery','dialog','share','rule','commonfn','validform','city_select','modal_dialog','pagination','cookie','common','company_common'],function($,undefined,Share,Rule,CommonFn,undefined,City_Select,Modal_Dialog,Pagination,undefined,Common,Company_Common) {
	$(function() {
		
		//获取页面传值id
		var curid=Common.getID('company_params');
		console.log(curid);
		
		//dom元素引用
		var  $query_pagewrap=$('#query_pagewrap'),
				 $query_listwrap=$('#query_listwrap'),
				 $query_result=$('#query_result');
		
		
		//需加载的文本模板
		var	htmltemplate=
		'<li data-id="$id" class="$wrapclass">'+
		'	<a data-id="$id" class="company-griditem1" href="$href">'+
		'		<img src="$url" alt="">'+
		'	</a>'+
		'	<div class="company-griditem2">'+
		'		<h3>$name</h3>'+
		'		<div>'+
		'			<span>$housetype</span>'+
		'			<span>$style</span>'+
		'			<span>$aream<sup>2</sup></span>'+
		'			<span>预算：<em>$budget万元</em></span>'+
		'		</div>'+
		'	</div>'+
		'	<div class="company-griditem3">'+
		'		<div>'+
		'			<img src="$desHeadPortraitUrl" alt="">'+
		'		</div>'+
		'		<p>$decName--$desName</p>'+
		'		<span class="good"><em></em>$greatNumber</span>'+
		'		<a data-id="$id" href="$answerNumberhref" class="comment"><em></em>$answerNumber</a>'+
		'	</div>'+
		'</li>';
		
		
		//初始化请求
		_handler({
				pagewrap:$query_pagewrap,
				listwrap:$query_listwrap,
				result:$query_result,
				pagenum:1,
				total:0,
				pageSize:20,
				template:htmltemplate,
				flag:true
		});
		
		
		
			
	});
	
	
	//私有函数
	function _handler(opt){
			var listdata=[],
					htmlstr='',
					resultset=[];
					
			$.ajax({
					url:'../../../json/company_scheme.json',
					dataType:"json",
					data:(function(){
						return opt.flag?'a=1&b=2&c=3&d=4&pagenum=1':'a=1&b=2&c=3&d=4&pagenum='+opt.pagenum;
					}()),
					type:'get',
					async:false,
					success: function(result){
							if(result.total!=0){
								listdata=result.companyList;
								opt.total=result.total;
								opt.result.html('('+result.total+')');
							}else{
								opt.listwrap.html('');
								listdata.length=0;
								opt.pagewrap.html('');
								opt.result.html('');
							}
					},
					error:function(){
							opt.listwrap.html('');
							listdata.length=0;
							opt.pagewrap.html('');
							opt.result.html('');
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
				resultset.push(htmlstr.replace('$wrapclass',function(){
						var j=i+1;
						return j%4===0?'company-layoutitem2':'company-layoutitem1';
				})
				.replace(/\$id/g,listdata[i]['id'])
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
				.replace('$greatNumber',listdata[i]['greatNumber'])
				.replace('$answerNumberhref',listdata[i]['answerNumberhref'])
				.replace('$answerNumber',listdata[i]['answerNumber']));
			}
			
			var $resultset=$(resultset.join(''));
			$resultset.appendTo(opt.listwrap.html(''));
			resultset.length=0;
			//分页调用
			opt.pagewrap.pagination({
				pageSize:opt.pageSize,
				total:opt.total,
				pageNumber:opt.pagenum,
				onSelectPage:function(pageNumber,pageSize){
						_handler({
								pagewrap:opt.pagewrap,
								listwrap:opt.listwrap,
								pagenum:pageNumber,
								pageSize:pageSize,
								total:opt.total,
								template:opt.template,
								result:opt.result,
								flag:false
						});
				}
			});
			return true;
	}
	
	
});


