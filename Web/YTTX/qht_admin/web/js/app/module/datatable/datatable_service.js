/*表格服务*/
'use strict';
angular.module('app')
	.service('dataTableColumn',['toolUtil','toolDialog','$sce',function (toolUtil,toolDialog,$sce) {

		/*初始化配置*/
		var self=this,
			init_colgroup=null,
			init_thead=null,
			init_len=0,
			hide_len=0,
			fn=null,
			selectwrap=null,
			tablecache=null;


		/*初始化*/
		this.initColumn=function (table) {
			var hide_list=table.hide_list,
				temp_colgroup='',
				temp_thead='',
				str='',
				time_id=null;

			/*复制数据*/
			init_colgroup=$.extend(true,{},table.init_colgroup);
			init_thead=$.extend(true,{},table.init_thead);
			init_len=table.init_len;
			hide_len=table.hide_len;
			selectwrap=$(table.selectwrap);
			fn=table.fn;

			/*初始化数据*/
			if(!$.isEmptyObject(hide_list)){

				/*启动监听*/
				time_id=setInterval(function () {
					tablecache=fn.call(null);
					if(tablecache!==null){
						clearInterval(time_id);
						time_id=null;
						/*隐藏*/
						var temp_item,
							temphide,
							tempid;

						for(var z in hide_list){
							temp_item=hide_list[z];
							temphide=temp_item['hide'];
							tempid=temp_item['id'];

							if(ishide){
								tablecache.column(tempid).visible(false);
							}else{
								tablecache.column(tempid).visible(true);
							}
						}
					}
				},1000/60);

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
				/*绑定相关事件*/
				self.bind(table);

			}else{
				/*没有需要隐藏的对象则将初始化值赋值给模型*/
				for(var i in init_colgroup){
					temp_colgroup+=init_colgroup[i];
				}
				table.colgroup=$sce.trustAsHtml(temp_colgroup);

				for(var j in table.init_thead){
					temp_thead+=init_thead[j];
				}
				table.thead=$sce.trustAsHtml('<tr>'+temp_thead+'</tr>');
			}
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
		this.reset=function () {
			tablecache=null;
			fn=null;
			init_colgroup=null;
			init_thead=null;
			init_len=0;
			hide_len=0;
			selectwrap=null;
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
