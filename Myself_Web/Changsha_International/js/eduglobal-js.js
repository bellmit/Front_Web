//header
$(function(){
  $("#masthead").hide();	
  $(".search").click(function(){
  $("#masthead").slideToggle();
  $(".logo").css(".logo-link")
  });
  $(".cancel").click(function(){
  $("#masthead").slideToggle();
  });
  $(".footer-con").hide();	
  $(".arrow").click(function(){
  $(".footer-con").slideToggle();
  });
});
var timeout=500;
var closetimer=0;
var ddmenuitem=0;

function navbar_open()
{	navbar_canceltimer();
	navbar_close();
	ddmenuitem = $(this).find('.dropdown').eq(0).css('visibility', 'visible');}

function navbar_close()
{	if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');}

function navbar_timer()
{	closetimer = window.setTimeout(navbar_close, timeout);}

function navbar_canceltimer()
{	if(closetimer)
	{	window.clearTimeout(closetimer);
		closetimer = null;}}

$(document).ready(function()
{	$('#navbar > li').bind('mouseover', navbar_open);
	$('#navbar > li').bind('mouseout',  navbar_timer);});

document.onclick = navbar_close;

//back to top
$(function(){
	var top_selector=$('#main-roll');
	top_selector.hide();
	$(window).scroll(function() {
		if($(window).scrollTop() >= 100){
			top_selector.fadeIn(400);
		}else{
			top_selector.fadeOut(200);
		}
  });
  $('#main-roll_top').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);});
  $('#main-roll_bottom').click(function(){$('html,body').animate({scrollTop:$('#main-bottombox').offset().top}, 800);});
});
// 顶部国家自动轮显
$(function(){
	var country_scroll=$("#focus-country li");
	country_scroll.hover(function(){
		var index = country_scroll.index(this);
		country_scroll.removeClass("current");
		$(this).addClass("current");
		$(".focus").hide();
		$(".focus:eq(" + index + ")").show();
	})
  	var len  = country_scroll.length;
  	var index = 0;
  	country_scroll.mouseover(function(){
  		index =country_scroll.index(this);
  		showImg(index,country_scroll);
	}); 
  	//鼠标移入控制
  	country_scroll.hover(function(){
			if(MyTime){clearInterval(MyTime)}
		},function(){
			MyTime = setInterval(function(){
				showImg(index,country_scroll)
				index++;
			if(index==len){index=0;}
		},6000);
  	});
	//自动播放
	var MyTime = setInterval(function(){
			showImg(index,country_scroll)
			index++;
			if(index==len){index=0;}
	},6000);
})
//幻灯片动画控制
function showImg(i,selector){
	$("#left-bar-one .focus").hide();
	$("#left-bar-one .focus").eq(i).show();
	selector.eq(i).addClass("current").siblings().removeClass("current");
}
// school slider
$(function() {
	var sWidth = $("#school-focus").width(); //获取焦点图的宽度（显示面积）
	var len = $("#school-focus ul li.schoolli-box").length; //获取焦点图个数
	var index = 0;
	var picTimer;
	
	//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span></span>";
	}
	$("#school-focus").append(btn);
	$("#school-focus .btnBg").css("opacity",0.5);

	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$("#school-focus .btn span").css("opacity",0.4).click(function() {
		index = $("#school-focus .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("click");



	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#school-focus ul.schoolul-box").css("width",sWidth * (len));

	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
		$("#school-focus ul.schoolul-box").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
		$("#school-focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
	}
});		
//video
var accordion=function(){
	var tm=sp=10;
	function slider(n){this.nm=n; this.arr=[]}
	slider.prototype.init=function(t,c,k){
		var a,h,s,l,i;
		a=document.getElementById(t);
		this.sl=k?k:'';
		h=a.getElementsByTagName('dt');
		s=a.getElementsByTagName('dd');
		this.l=h.length;
		for(i=0;i<this.l;i++)
		{
			var d=h[i]; 
			this.arr[i]=d;
			d.onclick=new Function(this.nm+'.pro(this)');
			if(c==i)
			{
				d.className=this.sl
			}
		}
		l=s.length;
		for(i=0;i<l;i++)
		{
			var d=s[i];
			d.mh=d.offsetHeight;
			if(c!=i)
			{
				d.style.height=0;
				d.style.display='none'
			}
		}
	}
	slider.prototype.pro=function(d)
	{
		for(var i=0;i<this.l;i++)
		{
			var h=this.arr[i], s=h.nextSibling; s=s.nodeType!=1?s.nextSibling:s; clearInterval(s.tm);
			if((h==d&&s.style.display=='none') || (h==d&&s.style.display=='')){s.style.display=''; su(s,1); h.className=this.sl}
			else if(s.style.display==''){su(s,-1); h.className=''}
		}
	}
	function su(c,f){c.tm=setInterval(function(){sl(c,f)},tm)}
	function sl(c,f){
		var h=c.offsetHeight, m=c.mh, d=f==1?m-h:h; c.style.height=h+(Math.ceil(d/sp)*f)+'px';
		c.style.opacity=h/m; c.style.filter='alpha(opacity='+h*100/m+')';
		if(f==1&&h>=m){clearInterval(c.tm)}else if(f!=1&&h==1){c.style.display='none'; clearInterval(c.tm)}
	}
	return{slider:slider}
}();

var slider2=new accordion.slider("slider2");
        slider2.init("slider2",0,"open");