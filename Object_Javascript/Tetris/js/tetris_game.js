;(function(win,$,g){
	/*jquery loading*/
	$(function(){
		var $action=$('#t_cmenu');
		var remark='undefined',set='undefined';
		$action.on('click',function(e){
			var tar=e.target,tn=tar.nodeName.toLowerCase();
			if(tn=='li'){
				var $o=$(tar),da=$o.attr('data-gaction'),da_fix=da.split('_'),da_suffix=da_fix[1];
				switch(da_suffix){
					case 'start':
						win.tetris.start();
						/*for(var i=50;i>0;i--){
							secnewrap.start();
						};*/
						break;
					case 'remark':
						var rw=$('#t_c'+da_suffix),rc=$('#t_c'+da_suffix+'_close');
						rw.slideDown().siblings().slideUp();
						if(remark=='undefined'){
							remark=rc.on('click',function(){
									rw.slideUp();
							});
						}
						break;
					case 'set':
						var sw=$('#t_c'+da_suffix),sc=$('#t_c'+da_suffix+'_close');
						sw.slideDown().siblings().slideUp();
						if(set=='undefined'){
							set=sc.on('click',function(){
									sw.slideUp();
							});
						}
						break;
					case 'end':
						win.tetris.end();
						break;
				}
			}
		});
	});	
})(window,jQuery,yp);