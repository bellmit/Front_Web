/*配置依赖*/
require.config({
	baseUrl:'../../resource/js',
	paths:{
		'jquery':'lib/jquery.min',
		'dialog':'plugins/artdialog/dialog',
		'page':'plugins/easyui_page/pagination',
		'common':'common/common'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'page':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery']
		}
	}
});

/*微社区列表服务对象(类)*/
define('community',function(){
	return {
			/*保存已选中的文章列表id值*/
			communityid:[],
			/*保存已选中的类型*/
			status:1,
			/*类型映射状态*/
			statusobj:{
					1:'激活',
					0:'禁止'
			},
			/*初始化清除上次被选中的input*/
			init:function(wrap,checkall){
					this.communityid.length=0;
					this.status=1;
					checkall.prop('checked',false);
					wrap.find('tr').each(function(index, element) {
						if(index!=0){
							var $input=$(element).find('td:first input:checkbox');
							if($input.is(':checked')){
								$input.prop('checked',false);
							}
						}
					});
			},
			/*全选和取消全选*/
			toggleCheckAll:function(checkall,wrap,btn){
				var self=this;
				if(checkall.is(':checked')){
						wrap.find('tr').each(function(index, element) {
								if(index!=0){
									var $input=$(element).find('td:first input:checkbox');
									if(index==1){
										if(!$input.is(':checked')){
												self.communityid.push($input.prop('checked',true).val());
										}
										self.status=$input.attr('data-status');
									}else{
										if(self.status==$input.attr('data-status')&&!$input.is(':checked')){
											self.communityid.push($input.prop('checked',true).val());
										}
									}
								}
            });
						self.status==1?btn.attr({'data-status':0}).text('批量禁止'):btn.attr({'data-status':1}).text('批量激活');
					}else{
						wrap.find('tr').each(function(index, element) {
							if(index!=0){
								var $input=$(element).find('td:first input:checkbox');
								if($input.is(':checked')){
									$input.prop('checked',false);
								}
							}
            });
						self.communityid.length=0;
						self.status=1;
						btn.attr({'data-status':0}).text('批量禁止');
					}
			},
			/*选中某个单独多选框*/
			communityCheck:function(cb,checkall,btn){
				var self=this,
				len=this.communityid.length,
				ishave=-1,
				text=cb.val();
				if(cb.is(':checked')){
						if(len==0){
							this.communityid.push(text);
							this.status=cb.attr('data-status');
							this.status==1?btn.attr({'data-status':0}).text('批量禁止'):btn.attr({'data-status':1}).text('批量激活');
							if(!checkall.is(':checked')){
								checkall.prop('checked',true);
							}
						}else{
							if(this.status==cb.attr('data-status')){
								ishave=$.inArray(text,self.communityid);
								if(ishave!=-1){
									this.communityid.splice(ishave,1,text);
								}else{
									this.communityid.push(text);
								}
							}else{
								cb.prop('checked',false);
								this.topicTips({
									type:false,
									tips:'您不能选择不同于&nbsp;"<span style="font-weight:bold;">'+this.statusobj[this.status]+'</span>"&nbsp;状态的选项！'
								});
							}
						}
				}else{
						ishave=$.inArray(text,self.communityid);
						if(ishave!=-1){
							this.communityid.splice(ishave,1);
							if(this.communityid.length==0&&checkall.is(':checked')){
								checkall.prop('checked',false);
							}
							if(this.communityid.length==0){
								this.status=1;
								btn.attr({'data-status':0}).text('批量禁止');
							}
						}
				}
			},
			/*禁止(激活)路由*/
			topicAction:function(btn,list){
					var isalone=typeof btn.attr('data-id')=='string',
					isrepeat=false,
					alonetd,
					status=btn.attr('data-status');
					
					
					
					if(isalone){
						alonetd=btn.parent().parent().prevAll();
						isrepeat=alonetd.eq(6).find('input:checkbox').attr('data-status');
						console.info('alonetd:',alonetd);
						console.info('isrepeat:',isrepeat);
					}
					/*防止批量状态是为空切换状态*/
					if(!isalone&&this.communityid.length==0){
						dialog({
							title:'温馨提示',
							width:200,
							content:'<span class="g-c-red2">没有选中任何数据</span>'
						}).showModal();
						return false;
					}else if(isalone&&isrepeat==status){
						/*防止单独激活(禁止)状态下重复点击切换状态*/
						this.topicTips({
								type:false,
								tips:'当前状态是&nbsp;"<span style="font-weight:bold;">'+this.statusobj[status]+'</span>"&nbsp;,您不能切换同一种状态！'
						});
						return false;
					}else{
						//操作路由
						//to do
						//执行相关操作
						//这部分需要开发阶段
						/*发送ajax操作*/
						var self=this,
								type=false,
								tips='',
								tid=isalone?btn.attr('data-id'):this.communityid.join();
								
										
						/*测试部分*/
						var r=parseInt(Math.random()*10);
						if(r%2==0){
							type=true;
							tips=isalone?status==0?'禁止成功':'激活成功':status==0?'批量禁止成功':'批量激活成功';
						}else{
							type=false;
							tips=isalone?status==0?'禁止失败':'激活失败':status==0?'批量禁止失败':'批量激活失败';
						}
						///处理页面模板或页面
						self.topicUpdate({
								type:type,
								list:list,
								btn:btn,
								status:status,
								isalone:isalone,
								alonetd:alonetd
						});
						
						///提示信息
						self.topicTips({
							type:type,
							tips:tips
						});
						
						
						
						/*
						
						开发时开启此部分
						
						var url=APP_SITE_URL+"/index.php?act=admin_topic&op=enable",
										tid=isalone?btn.attr('data-id'):this.communityid.join();
						
						
						$.post(url,{
							tid:tid,
							status:status
						},function(resp){
								if(resp.tip_status==1){
										type=true;
										tips=isalone?status==0?'禁止成功':'激活成功':status==0?'批量禁止成功':'批量激活成功';
								}else{
										type=false;
										tips=isalone?status==0?'禁止失败':'激活失败':status==0?'批量禁止失败':'批量激活失败';
								}
								///处理页面模板或页面
								self.topicUpdate({
										type:type,
										list:list,
										btn:btn,
										status:status,
										isalone:isalone,
										alonetd:alonetd
								});
								
								///提示信息
								self.topicTips({
									type:type,
									tips:tips
								});
						 },'json');*/
					}
			},
			/*更新页面数据*/
			topicUpdate:function(objs){
				var type=objs.type,
						status=objs.status,
						btn=objs.btn,
						list=objs.list,
						isalone=objs.isalone,
						alonetd=objs.alonetd;
				
				/*更新分页组件并初始化选择框(可能需要更新分页)*/
				//$.parser.parse();
				
				if(!type){
					return false;
				}
				
				if(isalone){
					/*单个处理*/
					if(status==0){
						alonetd.eq(6).find('input:checkbox').attr({'data-status':0})
						alonetd.eq(3).text('禁止').removeClass().addClass('g-c-red2');
					}else if(status==1){
						alonetd.eq(6).find('input:checkbox').attr({'data-status':1})
						alonetd.eq(3).text('激活').removeClass().addClass('g-c-blue2');
					}
				}else{
					/*批量处理*/
					list.find('tr').each(function (index, element) {
							if (index != 0) {
									var $td=$(element).find('td'),
											$input =$td.eq(0).find('input:checkbox');
									if ($input.is(':checked')&&status==0) {
											$input.attr({'data-status':0});
											$td.eq(3).text('禁止').removeClass().addClass('g-c-red2');
									}else if($input.is(':checked')&&status==1) {
											$input.attr({'data-status':1});
											$td.eq(3).text('激活').removeClass().addClass('g-c-blue2');
									}
							}
					});
				}
				
				
				if((type||type=='success')&&!isalone){						
						/*切换按钮状态*/
						if(status==0){
								btn.attr({'data-status':1}).text('批量激活');
						}else if(status==1){
								btn.attr({'data-status':0}).text('批量禁止');
						}
				}
			},
			/*操作成功或失败提示信息*/
			topicTips:function(objs){
				var type=objs.type,
						tips=objs.tips,
						times=objs.times||3000,
						dia=dialog({
							content:function(){
								if(type||type=='success'){
										return '<span class="g-c-blue2">'+tips+'</span>'
								}else if(!type||type=='fail'){
										return '<span class="g-c-red2">'+tips+'</span>'
								}
							}
						});
						
				dia.show();
				setTimeout(function(){
					dia.close().remove();
				},times);
			}
	}
});

	

/*程序入口*/
require(['jquery','dialog','page','community','common'], function($,undefined,undefined,Community,undefined) {
	$(function() {
			/*加载完成即渲染分页组件*/
			$.parser.parse();
			
			/*页面元素引用*/
			var $list_selectall=$('#list_selectall'),
					$list_batchtopic=$('#list_batchtopic'),
					$community_list=$('#community_list');
			
			/*初始化清除已选中的多选框*/
			Community.init($community_list,$list_selectall);
			
			/*全选*/
			$list_selectall.click(function(){
				Community.toggleCheckAll($list_selectall,$community_list,$list_batchtopic);
			});
			
			
			/*选中单独某个*/
			$community_list.delegate('input:checkbox','click',function(){
					Community.communityCheck($(this),$list_selectall,$list_batchtopic);
			});
			
			/*批量操作话题*/
			$list_batchtopic.click(function () {
					Community.topicAction($(this),$community_list);
			});
			
			/*单个话题激活*/
			$community_list.find('a:nth-child(1),a:nth-child(2)','.list-m-operate').click(function(e){
					e.preventDefault();
					Community.topicAction($(this),$community_list);
					return false;
			});
			
			
	});
});












