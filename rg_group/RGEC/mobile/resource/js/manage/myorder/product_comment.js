if ( ( navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i) ) ) {//手机访问
    var EventName = {"click": "tap"};
}else{ //电脑访问
    var EventName = {"click": "click"};
}
(function($){
	$(function(){
		var page=$('#rg_pc_page'),pgtxt=$('#rg_pc_pgtxt'),pgbtn=$('#rg_pc_pgbtn'),pgdata=$('#rg_pc_pgdata'),listwrap=('#rg_pc_listwrap');
		var cparam={
			url:'',
			type:'good',
			currentpage:'1',
			pagesize:'5',
			datawrap:listwrap,
			datatemplate:'<li><p class="rg-c-gray2">$context</p><div data-star="$star" class="rg-pc-star"><div><span></span></div></div><div class="rg-pc-dt rg-c-gray3"><span class="rg-c-gray2">$author</span>$datetime</div></li>'
		};
		/*展示好评进度条*/
		$('.rg-pc-column').find('li').each(function(index,element) {
				var $c=$(element),d=$c.attr('data-column');
				$c.find('p').css({'width':d+'%;'});
        });
		/*tab 切换*/
		$('#rg_pc_tabwrap').on(EventName.click,function(e){
			var c=e.target,cn=c.nodeName.toLowerCase(),$c;
			if(cn=='ul'){
				return false
			}else if(cn=='li'){
				$c=$(c);
			}else if(cn=='div'||cn=='p'){
				$c=$(c).parent();
			}
			$c.addClass('rg-pc-tabsel').siblings().removeClass('rg-pc-tabsel');
			cparam.type=$c.attr('data-type');
		});
		/*分页功能*/
		/*初始化*/
		(function(){
			/*赋值查询参数*/
			/*
			cparam.pagesize=count;
			to do
			初始化ajax查询
			rgHandlerAjax($,cparam);
			*/
			var ctotal=page.attr('data-total'),csize=page.attr('data-size'),i=1,darr=[],count=5,$tpli=page.find('li'),number=1;
			/*是否有数据*/
			if(ctotal!=''&&/\d/.test(ctotal)){
				count=csize==""?count:csize;
				if(ctotal==count){
					$tpli.eq(0).attr('data-disabled','disabled').addClass('rg-pc-pgdisabled').end().eq(1).attr('data-disabled','disabled').addClass('rg-pc-pgdisabled');
				}else if(ctotal%count==0){
					number=ctotal/count;
				}else{
					number=parseInt(ctotal/count,10)+1;
				}
				pgtxt.html('1/'+number);
				for(i;i<=number;i++){
					if(i==1){
						darr.push('<li class="rg-pc-pgdatasel">'+i+'</li>');
					}else{
						darr.push('<li>'+i+'</li>');
					}
				}
				pgdata.html(darr.join(''));
				darr=[];
				/*评论打星*/
				showStar($);
				/*绑定下拉框事件*/
				pgdata.on(EventName.click,function(e){
						var c=e.target,cn=c.nodeName.toLowerCase(),$c,ctxt;
						if(cn=='ul'){
							return false;
						}else if(cn=='li'){
							$c=$(c);
						}
						/*更新视图*/
						ctxt=$c.text();
						$c.addClass('rg-pc-pgdatasel').siblings().removeClass('rg-pc-pgdatasel');
						pgtxt.html(ctxt+'/'+number);
						/*判断极限值*/
						if(ctxt==1&&ctxt==number){
							$tpli.eq(0).attr('data-disabled','disabled').addClass('rg-pc-pgdisabled').end().eq(1).attr('data-disabled','disabled').addClass('rg-pc-pgdisabled');
						}else if(ctxt==1){
							$tpli.eq(0).attr('data-disabled','disabled').addClass('rg-pc-pgdisabled').end().eq(1).attr('data-disabled','').removeClass('rg-pc-pgdisabled');
						}else if(ctxt==number){
							$tpli.eq(0).attr('data-disabled','').removeClass('rg-pc-pgdisabled').end().eq(1).attr('data-disabled','disabled').addClass('rg-pc-pgdisabled');
						}else{
							$tpli.eq(0).attr('data-disabled','').removeClass('rg-pc-pgdisabled').end().eq(1).attr('data-disabled','').removeClass('rg-pc-pgdisabled');
						}
						/*赋值查询参数*/
						cparam.currentpage=ctxt;
						/*
						to do
						ajax查询
						rgHandlerAjax($,cparam);
						*/
				});
			}
			/*是否达到需要分页的条件*/
			if(number>1){
				page.parent().show();
				pgbtn.click(function(){
					$(this).toggleClass('rg-pc-pgbtnsel');
					pgdata.toggle();
				});
			}
		}());
		/*事件监听*/
		page.on(EventName.click,function(e){
			var c=e.target,cn=c.nodeName.toLowerCase(),$c,caction='',cdisabled='',ctxt=pgtxt.html().split('/'),$t_pdli=pgdata.find('li');
			/*事件对象修正*/
			if(cn=='ul'){
				return false
			}else if(cn=='li'){
				$c=$(c);
			}else if(cn=='div'||cn=='p'){
				$c=$(c).parent();
			}
			/*获取当前标签数据*/
			caction=$c.attr('data-action');
			cdisabled=$c.attr('data-disabled');
			/*是否是禁用状态*/
			if(cdisabled=='disabled'){
				return false;	
			}
			/*执行分页动作*/
			switch(caction){
				case 'pre':
					/*判断是否到了最大值*/
					if(ctxt[0]==ctxt[1]){
						$c.next().attr('data-disabled','').removeClass('rg-pc-pgdisabled');
					}
					ctxt[0]--;
					/*赋值查询参数*/
					cparam.currentpage=ctxt[0];
					/*
					to do
					上一页ajax查询
					rgHandlerAjax($,cparam);
					*/
					/*更新视图*/
					pgtxt.html(ctxt[0]+'/'+ctxt[1]);
					$t_pdli.eq(parseInt(ctxt[0])).removeClass('rg-pc-pgdatasel').end().eq(ctxt[0]-1).addClass('rg-pc-pgdatasel');
					if(ctxt[0]==1){
						$c.attr('data-disabled','disabled').addClass('rg-pc-pgdisabled');
					}
					break;
				case 'next':
					/*判断是否到了最小值*/
					if(ctxt[0]==1){
						$c.prev().attr('data-disabled','').removeClass('rg-pc-pgdisabled');
					}
					ctxt[0]++;
					/*赋值查询参数*/
					cparam.currentpage=ctxt[0];
					/*
					to do
					下一页ajax查询
					rgHandlerAjax($,cparam);
					*/
					/*更新视图*/
					pgtxt.html(ctxt[0]+'/'+ctxt[1]);
					$t_pdli.eq(ctxt[0]-1).addClass('rg-pc-pgdatasel').end().eq(ctxt[0]-2).removeClass('rg-pc-pgdatasel');
					if(ctxt[0]==ctxt[1]){
						$c.attr('data-disabled','disabled').addClass('rg-pc-pgdisabled');
					}
					break;
			}
		});



	});
})(Zepto);

	/*评论打星*/
	function showStar($){
		$('#rg_pc_listwrap').find('li').each(function(index, element) {
			var $c=$(element),$t=$c.find('.rg-pc-star'),d=$t.attr('data-star');
			$t.find('span').addClass('rg-pc-addstar'+d);
		});
	}
	/*发送分页ajax请求*/
	function rgHandlerAjax($,o){
		var ht=o.datatemplate;tarr=[];
		$.ajax({
				url:o.url,
				async:true,
				dataType:"json",
				type:'post',
				data:'type='+o.type+'&currentpage='+o.currentpage+'&pagesize='+o.pagesize,
				success: function(res){
					if(res){
						$.each(res,function(index,value){
							tarr.push(ht.replace('$context',res[index].context).replace('$star',res[index].star).replace('$author',res[index].author).replace('$datetime',res[index].datetime));
						});
						o.datawrap.html(tarr.join(''));
						/*更新打星视图*/
						 showStar($);
					}else{
						o.datawrap.html('<div class="nonedata">暂无数据</div>');
					}
				},
				error:function(){
					o.datawrap.html('<div class="nonedata">请查询其他数据</div>');
				}
			});
		}