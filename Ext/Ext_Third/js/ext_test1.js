;(function(w,$,ex){
	/*文本常量*/
	var HTMLPANEL='<p class="edetails">Windows 窗体 Panel 控件用于为其他控件提供可识别的分组。通常，使用面板按功能细分窗体。例如，可能有一个订单窗体，它指定邮寄选项（如使用哪一类通营承运商）。将所有选项分组在一个面板中可向用户提供逻辑可视提示......</p><p class="edetails">若要显示滚动条，请将 AutoScroll 属性设置为 true。也可以通过设置 BackColor、BackgroundImage 和 BorderStyle 属性自定义面板的外观......</p>',HTMLINFO1='<p class="edetails">Ext是一个强大的js类库，以前是基于雅虎UI,现在已经完全独立了。</p>',HTMLINFO2='<p class="edetails">主要包括data、widget、form、grid、dd、menu，其中最强大的应该算grid了，编程思想是基于面向对象编程(oop)，扩展性相当的好。可以自己写扩展，自己定义命名空间。</p>',HTMLINFO3='<p class="edetails">主要包括三个大的文件：ext-all.css,ext-base.js,ext-all.js（包括所有的类库，您可以根据需要进行删减。官方网站提供这一接口），在引用ext类库的时候，这三个文件必不可少。</p>';
	/*自定义组件模块*/
	var self_table1='<table class="self_etable1" id="self_etable1"></table>',self_ul1='<ul class="self_exul1" id="self_exul1"><li>昆仑--<span class="exul1_span">武侠</span></li><li>沧海--<span class="exul1_span">武侠</span></li><li>一路风尘--<span class="exul1_span">武侠</span></li><li>江上如此多娇--<span class="exul1_span">武侠</span></li><li>都市风水师--<span class="exul1_span">都市</span></li><li>我的老婆是女警--<span class="exul1_span">都市</span></li><li>躲美录--<span class="exul1_span">都市</span></li><li>斗破苍穹--<span class="exul1_span">修真</span></li><li>武动乾坤--<span class="exul1_span">修真</span></li><li>遮天--<span class="exul1_span">修真</span></li><li>少林八绝--<span class="exul1_span">武侠</span></li><li>饮马黄河--<span class="exul1_span">武侠</span></li><li>岳小钗--<span class="exul1_span">武侠</span></li><li>风清扬--<span class="exul1_span">武侠</span></li><li>古道惊风--<span class="exul1_span">武侠</span></li><li>三国演义--<span class="exul1_span">武侠</span></li><li>水浒传--<span class="exul1_span">武侠</span></li><li class="ex_clear"></li></ul>';
	/*变量*/
	var twraps='';
	/*ext loading*/
	ex.onReady(function(){
		twraps=twraps==''?document.getElementById('ext_cshow'):twraps;
		/*title first extjs demo*/
		ex.get('ext_demotitle').on('click',function(){
			ex.MessageBox.alert('Ext Test1','hello! \n This is my first extjs demo');
			setTimeout(function(){
				ex.Msg.alert('ok','test success!');	
			},2000);
		});
		ex.get('ext_component1').on('click',function(e){
			exHandleTest1(e);
		});
		ex.get('ext_component2').on('click',function(e){
			exHandleTest2(e);
		});
		ex.get('ext_component3').on('click',function(e){
			exHandleTest2(e);
		});
	});
	
	/*handle*/
	function exHandleTest1(e){
		var ctar=e.target,cnode=ctar.nodeName.toLowerCase();
		if(cnode!='h3'){
			var ctxt=ctar.innerHTML;
			twraps.innerHTML='';
			(function(){
				try{
					eval('ex'+ctxt+'()');
				}catch(e){
					ex.Msg.alert(ctxt,ctxt+' test success!');
				}
			}());
		}
	}
	function exHandleTest2(e){
		var ctar=e.target,cnode=ctar.nodeName.toLowerCase();
		if(cnode!='h3'){
			var ctxt=ctar.innerHTML,cid=ctar.parentNode.id;
			twraps.innerHTML='';
			if(cid=='ext_component2'){
				exToolbarHandle();
			}else if(cid=='ext_component3'){
				exFormHandle();
			}
		}
	}
	/*Box*/
	function exBox(){
		var b=new ex.BoxComponent({
			el:twraps,
			html:'<div class="self_cdetails1">'+HTMLINFO1+'</div>'
		});
		b.render();
	}
	/*Button*/
	function exButton(){
		var b=new ex.Button({
			type:'button',
			style:'margin:5px auto;'
		});
		b.setText('This is Button');
		b.setSize({width:200,height:30});
		b.render(twraps);
	}
	/*Colorpalette*/
	function exColorpalette(){
		var cp=new ex.ColorPalette();
		cp.addClass('self_ccolord1');
		cp.on('select',function(co){
			twraps.childNodes[0].style.borderColor='#'+co.value;
		});
		cp.render(twraps);
	}
	/*Component*/
	function exComponent(){
		var c=new ex.Component({
			html:'<div class="self_cdetails1">'+HTMLINFO3+'</div>'
		});
		c.render(twraps);
	}
	/*Container*/
	function exContainer(){
		var c=new ex.Container({
			html:self_ul1
		});
		c.render(twraps);
	}
	/*Dataview*/
	function exDataview(){
		/*to do*/
	}
	/*Datapicker*/
	function exDatapicker(){
		var d=new ex.DatePicker({
			style:'margin:5px auto;'
		});
		d.render(twraps);
	}
	/*Editor*/
	function exEditor(){
		/*to do*/
	}
	/*Editorgird*/
	function exEditorgird(){
		/*to do*/	
	}
	/*Gird*/
	function exGird(){
		var g=new ex.grid.GridPanel({
				store: new ex.data.Store({
					/*data:[{ids:'000001',username:'张三',age:'22',sex:'男',mobile:'13808807452',address:'深圳南山区',income:'12000'}]	*/
				}),
				columns: [
					{
						id:'ids',
						header: "编号",
						width: 120,
						sortable: true,
						dataIndex: 'ids'
					},
					{
						header: "姓名",
						width:130,
						sortable: true,
						dataIndex: 'username'
					},
					{
						header: "年龄",
						width:50,
						sortable: true,
						dataIndex: 'age'
					},
					{
						header: "性别",
						width:50,
						dataIndex: 'sex'
					},
					{
						header: "电话",
						width:120,
						sortable: true,
						dataIndex: 'mobile'
					},
					{
						header: "地址",
						width:180,
						dataIndex: 'address'
					},
					{
						header: "收入",
						width:120,
						sortable: true,
						dataIndex: 'income'
					}
				],
				viewConfig: {
					forceFit: true
				},
				sm: new ex.grid.RowSelectionModel({singleSelect:true}),
				width:760,
				height:200,
				frame:true,
				title:'This is grid wrap',
				iconCls:'icon-grid',
				style:'margin:20px auto;'
		});
		var f=new ex.FormPanel({
			title:'FormPanel wrap',
			width:800,
			style:'margin:5px auto',
			items:[g]
		});
		f.render(twraps);	
	}
	/*Paging*/
	function exPaging(){
		/*to do*/
	}
	/*Panel*/
	function exPanel(){
		var p=new ex.Panel({
			el:twraps,
			title:'Panel wrap',
			width:800,
			html:HTMLPANEL
		});
		p.render();
	}
	/*Progress*/
	function exProgress(){
		/*to do*/
	}
	/*Splitbutton*/
	function exSplitbutton(){
		var sb=new ex.SplitButton({
			type:'button',
			text:'SplitButton',
			width:100,
			style:'margin:5px auto;',
			menu:new ex.menu.Menu({
				items:[{text:'menu1'},{text:'menu2'},{text:'menu3'}]
			})
		});
		sb.render(twraps);
	}
	/*TabPanel*/
	function exTabpanel(){
		var tp=new ex.TabPanel({
			el:twraps,
			width:800
		});
		tp.add({
			title:'Tab test1',
			html:HTMLINFO1
		});
		tp.add({
			title:'Tab test2',
			items:[new ex.Panel({
				title:'This is Panel wrap of Tab',
				layout:'fit',
				html:HTMLINFO2
			})]
		});
		tp.render();
		tp.activate(0);
	}
	/*Treepanel*/
	function exTreepanel(){
		var tp=new ex.tree.TreePanel({
			title:'Tree wrap',
			style:'margin:5px auto;',
			width:800,
			root:{
				text: 'Tree of Ext TreePanel',
				id:'self_extree1'
			}
		});
		tp.render(twraps);
	}
	/*Viewport*/
	function exViewport(){
		/*to do*/
	}
	/*Toolbar*/
	function exToolbarHandle(){
		var fileitem=new ex.SplitButton({
				text:'file',
				width:80,
				menu:new ex.menu.Menu({
					items:[
						{text:'new'},
						{text:'open'},
						{text:'close'},
						{text:'save'},
						{text:'print'},
						{text:'exit'},
					],
					width:80
				})
		});
		var btn=new ex.Button({
			text:'edit',
			width:80
		});
		/**/
		var t=new ex.Toolbar({
			title:'Toolbar wrap',
			width:800,
			style:'margin:5px auto;'
		});
		t.add(fileitem);
		t.addSeparator();
		t.addButton(btn);
		t.addSeparator();
		t.addText('view');
		t.addSeparator();
		t.render(twraps);
	}
	/*Form*/
	function exFormHandle(){
		var f=new ex.FormPanel({
			title:'FormPanel wrap',
			width:800,
			style:'margin:5px auto'
		});
		f.render(twraps);
	}
	

	
	
})(window,jQuery,Ext);
