var lc_index=0;
(function($){
	$(function(){
		/*初始化参数*/
		var cindex=0,ctar=$("#lh_slideshow"),lbtn=$("#lh_leftbtn"),rbtn=$("#lh_rightbtn"),curl=window.location.search,ctwrap=$("#lh_ctheme"),cnwrap=$("#lh_cnumber");
		/*初始化*/
		if(curl!=""&&curl!=null&&curl!="undefined"){
			curl=curl.slice(1);
			cindex=curl.split("=")[1];
			lc_index=cindex;
		}
		var cpar=ctar.parent(),cparp=cpar.parent(),cimg=ctar.find("li").eq(cindex).find("img"),ctitle=cimg.attr("alt"),cnums=ctar.find("li").size(),clen=ctar.width(),cwidth=640*cnums;
		var cobjs={
			"ctar":ctar,
			"cindex":cindex,
			"cpar":cpar,
			"cparp":cparp,
			"cimg":cimg,
			"ctitle":ctitle,
			"cnums":cnums,
			"ctwrap":ctwrap,
			"cnwrap":cnwrap,
			"clen":clen,
			"cwidth":cwidth
		}
		setTimeout(function(){
			lc_init(cobjs);
		},100);
		
		/*按钮事件操作*/
		lbtn.click(function(){
			lc_player("left",cobjs);
			return false;
		});
		rbtn.click(function(){
			lc_player("right",cobjs);
			return false;
		});
	});
})(jQuery);
/*
初始化
参数说明：o传入对象集
*/
function lc_init(o){
	var co=o,ch=co.cimg.height(),ci=parseInt(co.cindex);
	co.cpar.css({"height":ch});
	co.cparp.css({"height":ch});
	co.ctar.css({"height":ch,"left":-(640*co.cindex),"width":co.cwidth});
	co.ctwrap.html(co.ctitle);
	co.cnwrap.html("("+parseInt(ci+1,10)+"/"+co.cnums+")");
}
/*
播放事件
参数说明：names:操作类型,o:传入对象集
*/
function lc_player(names,o){
	var cn=names,co=o,n=lc_index;
	if(names=="left"){
		n--;
		if(n==-1){
			n=co.cnums-1;
		}
	}else if(names=="right"){
		n++;
		if(n==co.cnums){
			n=0;
		}
	}
	lc_index=n;
	co.cindex=n;
	var cimg=co.ctar.find("li").eq(n).find("img");
	var ch=cimg.height(),ctitle=cimg.attr("alt");
	co.ctitle=ctitle;
	co.cimg=cimg;
	co.cpar.css({"height":ch});
	co.cparp.animate({"height":ch},500);
	if(n==co.cnums-1||n==0){
		co.ctar.css({"height":ch,"left":-(640*n)});
	}else{
		co.ctar.animate({"height":ch,"left":-(640*n)},500);
	}
	co.ctwrap.html(ctitle);
	co.cnwrap.html("("+parseInt(n+1,10)+"/"+co.cnums+")");
}


