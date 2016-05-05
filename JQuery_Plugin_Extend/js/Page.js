;(function($){
	/*exist namespace*/
	$.fn.yp_page=jQuery.fn.yp_page===undefined?jQuery.fn.yp_page:function(){};
	/*plugin name*/
	$.fn.yp_page=function(opt){
		/*vars*/
		var arrflag=Object.prototype.toString,oobj=this,oid=oobj.attr("id");
		/*defaults*/
		var def={
			totalnum:100,
			pagesize:10,
			currentpage:5,
			pagenum:10,
			shownum:9,
			actionflag:false,
			listflag:true,
			infoflag:false,
			layout:(function(o){
						var layout=o.attr('data-layout');
						if(layout==''||layout==null||layout===undefined){
							return ['first','prev','list','next','last'];
						}else{
							return layout.split(',');
						}
					})(oobj)
		};
		/*extend defaults*/
		var sets=$.extend({},def,
			(function(s,o){
				if(typeof s=='object'&&arrflag.call(s)!=='[object Array]'){
					return s;
				}else{
					return {};
				}
			})(opt,oobj)
		);
		
		function pageno(pt,ps){
			var pn=0;
			if(pt%ps==0){
				pn=pt/ps;
			}else{
				var tempnum=(pt-(pt%ps))/ps;
				pn=parseInt(tempnum+1);
			}	
			return pn;
		}
		
		function pagedata(se,l){
			var ptotal=se.totalnum,psize=se.pagesize,pcur=se.currentpage,pnum=se.pagenum,pshow=se.shownum;
			pnum=pageno(ptotal,psize);
			return pagelist(pshow,pcur,pnum,l);
		}
		
		function pagelist(so,c,n,w){
			var res=[];
			if(so<=n&&c<=so){
				console.log("case1");
				for(var j=1;j<=so;j++){
					if(j==c){
						$('<span class="plist pcur">'+j+'</span>').bind('click',function(e){
							
						}).appendTo(w);
					}else{
						$('<span class="plist pnum">'+j+'</span>').bind('click',function(e){
							
						}).appendTo(w);
					}
				}
			}else{
				if(c>=n-so){
					var f=n-so,tl=parseInt(f+so),l=tl>=n?n:tl;
					console.log("case2");
					for(var j=f;j<=l;j++){
						if(j==c){
							$('<span class="plist pcur">'+j+'</span>').bind('click',function(e){
								
							}).appendTo(w);
						}else{
							$('<span class="plist pnum">'+j+'</span>').bind('click',function(e){
								var co=$(this);
								co.siblings(".pcur").removeClass('pcur').addClass('pnum').end().removeClass('pnum').addClass('pcur');
							}).appendTo(w);
						}
					}
				}else{
					console.log("case3");
					for(var j=n-so;j<=n;j++){
						if(j==c){
							res.push('<span class="plist pcur">'+j+'</span>');
						}else{
							res.push('<span class="plist pnum">'+j+'</span>');
						}
					}
				}
			}
		}	
		
		function init(se){
			var lo=se['layout'],llen=lo.length;
			var list=$('<div class="pagelist" id="pagelist"></div>');
			for(var i=0;i<llen;i++){
				if(lo[i]=='select'){
					se['actionflag']=true;
					$('<div class="pageaction" id="pageaction"></div>').appendTo(oobj);
				}else if(lo[i]=='first'||lo[i]=='prev'||lo[i]=='list'||lo[i]=='next'||lo[i]=='last'){
					if(lo[i]=='first'){
						$('<span class="plist pfirst">首&nbsp;页</span>').bind('click',function(e){
							var co=$(this);
							var ctxt=co.parent().find('span.pfirst').removeClass('pfirst').addClass('pcur');							
						}).appendTo(list);
					}else if(lo[i]=='prev'){
						$('<span class="plist pprev">上一页</span>').bind('click',function(){
							var co=$(this);
							var ctxt=co.parent().find('span.pcur').html();
							var ccur=co.next().html();
							if(parseInt(ctxt)<=1){
								return;
							}else if(ccur==ctxt&&ccur==1){
								return;
							}else if(ccur==ctxt&&ccur!=1){
								
							}else{
								co.siblings(".pcur").removeClass('pcur').addClass('pnum').prev().removeClass('pnum').addClass('pcur');
							}
						}).appendTo(list);
					}else if(lo[i]=='list'){
						//pagedata(s,list);
						//list.append();
						pagedata(se,list);
						//$().appendTo();
					}else if(lo[i]=='next'){
						$('<span class="plist pnext">下一页</span>').bind('click',function(){
							var co=$(this),cnum=pageno(se.totalnum,se.pagesize);
							var ctxt=co.parent().find("span.pcur").html();
							if(parseInt(ctxt)==cnum){
								return;
							}else{
								co.siblings(".pcur").removeClass('pcur').addClass('pnum').next().removeClass('pnum').addClass('pcur');
							}
						}).appendTo(list);
					}else if(lo[i]=='last'){
						$('<span class="plist plast">尾&nbsp;页</span>').bind('click',function(){
							
						}).appendTo(list);
					}
					se['listflag']=true;
					list.appendTo(oobj);
				}else if(lo[i]=='info'){
					se['infoflag']=true;
					$('<div class="pageinfo" id="pageinfo"></div>').appendTo(oobj);
				}
			}
		}
		init(sets);
	}
	
	
	
	
})(jQuery);


/*
;(function($){
	
	
})(jQuery);*/

