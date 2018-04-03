/*Google Analytics*/
var _gaq = _gaq || [];
var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
/*common*/
_gaq.push(['_require', 'inpage_linkid', pluginUrl]);
_gaq.push(['_setAccount', 'UA-48725772-1']);
_gaq.push(['_setDomainName', 'ddpa.com']);
_gaq.push(['_addOrganic', 'm.baidu', 'word']);
_gaq.push(['_addOrganic', 'wap.baidu', 'word']);
_gaq.push(['_addOrganic', 'baidu.mobi', 'word']);
_gaq.push(['_addOrganic', 'news.baidu', 'word']);
_gaq.push(['_addOrganic', 'opendata.baidu', 'wd']);
_gaq.push(['_addOrganic', 'post.baidu', 'kw']);
_gaq.push(['_addOrganic', 'mp3.baidu', 'word']);
_gaq.push(['_addOrganic', 'mp3.baidu', 'song']);
_gaq.push(['_addOrganic', 'box.zhangmen.baidu', 'word']);
_gaq.push(['_addOrganic', 'image.baidu', 'word']);
_gaq.push(['_addOrganic', 'top.baidu', 'w']);
_gaq.push(['_addOrganic', 'baidu', 'word']);
_gaq.push(['_addOrganic', 'baidu', 'kw']);
_gaq.push(['_addOrganic', 'baidu', 'q1']);
_gaq.push(['_addOrganic', 'baidu', 'q2']);
_gaq.push(['_addOrganic', 'baidu', 'q3']);
_gaq.push(['_addOrganic', 'baidu', 'q4']);
_gaq.push(['_addOrganic', 'baidu', 'q5']);
_gaq.push(['_addOrganic', 'baidu', 'q6']);
_gaq.push(['_addOrganic', 'news.google', 'q']);
_gaq.push(['_addOrganic', 'image.soso', 'w']);
_gaq.push(['_addOrganic', 'wenwen.soso', 'sp']);
_gaq.push(['_addOrganic', 'wenwen.soso', 'w']);
_gaq.push(['_addOrganic', 'wap.soso', 'key']);
_gaq.push(['_addOrganic', 'soso', 'w']);
_gaq.push(['_addOrganic', 'bing', 'q']);
_gaq.push(['_addOrganic', '3721', 'name']);
_gaq.push(['_addOrganic', '114', 'kw']);
_gaq.push(['_addOrganic', 'youdao', 'q']);
_gaq.push(['_addOrganic', 'vnet', 'kw']);
_gaq.push(['_addOrganic', 'so.360', 'q']);
_gaq.push(['_addOrganic', '360sou', 'q']);
_gaq.push(['_addOrganic', '360so', 'q']);
_gaq.push(['_addOrganic', '360', 'q']);
_gaq.push(['_addOrganic', 'so', 'q']);
_gaq.push(['_addOrganic', 'news.sogou', 'query']);
_gaq.push(['_addOrganic', 'mp3.sogou', 'query']);
_gaq.push(['_addOrganic', 'pic.sogou', 'query']);
_gaq.push(['_addOrganic', 'blogsearch.sogou', 'query']);
_gaq.push(['_addOrganic', 'wap.sogou', 'keyword']);
_gaq.push(['_addOrganic', 'm.sogou', 'keyword']);
_gaq.push(['_addOrganic', 'sogou', 'query']);


