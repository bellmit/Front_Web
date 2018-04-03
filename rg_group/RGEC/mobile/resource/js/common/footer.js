if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {//手机访问
    var EventName = {"click": "tap"};
}else{ //电脑访问
    var EventName = {"click": "click"};
}
(function($){
	$(function(){
		/*菜单容器引用*/
		var rg_mw=$('#rg_menuwrap')
		/*菜单栏展开*/
		$('#rg_menubar').on(EventName.click,function(e){
			var c=e.target,cn=c.nodeName.toLowerCase();
			if('ul'==cn){
				return false;
			}else if('a'==cn||'li'==cn){
				var $c='a'==cn?$(c).parent():$(c),cdata=$c.attr('data-menubar');
				if(cdata==''){
					return false;
				}
				if('menutog'==cdata){
					rg_mw.toggle();
				}else{
					/*
					to do
					顶部其他按钮实现
					*/
				}
			}
		});
		/*搜索*/
		$('#rgec_search').on(EventName.click,function(){
			var $c=$(this),$s=$c.prev('input');
			if(''==$s.text()){
				return false;
			}
		});
		/*回到顶部*/
		$('#goto_top').on(EventName.click,function(){
			$(window).scrollTop(0);
		});
	});
})(Zepto);


/*模拟弹出框*/
function modal(d, t) {
    if (t == 1) {
        this.html = "<div class='mask'><div class='modal'><div class='modal_title'>" + d.title + "</div><div class='modal_content'>" + d.content + "</div><div class='modal_foot'><div class='modal_foot_sure'>" + (d.ok ? d.ok : '确定') + "</div></div></div></div>";
    } else {
        this.html = "<div class='mask'><div class='modal'><div class='modal_title'>" + d.title + "</div><div class='modal_content'>" + d.content + "</div><div class='modal_foot'><div class='modal_foot_ok'>" + (d.ok ? d.ok : '确定') + "</div><div class='modal_foot_cancel'>" + (d.no ? d.no : '取消') + "</div></div></div></div>";
    }

    var win = $(this.html), foot = win.find('.modal_foot div'), modal = win.find('.modal');
    $(document.body).append(win);
    this.resize = function () {
        modal.css({
            top: parseInt(($('.mask').height() - modal.height()) / 2),
            left: parseInt(($('.mask').width() - modal.width()) / 2)
        });
    };
    this.resize();
    $(window).on('resize', this.resize);
    foot.on(EventName.click, function () {
        if ($(this).hasClass('modal_foot_sure') && d.okfn)
            d.okfn();
        if ($(this).hasClass('modal_foot_ok') && d.okfn)
            d.okfn();
        if ($(this).hasClass('modal_foot_cancel') && d.nofn)
            d.nofn();
        win.remove();
    });
    return this;
}


/*
模拟弹出框调用
modal({
	title: '温馨提示',
	content: '搜索关键字不能为空！',
	ok: '确认', 
	okfn: function () {
		$('#form').submit();
	}
},1);


*/