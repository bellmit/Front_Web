;(function($, window, undefined){
	
	"use strict";
	//初始化加载
	$(function(){	
		var $mainmenu= $('#main_menu');

		//加载左侧导航
		loadSideMenu($mainmenu);

	});
	
	
	

	
	//加载左侧菜单
	function loadSideMenu(wrap){
		$.ajax({
			url:SIDE_MENU_URL||"../../json/menu.json",
			async:true,
			type:"post",
			dataType:"json"
		}).done(function(data){
				var menu=data.menu,
						len=menu.length,
						menustr='',
						i=0,
						j=0,
						k=0,
						key='menuitem',
						suffix='.html',
						link='',
						item=null,
						sublen='',
						templen='',
						subitem=null,
						path=(function(){
								var winurl=location.pathname,
										modulepos=winurl.lastIndexOf('/'),
										modulesuffix=winurl.indexOf('.'),
										res=winurl.slice(modulepos + 1,modulesuffix);
								return res;	
						}());
						
						
				for(i;i<len;i++){
						item=menu[i];
						link=item.link;
						if(i===0){
							//首页数据
							//如果是当前路径和当前模块一致
							if(path==='index'&&link===path){
									menustr='<li><a href=\"'+item.link+suffix+'\"><i class=\"'+item.class+'\"></i><span>'+item.name+'</span></a></li>';
							}else{
									//如果是当前路径和当前模块不一致
									menustr='<li><a href=\"../'+item.link+suffix+'\"><i class=\"'+item.class+'\"></i><span>'+item.name+'</span></a></li>';
							}
						}else{
							//其他模块
							//如果是当前路径和当前模块一致
							if(link===path){
								menustr+='<li class="has-sub"><a href=\"'+link+suffix+'\"><i class=\"'+item.class+'\"></i><span>'+item.name+'</span></a>';
							}else{
								menustr+='<li class="has-sub"><a href=\"../'+item.module+'/'+link+suffix+'\"><i class=\"'+item.class+'\"></i><span>'+item.name+'</span></a>';
							}
							//子菜单循环
							if(typeof (subitem=item[key])!=='undefined'){
								menustr+="<ul>";
								sublen=subitem.length;
								j=0;
								for(j;j<sublen;j++){
									
									item=subitem[j];
									if(link===path){
										menustr+='<li><a href=\"'+item.link+suffix+'\"><span>'+item.name+'</span></a></li>';
									}else{
										menustr+='<li><a href=\"../'+item.module+'/'+item.link+suffix+'\"><span>'+item.name+'</span></a></li>';
									}
									
									/*if(typeof (subitem=item[key])!=='undefined'){
										menustr+="<ul>";
										templen=subitem.length;
										k=0;
										for(k;k<templen;k++){
											item=subitem[k];
											if(link===path){
												menustr+='<li><a href=\"'+item.link+suffix+'\"><span>'+item.name+'</span></a></li>';
											}else{
												menustr+='<li><a href=\"../'+item.module+'/'+item.link+suffix+'\"><span>'+item.name+'</span></a></li>';
											}
										}
										menustr+="</ul>";
									}*/
								}
								menustr+="</li></ul>";
							}
						}
				}
				
				//放入dom中
				$(menustr).appendTo(wrap);
				
		}).fail(function(){
			console.log('error');
		});
		
	};
	
	
	
})(jQuery, window);

