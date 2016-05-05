(function(w){
		var valid_ruleobj={
				email:/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z0-9]{2,7}((\.[a-z]{2})|(\.(com|net)))?)$/,
				mobilephone:/^(13[0-9]|15[012356789]|18[0-9]|14[57]|170)[0-9]{8}$/,
				num:/^[0-9]{0,}$/g
		}
		w.Valid_Rule=valid_ruleobj;
})(window);