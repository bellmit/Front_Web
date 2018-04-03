if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) { //手机访问
	var EventName = {
		"click": "tap"
	};
} else { //电脑访问
	var EventName = {
		"click": "click"
	};
}


(function($) {
	$(function() {
		var $twrap = $('#rg_settleaccount'),
			$slist = $('#rg_shopping_list'),
			$allcb = $('#rg-sl-allcb'),
			tempdelete = [];


		/*继续购物*/
		$("#continue_buy_btn").on(EventName.click, function() {
			window.location.href = "index.php?act=index";
		});

		if ($slist.find("li").size() == 0) { //没有任何商品则不计算
			$("#next_submit").hide(); //结算按钮隐藏
		}

		/*模拟checkbox*/
		$('.rg-sl-subcb').on(EventName.click, function() {
			if ($allcb.attr('data-checked') == 'checked') {
				$allcb.attr('data-checked', 'check').removeClass('rg-sl-allcbsel');
			}
			var $this = $(this),
				data_check = $this.attr('data-checked');
			if (data_check == 'check') {
				$this.attr({
					'data-checked': 'checked'
				}).addClass('rg-sl-subcbsel');
				$twrap.html('￥' + handlerSL($this, $twrap, 'checked'));
			} else if (data_check == 'checked') {
				$this.attr({
					'data-checked': 'check'
				}).removeClass('rg-sl-subcbsel');
				$twrap.html('￥' + handlerSL($this, $twrap, 'check'));
			}

		});
		
		/*全选*/
		$('#rg-sl-allcb').on(EventName.click, function() {
			$twrap.html('');
			var $this = $(this),
				data_check = $this.attr('data-checked');
			if (data_check == 'check') {
				$this.attr({
					'data-checked': 'checked'
				}).addClass('rg-sl-allcbsel');
				$slist.find('li').each(function(index, element) {
					var $current = $(element),
						$cb = $current.find('.rg-sl-subcb');
					if ($cb.attr('data-checked' == 'check')) {
						$cb.attr('data-checked', 'checked').addClass('rg-sl-subcbsel');
					}
					$twrap.html('￥' + handlerSL($cb, $twrap, 'checked'));
				});
			} else if (data_check == 'checked') {
				$this.attr({
					'data-checked': 'check'
				}).removeClass('rg-sl-allcbsel');
				$slist.find('li').each(function(index, element) {
					var $current = $(element),
						$cb = $current.find('.rg-sl-subcb');
					if ($cb.attr('data-checked', 'checked')) {
						$cb.attr('data-checked', 'check').removeClass('rg-sl-subcbsel');
					}
					$twrap.html('￥' + handlerSL($cb, $twrap, 'check'));
				});
			} 
			/*add*/
			if ($slist.find("li").size() == 0) {
				$twrap.html("￥0.00");
				$this.attr("data-checked", "check");
				$("#next_submit").hide(); //结算按钮隐藏
				$allcb.attr({
					'data-checked': 'check'
				}).removeClass('rg-sl-allcbsel');
			}
		});

		/*更换购买数量*/
		$('.rg-cart-gnchange').on(EventName.click, function(e) {
			var nodename=e.target.nodeName.toLowerCase(),
			$numbtn=$(this),
			$parent=$numbtn.parent(),
			$numinput,
			numtype,
			numtxt=1,
			$numtip,
			temppay=$parent.prev().find('p').text().match(/[\d*\.]/g),
			ischecked=$parent.parent().find('div:first').attr('data-checked'),
			price=0.00;
			if (temppay == null) {
				price=0.00;
			}else{
				price = temppay.join('');
			}
			numtype=$numbtn.attr('data-change');
			if(numtype=='sub'){
				$numinput=$numbtn.next().next();
				$numtip=$numbtn.next().find('div');
			}else if(numtype=='add'){
				$numinput=$numbtn.prev();
				$numtip=$numbtn.prev().prev().find('div');
			}
			numtxt=parseInt($numinput.val());
			if(numtxt==''||numtxt=='0'||numtxt=='null'||isNaN(numtxt)){
				$numinput.val(1);
				numtxt=1;
			}
			if(numtype=='sub'){
				if(numtxt==1){
					return false;
				}else{
					numtxt--;
					$numinput.val(numtxt);
					num_ChangeTip($numtip,'-1');
					if(ischecked=='checked'){
						$twrap.html('￥' +handler_NumSL($twrap,price,'sub'));
					}
				}
			}else if(numtype=='add'){
				numtxt++;
				$numinput.val(numtxt);
				num_ChangeTip($numtip,'+1');
				if(ischecked=='checked'){
					$twrap.html('￥' +handler_NumSL($twrap,price,'add'));
				}
			}
			
			
		});

		/*删除产品*/
		$('#rg_sl_delete').on(EventName.click, function() {
			tempdelete = [];
			$slist.find('li').each(function(index, element) {
				var checkednode = $(element).find('.rg-sl-subcb'),
					ischecked = checkednode.attr('data-checked');
				if (ischecked == 'checked') {
					tempdelete.push(index);
				}
			});
			if (tempdelete.length == 0) {
				modal({
					title: '温馨提示',
					content: '请选择要删除的选项',
					ok: '确认',
					okfn: function() {
						$('#form').submit();
					}
				}, 1);
			} else {
				if (confirm("删除购物车中的商品后需重新购买，确定删除吗？")) {
					tempdelete.reverse();
					listDelete($slist, tempdelete);
					$allcb.removeClass('rg-sl-allcbsel').attr('data-checked', 'check');
					$twrap.html('￥0.00');

					/*add*/
					$('#rg-sl-allcb').click(); //删除产品后，选中未删除的产品并计算价格
					if ($slist.find('li').size() == 0) {
						$(this).hide();
						$slist.html('<li class="rg-nonedatawrap" style="border-bottom:none;"><div class="rg-nonedata">您的购物车中暂无商品，赶快选择心爱的商品吧！<script>(function ($){$(".rg-nonedatawrap").height($(window).height() - 300);})(Zepto);</script></div></li>');
						$('.rg-continue-buybtn').val('去购物');
						$('#rg-sl-allcb').attr({
							'data-checked': 'check'
						}).removeClass('rg-sl-subcbsel');
						$("#next_submit").hide(); //结算按钮隐藏
					}
				}

			}
		});

		/*add*/
		/*点击“结算”按钮去结算*/
		$("#next_submit").on(EventName.click, function() {
			return;
			
			var allGoodsSize = $slist.find("li").size();
			if (allGoodsSize == 0) {
				modal({
					title: '温馨提示',
					content: "您的购物车没有商品，请选择商品",
					ok: '确认',
					okfn: function() {
						$('#form').submit();
					}
				}, 1);
				return;
			}
			$("#form_buy").submit();
		});


	});
})(Zepto);

