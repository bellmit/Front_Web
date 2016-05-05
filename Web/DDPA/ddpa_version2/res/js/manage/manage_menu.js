(function($){
	$(function(){
		/*初始化数据：初始化当前主导航展开项*/
		var tempcur_menu=0;
		var mainbox=$("#mainbox").length!=0?$("#mainbox"):$(".mainbox"),sidebox=$("#sidebox").length!=0?$("#sidebox"):$(".sidebox");
		var menuurl_obj={
			000:{
				0:["fund/user_account_detail.html"],
				1:["fund/trade_list.html","fund/trade/withdrawInit","fund/trade/rechargeInit"],
				2:["manage/manage_personinfo.html","manage/manage_personedit.html"],
				3:["bankcard/bankcard.html"],
				4:["authinfo/authinfo.html"],
				5:["security/security.html"],
				6:["msg/sitemsg.html"],
				7:["fund/recommend_friend.html"],
				8:["msg/msgsetting.html"]
			},
			100:{
				0:["manage/wealth_report.html"],
				1:["record/financeRecord.html"],
				2:["record/backRecord.html"]
			},
			200:{
				0:["record/loan_report.html"],
				1:["record/loanRecord.html"],
				2:["record/returnRecord.html"]
			}
		}
		/*当前高亮*/
		var urlstr=window.location.href,urlsearch=window.location.search;
		var urlarr=[0,0];
		loopout:for(var ii in menuurl_obj){
					var tempurlobj=menuurl_obj[ii];
					for(var jj in tempurlobj){
						var tempmsubarr=tempurlobj[jj],tmsa_len=tempurlobj[jj].length,kk=0;
						for(;kk<tmsa_len;kk++){
							if(urlstr.indexOf(tempmsubarr[kk])!=-1){
								if(urlsearch==""||(urlsearch!=""&&urlsearch.indexOf("productId")==-1)){
									var tempii=ii.toString();
									tempii=tempii.slice(0,1);
									urlarr.splice(0,2,tempii,jj);
									tempcur_menu=tempii;
									break loopout;
								}else if(urlsearch!=""&&urlsearch.indexOf("productId")!=-1&&tempmsubarr[kk]=="fund/trade/repayInit"){
									/*还款情况*/
									urlarr.splice(0,2,2,jj);
									tempcur_menu=2;
									break loopout;
								}
							}
						}
					}
		}
		/*一级导航展开，其他收缩(同时处理回款菜单的特殊路径错误)*/
		sidebox.find("p").each(function(index,element){
			var curobj=$(element),curid=element.id,curindex=curid.slice(-1);
			if(curindex==urlarr[0]){
				curobj.next("ul").show().find("li").eq(urlarr[1]).addClass("curmenu");
				curobj.parent().siblings().find("ul").hide();
				return false;
			}
		});
		/*菜单效果*/
		$("#menutheme0,#menutheme1,#menutheme2").click(function(){
			var curobj=$(this),parobj=curobj.parent(),curflag=curobj.attr("id").slice(-1);
			if(curflag==tempcur_menu){
				return false;	
			}
			curobj.next().slideToggle(300);
		});
	});
})(jQuery);