/*配置依赖*/
require.config({
	baseUrl:'../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'dialog':'js/lib/artDialog/dialog',
		'querydata':'js/widgets/querydata',
		'validform':'js/plugins/validform',
		'common':'js/common/common',
		'submenu':'js/widgets/submenu',
		'themetitle':'js/widgets/themetitle'
	},
	shim:{
		'bootstrap':{
				deps:['jquery']
		},
		'dialog':{
				deps:['jquery']
		},
		'querydata':{
				deps:['jquery','dialog']
		},
		'validform':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery','dialog','querydata','validform']
		},
		'submenu':{
				deps:['jquery','common']
		},
		'themetitle':{
				deps:['jquery','common']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','dialog','querydata','validform','common','submenu','themetitle'],
function($,$strap,undefined,undefined,undefined,Common,undefined,undefined) {
	$(function() {
			//页面元素引用
			var $submenu=$('#submenu'),
					$goods_show=$('#goods_show'),
					$goods_more=$('#goods_more'),
					$theme_title1=$('#theme_title1'),
					$theme_title2=$('#theme_title2');
					
			var htmlcontent='<a href="$url"><div><img src="$imgsrc" alt=""></div></a><a href="$url"><p>$shoppingname</p><span>编号：$shoppingcode</span></a><div><i>$shoppingprice</i><span></span><em></em></div>';
					
			//主题点击事件
			$theme_title1.ThemeTitle(undefined,false);
			$theme_title2.ThemeTitle(undefined,false);
					
			
			//子导航点击事件
			$submenu.subMenuItem(function(){
					var $this=this,
					$a=$this.find('a'),
					type=$a.attr('data-type'),
					temphtml=[],
					tempstr=htmlcontent;
					
					//to do
					$.ajax({
							url:'请求地址',
							type:'post',
							dataType:"json",
							data:'相关请求参数',
							success: function(data){
									if(data){
											$.each(data,function(index){
													temphtml.push(tempstr.replace(/$url/g,data[index]['url'])
													.replace('$imgsrc',data[index]['imgsrc'])
													.replace('$shoppingname',data[index]['shoppingname'])
													.replace('$shoppingcode',data[index]['shoppingcode'])
													.replace('$shoppingprice',data[index]['shoppingprice']));
											});
									}else{
										
									}
							},
							error: function(){}
					});
					
					$goods_show.find('li').each(function(index, element) {
            	var $wrap=$(this).find('>div');
							$wrap.removeClass('goods-itemnew goods-itemhot goods-itemrec').addClass('goods-item'+type);
							if(temphtml.length!==0&&typeof !temphtml[index]!=='undefined'){
									$(temphtml[index]).appendTo($wrap.html(''));
							}
							$goods_more.removeClass().addClass('goods-more'+type);
          });
					temphtml.length=0;
					
			},false);
			
	});
});
