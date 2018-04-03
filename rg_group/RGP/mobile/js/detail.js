if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))){
	var EventName = {"click": "tap"};
}else{
	var EventName = {"click": "click"};
}
/*自定义模块*/
var detail_obj=function(){
	this.comment_template='<li class="rg-detail-clmainitem"><div class="rg-detail-clmaininfo"><div class="rg-detail-clmainicon">&#338;</div><h4 class="rg-detail-clmainname">$user</h4><p class="rg-detail-clmaindt">$date&nbsp;$time</p></div><h3 class="rg-detail-clmaintheme">$content</h3><ul class="rg-g-color-gray3 rg-g-text-nstxt rg-detail-clmaintag"><li data-sequence="0" data-action="reply" class="rg-detail-clmainreply"><span></span>回复(0)</li><li data-sequence="0" data-action="hide" class="rg-detail-clmaintoggle"><span>&#459;</span>显示</li></ul><ul class="rg-detail-clsubbox"></ul></li>';
	this.reply_template='<li><div class="rg-detail-clsubicon">$user</div><p><span class="rg-detail-clsubname">$name</span>$content</p></li>';
};
(function($,p){
	/*处理点赞*/
	detail_obj.prototype.handlerGood=function(o){
		//to do
		
		/*
		判断是否能够点赞
		//如果能够点赞则加入如下代码：
		//var dataobj=o['dataobj'],tempdata=0,animateobj=o['animateobj'];
		//tempdata=dataobj.html();
		//if(tempdata==''||isNaN(tempdata)){
		//	tempdata=0;
		//}
		//tempdata=parseInt(tempdata);
		//tempdata++;
		//dataobj.html(tempdata);
		//animateobj.html('+1').animate({'top':'-30px','opacity':'0.2'},500);
		///*延迟复位/
		//setTimeout(function(){
		//		animateobj.html('').css({'top':'10px','opacity':'1'});
		//},502);
		
		
		*/
		
		
		
		/*测试代码*/
		var dataobj=o['dataobj'],tempdata=0,animateobj=o['animateobj'];
		tempdata=dataobj.html();
		if(tempdata==''||isNaN(tempdata)){
			tempdata=0;
		}
		tempdata=parseInt(tempdata);
		tempdata++;
		dataobj.html(tempdata);
		animateobj.html('+1').animate({'top':'-30px','opacity':'0.2'},500);
		/*延迟复位*/
		setTimeout(function(){
			animateobj.html('').css({'top':'10px','opacity':'1'});
		},502);
	};
	/*处理评论列表*/
	detail_obj.prototype.handlerCommentList=function(o){
		var tempthis=this,
		sendtype=o['send_type'],
		comment_wrap=o['comment_wrap'],
		sendbtn=comment_wrap.find('.rg-c-psure'),
		comment_list=o['comment_list'],
		reply_list=o['reply_list'],
		comment_textarea=comment_wrap.find('textarea'),
		temptxt='',
		comment_tip=o['comment_tip'];
		
		sendbtn.on(EventName.click,function(e){
				temptxt=comment_textarea.val();
				if(temptxt==''){
					if(sendtype=='comment'){
						comment_tip.html('评论内容不能为空');
					}else if(sendtype=='reply'){
						comment_tip.html('回复内容不能为空');
					}
					return false;
				}else{
					if(sendtype=='comment'){
						//to do
						/*send ajax*/
						/*$.ajax({
							url:"",
							async:true,
							type: "post",
							dataType:"json",
							data:{...},
							success:function(datas){
								var temphtml=tempthis.comment_template;
								if(true){
									//匿名用户			temphtml=temphtml.replace('$user','&#338;').replace('$date','').replace('$time','').replace('$content',temptxt);
								}else{
									//登录用户
									temphtml=temphtml.replace('$user','<img src="图片地址" alt=""/>').replace('$date','').replace('$time','').replace('$content',temptxt);
								}
								$(temphtml).appendTo(comment_list);
							},
							error:function(){
								return false;
							}
						});*/
						
						var temphtml=tempthis.comment_template;
							//匿名用户
						if(true){
							temphtml=temphtml.replace('$user','&#338;').replace('$date','').replace('$time','').replace('$content',temptxt);
						}else{
							//登录用户
							temphtml=temphtml.replace('$user','<img src="图片地址" alt=""/>').replace('$date','').replace('$time','').replace('$content',temptxt);
						}
						$(temphtml).appendTo(comment_list);
						
						
					}else if(sendtype=='reply'){
						//to do
						/*send ajax*/
						//$.ajax({
//							url:"",
//							async:true,
//							type: "post",
//							dataType:"json",
//							data:{...},
//							success:function(datas){
//								var temphtml=tempthis.reply_template,dsequence=o['reply_sequence'];
//								if(true){
							//匿名用户
							//temphtml=temphtml.replace('$user','&#338;').replace('$name','').replace('$content',temptxt);
//						}else{
//							//登录用户
//							temphtml=temphtml.replace('$user','<img src="图片地址" alt=""/>').replace('$name','').replace('$content',temptxt);	
//						}
//								var i=0,len=reply_list.size();
//								$(temphtml).appendTo(comment_list.find('.rg-detail-clmainitem').eq(dsequence).find('ul:last'));
//								for(i;i<len;i++){
//									if(i==dsequence){
//										var temp_subreply=$(reply_list[i]).find('li'),
//											temp_replytxt=temp_subreply.eq(0).text(),
//											temp_replyarr=temp_replytxt.match(/\d*/g),
//											temp_replynum=0;
//										if(temp_replyarr==null){
//											temp_replynum=0;
//										}else{
//											temp_replynum=parseInt(temp_replyarr.join(''));
//											temp_replynum++;
//										}
//										temp_subreply.eq(0).html('<span></span>回复('+temp_replynum+')');
//										temp_subreply.eq(1).attr('data-action','show').html('<span>&#456;</span>隐藏').parent().next().show();
//									}else{
//										$(reply_list[i]).find('li').eq(1).attr('data-action','hide').html('<span>&#459;</span>显示').parent().next().hide();
//									}
//								}
//							},
//							error:function(){
//								return false;
//							}
//						});


						var temphtml=tempthis.reply_template,dsequence=o['reply_sequence'];
						if(true){
							//匿名用户
							temphtml=temphtml.replace('$user','&#338;').replace('$name','').replace('$content',temptxt);
						}else{
							//登录用户
							temphtml=temphtml.replace('$user','<img src="图片地址" alt=""/>').replace('$name','').replace('$content',temptxt);	
						}
						var i=0,len=reply_list.size();
						$(temphtml).appendTo(comment_list.find('.rg-detail-clmainitem').eq(dsequence).find('ul:last'));
						for(i;i<len;i++){
							if(i==dsequence){
								var temp_subreply=$(reply_list[i]).find('li'),
									temp_replytxt=temp_subreply.eq(0).text(),
									temp_replyarr=temp_replytxt.match(/\d*/g),
									temp_replynum=0;
								if(temp_replyarr==null){
									temp_replynum=0;
								}else{
									temp_replynum=parseInt(temp_replyarr.join(''));
									temp_replynum++;
								}
								temp_subreply.eq(0).html('<span></span>回复('+temp_replynum+')');
								temp_subreply.eq(1).attr('data-action','show').html('<span>&#456;</span>隐藏').parent().next().show();
							}else{
								$(reply_list[i]).find('li').eq(1).attr('data-action','hide').html('<span>&#459;</span>显示').parent().next().hide();
							}
						}
						
						
					}
					comment_textarea.val('');
					comment_wrap.animate({'top':'50%'},200);
				}
			})
	}
	
	/*公共模块引用*/
	var d=p.detail,fn_obj=new detail_obj();
	$(function(){
		/*页面元素引用*/
		var $daction=$('#rg_detail_operate')/*点赞，分享，评论3按钮*/,
			$cplugin=$('#rg_comment_plugins')/*评论弹出框插件*/,
			$cshow=$('#rg_comment_show')/*显示隐藏评论框按钮*/,
			$ctips=$('#rg_c_ptips')/*评论提示信息框*/,
			$clist=$('#rg_comment_list')/*评论列表*/,
			$sub_clistaction=$clist.find('.rg-detail-clmaintag','ul')/*回复列表按钮*/;
		/*点赞，分享，评论*/
		var params1={
			'comment_wrap':$cplugin,
			'comment_show':$cshow,
			'comment_tip':$ctips,
			'comment_list':$clist,
			'reply_list':$sub_clistaction,
			'fn_obj':fn_obj
		};
		d.articleActive($daction,['handleGood','handlerCommentList'],params1);
		/*绑定评论弹出事件*/
		d.commentShow($cshow,'handlerCommentList',params1);
		/*绑定回复列表事件*/
		d.replyList($sub_clistaction,'handlerCommentList',params1);
		/*绑定评论事件*/
		d.commentAction($cplugin);
	});
})(Zepto,rg_portal);
