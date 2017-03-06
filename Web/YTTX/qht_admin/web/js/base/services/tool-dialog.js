/*弹窗服务*/
'use strict';
angular.module('tool.dialog',[])
	.service('toolDialog',function () {
		var flag=typeof (dialog==='function'&&dialog)?true:false;

		/*提示框*/
		this.dia=function(config){
			if(flag){
				if(config){
					return dialog(config);
				}else{
					return dialog({
						zIndex:2000,
						title:'温馨提示',
						okValue:'确定',
						width:300,
						ok:function(){
							this.close();
							return false;
						},
						cancel:false
					});
				}
			}
			return null;
		};
		/*提示类型*/
		this.show=function (config) {
			var tempdia=config.tip||config.dia,
				type=config.type,
				value=config.value;

			if(tempdia){
				if(type==='succ'){
					tempdia.content('<span class="g-c-succ g-btips-succ">'+value+'</span>').show();
				}else if(type==='warn'){
					tempdia.content('<span class="g-c-warn g-btips-warn">'+value+'</span>').show();
				}else if(type==='error'){
					tempdia.content('<span class="g-c-err g-btips-error">'+value+'</span>').show();
				}else{
					tempdia.content('<span class="g-c-succ g-btips-succ">'+value+'</span>').show();
				}
			}
		};
		//弹窗确认
		this.sureDialog = function (tips){
			//是否支持弹窗
			if(!flag){
				return null;
			}


			/*内部提示信息*/
			var innerdia;
			if(tips&&typeof tips==='object'){
				innerdia=tips;
			}else{
				innerdia=dialog({
					title:'温馨提示',
					okValue:'确定',
					width:300,
					ok:function(){
						this.close();
						return false;
					},
					cancel:false
				});
			}
			/*关键匹配*/
			var actionmap={
				'delete':'删除',
				'cancel':'取消',
				'change':'改变',
				'add':'添加',
				'update':'更新'
			};


			/*确认框类*/
			function sureDialogFun(){}

			/*设置函数*/
			sureDialogFun.prototype.sure=function (str,fn,tips,repalceflag) {
				//是否支持弹窗
				if(!flag){
					return null;
				}
				var tipstr='',
					iskey=typeof actionmap[str]==='string',
					key=iskey?actionmap[str]:str;

				if(!tips){
					tips='';
				}

				if(typeof actionmap[str]==='string'){
					if(repalceflag){
						tipstr='<span class="g-c-warn g-btips-warn">'+tips+'</span>';
					}else{
						tipstr='<span class="g-c-warn g-btips-warn">'+tips+'是否真需要 "'+actionmap[str]+'" 此项数据</span>';
					}
				}else{
					if(repalceflag){
						tipstr='<span class="g-c-warn g-btips-warn">'+tips+'</span>';
					}else{
						tipstr='<span class="g-c-warn g-btips-warn">'+tips+'是否真需要 "'+str+'" 此项数据</span>';
					}
				}

				dialog({
					title:'温馨提示',
					content:tipstr,
					width:300,
					okValue: '确定',
					ok: function () {
						if(fn&&typeof fn==='function'){
							//执行回调
							fn.call(null,{
								action:key,
								dia:innerdia
							});
							this.close().remove();
						}
						return false;
					},
					cancelValue: '取消',
					cancel: function(){
						this.close().remove();
					}
				}).showModal();
			};

			return new sureDialogFun();
		};
	});
