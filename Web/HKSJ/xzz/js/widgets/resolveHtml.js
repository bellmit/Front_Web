/***
name:resolve serve
author:yipin
文档反向解析服务对象
***/

define(['jquery'],function($){
		return {
			/*
			 判断是否是html标签
			 */
			tagstr:/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
			/*
			* 获取模板数据
			* 参数：obj:从模板获取的数据,wrap:模板容器
			* */
			getFromTemplate:function(obj,wrap){
				var self=this;
				if(obj!==undefined){
					var content=obj['content'],
						len=content.length,
						article='',
						title='';


					//反向解析关注
					self.resolveAttention(obj,wrap);

					//反向解析标题
					title=self.resolveTitle(obj,wrap);

					//反向解析标签并生成对应html标签
					if(len!==0){
						for(var i= 0;i<len;i++){
							article+=self.resolveHtml(content[i]);
						};
					}
					$(title+'<div class="article-show">'+article+'</div>').appendTo(wrap['article'].html(''));

					//反向解析点赞
					self.resolvePraises(obj,wrap);

					//反向解析相关链接
					self.resolveLinks(obj,wrap);

					//反向解析广告
					self.resolveAd(obj,wrap);
				}
			},
			/*
			*反向解析字符串为html标签
			*参数：str:需要解析的字符串,id为当前历史记录值或对应操作步骤id
			* */
			resolveHtml:function(str,id){
				var self=this,
					len=str.length,
					result='';
				if(str===''||str===undefined){
					return result;
				}
				if ( str.charAt(0) === "<" && str.charAt(len - 1 ) === ">" && len >= 3 ) {
					//如果是标签
					if(this.tagstr.test(str)){
						result=str;
					}
				}else{
					//如果不是标签
					var childtag=self.tagstr.exec(str);
					//构造父子标签
					if(childtag!==null){
						result="<p>"+str+"</p>";
					}else if(/(\.{1,})(jpg|jpeg|png|gif)/.test(str)){
						result="<p><img alt='' src='"+str+"'></p>";
					}else{
						result="<p>"+str+"</p>";
					}
				}
				return result;
			},
			/*
			 *反向解析html标题信息
			 *参数：obj:从模板获取的数据,wrap:模板容器
			 * */
			resolveTitle:function(obj,wrap){
				var title=obj['title'],
					read=obj['read_sum'],
					comment=obj['comment_sum'],
					praises=obj['praises_sum'],
					str='';
				if(title&&title!==''){
					str+='<h1>'+title+'</h1>';
				}
				if(read&&read!==''){
					str+='<span>'+read+'</span>';
				}
				if(comment&&comment!==''){
					str+='<span>'+comment+'</span>';
				}
				if(praises&&praises!==''){
					str+='<span>'+praises+'</span>';
				}
				return str;
			},
			/*
			 *反向解析点赞
			 *参数：obj:从模板获取的数据,wrap:模板容器
			 * */
			resolvePraises:function(obj,wrap){
				var praises=obj['praises_sum'],
					status=parseInt(obj['status'],10),
					node=wrap['praises'];

				if(status||status=='1'){
					node.addClass(wrap['praises_class']).find('span').text(praises);
				}else if(!status||status=='0'){
					node.removeClass(wrap['praises_class']).find('span').text(praises);
				}
			},
			/*
			 *反向解析相关链接
			 *参数：obj:从模板获取的数据,wrap:模板容器
			 * */
			resolveLinks:function(obj,wrap){
				var links=obj['links'];

				if(links){
					var len=links.length,
						str='';
					if(len!=0){
						for(var i=0;i<len;i++){
							str+='<a href="'+links[i]['url']+'">'+links[i]['name']+'</a>';
						}
						wrap['links'].html(str);
					}else{
						wrap['links'].html('');
					}
				}else{
					wrap['links'].html('');
				}
			},
			/*
			 *反向解析广告
			 *参数：obj:从模板获取的数据,wrap:模板容器
			 * */
			resolveAd:function(obj,wrap){
				var advert=obj['advert_url'];

				if(advert&&advert!==''){
					wrap['ad'].html('<img alt="" src="'+advert+'">');
				}else{
					wrap['ad'].html('');
				}
			},
			/*
			 *反向解析关注
			 *参数：obj:从模板获取的数据,wrap:模板容器
			 * */
			resolveAttention:function(obj,wrap){
				var nickname=obj['nickname'],
					create_time=obj['create_time'],
					head_url=obj['head_url'],
					type=parseInt(obj['type'],10),
					str='';

				if(head_url&&head_url!==undefined){
					str+='<div><img src="'+head_url+'" alt=""></div>';
				}
				if(nickname&&nickname!==undefined){
					str+='<span><em>'+nickname+'</em>';
				}
				if(create_time&&create_time!==undefined){
					str+='<i>'+create_time+'</i></span>';
				}
				if(type||type=='1'){
					str+='<p class="main-about-already"></p>';
				}else if(!type||type=='0'){
					str+='<p></p>';
				}
				wrap['attention'].html(str);
			}
		};
});