/*
计算选中价格
c:当前对象
t：目标对象
*/
function handlerSL(c, t, type) {
	var $datawrap = c.next().next(),
		pay = 0.00,
		num = 0,
		havepay = 0.00;
	var temppay = $datawrap.find('p').text().match(/[\d*\.]/g);
	if (temppay == null) {
		return '';
	}
	pay = temppay.join('');
	var tempnum = $datawrap.next().find('input').val().match(/\d*/g);
	if (tempnum == null) {
		return '';
	}
	num = tempnum.join('');
	if (isNaN(pay) || isNaN(num)) {
		return '';
	}
	var tempadd = Number(pay * num).toFixed(2);
	var temptxt = t.text().match(/[\d*\.]/g);
	if (temptxt == null) {
		havepay = 0.00;
	} else {
		havepay = temptxt.join('');
		if (isNaN(havepay)) {
			return '';
		}
	}
	if (type == 'check') {
		if (havepay == '' || havepay == 0.00) {
			return 0.00;
		} else {
			var res = (havepay * 100) - (tempadd * 100);
			return Number(res / 100).toFixed(2);
		}
	} else if (type == 'checked') {
		var res = (havepay * 100) + (tempadd * 100)
		return Number(res / 100).toFixed(2);
	}
} 




/*
计算数量改变后的价格
t：目标对象
p:变化金额
type:类型
*/
function handler_NumSL(t,p,type){
	var havepay = 0.00;
	var temptxt = t.text().match(/[\d*\.]/g);
	if (temptxt == null) {
		havepay = 0.00;
	} else {
		havepay = temptxt.join('');
		if (isNaN(havepay)) {
			havepay = 0.00;
		}
	}
	if(type=='sub'||type=='-'){
		var res = (havepay * 100) - (p * 100);
	}else if(type=='add'||type=='+'){
		var res = (havepay * 100) + (p * 100)
	}
	return Number(res / 100).toFixed(2);
}

/*删除列表*/

function listDelete(o, arr) {
	var i = 0,
		tli = o.find('li');
	var cart_id_arr = new Array();
	for (i; i < arr.length; i++) {
		cart_id_arr.push(tli.eq(arr[i]).find('input[type="hidden"]').attr("ncval"));
		tli.eq(arr[i]).remove();
	}
	return; /*add*/
	if (cart_id_arr.length) {
		drop_cart_items(cart_id_arr.join('-'));
	}
}

/**
 * 异步删除购物车并保存到数据库
 * @param cart_id
 */

function drop_cart_items(cart_id) {
	$.getJSON('index.php?act=cart&op=delmulti&cart_id=' + cart_id, function(result) {
		if (result.state) {
			//删除成功

		} else {
			modal({
				title: '温馨提示',
				content: result.msg,
				ok: '确认',
				okfn: function() {
					$('#form').submit();
				}
			}, 1);
		}
	});
}


/*提示动画*/
function num_ChangeTip(o,str){
	o.html(str).animate({
		'top':'-30px',
		'opacity':'0.2'
	},300);
	setTimeout(function(){
		o.html('').css({
			'top':'-20px',
			'opacity':'1'
		});
	},300);	
}