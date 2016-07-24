(function($){
	"use strict";
	$(function(){
		/*dom引用*/
		var $screen_btn=$('#screen_btn'),
			$screen_item=$screen_btn.children(),
			$screen1=$('#screen1'),
			$screen2=$('#screen2'),
			$screen3=$('#screen3'),
			$screen4=$('#screen4'),
			$screen5=$('#screen5'),
			$win=$(window),
			screen_pos=[{
				node:$screen1,
				pos:0
			},{
				node:$screen2,
				pos:0
			},{
				node:$screen3,
				pos:0
			},{
				node:$screen4,
				pos:0
			},{
				node:$screen5,
				pos:0
			}],
			$list4_wrap=$('#list4_wrap'),
			$tab3_btn=$('#tab3_btn'),
			$tab3_show=$('#tab3_show'),
			isMobile=false;

		//dom 表单对象引用
		var $case_form=$('#case_form'),
			$username=$('#username'),
			$phone=$('#phone'),
			$company=$('#company'),
			$province=$('#province'),
			$email=$('#email'),
			$case=$('#case'),
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
			ele:$phone,
			datatype:"selfphone",
			nullmsg: "手机不能为空",
			errormsg: "手机格式不规范",
			sucmsg: ""
		},{
			ele:$company,
			datatype:"*",
			nullmsg: "公司不能为空",
			errormsg: "",
			sucmsg: ""
		},{
			ele:$email,
			datatype:"selfemail",
			nullmsg: "公司不能为空",
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
					$screen_item.eq(i).addClass('active').siblings().removeClass('active');
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





			/**
			 * 加载新闻数据
			 */
			var $tabs=$tab3_btn.find('span:first-child'),
					theme=$tabs.attr('data-theme');

			$tabs.addClass('tab3-active').siblings().removeClass('tab3-active');

			$.ajax({
				url:'../json/test.json',
				type:'post',
				dataType:"json",
				data:{
					"Theme":theme
				}
			}).done(function(data){
					if(data.flag){
						//加载操作
					}else{
						$tab3_show.html('');
					}
				})
				.fail(function(){
					$tab3_show.html('');
				});



		}());


		//监听菜单导航
		$screen_btn.on($.EventName.click,'a',function(e){
			e.preventDefault();
			var $this=$(this),
				index=$this.index();

			$('html,body').animate({'scrollTop':screen_pos[index]['pos'] +'px'},500);
			return false;
		});


		//监听菜单滚动条滚动
		var count=0;
		$win.on('scroll resize',function(e){
			var type= e.type;
			if(type=='scroll'){
				(function(){
					count++;
					if(count%2==0){
						var currenttop=$win.scrollTop(),
							i= 0,
							len=screen_pos.length;

						for(i;i<len;i++){
							var pos=screen_pos[i]['pos'],
								minpos=parseInt(pos - 150,0),
								maxpos=parseInt(pos + 150,0);

							if(currenttop>=minpos&&currenttop<=maxpos){
								$screen_item.eq(i).addClass('active').siblings().removeClass('active');
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
							$screen_item.eq(i).addClass('active').siblings().removeClass('active');
						}
					}

					//设置不支持vh单位设备


				}());

			}
		});


		/*绑定最新问答*/
		$list4_wrap.on('click','dt',function(e){
			var $this=$(this),
				$dd=$this.next('dd');
			if($dd.hasClass('g-d-showi')){
				$dd.removeClass('g-d-showi').siblings('dd').removeClass('g-d-showi');
			}else{
				$dd.addClass('g-d-showi').siblings('dd').removeClass('g-d-showi');
			}

		});


		/*搬到行业tab选项*/
		$tab3_btn.on('click','span',function(){
			var $this=$(this),
				theme=$this.attr('data-theme');

			$this.addClass('tab3-active').siblings().removeClass('tab3-active');

			$.ajax({
				url:'../json/test.json',
				type:'post',
				dataType:"json",
				data:{
					"Theme":theme
				}
			}).done(function(data){
					if(data.flag){
						//加载操作
					}else{
						$tab3_show.html('');
					}
				})
				.fail(function(){
					$tab3_show.html('');
				});
		});


		//表单校验
		validobj=$case_form.Validform({
			ajaxPost: true,
			datatype:{
				'selfemail':function(gets,obj,curform,regxp){
					var email=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z0-9]{2,7}((\.[a-z]{2})|(\.(com|net)))?)$/;
					return email.test(gets.replace(/\s*/g,''))?true:false;
				},
				'selfphone':function(gets,obj,curform,regxp){
					var phone=/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/;
					return phone.test(gets.replace(/\s*/g,''))?true:false;
				}
			},
			beforeSubmit: function(curform) {
				//拼合参数
				var params={},rules=/\s*/g;
				params['UserName']=$username.val();
				params['Phone']=(function(){
					var val=$phone.val();
					return val.replace(rules,'');
				}());;
				params['Company']=$company.val();
				params['Province']=$province.val();
				params['Email']=$email.val();
				params['Case']=$case.val();
				params['Remark']=$remark.val();
				/*to do*/
				//send ajax 填充具体业务逻辑
				//开发时开启下部代码
				$.ajax({
					url:'../json/test.json',
					type:'post',
					dataType:"json",
					data:params
				}).done(function(data){
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
				})
					.fail(function(){
					dia.content('<span class="g-c-err">保存失败</span>').show();
					setTimeout(function(){
						dia.close();
					},3000);
				});
				return false;
			},
			tiptype: function(msg,o) {
				var curtype=o.type,
					curitem=o.obj,
					id=curitem[0].id;

				console.log(curitem.selector);
				if(id=='phone'||id=='username'){
					if(curtype==1||curtype==3){
						curitem.parent().next().next().text(msg);
					}else if(curtype==2){
						curitem.parent().next().next().text('');
					}
				}else{
					if(curtype==1||curtype==3){
						curitem.parent().next().text(msg);
					}else if(curtype==2){
						curitem.parent().next().text('');
					}
				}

			}
		});
		validobj.addRule(ruleobj);




	});

})(jQuery);