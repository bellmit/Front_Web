(function($){
	$(function(){
		var $sto_wrap=$('#sto_wrap');
		var sto_obj={
				'name':'好人好梦',
				'age':'9999',
				'address':'china',
				'theme':'test storage',
				'type':'json or object',
				'remark':'html5 css3 javascript mobile pc',
				'test_operate':'normal'
			},wl=window.localStorage;
		$sto_wrap.click(function(e){
			var o=e.target,on=o.nodeName;
			if(on.toLowerCase()=='li'){
				var $o=$(o),txt=$o.text(),ttxt=txt.replace(/\s*localstorage/g,'');
				if(wl){
					switch(ttxt){
						case 'create':
							if(wl.getItem('test_storage_obj')==null){
								wl.setItem('test_storage_obj',window.JSON.stringify(sto_obj));
								alert("----create success----");	
							}else{
								alert("----storage already----");
							}
							break;
						case 'set':
							if(wl.getItem('test_storage_obj')!=null||wl.length!=0){
								var tempset=window.JSON.parse(wl.getItem('test_storage_obj'));
								tempset['test_operate']=parseInt(Math.random()*1000);
								wl.setItem('test_storage_obj',window.JSON.stringify(tempset));
								alert("----set success----");
							}else{
								alert("----no storage value,can't set----");
							}
							break;
						case 'get':
							if(wl.getItem('test_storage_obj')!=null||wl.length!=0){
								var tempget=window.JSON.parse(wl.getItem('test_storage_obj'));
								alert("----get success----"+tempget['test_operate']);
							}else{
								alert("----no storage value,can't get----");
							}
							break;
						case 'clear':
							if(wl.length!=0){
								wl.clear();
								alert("----clear success----");
							}else{
								alert("----storage is null,can't clear----");
							}
							break;
						case 'remove':
							if(wl.length!=0){
								if(wl.getItem('test_storage_obj')!=null){
									wl.removeItem('test_storage_obj');
									alert("----remove success----");
								}else{
									alert("----no storage value,can't remove----");
								}
							}else{
								alert("----storage is null,can't remove----");
							}
							break;
					}		
				}else{
					alert('no localStorage');
					return false;
				}
			}
		});
	});
})(jQuery);