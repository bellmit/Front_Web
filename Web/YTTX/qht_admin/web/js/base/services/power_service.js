/*权限列表服务*/
'use strict';
angular.module('app')
	.service('powerService',['toolUtil','toolDialog','BASE_CONFIG','loginService',function (toolUtil,toolDialog,BASE_CONFIG,loginService) {
		/*获取缓存数据*/
		var cache=loginService.getCache(),
			powerCache=$.extend(true,{},cache['powerMap']),
			self=this;



		/*生成头*/
		this.createHeader=function () {
			var header/*头*/,
				colgroup/*分组*/;


			var poweritem=toolUtil.getAllPower();

			if(poweritem){
				var powermap,
					str='',
					res=[];



			}else{
				colgroup='<col class="g-w-percent50" />';
			}
		};




		/*导航服务--获取虚拟挂载点*/
		this.getRoot=function () {
			var islogin=loginService.isLogin(cache);
			if(islogin){
				var logininfo=cache.loginMap;
				return {
					'orgname':logininfo.username,
					'id':logininfo.param.organizationId
				};
			}else{
				/*退出系统*/
				cache=null;
				toolUtil.loginTips({
					clear:true,
					reload:true
				});
				return null;
			}
		};
	}]);
