/*配置依赖*/
require.config({
	baseUrl:'../js/',
	paths:{
		'jquery':'lib/jquery/jquery-2.1.4.min',
		'jquery_mobile':'lib/jquery/jquery-mobile.min',
		'dialog':'lib/artDialog/dialog',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'slide':'widgets/slide'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'jquery_mobile':{
			deps:['jquery']
		},
		'validform':{
			deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','jquery_mobile','dialog','rule','commonfn','validform','slide'],function($,$jm,undefined,Rule,CommonFn,undefined,Slide) {
	$(function(){
		
		//dom对象引用
		var $header_menu=$('#header_menu'),
			$header_item=$header_menu.children(),
			$header_btn=$('#header_btn'),
			$screen_index=$('#screen_index'),
			$screen_product=$('#screen_product'),
			$screen_scene=$('#screen_scene'),
			$screen_self=$('#screen_self'),
			$screen_app=$('#screen_app'),
			$screen_contact=$('#screen_contact'),
			$screen_help=$('#screen_help'),
			$help_btn=$('#help_btn'),
			$help_detail=$('#help_detail'),
			$help_detailshow=$help_detail.children(),
			$win=$(window),
			screen_pos=[{
				node:$screen_index,
				pos:0
			},{
				node:$screen_product,
				pos:0
			},{
				node:$screen_scene,
				pos:0
			},{
				node:$screen_self,
				pos:0
			},{
				node:$screen_app,
				pos:0
			},{
				node:$screen_contact,
				pos:0
			},{
				node:$screen_help,
				pos:0
			}],
			isMobile=false;


		//dom 表单对象引用
		var $contact_form=$('#contact_form'),
				$username=$('#username'),
				$useremail=$('#useremail'),
				$remark=$('#remark'),
				validobj=null,
				dia=dialog();


				
				
		//校验规则
			var ruleobj=[{
						ele:$username,
						datatype:"*",
						nullmsg: "名称不能为空",
						errormsg: "",
						sucmsg: ""
					},{
							ele:$useremail,
							datatype:"selfemail",
							nullmsg: "邮箱不能为空",
							errormsg: "邮箱格式不规范",
							sucmsg: ""
					},{
							ele:$remark,
							datatype:"*",
							nullmsg: "描述信息不能为空",
							errormsg: "",
							sucmsg: ""
					}];


		//初始化
		(function(){
			//初始化菜单
			var i= 0,
				len=screen_pos.length,
				j= 0,
				pos=$(window).scrollTop();
			for(i;i<len;i++){
				var temptop=screen_pos[i]["node"].offset().top;
				screen_pos[i]["pos"]=temptop;

				var minpos=parseInt(pos - 150,0),
					maxpos=parseInt(pos + 150,0);
				if(temptop>=minpos&&temptop<=maxpos){
					$header_item.eq(i).addClass('menu-active').siblings().removeClass('menu-active');
				}
			}


			/*
			* 初始化pc或移动视口标识
			*
			* */
			var winwidth=$win.width();
			if(winwidth>=1200){
				isMobile=false;
			}else{
				isMobile=true;
			}


			/*
			 * 初始化帮助中心按钮
			 * */

			var helpheight=$help_btn.height();
			if(parseInt(helpheight,10)<420){
				$help_btn.addClass('help-wrap-support');
			}else{
				$help_btn.removeClass('help-wrap-support');
			}


			/**
			 * 加载客户端下载链接(此处主要是动态加载)
			 */
			/*$.post("phoneversion/getPhoneversionLatest.do",function(result){
				$.each(result,function(index,value){
					if (value.os==1) {
						//android
						$(".android-btn").children("a").attr("href",value.url);
					}else {
						//ios
						$(".iphone-btn").children("a").attr("href",value.url);
					}
				});

			});*/



		}());


		//监听菜单导航
		$header_menu.on($.EventName.click,'li',function(e){
			e.preventDefault();
			var $this=$(this),
				index=$this.index();
			if(isMobile){
				$('html,body').animate({'scrollTop':screen_pos[index]['pos'] - 40 +'px'},500);
			}else{
				$('html,body').animate({'scrollTop':screen_pos[index]['pos'] - 120 +'px'},500);
			}
			return false;
		});


		//监听导航切换显示隐藏
		$header_btn.on($.EventName.click,function(){
			if($header_btn.hasClass('header-btnactive')){
				//隐藏
				$header_btn.removeClass('header-btnactive');
				$header_menu.removeClass('g-d-showi');
			}else{
				//显示
				$header_btn.addClass('header-btnactive');
				$header_menu.addClass('g-d-showi');
			}
		});


		//监听帮助中心切换显示
		$help_btn.on($.EventName.click,'li',function(){
			var $this=$(this),
				index=$this.index();

			switch(index){
				case 0:
					$help_detailshow.eq(index).animate({
						left:'0',
						top:'0'
					},500);
					break;
				case 1:
					$help_detailshow.eq(index).animate({
						right:'0',
						top:'0'
					},500);
					break;
				case 2:
					$help_detailshow.eq(index).animate({
						left:'0',
						top:'0'
					},500);
					break;
				case 3:
					$help_detailshow.eq(index).animate({
						right:'0',
						top:'0'
					},500);
					break;
			}
		});


		//监听菜单滚动条滚动
		var count=0;
		$win.on('scroll resize',function(e){
			var type= e.type;
			if(type=='scroll'){
				(function(){
					count++;
					if(count%2==0){
						var $this=$(this),
							currenttop=$this.scrollTop(),
							i= 0,
							len=screen_pos.length;

						for(i;i<len;i++){
							var pos=screen_pos[i]['pos'],
								minpos=parseInt(pos - 150,0),
								maxpos=parseInt(pos + 150,0);

							if(currenttop>=minpos&&currenttop<=maxpos){
								$header_item.eq(i).addClass('menu-active').siblings().removeClass('menu-active');
							}
						}

					}
				}());
			}
			if(type=='resize'){
				(function(){
					//隐藏菜单导航
					var winwidth=$win.width();
					if(winwidth>=1200||(winwidth>=1200&&e.orientation=='landscape')){
						//隐藏已经存在的class
						$header_btn.removeClass('header-btnactive');
						$header_menu.removeClass('g-d-showi');
						isMobile=false;
					}else{
						isMobile=true;
					}


					//重新定位滚动条位置
					var i= 0,
						len=screen_pos.length,
						j= 0,
						pos=$win.scrollTop();
					for(i;i<len;i++){
						var temptop=screen_pos[i]["node"].offset().top;
						screen_pos[i]["pos"]=temptop;

						var minpos=parseInt(pos - 150,0),
							maxpos=parseInt(pos + 150,0);
						if(temptop>=minpos&&temptop<=maxpos){
							$header_item.eq(i).addClass('menu-active').siblings().removeClass('menu-active');
						}
					}

					//设置不支持vh单位设备
					var helpheight=$help_btn.height();
					if(parseInt(helpheight,10)<420){
						$help_btn.addClass('help-wrap-support');
					}else{
						$help_btn.removeClass('help-wrap-support');
					}

				}());

			}
		});


		//监听帮助中心切换显示
		$help_btn.on($.EventName.click,'li',function(){
			var $this=$(this),
				index=$this.index(),
				times=500;

			if(index===0||index===2){
				$help_detailshow.eq(index).animate({
					left:"0",
					top:"0"
				},times);
			}else if(index===1||index===3){
				$help_detailshow.eq(index).animate({
					right:"0",
					top:"0"
				},times);
			}

		});

		//监听帮助中心切换隐藏
		$help_detail.on($.EventName.click,function(e){
			var current= e.target,
				nodename=current.nodeName.toLowerCase(),
				$this,
				index,
				times=500;
			//适配
			if(nodename==='ul'){
				return false;
			}else if(nodename==='li'){
				$this=$(current);
				index=$this.index();
			}else{
				$this=$(current).closest('li');
				index=$this.index();
			}

			//执行相关动画
			switch(index){
				case 0:
					$this.animate({
						left:"100%",
						top:"100%"
					},times);
					break;
				case 1:
					$this.animate({
						right:"100%",
						top:"100%"
					},times);
					break;
				case 2:
					$this.animate({
						left:"100%",
						top:"-100%"
					},times);
					break;
				case 3:
					$this.animate({
						right:"100%",
						top:"-100%"
					},times);
					break;
			}
			//动画执行完成后10ms还原动画
			if(index===0||index===1||index===2||index===3){
				setTimeout(function(){
					$this.removeAttr("style");
				},parseInt(times + 10,10));
			}
		});



		//表单校验
		validobj=$contact_form.Validform({
					ajaxPost: true,
					datatype:{
						'selfemail':function(gets,obj,curform,regxp){
								return CommonFn.isEmail(gets);
						}
					},
					beforeSubmit: function(curform) {
						//拼合参数
						var params={};
						params['UserName']=$username.val();
						params['UserEmail']=$useremail.val();
						params['Remak']=$remark.val();
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'../json/contact.json',
								type:'post',
								dataType:"json",
								data:params,
								success: function(data){
										if(data.flag){									
												dia.content('<span class="g-c-succ">保存成功</span>').show();
												setTimeout(function(){
													dia.close();
												},3000);
										}else{
												dia.content('<span class="g-c-warn">保存失败</span>').show();
												setTimeout(function(){
													dia.close();
												},3000);
										}
								},
								error: function(){
										dia.content('<span class="g-c-err">保存失败</span>').show();
										setTimeout(function(){
											dia.close();
										},3000);
								}
						});
						return false;
					},
					tiptype: function(msg,o) { 
						var curtype=o.type,
								curitem=o.obj;
						if(curtype==1||curtype==3){
								curitem.parent().next().text(msg);
						}else if(curtype==2){
								curitem.parent().next().text('');
						}
					}
			});
		validobj.addRule(ruleobj);




		//轮播动画
		Slide.slideToggle({
			$wrap:$('#slideimg_show'),
			$slide_img:$('#slide_img'),
			$btnwrap:$('#slideimg_btn'),
			$slide_tipwrap:$('#slide_tips'),
			minwidth:214,
			winwidth:214,
			isresize:false,
			size:3,
			times:5000,
			eff_time:500,
			btn_active:'slidebtn-active'
		});


	});
});



