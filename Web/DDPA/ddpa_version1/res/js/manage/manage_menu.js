(function($){
	$(function(){
		/*初始化数据：初始化主区域高度，初始化当前主导航展开项*/
		var tempmain=0,tempcur_menu=0;
		/*菜单初始化(主菜单、子菜单高度协调)*/
		var mainbox=$("#mainbox").length!=0?$("#mainbox"):$(".mainbox"),sidebox=$("#sidebox");
		var mh=mainbox.height();
		var sh=sidebox.height();
		tempmain=mh;
		if(mh<=sh){
			mainbox.height(parseInt(sh+50));
		}
		/*当前高亮*/
		var urlstr=window.location.href;
		var urlstart=urlstr.lastIndexOf("/")+1,urlend=urlstr.lastIndexOf(".");
		var urlcurrent=urlstr.slice(urlstart,urlend);
		sidebox.find("a").each(function(index,element){
			var curobj=$(this),curhref=curobj.attr("href"),curend=curhref.lastIndexOf(".");
			var curaddress=curhref.slice(0,curend);
            if(curaddress==urlcurrent){
				curobj.parent().addClass("curmenu");
				tempcur_menu=curobj.parent().parent().prev("p").attr("id").slice(-1);
				return false;
			}
        });
		/*菜单效果*/
		$("#menutheme0,#menutheme1,#menutheme2").click(function(){
			var curobj=$(this),parobj=curobj.parent(),curflag=curobj.attr("id").slice(-1);
			if(curflag==tempcur_menu){
				return false;	
			}
			curobj.addClass("menuthemesel").next().slideToggle(300);
			parobj.siblings().find("p").removeClass("menuthemesel");
			setTimeout(function(){
				mh=mainbox.height();
				sh=sidebox.height();
				if(mh<=sh){
					mainbox.animate({"height":parseInt(sh+50)},100);
				}else if((mh>sh&&sh<=tempmain)||(mh>sh&&sh>tempmain)){
					mainbox.height("auto");
				}else{
					mainbox.animate({"height":parseInt(sh+50)},100);
				}
			},300);
		});
	});
})(jQuery);
