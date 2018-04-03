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
		var curid=Common.getID('company_params');

		
		//dom文档引用
		var $introwrap=$('#introwrap');
		
		
		
		//初始化查询
		$.ajax({
					url:'../../../json/company_intro.json',
					dataType:"json",
					data:'id='+curid,
					type:'get',
					async:false,
					success: function(result){
							var str='';
							for(var i in result){
									if(result[i]['name']){
										str+='<div class="intro-row"><p class="intro-title">'+result[i]['name']+'</p>';
									}
									if(result[i]['imglist']&&result[i]['imglist'].length!=0){
										str+='<ul class="clearfix"><li><img width="175" height="175" alt="" src="'+result[i]['imglist'].join('" ></li><li><img width="175" height="175" alt="" src="')+'" ></li></ul>';
										
									}
									
							}
							if(str!=''){
								$introwrap.html(str+'</div>');
							}
					},
					error:function(){}
		});
		

					
			
			
			
			
	});
});


