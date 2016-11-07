(function($){
	"use strict";
	$(function(){


		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://10.0.5.222:8080/mall-agentbms-api/module/menu',
				async:false,
				type:'post',
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			});


			/*dom节点变量*/
			var $admin_mainwrap=$('#admin_mainwrap'),
				$admin_sidewrap=$('#admin_sidewrap'),
				$admin_noticebtn=$('#admin_noticebtn'),
				$admin_notice_wrap=$('#admin_notice_wrap'),
				$show_detail_wrap=$('#show_detail_wrap')/*详情容器*/,
				$show_detail_content=$('#show_detail_content'),
				notice_data=[];



			/*绑定切换通知*/
			$admin_noticebtn.on('click',function () {
				var $this=$(this),
					toggle=$this.attr('data-toggle');

				if(toggle==='hide'){
					$this.attr({
						'data-toggle':'show'
					});
					$admin_mainwrap.addClass('col-md-8');
					$admin_sidewrap.removeClass('g-d-hidei').addClass('col-md-4');
				}else if(toggle==='show'){
					$this.attr({
						'data-toggle':'hide'
					});
					$admin_mainwrap.removeClass('col-md-8');
					$admin_sidewrap.addClass('g-d-hidei').removeClass('col-md-4');
				}

			});


			/*请求通知数据*/
			$.ajax({
				url:"http://10.0.5.222:8080/mall-agentbms-api/announcements/related",
				dataType:'JSON',
				method:'post',
				data:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					token:decodeURIComponent(logininfo.param.token),
					grade:decodeURIComponent(logininfo.param.grade)
				}
			}).done(function (resp) {
				var code=parseInt(resp.code,10);
				if(code!==0){
					if(code===999){
						/*清空缓存*/
						public_tool.loginTips(function () {
							public_tool.clear();
							public_tool.clearCacheData();
						});
					}
					return false;
				}

				var result=resp.result;
				if(!result){
					$admin_notice_wrap.html('');
					return false;
				}

				var list=result.list;
				if(!list){
					$admin_notice_wrap.html('');
					return false;
				}

				var len=list.length,
					i=0,
					str='',
					typemap={
						1:"通知"
					};

				if(len===0){
					$admin_notice_wrap.html('');
					return false;
				}

				notice_data.length=0;

				for(i;i<len;i++){
					var title=list[i]["title"];
					notice_data[i]={
						title:title,
						content:list[i]["content"]
					};
					str+='<li data-index="'+i+'"><span>'+typemap[list[i]["type"]]+'</span>'+title.slice(0,20)+'&nbsp;&nbsp;<em>'+list[i]["lastUpdate"]+'</em></li>';
				}

				$(str).appendTo($admin_notice_wrap.html(''));


			}).fail(function (resp) {
				console.log(resp);
			});
			
			
			/*绑定查看详情*/
			$admin_notice_wrap.on('click','li',function () {
				var $this=$(this),
					index=$this.attr('data-index');

				$show_detail_content.html('<tr>\
						<th>标题:</th>\
						<td>'+notice_data[index]["title"]+'</td>\
					</tr>\
					<tr>\
						<th style="vertical-align: middle">内容:</th>\
						<td style="vertical-align: middle">'+notice_data[index]["content"]+'</td>\
					</tr>');
				$show_detail_wrap.modal('show',{backdrop:'static'});

			});







		}
	});
	
	


})(jQuery);