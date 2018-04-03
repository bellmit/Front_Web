if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {//手机访问
    var EventName = {"click": "tap"};
}else{ //电脑访问
    var EventName = {"click": "click"};
}
(function($){
	$(function(){
		/*
		全局变量：组件容器id,已经留言容器id,文本域id,留言按钮id
		*/
		var $lwrap=$('#rg_lm_plugin'),
				$llist=$('#rg_lm_lmlist'),
				$ltxt=$('#rg_lm_txt'),
				$lbtn=$('#rg_lm_lmbtn'),
				$paytab=$('#rg_mo_tab'),
				$paybtn=$('#rg_mo_paybtn');
		var llabel='<span class="rg-c-orange">给商家留言:</span>',temp_lmwrap='';
		/*tab 切换*/
		$paytab.on(EventName.click,function(e){
			var nodename=e.target.nodeName.toLowerCase();
			if(nodename=='li'){
				var $this=$(e.target),cdata=$this.attr('data-pay');
				$this.addClass('rg-lob-tabsel').siblings().removeClass('rg-lob-tabsel');
				if(cdata=='paygood'){
					$paybtn.find('li').eq(0).show().siblings().hide();
				}else if(cdata=='payonline'){
					$paybtn.find('li').eq(0).hide().siblings().show();
				}
			}
		});
		/*弹出层*/
		$('.rg-s-moinfo2').on(EventName.click,function(){
			var $this=$(this),cwrap=$this.next();
			/*保存临时留言容器*/
			temp_lmwrap=cwrap;
			var clist=cwrap.find('ul');
			if(clist.length!=0){
				$llist.html(clist.html());
			}
			$ltxt.val('');
			$lwrap.animate({'top':'0'},200);
		});
		/*点击留言弹出框其他地方，关闭该弹窗*/
		$lwrap.on(EventName.click, function (e) {
				var $this = $(this);
				var nodename = e.target.nodeName.toLowerCase(), classname = e.target.className;
				if ( (nodename == 'div' && $(e.target).hasClass('rg-lm-plugin') ) || (nodename == 'li' && $(e.target).hasClass('rg-lm-lmlist') ) || (nodename == 'li' && $(e.target).hasClass('rg-lm-txtwrap') ) || (nodename == 'button' && $(e.target).hasClass('rg-lm-lmbtn') ) ) {
						$this.animate({'top': '100%'}, 200);
				}
				return false;
		});
		/*发表评论*/
		$lbtn.on(EventName.click,function(e){
			var txt1=$ltxt.val(),txt2=$llist.html(),temptxt='';
			if(txt1!=''){
				if(txt2!=''){
					temptxt='<li>'+txt1+'</li>'+$llist.html();
					temp_lmwrap.find('ul').html(temptxt);
				}else{
					temptxt=llabel+'<ul><li>'+txt1+'</li></ul>';
					temp_lmwrap.html(temptxt);
				}
			}
			$lwrap.animate({'top':'100%'},200);
			$ltxt.val('');
			e.preventDefault();
			return false;
		});
	});
})(Zepto);