(function($){
	$(function(){
		/*初始化数据：初始化当前主导航展开项*/
		var tempcur_menu=0;
		var mainbox=$("#mainbox").length!=0?$("#mainbox"):$(".mainbox"),sidebox=$("#sidebox").length!=0?$("#sidebox"):$(".sidebox");
		var menuurl_obj={
			000:{
				0:["fund/account/"],
				1:["fund/trade/","fund/trade/withdrawInit","fund/trade/rechargeInit"],
				2:["account/user/manageInit","account/user/managePersonedit"],
				3:["fund/bank/queryBankCardUserId"],
				4:["fund/authentication/authenticationCentor"],
				5:["fund/security/securityInit"],
				6:["fund/message/queryMessageList"],
				7:["fund/remind/queryMessageRemindUserId"]
			},
			100:{
				0:["fund/invest/investStatementInit"],
				1:["fund/investRecord/investStatementInit"],
				2:["fund/returned/waitReturnedMoneyPageInit"]
			},
			200:{
				0:["fund/loan/report"],
				1:["fund/loan/sumInfo"],
				2:["fund/repay/sumInfo"]
			}
		}
		/*当前高亮*/
		var urlstr=window.location.href;
		var urlarr=[0,0];
		loopout:for(var ii in menuurl_obj){
					var tempurlobj=menuurl_obj[ii];
					for(var jj in tempurlobj){
						var tempmsubarr=tempurlobj[jj],tmsa_len=tempurlobj[jj].length,kk=0;
						for(;kk<tmsa_len;kk++){
							if(urlstr.indexOf(tempmsubarr[kk])!=-1){
								var tempii=ii.toString();
								tempii=tempii.slice(0,1);
								urlarr.splice(0,2,tempii,jj);
								tempcur_menu=tempii;
								break loopout;
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
		}).end().find("a").click(function(){
			var urlts=urlstr.indexOf("fund/trade/repayInit/");
			if(urlts!=-1){
				var cururl=$(this).attr("href").slice(6);
				var urlpos=urlstr.slice(0,urlts);
				window.location.href=urlpos+cururl;
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