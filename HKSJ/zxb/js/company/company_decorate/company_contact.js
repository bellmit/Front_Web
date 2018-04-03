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

		

		//获取页面元素
		var $query_listwrap=$('#query_listwrap'),
				$query_pagewrap=$('#query_pagewrap');
				
				
				
				
		//需加载的文本模板		
		var htmltemplate='<li>$url'+
		' <div class="detail">'+
		'  <p class="title">$name</p>'+
		'    <dl>'+
		'      <dd>地址：$address</dd>'+
		'      <dd>街道：$street</dd>'+
		'      <dd>电话:$mobile</dd>'+
		'      <dd>网址：$website</dd>'+
		'    </dl>'+
		'  </div>'+
		'</li>';
		
		

		//初始化请求
		_handler({
				pagewrap:$query_pagewrap,
				listwrap:$query_listwrap,
				pagenum:1,
				id:curid,
				total:0,
				pageSize:10,
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
					url:'../../../json/company_contact.json',
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
			for(i;i<len;i++){
				htmlstr=opt.template;
				resultset.push(htmlstr.replace('$url',(function(){
						var url=listdata[i]['url'];
						if(url){
							return '<img alt="" src="'+url+'" >';
						}else{
							return '<img alt="" src="../../../images/zfx.png" >';
						}
					
				}()))
				.replace('$name',listdata[i]['name'])
				.replace('$address',listdata[i]['address'])
				.replace('$street',listdata[i]['street'])
				.replace('$mobile',listdata[i]['mobile'])
				.replace('$website',listdata[i]['website']));
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
								id:opt.id,
								template:opt.template,
								flag:false
						});
				}
			});
			return true;
	}
	
	
	
	
	
	
	
	
	
	
});


