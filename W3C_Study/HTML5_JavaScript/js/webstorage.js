// JavaScript Document
$(function(){
	var ss_btn=$("#ws_ss_btn");
	var ls_btn=$("#ws_ls_btn");
	var ss_text=$("#ws_ss_ta");
	var ls_text=$("#ws_ls_ta");
	/*sessionStorage*/
	ss_btn.click(function(){
		if(ss_text.val()!=""){
			window.sessionStorage.setValue=ss_text.val();
			alert("sessionStorage save");
		}
	});
	ss_text.val(window.sessionStorage.setValue);
	/*localStorage*/
	ls_btn.click(function(){
		if(ls_text.val()!=""){
			window.localStorage.setItem("ls_value",ls_text.val());
			alert("sessionStorage save");
		}
	});
	ls_text.val(window.localStorage.getItem("ls_value"));
});
