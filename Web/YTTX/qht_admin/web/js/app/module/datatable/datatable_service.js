/*表格服务*/
'use strict';
angular.module('app')
	.service('dataTableColumn',['toolUtil','toolDialog','$sce',function (toolUtil,toolDialog,$sce) {

		/*初始化配置*/
		var self=this,
			init_colgroup=null,
			init_thead=null,
			init_hidelist=null,
			init_len=0,
			hide_len=0,
			fn=null,
			selectwrap=null,
			tablecache=null;


		/*初始化*/
		this.initColumn=function (table) {
			/*检验数据合法性*/
			if(!table){
				return
			}
			/*清除缓存数据*/
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
			init_hidelist=table.hide_list.slice(0);
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

				tablecache.column(tempid).visible(false);
			}

			/*设置分组和表头模型*/
			var	temp_colgroup='',
				temp_thead='';

			/*如果存在需要隐藏的对象*/
			var hide_item,
				ishide,
				id,
				count=0,
				selectlist=[];

			for(var o in hide_list){
				hide_item=hide_list[o];
				ishide=hide_item['hide'];
				id=hide_item['id'];

				if(ishide){
					str+='<option value="'+id+'">第'+(id + 1)+'列</option>';
				}else{
					count++;
					selectlist.push(id);
					str+='<option selected value="'+id+'">第'+(id + 1)+'列</option>';
				}
			}
			/*更新模型*/
			table.colgroup=$sce.trustAsHtml(self.createColgroup({
				count:count,
				checklist:selectlist
			}));
			table.thead=$sce.trustAsHtml(self.createThead({
				count:count,
				checklist:selectlist
			}));

			/*赋值控制下拉选项*/
			$(str).appendTo(selectwrap.html(''));
		};
		
		/*绑定相关事件*/
		this.bind=function (table) {
			selectwrap.on('change',function () {
				console.log('aaa');
				//没有列表引用则不进行监听
				if(tablecache===null){
					return false;
				}

				var $this=$(this),
					isselect=$this.is(':selected'),
					selectitem=selectwrap.find(':selected'),
					index=$this.val(),
					count=selectitem.size();

				if(count!==0){
					/*有勾选数据*/
					var selectlist=[];
					selectitem.each(function () {
						selectlist.push($(this).val());
					});
					self.toggleColumn(table,{
						index:index,
						flag:isselect,
						count:count,
						checklist:selectlist
					});
				}else{
					/*无勾选数据*/
					self.toggleColumn(table,{
						index:index,
						flag:isselect,
						count:count
					});
				}
			});
		};

		/*解绑事件*/
		this.unbind=function () {
			/*解绑事件*/
			selectwrap.off('change');
		};

		/*重置数据*/
		this.clear=function () {
			init_colgroup=null;
			init_thead=null;
			init_hidelist=null;
			init_len=0;
			hide_len=0;
			selectwrap=null;
			fn=null;
			tablecache=null;
		};

		/*重新生成分组*/
		this.createColgroup=function (config) {
			var count=config.count,
				str='';

			if(count===hide_len){
				for(var i in init_colgroup){
					str+=init_colgroup[i];
				}
			}else{
				var j=0,
					len=init_len - count,
					colitem=parseInt(50/len,10);

				/*解析分组*/
				if(colitem * len<=(50 - len)){
					colitem=len+1;
				}
				for(j;j<len;j++){
					str+='<col class="g-w-percent'+colitem+'" />';
				}
			}
			return str;
		};

		/*重新生成头信息*/
		this.createThead=function (config) {
			var count=config.count,
				str='';

			if(count===hide_len){
				for(var i in init_thead){
					str+=init_thead[i];
				}
			}else{
				var head=$.extend(true,{},init_thead),
					checklist=config.checklist,
					j=0;

				/*解析头部*/
				for(j;j<count;j++){
					delete head[checklist[j]];
				}
				for(var o in head){
					str+=head[o];
				}
			}
			return '<tr>'+str+'</tr>';
		};


		/*显示隐藏数据*/
		this.toggleColumn=function (table,config) {
			var index=config.index,
				flag=config.flag;

			/*更新模型*/
			table.colgroup=$sce.trustAsHtml(self.createColgroup(config));
			table.thead=$sce.trustAsHtml(self.createThead(config));

			/*切换显示相关列*/
			tablecache.column(index).visible(flag);
		};

	}]);
