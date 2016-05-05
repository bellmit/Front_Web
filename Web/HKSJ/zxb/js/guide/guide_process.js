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
		'cookie':'plugins/cookie',
		'city_select':'widgets/city_select',
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
	}
});


/*程序入口*/
require(['jquery','dialog','rule','commonfn','validform','city_select','modal_dialog','cookie','common','pagination'],function($,undefined,Rule,CommonFn,undefined,City_Select,Modal_Dialog,undefined,Common,Pagination)  {
	$(function() {
			//页面元素获取
			var $process_sidewrap=$('#process_sidewrap'),
					$process_wrap=$('#process_wrap'),
					$query_pagewrap=$('#query_pagewrap');
			
			
			
			
			var htmltemplate='<div class="process-right" data-id="$id">'+
			'		<div class="right-img">'+
			'				<img src="$url">'+
			'		</div>'+
			'		<div class="right-text">'+
			'				<h3><a href="$href">$title</a></h3>'+
			'				<div class="right-text-tag">'+
			'						<span></span>$labels'+
			'				</div>'+
			'				<p>$content</p>'+
			'				<div class="right-text-bottom">'+
			'						<div>'+
			'								<span class="right-text-yanjing"></span>'+
			'								<b>$browerNumber</b>'+
			'						</div>'+
			'						<div>'+
			'								<span class="right-text-shoucang"></span>'+
			'								<b>$save</b>'+
			'						</div>'+
			'						<b>$datetime</b>'+
			'				</div>'+
			'		</div>'+
			'</div>';
			
			
			
			//初始化查询
			_handler({
					pagewrap:$query_pagewrap,
					listwrap:$process_wrap,
					pagenum:1,
					total:0,
					id:null,
					pageSize:10,
					template:htmltemplate,
					flag:true
			});
			
			
			
			
			
			//绑定左侧导航选择
			$process_sidewrap.on('click','li',function(){
					var $this=$(this),
							$wrap=$this.closest('div'),
							id=$this.attr('data-type')||'';
				
				
					//高亮
					$this.addClass('process-sideactive').siblings().removeClass('process-sideactive');
					$wrap.siblings().find('li').removeClass('process-sideactive');
					
					if(id!=''){
							//分类查询
							_handler({
									pagewrap:$query_pagewrap,
									listwrap:$process_wrap,
									pagenum:1,
									total:0,
									id:id,
									pageSize:10,
									template:htmltemplate,
									flag:false
							});
					}else{
							
							//非分类查询
							_handler({
									pagewrap:$query_pagewrap,
									listwrap:$process_wrap,
									pagenum:1,
									total:0,
									id:null,
									pageSize:10,
									template:htmltemplate,
									flag:false
							});
					}
					
			});
			
			
			
			//绑定左侧导航打开或关闭
			$process_sidewrap.on('click','h3',function(){
					var $this=$(this),
							$wrap=$this.next();

					//显示与隐藏切换
					$wrap.slideToggle(200);
			});
			


			
	});
	

	
	//私有函数(查询获取数据)
	function _handler(opt){
			var listdata=[],
					htmlstr='',
					resultset=[];
					
			$.ajax({
					url:'../../json/guide_process.json',
					dataType:"json",
					data:(function(){
						if(opt.id){
							return opt.flag?'id='+opt.id+'&pagenum=1':'id='+opt.id+'&pagenum='+opt.pagenum;
						}else{
							return opt.flag?'pagenum=1':'pagenum='+opt.pagenum;
						}
					}()),
					type:'get',
					async:false,
					success: function(result){
							if(result.total!=0){
								listdata=result.guideList;
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
				.replace('$title',listdata[i]['title'])
				.replace('$href',listdata[i]['href'])
				.replace('$url',listdata[i]['url'])
				.replace('$title',listdata[i]['title'])
				.replace('$labels',(function(){
						var labels=listdata[i]['labels'];
						if(labels&&labels.length!=0){
							return '<b>'+labels.join('</b><b>')+'</b>';
						}else{
							return '';
						}
				}()))
				.replace('$content',listdata[i]['content'])
				.replace('$save',listdata[i]['save'])
				.replace('$datetime',listdata[i]['datetime'])
				.replace('$browerNumber',listdata[i]['browerNumber']));
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
									id:opt.id?opt.id:null,
									flag:false
							});
					}
			});
			
			return true;
	}
	
	
	
	
});
