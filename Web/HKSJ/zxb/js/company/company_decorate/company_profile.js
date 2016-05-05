/*配置依赖*/
require.config({
	baseUrl:'../../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'share':'plugins/share',
		'common':'common/common',
		'company_common':'common/company_common',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'city_select':'widgets/city_select',
		'cookie':'plugins/cookie',
		'modal_dialog':'widgets/modal_dialog'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'validform':{
			deps:['jquery']
		}
	},
	waitSeconds:15
});


/*程序入口*/
require(['jquery','dialog','share','rule','commonfn','validform','city_select','modal_dialog','cookie','common','company_common'],function($,undefined,Share,Rule,CommonFn,undefined,City_Select,Modal_Dialog,undefined,Common,Company_Common) {
	$(function() {
		
		//获取页面传值id
		var curid=Common.getID('company_params'),
				$urlwrap=$('#urlwrap'),
				$infowrap=$('#infowrap'),
				$detailwrap=$('#detailwrap'),
				$servewrap=$('#servewrap');

		
		//初始化查询
		$.ajax({
					url:'../../../json/company_profile.json',
					dataType:"json",
					data:'id='+curid,
					type:'get',
					async:false,
					success: function(result){
							$urlwrap.html('<h3>公司简介</h3><img src="'+result.url+'" width="160" height="160" alt=""/>');
							$infowrap.html('<p>'+result.info.join('</p><p>'))+'</p>';
							$detailwrap.html(result.detail);
							$servewrap.html(result.serve);
					},
					error:function(){}
			});
		
		
		

					
			
			
			
			
	});
});


