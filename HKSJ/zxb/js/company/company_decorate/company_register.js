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
		var $register_wrap=$('#register_wrap');
		
		
		var htmltemplate='<table>'+
		' <tr>'+
		'  <td>公司名称</td><td>$name</td>'+
		' </tr>'+
		' <tr>'+
		'  <td>企业类型</td><td>$type</td>'+
		' </tr>'+
		' <tr>'+
		'  <td>注册地址</td><td>$address</td>'+
		' </tr>'+
		' <tr>'+
		'  <td>注册资金</td><td>$register_capital万元</td>'+
		' </tr>'+
		' <tr>'+
		'  <td>营业期限</td><td>$createTime/$datetime</td>'+
		' </tr>'+
		' <tr>'+
		'  <td>成立日期</td><td>$createTime</td>'+
		' </tr>'+
		' <tr>'+
		'  <td>登记机关</td><td>$register_authority</td>'+
		' </tr>'+
		' <tr>'+
		'  <td>经营范围</td>'+
		'  <td><p>$business</p></td>'+
		' </tr>'+
		' <tr>'+
		'  <td>年检时间</td><td>$checktime</td>'+
		' </tr>'+
		' <tr>'+
		'  <td>注册号</td><td>$register_no</td>'+
		' </tr>'+
		' <tr>'+
		'  <td>法定代表人</td><td>$legal_person</td>'+
		' </tr>'+
		'</table>';
		
		//初始化查询
		$.ajax({
					url:'../../../json/company_register.json',
					dataType:"json",
					data:'id='+curid,
					type:'get',
					async:false,
					success: function(result){
							var str=htmltemplate.replace('$name',result['name'])
							.replace('$type',result['type'])
							.replace('$address',result['address'])
							.replace('$register_capital',result['register_capital'])
							.replace(/\$createTime/g,result['createTime'])
							.replace('$datetime',result['datetime'])
							.replace('$register_authority',result['register_authority'])
							.replace('$business',result['business'])
							.replace('$checktime',result['checktime'])
							.replace('$register_no',result['register_no'])
							.replace('$legal_person',result['legal_person']);
							
							$register_wrap.html('<h3>工商信息</h3>'+str);
					},
					error:function(){
						$register_wrap.html('<h3>工商信息</h3>');
					}
		});
					
			
			
			
			
	});
});


