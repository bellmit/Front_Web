/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'common':'js/common/common',
		'dialog':'js/lib/artDialog/dialog',
		'rule':'js/widgets/rules',
		'validform':'js/plugins/validform',
		'commonfn':'js/widgets/commonfn'
	},
	shim:{
		'bootstrap':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery']
		},
		'dialog':{
				deps:['jquery']
		},
		'validform':{
				deps:['jquery']
		},
		'commonfn':{
				deps:['jquery','rule']
		}
	}
});



/*程序入口*/
require(['jquery','bootstrap','common','dialog','rule','validform','commonfn'], function($,$strap,undefined,undefined,Rule,undefined,CommonFn) {
	$(function() {
		/*页面元素引用*/
		var $poOrder=$('#poOrder'),
				$cardNo=$('#cardNo'),
				$inputAddr_recName=$('#inputAddr_recName'),
				$inputAddr_recPhone=$('#inputAddr_recPhone'),
				$address1=$('#address1'),
				$address2=$('#address2'),
				$addresswrap=$('#addresswrap'),
				$country=$('#country'),
				$province=$('#province'),
				$city=$('#city'),
				$district=$('#district'),
				$recAddr=$('#recAddr');
		
		//会员联系电话格式化
		$inputAddr_recPhone.on('keyup',function(e){
				var val=this.value;
				val=val.replace(/\D*/g,'');
				val=CommonFn.phoneFormat(val);
				this.value=val;
		});	
		
		//经销商卡号格式化
		$cardNo.on('keyup',function(e){
				var val=this.value;
				val=val.replace(/\D*/g,'');
				val=CommonFn.cardFormat(val);
				this.value=val;
		});	
			
		//表单校验
		var addressobj={
				country:'',
				province:'',
				city:'',
				district:'',
				recAddr:''
		};
		var tipobj={
				cardNo:'',
				inputAddr_recName:'',
				inputAddr_recPhone:''
		};
		$validobj=$poOrder.Validform({
				ajaxPost: true,
				datatype:{
					//自定义校验方式
					'selfcard':function(gets,obj,curform,regxp){
							var card=CommonFn.trims(gets),
									len=card.length;
							return len==19?true:'卡号位数不正确';
					},
					'selfphone':function(gets,obj,curform,regxp){
							return CommonFn.isMobilePhone(CommonFn.trims(gets));
					}
				},
				beforeSubmit: function(curform) {
					/*to do*/
					//send ajax 填充具体业务逻辑
					//开发时开启下部代码
					var dia=null,
					issucces=false;
					$.ajax({
							url:'请求地址',
							type:'post',
							dataType:"json",
							data:'相关请求参数',
							success: function(data){
									if(data){									
											dia=dialog({
												title:'温馨提示',
												width:200,
												content:'<span class="g-c-cyan1">保存成功</span>'
											}).show();
											issucces=true;
									}else{
											dia=dialog({
												title:'温馨提示',
												width:200,
												content:'<span class="g-c-red2">保存失败</span>'
											}).show();
											issucces=false;
									}
							},
							error: function(){
									dia=dialog({
										title:'温馨提示',
										width:200,
										content:'<span class="g-c-red2">保存失败</span>'
									}).show();
									issucces=false;
							}
					});
					setTimeout(function(){
						dia.close().remove();
						if(issucces){
							window.location.href='跳转到下一步地址';
						}
						
						//此处为测试代码,开发阶段请删除此段代码
						window.location.href='goodslist.html';
						
					},3000);
					return false;
				},
				tiptype: function(msg,o) { 
					var id=o.obj[0].id,
					curtype=o.type;
					if(curtype==1||curtype==3){
							if(typeof tipobj[id]==='string'){
									tipobj[id]=dialog({
									content:'<span class="g-c-red2 g-btips-error">'+msg+'</span>',
									align:'right',
									padding:8
								});
								tipobj[id].show(document.getElementById(id));
							}else if(typeof tipobj[id]!=='string'){
								tipobj[id].content('<span class="g-c-red2 g-btips-error">'+msg+'</span>');
								tipobj[id].show();
							}
					}else if(curtype==2){
							if(typeof tipobj[id]!=='string'){
								tipobj[id].content('<span class="g-c-cyan1 g-btips-succ"></span>');
								setTimeout(function(){
										tipobj[id].close();
								},1000);
							}
					}
				}
			});
			//添加校验规则
			var baserule=[{
				ele:$cardNo,
				datatype: "selfcard",
				nullmsg: "经销商卡号不能为空",
				errormsg: "经销商卡号格式不正确",
				sucmsg: ""
			},
			{
				ele:$inputAddr_recName,
				datatype: "*",
				nullmsg: "收货人姓名不能为空",
				errormsg: "收货人姓名不存在",
				sucmsg: ""
			},
			{
				ele:$inputAddr_recPhone,
				datatype: "selfphone",
				nullmsg: "联系电话不能为空",
				errormsg: "联系电话格式不正确",
				sucmsg: ""
			}],
			addressrule=[{
				ele:$country,
				datatype: "*",
				nullmsg: "所在国家不能为空",
				errormsg: "所在国家信息不正确",
				sucmsg: ""
			},
			{
				ele:$province,
				datatype: "*",
				nullmsg: "所在省份不能为空",
				errormsg: "所在身份信息不正确",
				sucmsg: ""
			},
			{
				ele:$city,
				datatype: "*",
				nullmsg: "所在城市不能为空",
				errormsg: "所在城市信息不正确",
				sucmsg: ""
			},
			{
				ele:$district,
				datatype: "*",
				nullmsg: "所在县市不能为空",
				errormsg: "所在县市信息不正确",
				sucmsg: ""
			},
			{
				ele:$recAddr,
				datatype: "*",
				nullmsg: "详细地址不能为空",
				errormsg: "详细地址信息不正确",
				sucmsg: ""
			}];
			$validobj.addRule(baserule);



		//绑定表单地址切换
		$.each([$address1,$address2],function(i,v){
					$label=this,
					selector=$label.selector.slice(1);
					
					//地址初始化
					if(selector=='address1'){
							$label.prop({'checked':true});
							$addresswrap.hide();
							$label.on('click',function(){
									var $this=$(this);
									if($this.prop('checked')){
											$addresswrap.hide();
											for(var k in addressobj){
													if(tipobj.hasOwnProperty(k)){
															addressobj[k]=tipobj[k];
															delete tipobj[k];
															if(typeof addressobj[k]!=='string'){
																	addressobj[k].close();
															}
													}
											}
											baserule.length=3;
											$validobj.addRule(baserule);
									}
							});
					}else if(selector=='address2'){
							$label.on('click',function(){
									var $this=$(this);
									if($this.prop('checked')){
											$addresswrap.show();
											for(var k in addressobj){
													if(!tipobj.hasOwnProperty(k)){
															tipobj[k]=addressobj[k];
															if(typeof addressobj[k]!=='string'){
																	addressobj[k].close();
															}
													}
											}
											if(baserule.length==3){
												$.merge(baserule,addressrule);
												$validobj.addRule(baserule);
											}
									}
							});
					}
		});



		
	});
});
