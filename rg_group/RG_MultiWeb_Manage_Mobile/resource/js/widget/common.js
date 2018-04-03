(function($,w){
		var EventName={'click':'click'};
		if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {
				EventName= {'click':'tap'};
		}else{
				EventName= {'click':'click'};
		}
		
		/*适配点击事件*/
		$.EventName=EventName;
		/*适配弹出框*/
		$.extend($,{
				modal:function(d,t){
					var $wrap=$('<div class="alert-mask"></div>'),
							$html=$('<div class="alert-modal"></div>'),
							$action='',
							title=d.title?d.title:'温馨提示',
							content=d.content?d.content:'',
							ok=d.ok?d.ok:'确定',
							no=d.no?d.no:'取消';
					
					$html.append('<div>' + title + '</div><div>' +content + '</div>');
					$action=t==1?$('<div class="modal-sure">' + ok + '</div>'):$('<div class="modal-ok">' + ok + '</div><div class="modal-cancel">' + no + '</div>');
					$($('<div></div>').append($action)).appendTo($html);
					$html.appendTo($wrap);					
					$(document.body).append($wrap);
					w.resize = function () {
							$html.css({
									top: parseInt(($wrap.height() - $html.height()) / 2),
									left: parseInt(($wrap.width() - $html.width()) / 2)
							});
					};
					w.resize();
					$(w).on('resize',w.resize);
					$action.on($.EventName.click, function () {
							if ($(this).hasClass('modal-sure') && d.okfn){
								d.okfn();
							}	
							if ($(this).hasClass('modal-ok') && d.okfn){
								d.okfn();
							}	
							if ($(this).hasClass('modal-cancel') && d.nofn){
								d.nofn();
							}
							$wrap.remove();
					});
				}
				
				
		});

})(Zepto,window);