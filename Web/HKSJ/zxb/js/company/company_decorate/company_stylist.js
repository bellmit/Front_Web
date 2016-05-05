/*配置依赖*/
require.config({
	baseUrl:'../../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'share':'plugins/share',
		'common':'common/common',
		'company_common':'common/company_common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'city_select':'widgets/city_select',
		'cookie':'plugins/cookie',
		'modal_dialog':'widgets/modal_dialog',
		'pagination':'plugins/pagination.min'
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
require(['jquery','dialog','share','rule','commonfn','validform','city_select','modal_dialog','cookie','pagination','common','company_common'],function($,undefined,Share,Rule,CommonFn,undefined,City_Select,Modal_Dialog,undefined,Pagination,Common,Company_Common) {
	$(function() {
		
		
		//获取页面传值id
		var curid=Common.getID('company_params');
		
		
		//dom元素引用
		var  $query_pagewrap=$('#query_pagewrap'),
				 $query_listwrap=$('#query_listwrap');
		
		
		var htmltemplate='<div class="shejishi-1">'+
		'	<div class="shejishi-left">'+
		'		<a href="$href"><img src="$url" width="100" height="100" alt=""/></a>'+
		'		<ul>'+
		'			<li><h4>$desName</h4><span>首席设计师</span></li>'+
		'			<li><p>设计经验：$designExperience年</p></li>'+
		'			<li><p>擅长风格：$goodStyle</p></li>'+
		'			<li><a class="finddesign" href="javascript:void(0);">找他免费设计</a></li>'+
		'		</ul>'+
		'	</div>'+
		'	<ul class="shejishi-right">$imgList</ul>'+
		'</div>';
		

					
		//初始化请求
		_handler({
				pagewrap:$query_pagewrap,
				listwrap:$query_listwrap,
				pagenum:1,
				total:0,
				id:curid,
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
					url:'../../../json/company_stylist.json',
					dataType:"json",
					data:(function(){
						return opt.flag?'id='+opt.id+'&pagenum=1':'id='+opt.id+'&pagenum='+opt.pagenum;
					}()),
					type:'get',
					async:false,
					success: function(result){
							if(result.total!=0){
								listdata=result.companyList;
								opt.total=result.total;
							}else{
								opt.listwrap.html('');
								listdata.length=0;
								opt.pagewrap.html('');
							}
					},
					error:function(){
							opt.listwrap.html('');
							listdata.length=0;
							opt.pagewrap.html('');
					}
			});
			
			//填充模板
			var i=0,
					len=listdata.length;
			if(len===0){
					opt.listwrap.html('');
					return false;
			}
			resultset.push('<div class="shejishi-title"><h3>设计师<span>('+opt.total+')</span></h3></div>');
			for(i;i<len;i++){
				htmlstr=opt.template;
				resultset.push(htmlstr.replace('$href',listdata[i]['href'])
				.replace('$url',listdata[i]['url'])
				.replace('$desName',listdata[i]['desName'])
				.replace('$designExperience',listdata[i]['designExperience'])
				.replace('$goodStyle',listdata[i]['goodStyle'])
				.replace('$imgList',function(){
							var imglist=listdata[i]['imgList'],
									sublen=imglist.length;
							if(sublen!=0){
									var str='';
									sublen=sublen>3?3:sublen;
									for(var j=0;j<sublen;j++){
										if(j==1){
											str+='<li class="img-margin"><a href="'+imglist[j]['href']+'"><img src="'+imglist[j]['url']+'" width="211" height="141" alt="" ></a></li>'
										}else{
											str+='<li><a href="'+imglist[j]['href']+'"><img src="'+imglist[j]['url']+'" width="211" height="141" alt="" ></a></li>'
										}
									}
									return str;
							}else{
								return '';
							}
					
				}));
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
								id:opt.id,
								flag:false
						});
				}
			});
			return true;
	}
	
	
	
	
	
	
	
	
});


