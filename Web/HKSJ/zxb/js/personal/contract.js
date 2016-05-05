/*配置依赖*/
require.config({
	baseUrl:'../../js',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/manage_common',
		'cookie':'plugins/cookie'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','cookie','common'],
function($,undefined,undefined,Common) {
	$(function() {
			var $contract_id=$('#contract_id'),
					$print=$('#print'),
					$company_contract=$('#company_contract'),
					$zxb_contract=$('#zxb_contract');
			
			
			
			//详细查看
			//装修公司合同
			$company_contract.on('click',function(){
						Common.setParams('contract_params','id='+parseInt(Math.random()*100));
						window.location.href='contract_detail.html';
			});
			//装小宝合同
			$zxb_contract.on('click',function(){
						Common.setParams('contract_params','id='+parseInt(Math.random()*100));
						window.location.href='contract_detail.html';
			});
			
			
			
			
	});
});
