if(typeof define === "function" && define.amd) {
	/*AMD模块支持*/
	define({
			email:/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z0-9]{2,7}((\.[a-z]{2})|(\.(com|net)))?)$/,
			mobilephone:/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/
	});
}else{
	/*非AMD模块*/
	(function(w){
			var valid_rule={}||w.valid_rule;
			valid_rule.email=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z0-9]{2,7}((\.[a-z]{2})|(\.(com|net)))?)$/;
			valid_rule.mobilephone=/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/;
			w.valid_rule=valid_rule;
	})(window);
}