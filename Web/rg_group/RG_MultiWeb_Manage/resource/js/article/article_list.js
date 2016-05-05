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

/*文章列表服务对象(类)*/
define('article',function(require){
	var $=require('jquery');
	return {
			/*保存已选中的文章列表id值*/
			articleid:[],
			/*初始化清除上次被选中的input*/
			init:function(wrap,checkall){
					this.articleid.length=0;
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
			toggleCheckAll:function(checkall,wrap){
				var self=this;
				if(checkall.is(':checked')){
						wrap.find('tr').each(function(index, element) {
								if(index!=0){
									var $input=$(element).find('td:first input:checkbox');
									if(!$input.is(':checked')){
										self.articleid.push($input.prop('checked',true).val());
									}
								}
              	
            });
					}else{
						wrap.find('tr').each(function(index, element) {
							if(index!=0){
								var $input=$(element).find('td:first input:checkbox');
								if($input.is(':checked')){
									$input.prop('checked',false);
								}
							}
            });
						self.articleid.length=0;
					}
			},
			/*选中某个单独多选框*/
			articleCheck:function(cb,checkall){
				var self=this,
				len=this.articleid.length,
				ishave=-1,
				text=cb.val();
				if(cb.is(':checked')){
						if(len==0){
							this.articleid.push(text);
						}else{
							ishave=$.inArray(text,self.articleid);
							if(ishave!=-1){
								this.articleid.splice(ishave,1,text);
							}else{
								this.articleid.push(text);
							}
						}
				}else{
						if(len!=0){
							ishave=$.inArray(text,self.articleid);
							if(ishave!=-1){
								this.articleid.splice(ishave,1);
							}else{
								this.articleid.length=0;
							}
						}
						if(checkall.is(':checked')){
							checkall.prop('checked',false);
						}
				}
			},
			/*批量删除*/
			batchDelete:function(callback){
					var len=this.articleid.length;
					if(len==0){
						dialog({
							title:'温馨提示',
							width:200,
							content:'<span class="g-c-red2">没有选中任何数据</span>'
						}).showModal();
					}else{
						//to do
						//执行删除操作
						
						
						/*更新分页组件*/
						$.parser.parse();
						dialog({
							title:'温馨提示',
							width:300,
							content:'<span class="g-c-blue2">批量删除成功</span>',
							okValue: '确定',
							ok: function () {
								var self=this;
								setTimeout(function(){
									self.close().remove();
								},500);
								callback();
								return false;
							}
						}).showModal();
					}
			}
			
			
			
			
			
	}
});

	

/*程序入口*/
require(['jquery','dialog','page','article','common'], function($,undefined,undefined,Article,undefined) {
	$(function() {
			/*加载完成即渲染分页组件*/
			//$.parser.parse();
			
			
			/*页面元素引用*/
			var $list_selectall=$('#list_selectall'),
					$list_batchdelete=$('#list_batchdelete'),
					$article_list=$('#article_list'),
					$article_page=$('#article_page');
					
			/*分页*/
			$('#article_page').pagination({
				onSelectPage:function(pageNumber,pageSize){
					  console.log('当前页：'+pageNumber);
						console.log('每页记录数：'+pageSize);
				}
			});
					
			
			/*初始化清除已选中的多选框*/
			Article.init($article_list,$list_selectall);
			
			/*全选*/
			$list_selectall.click(function(){
				Article.toggleCheckAll($list_selectall,$article_list);
			});
			
			
			/*选中单独某个，则全选选择框取消选中*/
			$article_list.delegate('input:checkbox','click',function(){
					var $this=$(this);
					Article.articleCheck($this,$list_selectall);
			});
			
			/*批量放入回收站*/
			$list_batchdelete.click(function(){
					Article.batchDelete(function(){
							Article.init($article_list,$list_selectall);
					});
			});
			
			
			
			
			
			
			
			
			

	});
});












