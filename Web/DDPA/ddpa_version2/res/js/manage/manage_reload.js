(function($){
	$(function(){
		/*银行图标信息对象*/
		//借记卡
		var jjk_biobj={
				1025:{type:"jjk",value:"1025",pclass:"bio_gs"},105:{type:"jjk",value:"105",pclass:"bio_js"},
				103:{type:"jjk",value:"103",pclass:"bio_ny"},104:{type:"jjk",value:"104",pclass:"bio_zg"},
				3080:{type:"jjk",value:"3080",pclass:"bio_zs"},301:{type:"jjk",value:"301",pclass:"bio_jt"},
				3230:{type:"jjk",value:"3230",pclass:"bio_yzcx"},314:{type:"jjk",value:"314",pclass:"bio_pf"},
				307:{type:"jjk",value:"307",pclass:"bio_pa"},309:{type:"jjk",value:"309",pclass:"bio_xy"},
				313:{type:"jjk",value:"313",pclass:"bio_zx"},312:{type:"jjk",value:"312",pclass:"bio_gd"},
				311:{type:"jjk",value:"311",pclass:"bio_hx"},305:{type:"jjk",value:"305",pclass:"bio_ms"},
				3061:{type:"jjk",value:"3061",pclass:"bio_gf"},316:{type:"jjk",value:"316",pclass:"bio_nj"},
				324:{type:"jjk",value:"324",pclass:"bio_hz"},302:{type:"jjk",value:"302",pclass:"bio_nb"},
				310:{type:"jjk",value:"310",pclass:"bio_bj"},326:{type:"jjk",value:"326",pclass:"bio_sh"},
				342:{type:"jjk",value:"342",pclass:"bio_cqns"},335:{type:"jjk",value:"335",pclass:"bio_bjns"},
				336:{type:"jjk",value:"336",pclass:"bio_cd"},343:{type:"jjk",value:"343",pclass:"bio_scrb"},
				3341:{type:"jjk",value:"3341",pclass:"bio_boq"}};
		
		//信用卡
		var xyk_biobj={
				1027:{type:"xyk",value:"1027",pclass:"bio_gs"},
				308:{type:"xyk",value:"308",pclass:"bio_zs"},
				1054:{type:"xyk",value:"1054",pclass:"bio_js"},
				106:{type:"xyk",value:"106",pclass:"bio_zg"},
				3112:{type:"xyk",value:"3112",pclass:"bio_hx"},
				3051:{type:"xyk",value:"3051",pclass:"bio_ms"},
				3121:{type:"xyk",value:"3121",pclass:"bio_gd"},
				3231:{type:"xyk",value:"3231",pclass:"bio_yzcx"},
				3241:{type:"xyk",value:"3241",pclass:"bio_hz"},
				303:{type:"xyk",value:"303",pclass:"bio_nb"},
				3261:{type:"xyk",value:"3261",pclass:"bio_sh"},
				301:{type:"xyk",value:"301",pclass:"bio_jt"},
				3091:{type:"xyk",value:"3091",pclass:"bio_xy"},
				3071:{type:"xyk",value:"3071",pclass:"bio_pa"},
				3131:{type:"xyk",value:"3131",pclass:"bio_zx"},
				306:{type:"xyk",value:"306",pclass:"bio_gf"},
				334:{type:"xyk",value:"334",pclass:"bio_boq"},
				3141:{type:"xyk",value:"3141",pclass:"bio_pf"}};
		
		var dsf_biobj={1:{type:"dsf",value:"1",pclass:"bio_tlzf"},2:{type:"dsf",value:"2",pclass:"bio_gfb"},3:{type:"dsf",value:"3",pclass:"bio_gczf"}};
		/*页面元素获取(更多银行按钮，已选择银行卡，已选择银行卡操作区，更多银行卡操作区)*/
		var mr_morebtn=$("#mr_morebtn"),mr_bankwrap=$("#mr_bankwrap"),mr_alreadywrap=$("#mr_alreadywrap"),mr_selectwrap=$("#mr_selectwrap");
		var mr_selectjjk=$("#mr_selectjjk"),mr_selectxyk=$("#mr_selectxyk"),mr_selectdsf=$("#mr_selectdsf");
		/*隐藏域:已选，最新选择、选择重复提示区*/
		var beforebank=$("#beforebank"),thirdPayType=$("#thirdPayType"),mr_bankseltips=$("#mr_bankseltips");
		/*初始化*/
		var urlhash=window.location.hash,urlparam="";
		if((urlhash!=""||urlhash!="undefined"||urlhash!=null)&&urlhash.indexOf("reload")!=-1){
			urlparam=urlhash.slice(8);
			urlparam=urlparam.replace(/\s+/g,"")
			urlparam=urlparam.replace(/\=+/g,"")
			urlparam=urlparam.replace(/[a-zA-Z]+/g,"");
		}else if(urlhash=="#vip"){
			var availMoney = $("#availMoney").attr("data-v");
				availMoney = parseFloat(availMoney);
				availMoney = availMoney.toFixed(2);
			$("#tradeAmount").val(198 - parseFloat(availMoney));
			
		}
		
		(function(){
			/*初始化默认选择银行*/
			if(beforebank.val()==""||beforebank.val()=="-1"||typeof beforebank.val()=="undefined"||beforebank.val()=="null"){
			   /*第一次充值*/
			   beforebank.val("");
			   mr_alreadywrap.hide();
			   mr_selectwrap.show();
			   mr_selectjjk.find("li:first").addClass("mr_selectsel").siblings().removeClass("mr_selectsel");
			   beforebank.val("1025");
			   thirdPayType.val("1025");
			}else if((beforebank.val()!=""&&beforebank.val()!="-1")||typeof beforebank.val()!="undefined"){
					/*之前有充值记录存在的情况*/
					mr_alreadywrap.show();
					mr_selectwrap.hide();
					var tempvalue=beforebank.val();
					var tempstr="",temptype="",avalue="",aobj="";
					if(havabank!=tempvalue){
						tempvalue=1025;
						beforebank.val("1025");
						tempstr="<li class=\"mr_banksel\">"+jjk_biobj[tempvalue].value+"<p></p><div class=\""+jjk_biobj[tempvalue].pclass+"\"></div><span class=\"mr_jjkflag\">借记</span></li>";
						thirdPayType.val("1025");
						mr_selectjjk.find("li:first").addClass("mr_selectsel").siblings().removeClass("mr_selectsel");
					}else if(!jjk_biobj.hasOwnProperty(tempvalue)&&!xyk_biobj.hasOwnProperty(tempvalue)&&!dsf_biobj.hasOwnProperty(tempvalue)){
						tempvalue=1025;
						beforebank.val("1025");
						tempstr="<li class=\"mr_banksel\">"+jjk_biobj[tempvalue].value+"<p></p><div class=\""+jjk_biobj[tempvalue].pclass+"\"></div><span class=\"mr_jjkflag\">借记</span></li>";
						thirdPayType.val("1025");
						mr_selectjjk.find("li:first").addClass("mr_selectsel").siblings().removeClass("mr_selectsel");
					}else{
						var temptext="";
						if(urlparam>=1){
							$("#tradeAmount").val(urlparam);
						}
						if(jjk_biobj.hasOwnProperty(tempvalue)){
							temptype="jjk";
							aobj=jjk_biobj;
							avalue="借记";
							cardNoAdapt(mr_selectjjk,tempvalue);
							if(xyk_biobj.hasOwnProperty(tempvalue)){
								cardNoAdapt(mr_selectxyk,tempvalue);
							}
						}else if(xyk_biobj.hasOwnProperty(tempvalue)){
							temptype="xyk";
							aobj=xyk_biobj;
							avalue="信用";
							cardNoAdapt(mr_selectxyk,tempvalue);
							if(jjk_biobj.hasOwnProperty(tempvalue)){
								cardNoAdapt(mr_selectjjk,tempvalue);
							}
						}else if(dsf_biobj.hasOwnProperty(tempvalue)){
							temptype="dsf";
							aobj=dsf_biobj;
							avalue="";
							mr_selectdsf.find("li").each(function(index, element) {
								var curobj=$(element);
                                temptext=curobj.text();
								if(temptext==tempvalue){
									curobj.addClass("mr_selectsel");
								}else{
									curobj.removeClass("mr_selectsel");
								}
                            });
						}
						thirdPayType.val(aobj[tempvalue].value);
						if(tempvalue=="301"){
							tempstr="<li class=\"mr_banksel\">"+aobj[tempvalue].value+"<p></p><div class=\""+aobj[tempvalue].pclass+"\"></div></li>";
						}else{
							tempstr="<li class=\"mr_banksel\">"+aobj[tempvalue].value+"<p></p><div class=\""+aobj[tempvalue].pclass+"\"></div><span class=\"mr_"+temptype+"flag\">"+avalue+"</span></li>";	
						}
					}
					mr_bankwrap.html("");
					$(tempstr).appendTo(mr_bankwrap);
			}
			/*大写初始化*/
			if($("#tradeAmount").length!=0){
				UCFormat(document.getElementById("tradeAmount").value,"mr_uppercase");
			}
			aobj=null;
			//充值成功
			var hrefhash=window.location.hash;
			if(hrefhash.indexOf('#recharge=success')!=-1){
				infoTipAuto("恭喜!充值成功.","succ","",5);
				setTimeout(function(){
					window.close();
				},5000);
			}
		}());
		
		/*卡号和选择区卡号对应适配*/
		function cardNoAdapt(objs,txt){
			objs.find("li").each(function(index, element) {
				var curobj=$(element);
				temptext=curobj.text();
				if(temptext==txt){
					curobj.addClass("mr_selectsel");
				}else{
					curobj.removeClass("mr_selectsel");
				}
			});
		}
		
		/*更多银行切换效果*/
		mr_morebtn.click(function(){
			$(this).toggleClass("mr_morebtnsel");
			if(beforebank.val()!=""||beforebank.val()!="-1"||typeof beforebank.val()!="undefined"||beforebank.val()!="null"){
				mr_alreadywrap.hide();
			}
			mr_selectwrap.show();
		});
		/*绑定选择不同类型*/
		$("#mr_tag li").click(function(e){
			var curobj=$(e.target),curid=e.target.id,curindex=curobj.index();
			curobj.addClass("mr_tagsel").siblings().removeClass("mr_tagsel");
			if(curindex==0){
				mr_selectjjk.show();
				mr_selectxyk.hide();
			}else if(curindex==1){
				mr_selectjjk.hide();
				mr_selectxyk.show();		
			}
		});
		/*绑定更多银行选择事件*/
		$("#mr_selectjjk,#mr_selectxyk,#mr_selectdsf").live("click",function(e){
			var tempnode=e.target.nodeName.toLowerCase();
			if(tempnode=="ul"){
				return false;
			}
			var curobj=$(e.target),curtext,selstr="",parobj="",wrapid="";
			if(tempnode=="div"||tempnode=="p"){
				parobj=curobj.parent();
				curtext=parobj.text();
				parobj.addClass("mr_selectsel").siblings().removeClass("mr_selectsel");
				wrapid=parobj.parent().attr("id").slice(-3);
			}else if(tempnode=="li"){
				curtext=curobj.text();
				curobj.addClass("mr_selectsel").siblings().removeClass("mr_selectsel");
				wrapid=curobj.parent().attr("id").slice(-3);
			}
			var bvalue="",bobj="";
			if(wrapid=="jjk"){
				bobj=jjk_biobj;
				bvalue="借记";
				mr_selectxyk.find("li").each(function(index, element) {
					element.className="";
                });
				mr_selectdsf.find("li").each(function(index, element) {
                    element.className="";
                });
			}else if(wrapid=="xyk"){
				bobj=xyk_biobj;
				bvalue="信用";
				mr_selectjjk.find("li").each(function(index, element) {
                    element.className="";
                });
				mr_selectdsf.find("li").each(function(index, element) {
                    element.className="";
                });
			}else if(wrapid=="dsf"){
				bobj=dsf_biobj;
				bvalue="";
				mr_selectxyk.find("li").each(function(index, element) {
                    element.className="";
                });
				mr_selectjjk.find("li").each(function(index, element) {
                    element.className="";
                });
			}
			var selobj=bobj[curtext];
			beforebank.val(selobj.value);
			thirdPayType.val(selobj.value);
			selstr="<li class=\"mr_banksel\">"+selobj.value+"<p></p><div class=\""+selobj.pclass+"\"></div><span class=\"mr_"+wrapid+"flag\">"+bvalue+"</span></li>";
			mr_bankwrap.html("");
			$(selstr).appendTo(mr_bankwrap);
			bobj=null;
		});
		/*充值表单校验*/
		$("#mr_reload").validate({
				onkeyup:false,
				rules : {
					'TradeAmount' : {
						required:true,
						minlength:1,
						isMoneyNumber:true,
						isMinNumber:true
					}
				},
				messages : {
					'TradeAmount' : {
						required : "充值金额不能为空",
						minlength:"充值金额不能为空",
						isMoneyNumber:"充值金额：非0开头且最多保留两位小数",
						isMinNumber:"充值金额不能小于1元"
					}
				},
				errorPlacement : function(error,element){
					$("#mr_errorinfo").html(error.text());
				},
				success:function(){
					$("#mr_errorinfo").html("");
					
					if($("#mr_submit").hasClass("disabled")){
						return false;
					}
				},
				invalidHandler : function() {
					return false;
				}
		});		
		
		
		
		$("#mr_submit").click(submitHandler);
		
		function submitHandler(){
			var f = $("#mr_reload") ,tempvalid = $("#mr_reload").valid();
			if(!tempvalid){
				return false;
			}
			var ishavabk=document.getElementById("beforebank").value;
			if(ishavabk==""||ishavabk=="-1"||typeof ishavabk=="undefined"||ishavabk=="null"){
				infoTipAuto("您还未选择支付方式","explain","",3);
			}else{
				var url =$('form[id=mr_reload]').attr('action');
				var params =$('form[id=mr_reload]').serialize();
				$.blockUI({css:{"left":"34%",width:"600px",border:"none",backgroundColor:"none"},message:$("#popup_reloadbox")});
				
			}
			return true;
		}
		
		/*大小写转换*/
		$("#tradeAmount").keyup(function(){
			var curobj=$(this),curtext=curobj.val();
			var testreg=/[^\d\.]/;
			if(testreg.test(curtext)){
				var temptext=curtext.match(/[\d+\.]/g);
				if(temptext==null){
					curobj.val("");
				}else{
					temptext=temptext.join("");
					curobj.val(temptext);
				}
			}
			UCFormat(this.value,"mr_uppercase");
		}).focusout(function(e){
			var curobj = e.target, curval = curobj.value;
			if(curval==""){
				return false;
			}
			curobj.value=lenSubStr(10,curval);
			UCFormat(this.value,"mr_uppercase");
			
			if($(".useOverage").size()>0){
				
				var rType = $(".returnType.checked").find("input").val(), 
					useable = $(".useOverage").attr("status"),
					returnMoney = parseFloat($("#returnMoney").attr("data-v")), //还款金额
					useMoney = parseFloat($("#useMoney").attr("data-v")), //可用金额
					tradeAmount = parseFloat($("#tradeAmount").val());  //充值金额
				
				if(rType==1 && useable == "checked"){
					var m = useMoney + tradeAmount;
					if(m < returnMoney){
						$("#mr_submit").addClass("disabled");
						$("#mr_submit").attr("disabled",true);
					}else{
						$("#mr_submit").removeClass("disabled");
						$("#mr_submit").removeAttr("disabled");
					}
				}else if(rType==1 && useable == "unchecked"){
					if(tradeAmount < returnMoney){
						$("#mr_submit").addClass("disabled");
						$("#mr_submit").attr("disabled",true);
					}else{
						$("#mr_submit").removeClass("disabled");
						$("#mr_submit").removeAttr("disabled");
					}
				}
			}
        });
		
		/*弹出层事件绑定*/
		$("#popup_reloadclose,#popup_sure,#popup_reloadway").click(function(e){
			var curid=e.target.id;
			$.unblockUI();
			var urlstr=window.location.href;
			var urlts=urlstr.indexOf("fund/trade/repayInit/");	
			if(curid=="popup_sure"){
				if(urlts!=-1){
					window.location.replace("../../account/");
				}else{
					window.location.replace("../../fund/account/")
				}
				/*setTimeout(function(){
					window.opener=null;
					window.close();
				},20);*/
			}else if(curid=="popup_reloadclose"){
				setTimeout(function(){
					window.location.reload();	
				},300);
			}else if(curid=="popup_reloadway"){
				var tempreload=urlstr;
				var isreload=tempreload.indexOf("#reload?a=");
				if(isreload!=-1){
					var tempreload=tempreload.slice(0,isreload+1);
				}
				window.open(tempreload+"#reload?a="+$("#tradeAmount").val());
				setTimeout(function(){
					window.close();
				},20);
			}
		});
		
		
	});
})(jQuery);


