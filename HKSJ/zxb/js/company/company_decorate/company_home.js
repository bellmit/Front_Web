/*配置依赖*/
require.config({
	baseUrl:'../../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'share':'plugins/share',
		'common':'common/common',
		'company_common':'common/company_common',
		'slide':'widgets/slide',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'city_select':'widgets/city_select',
		'cookie':'plugins/cookie',
		'modal_dialog':'widgets/modal_dialog',
		'home_serve':'company/company_decorate/company_home_serve'
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
require(['jquery','dialog','share','slide','rule','commonfn','validform','city_select','modal_dialog','cookie','common','company_common','home_serve'],function($,undefined,Share,Slide,Rule,CommonFn,undefined,City_Select,Modal_Dialog,undefined,Common,Company_Common,Home_Serve) {
	$(function() {
		
			//获取页面传值id
			var curid=Common.getID('company_params'),
					$design_wrap=$('#design_wrap'),
					$designplan_wrap=$('#designplan_wrap'),
					$realmap_wrap=$('#realmap_wrap'),
					$problem_wrap=$('#problem_wrap');
					
					
					
			//页面模板
			var htmltemplate_design='<div class="shejishi-1">'+
		'	<div class="shejishi-left">'+
		'		<a href="$href"><img src="$url" width="100" height="100" alt=""/></a>'+
		'		<ul>'+
		'			<li><h4>$desName</h4><span>首席设计师</span></li>'+
		'			<li><p>设计经验：$designExperience年</p></li>'+
		'			<li><p>擅长风格：$goodStyle</p></li>'+
		'			<li><a class="finddesign" href="javascript:void(0);">找他免费设计</a></li>'+
		'		</ul>'+
		'	</div>'+
		'	<ul class="shejishi-right">$imgList</ul>'+
		'</div>',
		htmltemplate_designplan='<li>'+
		'	<i>'+
		'		<a href="$href">'+
		'			<img src="$url" width="281" height="246" alt=""/>'+
		'		</a>'+
		'	</i>'+
		'	<div class="fangan-xinxi">'+
		'		<div>'+
		'			<img src="$desHeadPortraitUrl" width="60" height="60" alt=""/>'+
		'		</div>'+
		'		<p>$decName</p>'+
		'		<a href="$href">$desName</a>'+
		'	</div>'+
		'</li>',
		htmltemplate_realmap='<li data-id="$id">'+
		'	  <a data-id="$id" href="$href">'+
		'     <img src="$url" width="284" height="201" alt=""/>'+
		'	  </a>'+
		'   <b>$name</b>'+
		'   <p>'+
		'      <span>'+
		'         <i><img src="$desHeadPortraitUrl" width="22" height="22" alt=""/></i>'+
		'         <a href="#">$desName</a>'+
		'      </span>'+
		'      <span>风格：$style</span>'+
		'      <span>预算：<b>$budget万</b></span>'+
		'   </p>'+
		'</li>',
		htmltemplate_problem='<li>'+
		'	<a href="$href">【$type】$title<span>$datetime</span></a>'+
		'</li>';
					
		
		
			//轮播动画
			Slide.slideToggle({
					$wrap:$('#slideimg_show'),
					$slide_img:$('#slide_img'),
					$btnwrap:$('#slideimg_btn'),
					$slide_tipwrap:$('#slide_tips'),
					minwidth:300,
					times:6000,
					eff_time:500,
					btn_active:'slidebtn-active'
			});
			
			
			//设计师请求
			Home_Serve._handler_design({
					listwrap:$design_wrap,
					id:curid,
					total:0,
					template:htmltemplate_design
			});
			
			
			//设计师方案请求
			Home_Serve._handler_designplan({
					listwrap:$designplan_wrap,
					id:curid,
					total:0,
					template:htmltemplate_designplan
			});

			
			//竣工实景图请求
			Home_Serve._handler_realmap({
					listwrap:$realmap_wrap,
					id:curid,
					total:0,
					template:htmltemplate_realmap
			});
			
			
			//装修问题请求
			Home_Serve._handler_problem({
					listwrap:$problem_wrap,
					id:curid,
					total:0,
					template:htmltemplate_problem
			});
			
			
			
			
			

	});
});


