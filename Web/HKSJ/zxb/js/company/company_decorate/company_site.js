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
require(['jquery','dialog','share','rule','commonfn','validform','city_select','modal_dialog','pagination','cookie','common','company_common'],function($,undefined,Share,Rule,CommonFn,undefined,City_Select,Modal_Dialog,Pagination,undefined,Common,Company_Common) {
	$(function() {
		
		//获取页面传值id
		var curid=Common.getID('company_params');
		
		//dom文档引用
		var $site_menu=$('#site_menu'),
				 $query_pagewrap=$('#query_pagewrap'),
				 $site_wrap=$('#site_wrap');
		
		
		//html模板
		var htmltemplate='<div id="$id" class="site-box">'+
		' <div class="site-icon">'+
		'  <i>$url</i><br>'+
		'  <span>$desName</span>'+
		' </div>'+
		' <div class="site-comment">'+
		'  <div class="comment-title">'+
		'   <p class="info-p1">$title'+
		'		 <b>[$popularValue篇]</b><i>人气</i>'+
		'    <span>'+
		'     <b><i class="p1-a"></i>$browerNumber</b>'+
		'     <b><i class="p1-b"></i>$saveNumber</b>'+
		'     <b><i class="p1-c"></i>$commentNumber</b>'+
		'    </span>'+
		'   </p>'+
		'   <p class="info-p2">'+
		'    <b>$aream<sup>2</sup></b>'+
		'    <b>$style</b>'+
		'    <b>$stage</b>'+
		'   </p>'+
		'  </div>'+
		'  <p class="comment-content">$content</p>'+
		'  <ul class="comment-img">$imglist</ul>'+
		'  <span>$datetime</span>'+
		' </div>'+
		'</div>';
		
		//初始化查询
		(function(){
			
				//初始化查询数据项
				var $li=$site_menu.children('li').eq(0),
						type=$li.attr('data-type');
						
						$li.addClass('site-menuactive').siblings().removeClass('site-menuactive');
						
						
				//查询请求
				_handler({
						pagewrap:$query_pagewrap,
						listwrap:$site_wrap,
						type:type,
						pagenum:1,
						id:curid,
						total:0,
						pageSize:5,
						template:htmltemplate
				});
				
				
			
		}());
		
		
		
		
		
		
		
		
		//切换不同的导航
		$site_menu.on('click','li',function(){
				var $this=$(this),
						type=$this.attr('data-type');
						
						$this.addClass('site-menuactive').siblings().removeClass('site-menuactive');
						
				//初始化数据查询
				_handler({
						pagewrap:$query_pagewrap,
						listwrap:$site_wrap,
						type:type,
						id:curid,
						pagenum:1,
						total:0,
						pageSize:5,
						template:htmltemplate
				});
				
				
		});
		
		

					
			
			
			
			
	});
	
	
	
	
	//私有函数
	function _handler(opt){
			var listdata=[],
					htmlstr='',
					resultset=[];
					
			$.ajax({
					url:'../../../json/company_site.json',
					dataType:"json",
					data:'id='+opt.id+'&type='+opt.type+'&pagenum='+opt.pagenum,
					type:'get',
					async:false,
					success: function(result){
							if(result.total!=0){
								listdata=result.siteList;
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
					resultset.push(htmlstr.replace(/\$id/g,listdata[i]['id'])
					.replace('$url',(function(){
							var url=listdata[i]['url'];
							return url?'<img src="'+url+'" width="63" height="63" alt="">':'<img src="../../../images/zfx.png" width="63" height="63" alt="">'
					}()))
					.replace('$desName',listdata[i]['desName'])
					.replace('$title',listdata[i]['title'])
					.replace('$popularValue',listdata[i]['popularValue'])
					.replace('$browerNumber',listdata[i]['browerNumber'])
					.replace('$saveNumber',listdata[i]['saveNumber'])
					.replace('$commentNumber',listdata[i]['commentNumber'])
					.replace('$area',listdata[i]['area'])
					.replace('$style',listdata[i]['style'])
					.replace('$stage',listdata[i]['stage'])
					.replace('$content',listdata[i]['content'])
					.replace('$datetime',listdata[i]['datetime'])
					.replace('$imglist',(function(){
						var imglist=listdata[i]['imglist'];
								if(imglist&&imglist.length!=0){
									return '<li><img width="136" height="136" alt="" src="'+imglist.join('"></li><li><img width="136" height="136" alt="" src="')+'"></li>';
								}else{
									return '';
								}
					}())));
			}
			var $resultset=$('<div class="site-wrap">'+resultset.join('')+'</div>');
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
								id:opt.id,
								type:opt.type,
								total:opt.total,
								template:opt.template,
						});
				}
			});
			return true;
	}
	
	
	
	
	
	
	
	
	
	
});


