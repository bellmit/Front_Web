/*表格服务*/
'use strict';
angular.module('app')
	.service('dataTableCheckAllService',['dataTableCacheService',function (dataTableCacheService) {
		/*全选服务*/
		var self=this,
			temp_cache=null,
			temp_init=null,
			temp_count=0;


		/*初始化*/
		this.initCheckAll=function (key,tablecheckall) {
			/*检验数据合法性*/
			if(!key && !tablecheckall){
				return;
			}

			/*判断是否存在缓存*/
			if(dataTableCacheService.isKey(key)){

				/*重置临时数据*/
				if(temp_init!==null){
					clearTimeout(temp_init);
					temp_init=null;
				}
				temp_cache=null;
				temp_count=0;

				/*初始化数据*/
				self.init(key,tablecheckall);
			}else{
				/*重新启动初始化,启动监听*/
				temp_init=setTimeout(function () {
					temp_count++;
					clearTimeout(temp_init);
					temp_init=null;
					/*设置时间限制，超过这个限制则停止初始化:6s*/
					if(temp_count<=120){
						self.initCheckAll(key,tablecheckall);
					}
				},50);
			}


		};

		/*初始化配置*/
		this.init=function (key,tablecheckall) {
			/*是否已经调用过*/
			if(dataTableCacheService.isAttr(key,'checkall_flag')){
				self.unbind(dataTableCacheService.getCache(key));
			}
			/*复制临时缓存*/
			/*复制数据,并设置缓存*/
			dataTableCacheService.setCache(key,{
				checkall_flag:true,
				$checkall:tablecheckall.$checkall,
				checkvalue:0/*默认未选中*/,
				checkid:[]/*默认索引数据为空*/,
				checkitem:[]/*默认node数据为空*/,
				$bodywrap:tablecheckall.$bodywrap,
				highactive:'item-lightenbatch',
				checkactive:'admin-batchitem-checkactive'
			});
			/*设置完缓存，然后获取缓存，并操作缓存*/
			temp_cache=dataTableCacheService.getCache(key);
			/*绑定相关事件*/
			self.bind();
		};

		/*事件注册*/
		this.bind=function () {
			/*有全选项和子选项*/
			if(temp_cache.$checkall && temp_cache.$bodywrap){
				/*绑定全选与取消全选*/
				temp_cache.$checkall.on('click',function (){
					var $this=$(this),
						tempstate=parseInt($this.attr('data-check'),10);
					if(tempstate===0){
						/*选中*/
						temp_cache.checkvalue=1;
						$this.attr({
							'data-check':1
						}).addClass(temp_cache.checkactive);
						/*执行全选*/
						self.toggleCheckAll(1);
					}else if(tempstate===1){
						/*取消选中*/
						temp_cache.checkvalue=0;
						$this.attr({
							'data-check':0
						}).removeClass(temp_cache.checkactive);
						/*执行取消全选*/
						self.toggleCheckAll(0);
					}
				});

				/*绑定单项选择*/
				temp_cache.$bodywrap.on('change','input[type="checkbox"]',function () {
					self.toggleCheckItem($(this));
				});


			}
		};
		
		/*取消绑定*/
		this.unbind=function (cache) {
			/*绑定全选与取消全选*/
			cache.$checkall.off('click');

			/*绑定单项选择*/
			cache.$bodywrap.off('change','input[type="checkbox"]');
		};

		/*清除数据*/
		this.clear=function () {
			temp_cache.checkid.length=0;
			temp_cache.checkvalue=0;
			temp_cache.$checkall.attr({
				'data-check':0
			}).removeClass(temp_cache.checkactive);

			/*清除选中*/
			var len=temp_cache.checkitem.length;
			if(len!==0){
				var i=0;
				for(i;i<len;i++){
					temp_cache.checkitem[i].closest('tr').removeClass(temp_cache.highactive);
					temp_cache.checkitem[i].prop('checked', false);
				}
				temp_cache.checkitem.length=0;
			}
		};


		/*过滤数据(清除并过滤已经选中的数据)*/
		this.filterData=function (key) {
			/*清除选中*/
			var checkid=temp_cache.checkid,
				len=checkid.length;
			if(len!==0 && typeof key!=='undefined'){
				var checkitem=temp_cache.checkitem;
				if($.isArray(key)){
					var j=0,
						jlen=key.length,
						k=0,
						klen=checkitem.length;

					outer:for(j;j<jlen;j++){
						for(k;k<klen;k++){
							if(checkid[k]===key[j]){
								checkitem[k].closest('tr').removeClass(temp_cache.highactive);
								checkitem[k].prop('checked', false);
								checkitem.splice(k,1);
								checkid.splice(k,1);
								k=0;
								klen=checkid.length;
								continue outer;
							}
						}
					}
					if(temp_cache.checkid.length===0){
						self.clear();
					}
				}else{
					var i=len - 1;
					for(i;i>=0;i--){
						if(checkid[i]===key){
							checkitem[i].closest('tr').removeClass(temp_cache.highactive);
							checkitem[i].prop('checked', false);
							checkitem.splice(i,1);
							checkid.splice(i,1);
							break;
						}
					}
					if(checkid.length===0){
						self.clear();
					}
				}
			}
		};


		/*全选和取消全选*/
		this.toggleCheckAll=function (chk) {
			if(chk===1){
				/*选中*/
				/*不依赖于状态*/
				temp_cache.$bodywrap.find('tr').each(function (index, element) {
					var $input=$(element).find('td:first input:checkbox');
					if(index===0){
						if($input.length==0){
							self.clear();
							return false;
						}
					}
					if(!$input.is(':checked')){
						temp_cache.checkid.push($input.prop('checked',true).val());
						temp_cache.checkitem.push($input);
						$input.closest('tr').addClass(temp_cache.highactive);
					}
				});
			}else if(chk===0){
				/*取消选中*/
				self.clear();
			}
		};


		/*绑定选中某个单独多选框*/
		this.toggleCheckItem=function ($input) {
			var checkid=temp_cache.checkid,
				checkitem=temp_cache.checkitem,
				len=checkid.length,
				ishave=-1,
				text=$input.val();

			if($input.is(':checked')){
				if (len === 0) {
					checkid.push(text);
					checkitem.push($input);
					$input.closest('tr').addClass(temp_cache.highactive);
					temp_cache.$checkall.attr({
						'data-check':1
					}).addClass(temp_cache.checkactive);
				} else {
					ishave=$.inArray(text,checkid);
					$input.closest('tr').addClass(temp_cache.highactive);
					if(ishave!==-1){
						checkid.splice(ishave,1,text);
						checkitem.splice(ishave,1,$input);
					}else{
						checkid.push(text);
						checkitem.push($input);
					}
				}

			}else{
				ishave=$.inArray(text,checkid);
				if(ishave!==-1){
					checkid.splice(ishave,1);
					checkitem[ishave].closest('tr').removeClass(temp_cache.highactive);
					checkitem.splice(ishave,1);
					if(checkid.length===0){
						self.clear();
					}
				}
			}
		};


		/*获取选中的数据*/
		this.getBatchData=function () {
			return temp_cache.checkid;
		};


		/*获取选中的文档节点*/
		this.getBatchNode=function () {
			return temp_cache.checkitem;
		};

	}]);
