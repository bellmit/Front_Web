/*表格服务*/
'use strict';
angular.module('app')
	.service('dataTableColumn',['toolUtil','toolDialog','$sce','$timeout',function (toolUtil,toolDialog,$sce,$timeout) {

		/*初始化配置*/
		var self=this,
			init_colgroup=null,
			init_thead=null,
			init_hidelist=null,
			init_len=0,
			hide_len=0,
			fn=null,
			selectwrap=null,
			tablecache=null,
			module_time=null;


		/*初始化*/
		this.initColumn=function (table) {
			/*检验数据合法性*/
			if(!table){
				return
			}
			/*清除缓存数据*/
			self.unbind();
			self.clear();
			/*复制数据*/
			self.initExtend(table);

			/*初始化数据*/
			if(hide_len===0){
				/*设置下拉模型*/
				table['selectshow']=false;
				/*设置分组和表头模型*/
				self.createGroup();
				self.createThead();
			}else{
				/*设置下拉模型*/
				table['selectshow']=true;
				var time_id=null,
					count=0;

				/*启动监听*/
				time_id=setInterval(function () {
					count++;
					tablecache=fn.call(null);
					if(tablecache!==null){
						clearInterval(time_id);
						time_id=null;

						/*初始化组件*/
						self.initWidget(table);
						/*绑定相关事件*/
						self.bind(table);
					}
					/*计时器，防止请求超时，不断的监听相关数据:6s时间界限*/
					if(count>=600){
						clearInterval(time_id);
						time_id=null;
						count=null;
					}
				},1000/60);
			}
		};
		
		/*初始化数据复制*/
		this.initExtend=function (table) {
			/*复制数据*/
			init_colgroup=$.extend(true,{},table.init_colgroup);
			init_thead=$.extend(true,{},table.init_thead);
			init_hidelist=table.hide_list.slice(0).sort(function (a,b) {
				return a - b;
			});
			init_len=table.init_len;
			hide_len=init_hidelist.length;
			selectwrap=$(table.selectwrap);
			fn=table.fn;
		};

		/*初始化组件*/
		this.initWidget=function (table) {
			/*设置分组和表头模型*/
			/*隐藏*/
			var tempid,
				str='',
				i=0;

			for(i;i<hide_len;i++){
				tempid=init_hidelist[i];
				str+='<option value="'+tempid+'">第'+(tempid + 1)+'列</option>';
				tablecache.column(tempid).visible(false);
			}
			if(str!==''){
				/*赋值控制下拉选项*/
				$(str).appendTo(selectwrap.html(''));
			}
			/*更新模型*/
			/*table.colgroup=$sce.trustAsHtml(self.createColgroup(hide_len));
			table.thead=$sce.trustAsHtml(self.createThead(init_hidelist));*/


			module_time=$timeout(function(){
				/*更新模型*/
				table.colgroup=$sce.trustAsHtml(self.createColgroup(hide_len));
				table.thead=$sce.trustAsHtml(self.createThead(init_hidelist));
				/*清除延时任务*/
				setTimeout(function () {
					if(module_time){
						$timeout.cancel(module_time);
						module_time=null;
					}
				},500);
			},0);


			/*setTimeout(function () {
				table.colgroup=$sce.trustAsHtml(self.createColgroup(hide_len));
				table.thead=$sce.trustAsHtml(self.createThead(init_hidelist));
			},3000);*/
		};
		
		/*绑定相关事件*/
		this.bind=function (table) {
			selectwrap.on('change',function () {
				/*
				切换显示相关列
				tablecache.column(index).visible(flag);
				*/

				var $this=$(this),
					isselect=$this.is(':selected'),
					selectitem=selectwrap.find(':selected'),
					index=$this.val(),
					count=selectitem.size();


				/*切换显示相关列*/
				tablecache.column(index).visible(isselect);

				/*更新模型*/
				if(count!==0){
					/*有勾选数据*/
					var selectlist=init_hidelist.slice(0);
					selectitem.each(function () {
						var value=$(this).val(),
							len=selectlist.length,
							i=0;

						for(i;i<len;i++){
							if(selectlist[i]===value){
								selectitem.splice(i,1);
								break;
							}
						}

					});
					/*无勾选数据*/
					table.colgroup=$sce.trustAsHtml(self.createColgroup(selectlist.length));
					table.thead=$sce.trustAsHtml(self.createThead(selectlist));
				}else{
					/*无勾选数据*/
					table.colgroup=$sce.trustAsHtml(self.createColgroup());
					table.thead=$sce.trustAsHtml(self.createThead());
				}
			});
		};

		/*解绑事件*/
		this.unbind=function () {
			/*解绑事件*/
			if(selectwrap){
				selectwrap.off('change');
			}
		};

		/*重置数据*/
		this.clear=function () {
			/*重置缓存数据*/
			init_colgroup=null;
			init_thead=null;
			init_hidelist=null;
			init_len=0;
			hide_len=0;
			selectwrap=null;
			fn=null;
			tablecache=null;

			/*重置延时任务*/
			if(module_time){
				$timeout.cancel(module_time);
				module_time=null;
			}
		};

		/*重新生成分组*/
		this.createColgroup=function (arr) {
			var str='';
			if(typeof arr==='undefined'){
				/*全隐藏*/
				for(var i in init_colgroup){
					str+=init_colgroup[i];
				}
			}else{
				/*部分隐藏*/
				var j=0,
					len=init_len - arr.length,
					colitem=parseInt(50/len,10);

				/*解析分组*/
				if(colitem * len<=(50 - len)){
					colitem=len + 1;
				}
				for(j;j<len;j++){
					str+='<col class="g-w-percent'+colitem+'" />';
				}
			}
			return str;
		};

		/*重新生成头信息*/
		this.createThead=function (arr) {
			var str='';
			if(typeof arr==='undefined'){
				/*全隐藏*/
				for(var i in init_thead){
					str+=init_thead[i];
				}
			}else{
				var head=$.extend(true,{},init_thead),
					hidelist=arr.sort(function (a,b) {
						return a - b;
					}),
					len=hidelist.length,
					j=0;

				/*解析头部*/
				for(j;j<len;j++){
					delete head[hidelist[j]];
				}
				for(var o in head){
					str+=head[o];
				}
			}
			return '<tr>'+str+'</tr>';
		};

	}]);