/*---用户类型追踪---*/
<#if Session.SESSION_USER?exists>
	/*代码行1：是否登录*/
	_gaq.push(['_setCustomVar', 1, 'LoginType', 'Login', 2]);
	/*代码行4：用户手机号*/
	_gaq.push(['_setCustomVar', 4, 'Uid', '{字段：当前用户的手机号码}', 2]);
	/*代码行2：第三方用户和非第三方用户*/
	<#if Session.第三方登录?exists>
		_gaq.push(['_setCustomVar', 2, 'MemberType', 'KPUser', 2]);
		/*代码行3：用户类型(理财、薪易贷、商易贷、抵押贷、其他快配用户)*/
		<#if 用户对象.user_type?exists>
			<#if 用户信息.user_type==0>
				/*借款*/
				_gaq.push(['_setCustomVar', 3, 'KPUserType', 'Borrow', 2]);
			<#elseif 用户对象.user_type==1>
				/*理财*/
				_gaq.push(['_setCustomVar', 3, 'KPUserType', 'Lend', 2]);
			<#elseif 用户对象.user_type==2>
				/*薪易贷*/
				_gaq.push(['_setCustomVar', 3, 'KPUserType', 'Person', 2]);
			<#elseif 用户对象.user_type==3>
				/*商易贷*/
				_gaq.push(['_setCustomVar', 3, 'KPUserType', 'Company', 2]);
			<#elseif 用户对象.user_type==4>
				/*抵押贷*/
				_gaq.push(['_setCustomVar', 3, 'KPUserType', 'Mortgage', 2]);
			<#else>
				/*其他*/
				_gaq.push(['_setCustomVar', 3, 'KPUserType', 'Others', 2]);
			</#if>
		</#if>
	<#else>
		_gaq.push(['_setCustomVar', 2, 'RegisterType', 'NormalUser', 2]);
	</#if>
	/*代码行5：成功完成过投标的历史记录*/
	<#if 投标对象.成功投标?exists>
		<#if 投标对象.完成投标?exists>
			_gaq.push(['_setCustomVar', 5, 'BuyHistory', 'SucceedBuyed', 2]);
		<#else>
			_gaq.push(['_setCustomVar', 5, 'BuyHistory', 'OrderWithoutBuy', 2]);
		</#if>
	<#else>
		_gaq.push(['_setCustomVar', 5, 'BuyHistory', 'WithoutOrder', 2]);
	</#if>
	/*代码行6：成功完成过借款的历史记录*/
	<#if 借款对象.成功借款?exists>
		<#if 借款对象.完成借款?exists>
			_gaq.push(['_setCustomVar', 6, 'BorrowHistory', 'SucceedBorrowed', 2]);
		<#else>
			_gaq.push(['_setCustomVar', 6, 'BorrowHistory', 'OrderWithoutBorrow', 2]);
		</#if>
	<#else>
		_gaq.push(['_setCustomVar', 6, 'BorrowHistory', 'WithoutOrderBorrow', 2]);
	</#if>
	/*代码行7：充值记录*/
	<#if 充值对象.成功充值?exists>
		<#if 充值对象.完成充值?exists>
			_gaq.push(['_setCustomVar', 7, 'RechargeHistory', 'SucceedRecharged', 2]);
		<#else>
			_gaq.push(['_setCustomVar', 7, 'RechargeHistory', 'OrderWithoutRecharge', 2]);
		</#if>
	<#else>
		_gaq.push(['_setCustomVar', 7, 'RechargeHistory', 'WithoutOrderRecharge', 2]);
	</#if>
<#else>
	_gaq.push(['_setCustomVar', 1, 'LoginType', 'UnLogin', 2]);
</#if>






/*代码行1：是否登录*/
<#if Session.SESSION_USER?exists>
	_gaq.push(['_setCustomVar', 1, 'LoginType', 'Login', 2]);
<#else>
	_gaq.push(['_setCustomVar', 1, 'LoginType', 'UnLogin', 2]);
</#if>
/*代码行2：快配用户和非快配用户*/
<#if Session.SESSION_USER?exists>
	<#if Session.快配用户?exists>
		_gaq.push(['_setCustomVar', 2, 'MemberType', 'KPUser', 2]);
	<#else>
		_gaq.push(['_setCustomVar', 2, 'RegisterType', 'NormalUser', 2]);
	</#if>
</#if>
/*代码行3：用户类型(理财、薪易贷、商易贷、抵押贷、其他快配用户)*/
<#if Session.SESSION_USER?exists>
	<#if Session.快配用户?exists>
		_gaq.push(['_setCustomVar', 3, 'KPUserType', 'Lend', 2]);
		_gaq.push(['_setCustomVar', 3, 'KPUserType', 'Person', 2]);
		_gaq.push(['_setCustomVar', 3, 'KPUserType', 'Company', 2]);
		_gaq.push(['_setCustomVar', 3, 'KPUserType', 'Mortgage', 2]);
		_gaq.push(['_setCustomVar', 3, 'KPUserType', 'Others', 2]);
	</#if>
</#if>
/*代码行4：用户手机号*/
<#if Session.SESSION_USER?exists>
	_gaq.push(['_setCustomVar', 4, 'Uid', '{字段：当前用户的手机号码}', 2]);
</#if>


/*代码行5：成功完成过投标的历史记录*/
<#if Session.SESSION_USER?exists>
	<#if Session.成功投标?exists>
		<#if Session.完成投标?exists>
			_gaq.push(['_setCustomVar', 5, 'BuyHistory', 'SucceedBuyed', 2]);
		<#else>
			_gaq.push(['_setCustomVar', 5, 'BuyHistory', 'OrderWithoutBuy', 2]);
		</#if>
	</#if>
	<#if Session.未投标?exists>
		<#if Session.未完成交易?exists>
			_gaq.push(['_setCustomVar', 5, 'BuyHistory', 'WithoutOrder', 2]);
		</#if>
	</#if>
</#if>
/*代码行6：成功完成过借款的历史记录*/
<#if Session.SESSION_USER?exists>
	<#if Session.成功借款?exists>
		<#if Session.完成借款?exists>
			_gaq.push(['_setCustomVar', 6, 'BorrowHistory', 'SucceedBorrowed', 2]);
		<#else>
			_gaq.push(['_setCustomVar', 6, 'BorrowHistory', 'OrderWithoutBorrow', 2]);
		</#if>
	</#if>
	<#if Session.未借款?exists>
		<#if Session.未完成交易?exists>
			_gaq.push(['_setCustomVar', 6, 'BorrowHistory', 'WithoutOrderBorrow', 2]);
		</#if>
	</#if>
