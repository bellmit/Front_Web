/*程序入口*/
(function($,w){
	$(function() {
		/*页面元素引用*/
		var $create_list=$('#create_list');
		
		
		//激活与禁止
		var states,results='成功';
		$create_list.delegate('span',$.EventName.click,function(e){
				var $this=$(this),
						$currentitem=$this.closest('li');
				if($currentitem.hasClass('create-list-state')){
						$currentitem.removeClass('create-list-state');
						states='<span class="g-c-red2">禁止</span>';
						//禁止ajax,成功或失败时需要改变results的状态值
						//to do
						results='成功';
				}else{
						$currentitem.addClass('create-list-state');
						states='<span class="g-c-green1">激活</span>';
						//禁止ajax,成功或失败时需要改变results的状态值
						//to do
						results='成功';
				}
				$.modal({
						content:'微网站'+states+results,
						okfn:function(){}
				},1)
		});
	});
})(Zepto,window);















