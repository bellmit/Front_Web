/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/manage_common',
		'marquee':'widgets/marquee_list',
		'cookie':'plugins/cookie',
	},
	shim:{
		'dialog':{
				deps:['jquery']
		}
	}
});


/*程序入口*/
require(['jquery','dialog','marquee','cookie','common'],function($,undefined,Marquee,undefined,Common){
	
	
	
	

	$(function() {
			//页面元素获取
			var $marquee_show=$('#marquee_show'),
					$marquee_prevbtn=$('#marquee_prevbtn'),
					$marquee_nextbtn=$('#marquee_nextbtn'),
					$marquee_image=$('#marquee_image'),
					$imageset_prev=$('#imageset_prev'),
					$imageset_currentprev=$('#imageset_currentprev'),
					$imageset_currentwrap=$('#imageset_currentwrap'),
					$imageset_currentnext=$('#imageset_currentnext'),
					$imageset_next=$('#imageset_next');
					
		

					//初始化调用图片浏览
					Marquee.marquee({
								marquee_show:$marquee_show,
								marquee_prevbtn:$marquee_prevbtn,
								marquee_nextbtn:$marquee_nextbtn,
								marquee_image:$marquee_image,
								cookie:'pactmanage_params',
								imageset_currentprev:$imageset_currentprev,
								imageset_currentwrap:$imageset_currentwrap,
								imageset_currentnext:$imageset_currentnext		
					},function(opt,flag){
							//组合参数
							$.ajax({
									url:'../../json/gallery_listdetail.json',
									dataType:"json",
									data:opt.marqueeid,
									type:'get',
									async:false,
									success: function(result){
											if(result.total!==0){
													opt.listdata=result.galleryList;
													opt.total=result.total;
											}else{
												opt.listdata.length=0;
											}
									},
									error:function(){
										opt.listdata.length=0;
									}
							});
							if(flag){
								Marquee.initRender(flag);
							}else{
								Marquee.initRender();
							}

					});
			
	});
});


