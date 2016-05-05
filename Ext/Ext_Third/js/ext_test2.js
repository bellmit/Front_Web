;(function(w,ex){
	/*变量*/
	var twraps='';
	/*ext loading*/
	ex.onReady(function(){
		twraps=twraps==''?document.getElementById('ext_cshow'):twraps;
		/*window demo*/
		var tp,w,wc=60,wid=null;
		ex.get('ext_demotitle').on('click',function(){
			if(!tp){
				tp=new ex.tree.TreePanel({
						title:'tree of Window wrap',
						layout:'fit',
						style:'margin:5px auto;',
						minheight:120,
						root: {
							text:'tree of Window',
							children:[{
									text:'window'
								},{
									text:'component'
								},{
									text:'container'
								},{
									text:'panel',
									children:[{
										text:'tabpanel'
									},{
										text:'treepanel'
									},{
										text:'gridpanel'
									},{
										text:'formpanel'
									}]
								}]
						}
				});
			}
			if(!w){
				w=new ex.Window({
						width:500,
						height:300,
						minimizable:true,
						maximizable:true,
						closeAction:'hide',
						title:'This is a Window, '+wc+'秒后关闭!',
						buttons:[{text:'生成树',listeners:{
							click:function(){
								w.add(tp);
								w.doLayout();
							}
						}},{text:'确定'},{text:'取消'}]
				});
			}else{
				clearInterval(wid);
				wid=null;
				wc=60;
				w.setTitle('This is a Window, '+wc+'秒后关闭!');
			}
			w.show();
			wid=setInterval(function(){
				wc--;
				w.setTitle('This is a Window, '+wc+'秒后关闭!');
				if(wc<=0){
					clearInterval(wid);
					wid=null;
					setTimeout(function(){
						w.hide();
					},400);
				}
			},1000);
			w.on('beforeclose',function(){
				clearInterval(wid);
				wid=null;
			});
		});
		
	});

})(window,Ext);
