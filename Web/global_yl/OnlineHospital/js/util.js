// JavaScript Document
/*get window size*/
function getWH(){
		var wharr=[];
		var winWidth=0;
		var winHeight=0;
		// 获取窗口宽度
		if (window.innerWidth)
		{
			winWidth = window.innerWidth;
		}
		else if ((document.body) && (document.body.clientWidth))
		{
			winWidth = document.body.clientWidth;
		}
		// 获取窗口高度
		if (window.innerHeight)
		{
			winHeight = window.innerHeight;
		}
		else if ((document.body) && (document.body.clientHeight))
		{
			winHeight = document.body.clientHeight;
		}
		// 通过深入 Document 内部对 body 进行检测，获取窗口大小
		if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
		{
			winHeight = document.documentElement.clientHeight;
			winWidth = document.documentElement.clientWidth;
		}
		wharr.push(winWidth);
		wharr.push(winHeight);
		return wharr;
}









