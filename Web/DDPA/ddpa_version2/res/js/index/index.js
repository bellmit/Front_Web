$(document).ready(function(e) {
	
	var url = location.href;
	if($("#ilogin_box").size()>0){
		var loginurl = url + "account/user/indexlogin";
		
		if(loginurl.indexOf("localhost")>=0){
			loginurl = "account/user/indexlogin";
		}else if(loginurl.indexOf(".me")<0){
			loginurl = loginurl.replace("http://", "https://");
		}
		
		createIframe("#ilogin_box","indexlogin",loginurl,319,270);
	}
	
	if($("#iloan_box").size()>0){
		var loanurl = url + "account/user/indexloan";
		
		if(loanurl.indexOf("localhost")>=0){
			loanurl = "account/user/indexloan";
		}else if(loanurl.indexOf(".me")<0){
			loanurl = loanurl.replace("http://", "https://");
		}
		
		createIframe("#iloan_box","indexloan",loanurl,380,330);
	}
	
	function createIframe(boxid,id,url,width,height) {
		var i = document.createElement("iframe");
		i.src =url;
		i.scrolling ="no";
		i.setAttribute('frameBorder', 0);
		i.style.cssText = 'border: 0 none;'; 
		i.width =width;
		i.height =height;
		i.marginheight=0;
		i.marginwidth=0;
		i.id = id;
		$(boxid).append(i);
	};
});