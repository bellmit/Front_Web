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
		var	htmltemplate='<li data-id="$id">'+
		'	  <a data-id="$id" href="$href">'+
		'     <img src="$url" width="284" height="201" alt=""/>'+
		'	  </a>'+
		'   <b>$name</b>'+
		'   <p>'+
		'      <span>'+
		'         <i><img src="$desHeadPortraitUrl" width="22" height="22" alt=""/></i>'+
		'         <a href="#">$desName</a>'+
		'      </span>'+
		'      <span>风格：$style</span>'+
		'      <span>预算：<b>$budget万</b></span>'+
		'   </p>'+
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
								opt.result.html('('+result.total+')');
								listdata=result.companyList;
								opt.total=result.total;
							}else{
								opt.listwrap.html('');
								listdata.length=0;
								opt.pagewrap.html('');
								opt.result.html('(0)');
							}
					},
					error:function(){
							opt.listwrap.html('');
							listdata.length=0;
							opt.pagewrap.html('');
							opt.result.html('(0)');
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
				var j=i+1;
				htmlstr=opt.template;
				if(j==1){
					resultset.push('<ul>'+htmlstr.replace(/\$id/g,listdata[i]['id'])
					.replace('$href',listdata[i]['href'])
					.replace('$url',listdata[i]['url'])
					.replace('$name',listdata[i]['name'])
					.replace('$style',listdata[i]['style'])
					.replace('$budget',listdata[i]['budget'])
					.replace('$desHeadPortraitUrl',listdata[i]['desHeadPortraitUrl'])
					.replace('$desName',listdata[i]['desName']));
				}else if(j%4==0&&j!=len){
					resultset.push(htmlstr.replace(/\$id/g,listdata[i]['id'])
					.replace('$href',listdata[i]['href'])
					.replace('$url',listdata[i]['url'])
					.replace('$name',listdata[i]['name'])
					.replace('$style',listdata[i]['style'])
					.replace('$budget',listdata[i]['budget'])
					.replace('$desHeadPortraitUrl',listdata[i]['desHeadPortraitUrl'])
					.replace('$desName',listdata[i]['desName'])+'</ul><ul>');
				}else if(j==len){
					resultset.push(htmlstr.replace(/\$id/g,listdata[i]['id'])
					.replace('$href',listdata[i]['href'])
					.replace('$url',listdata[i]['url'])
					.replace('$name',listdata[i]['name'])
					.replace('$style',listdata[i]['style'])
					.replace('$budget',listdata[i]['budget'])
					.replace('$desHeadPortraitUrl',listdata[i]['desHeadPortraitUrl'])
					.replace('$desName',listdata[i]['desName'])+'</ul>');
				}else{
					resultset.push(htmlstr.replace(/\$id/g,listdata[i]['id'])
					.replace('$href',listdata[i]['href'])
					.replace('$url',listdata[i]['url'])
					.replace('$name',listdata[i]['name'])
					.replace('$style',listdata[i]['style'])
					.replace('$budget',listdata[i]['budget'])
					.replace('$desHeadPortraitUrl',listdata[i]['desHeadPortraitUrl'])
					.replace('$desName',listdata[i]['desName']));
					
				}
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
								result:opt.result,
								template:opt.template,
								flag:false
						});
				}
			});
			return true;
	}
	
	
});


