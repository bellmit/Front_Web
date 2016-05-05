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
			shownum:10,
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
		/*inits*/
		/*funs*/
		/*
		
		<div class="pageaction" id="pageaction"></div>
        <div class="pagelist" id="pagelist"></div>
        <div class="pageinfo" id="pageinfo"></div>
		
		*/
		var method={
			pagelist:function(s,c,n){
				var res=[];
				if(s<=n&&c<=s){
					console.log("case1");
					for(var j=1;j<=s;j++){
						if(j==c){
							res.push('<span onclick="$.pnum(this,'+j+','+c+')" class="plist pcur">'+j+'</span>');
						}else{
							res.push('<span onclick="$.pnum(this,'+j+','+c+')" class="plist pnum">'+j+'</span>');
						}
					}
				}else{
					if(c>=n-s){
						var f=n-s,tl=parseInt(f+s),l=tl>=n?n:tl;
						console.log("case2");
						for(var j=f;j<=l;j++){
							if(j==c){
								res.push('<span onclick="$.pnum(this,'+j+','+c+')" class="plist pcur">'+j+'</span>');
							}else{
								res.push('<span onclick="$.pnum(this,'+j+','+c+')" class="plist pnum">'+j+'</span>');
							}
						}
					}else{
						console.log("case3");
						for(var j=n-s;j<=n;j++){
							if(j==c){
								res.push('<span onclick="$.pnum(this,'+j+','+c+')" class="plist pcur">'+j+'</span>');
							}else{
								res.push('<span onclick="$.pnum(this,'+j+','+c+')" class="plist pnum">'+j+'</span>');
							}
						}
					}
				}
				return res.join('');
			},
			pageinfo:function(){
				
			},
			pageaction:function(){
				
				
			},
			pagedata:function(s,l){
				var ptotal=s.totalnum,psize=s.pagesize,pcur=s.currentpage,pnum=s.pagenum,pshow=s.shownum;
				var pres=[];
				if(ptotal%psize==0){
					pnum=ptotal/psize;
				}else{
					var tempnum=(ptotal-(ptotal%psize))/psize;
					pnum=parseInt(tempnum+1);
				}
				return method['pagelist'](pshow,pcur,pnum);
			},
			pageLayout:function(s){
				var actionwrap='',listwrap='',infowrap='';
				var lo=s['layout'],llen=lo.length;
				var datas={},list={},info={},liststr='';
				for(var i=0;i<llen;i++){
					if(lo[i]=='select'){
						s['actionflag']=true;
					}else if(lo[i]=='first'||lo[i]=='prev'||lo[i]=='list'||lo[i]=='next'||lo[i]=='last'){
						if(lo[i]=='first'){
							liststr+='<span class="plist pfirst">首&nbsp;页</span>';
						}else if(lo[i]=='prev'){
							liststr+='<span onclick="$.pprev(this)" class="plist pprev">上一页</span>';
						}else if(lo[i]=='list'){
							liststr+=method['pagedata'](s,liststr);
						}else if(lo[i]=='next'){
							liststr+='<span onclick="$.pnext(this,'+s.totalnum+','+s.pagesize+')" class="plist pnext">下一页</span>';
						}else if(lo[i]=='last'){
							liststr+='<span class="plist plast">尾&nbsp;页</span>';
						}
						s['listflag']=true;
					}else if(lo[i]=='info'){
						s['infoflag']=true;
					}
				}
				if(s['actionflag']){
					actionwrap='<div class="pageaction" id="pageaction"></div>';
				}
				if(s['listflag']){
					listwrap='<div class="pagelist" id="pagelist">'+liststr+'</div>';
				}
				if(s['infoflag']){
					infowrap='<div class="pageinfo" id="pageinfo"></div>';
				}
				oobj.html(actionwrap+infowrap+listwrap);
				//$(actionwrap+infowrap+listwrap).appendTo(oobj);
			}
		}		
		/*(function(o){
			console.log(o.attr("id"));
			console.log(o.attr("data-layout")===undefined);
		})(this);*/
		//console.dir(def);
		//console.dir(sets);
		method['pageLayout'](sets);
		
	}
	
	/*static fun*/
	$.extend({
		pfirst:function(n,c){
			
			console.log(t);
		},
		pprev:function(o){
			var co=$(o);
			var ctxt=co.parent().find("span.pcur").html();
			var ccur=co.next().html();
			if(parseInt(ctxt)<=1){
				return;
			}else if(ccur==ctxt&&ccur==1){
				return;
			}else if(ccur==ctxt&&ccur!=1){
				
			}else{
				co.siblings(".pcur").removeClass('pcur').addClass('pnum').prev().removeClass('pnum').addClass('pcur');
			}
		},
		pnum:function(o,n,c){
			var co=$(o);
			co.siblings(".pcur").removeClass('pcur').addClass('pnum').end().removeClass('pnum').addClass('pcur');
		},
		pnext:function(o,n,s){
			var co=$(o);
			var ctxt=co.parent().find("span.pcur").html();
			var cnum=0;
			if(n%s==0){
				cnum=n/s;
			}else{
				var tempnum=(n-(n%s))/s;
				cnum=parseInt(tempnum+1);
			}
			if(parseInt(ctxt)==cnum){
				return;
			}else{
				co.siblings(".pcur").removeClass('pcur').addClass('pnum').next().removeClass('pnum').addClass('pcur');
			}
		},
		plast:function(n,c){
			console.log(t);
		},
		pdisabled:function(n,c){
			console.log(t);
		}
	});
	
	
	
})(jQuery);


;(function($){
	
	
})(jQuery);