</#if>
/*代码行7：*/
<#if Session.SESSION_USER?exists>
	<#if Session.成功完成过充值?exists>
		<#if Session.完成充值?exists>
			_gaq.push(['_setCustomVar', 7, 'RechargeHistory', 'SucceedRecharged', 2]);
		<#else>
			_gaq.push(['_setCustomVar', 7, 'RechargeHistory', 'OrderWithoutRecharge', 2]);
		</#if>
	</#if>
	<#if Session.未充值?exists>
		<#if Session.未完成交易?exists>
			_gaq.push(['_setCustomVar', 7, 'RechargeHistory', 'WithoutOrderRecharge', 2]);
		</#if>
	</#if>
</#if>



var cga_url=window.location;
var cga_pn=cga_url.pathname;
var cga_s=cga_url.search.slice(1);
/*---电子商务跟踪--投标、充值---*/	
if(/(\/licai\/)(\s*\D*)/.test(cga_pn)){
	<#if (page.modelList)??>
		<#list page.modelList as product>
			/**_gaq.push(['_addTrans','{当前标的ID}','{投标金额}','{可用金额}','{利息}','{空值}']);**/
			_gaq.push(['_addTrans','${(product.productId)!'0'}','${(product.productName)!''}','<#if (product.loanType)?? && (product.loanType == 0 || product.loanType == 1)>信用标<#elseif (product.loanType)?? && (product.loanType == 2 || product.loanType == 3)>抵押标<#else>担保标</#if>','<#if (product.annualRate)??>${(product.annualRate)?string("##0.##")}<#else>0.00</#if>','']);
		</#list>
	</#if>
	_gaq.push(['_trackTrans']);
}else if(/(\/licai\/)(\d*)/.test(cga_pn)){
	/**_gaq.push(['_addItem', '{当前标的ID}','{借款标题}','{借款人}','{借款人注册地}','{借款人注册日期}','{标的类型}','{信用登级}','{借款金额}','{年利率}','{借款期限}','{还款方式}', '{筹标进度}','{投标次数}','{剩余筹款金额}','{剩余时间}',]);**/
	_gaq.push(['_addItem', '${(product.productId)!''}','${(product.productName)!''}','+${(user.userName)!''}','<#if (product.loanType)?? && product.loanType == 4>${(corporation.householdAddress.province)!''}${(corporation.householdAddress.city)!''}<#else>${(person.householdAddress.province)!''}${(person.householdAddress.city)!''}</#if>','<#if (user.createTime)??>${user.createTime?string("yyyy-MM-dd")}</#if>','<#if (product.loanType)?? && (product.loanType == 0 || product.loanType == 1)>信用贷<#elseif (product.loanType)?? && (product.loanType == 2 || product.loanType == 3)>抵押贷<#else>担保贷</#if>','${(product.binLevel)!'F3'}','${(product.investAmount)!'0'}','${(product.annualRate)!'0'}','${(product.loanPeriod)!'0'}','等额本息', '${(tradeProgress/100)?string("##0.##")}','${(size)!'0'}','${(product.investAmount - totalTradeAmount)}','${remainRaiseTimes["days"]!'0'}天${remainRaiseTimes["hours"]!'0'}小时${remainRaiseTimes["minutes"]!'0'}分钟${remainRaiseTimes["seconds"]!'0'}秒']);
	_gaq.push(['_trackTrans']);
}


/*---电子商务跟踪--充值---*/	
if(/(\/licai\/)(\s*\D*)/.test(cga_pn)){
	<#if Session.SESSION_USER?exists>
		/**_gaq.push(['_addTrans', '{当前充值订单编号}', '{充值金额}', '{可用金额}', '{付款方式}', '{空值}']);**/
		_gaq.push(['_addTrans', '', '', '${balanceAmount?string("##0.00")}', '等额本息', '']);
		_gaq.push(['_trackTrans']);
	</#if>
}else if(/(\/fund\/trade\/rechargeInit)/.test(cga_pn)){
	<#if Session.SESSION_USER?exists>
		/**_gaq.push(['_addItem', '{当前充值订单编号}', '{付款方式}', '{操作类型-充值}', '{充值金额}', '{可用金额}']);**/
		_gaq.push(['_addItem', '', '', '充值',$("#tradeAmount").val(), '<#if userAccountVo.balanceAmount??><#assign balanceAmount = userAccountVo.balanceAmount/><#else><#assign balanceAmount = 0.00/></#if><#if userAccountVo.freezeAmount??><#assign freezeAmount = userAccountVo.freezeAmount/><#else><#assign freezeAmount = 0.00/>${(balanceAmount-freezeAmount)?string("###,##0.00")}']);
		_gaq.push(['_trackTrans']);
	</#if>
}else if(/(\/sys\/payment\/thirdPaySend)/.test(cga_pn)){
	/**_gaq.push(['_addItem', '{当前充值订单编号}', '{付款方式}', '{操作类型-充值}', '{充值金额}', '{可用金额}']);**/
	_gaq.push(['_addItem', '${v_oid}', '${pmode_id}', '充值', '${v_amount}', '']);
	_gaq.push(['_trackTrans']);
}








































/*load*/
(function($){
	$(function(){
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	});
})(jQuery);










