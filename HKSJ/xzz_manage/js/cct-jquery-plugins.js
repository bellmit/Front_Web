
//后台列表翻页按钮区分“可用”“不可用”
function initTableLimit()
{
	if(tb.pagecount()==1 || tb.pagecount()==0)
	{
		$('#span_first').attr('disabled','disabled');
		$('#span_prev').attr('disabled','disabled');
		$('#span_next').attr('disabled','disabled');
		$('#span_last').attr('disabled','disabled');
		$("#span_first").attr("style","color:#999");
		$("#span_prev").attr("style","color:#999");
		$("#span_next").attr("style","color:#999");
		$("#span_last").attr("style","color:#999");
	}
	else
	{
		if(tb.currentpage()==1){
			$('#span_first').attr('disabled','disabled');
			$('#span_prev').attr('disabled','disabled');
			$("#span_first").attr("style","color:#999");
			$("#span_prev").attr("style","color:#999");
		}
		else
		{
			$('#span_first').removeAttr('disabled');
			$('#span_prev').removeAttr('disabled');
			$("#span_first").attr("style","color:#000000;cursor:pointer");
			$("#span_prev").attr("style","color:#000000;cursor:pointer");
		}
		if(tb.currentpage()==tb.pagecount()){
			$('#span_next').attr('disabled','disabled');
			$('#span_last').attr('disabled','disabled');
			$("#span_next").attr("style","color:#999");
			$("#span_last").attr("style","color:#999");
		}else{
			$('#span_next').removeAttr('disabled');
			$('#span_last').removeAttr('disabled');
			$("#span_next").attr("style","color:#000000;cursor:pointer");
			$("#span_last").attr("style","color:#000000;cursor:pointer");
		}
		
	}
}

/**
 * jquery 插件列表
 * author:arvin.chen
 * date:2014/7/5
 */
jQuery.extend({
	jsonToControl:function(json,scope){	// 根据json生成html控件
		if(!json){throw new Exception('the parameer is need');};
		var control =null;
		if(json.tag){
			control = $(document.createElement(json.tag));
		}else{
			control = $(document.createTextNode((typeof json == 'function')?json.call(scope):json));
		}
		
		for(var p in json){
			switch(p){  
				case 'tag': break;
				case 'events': $.each(json[p],function(i,n){
								control.bind(i,n);
							}); break;
				case 'child': $.each(json[p] instanceof Array ? json[p] : [json[p]],function(i,n){
									control.append($.jsonToControl(n));
							  }); break;
				default: control.attr(p,(typeof json[p] == 'function')? json[p].call(scope):json[p]);
			}
		}
		return control;
	}
});

jQuery.fn.extend({
	table:function(config){
		if(!config){throw new Exception("the paramter is need");};
		var thiz = this;
		if(config.toolbar){ // 显示工具栏
			/**toolbar:{'class':'cls',child:[{type:'a',text:'查询',children:[]}]}**/
			$.each(config.toolbar instanceof Array ? config.toolbar : [config.toolbar],function(i,n){
				thiz.append($.jsonToControl(n)); // 根据json生成html标答
			});
		}
		var jtable = {tag:'table'};
		$.each(config,function(i,n){
			switch(i){
				case 'url':break;
				case 'data':break;
				case 'root':break;
				case 'cm':break;
				case 'total':break;
				case 'sumTotal':break;
				case 'events': $.each(n,function(j,m){
					thiz.bind(j,m);
				}); break;
				default: if(typeof n == 'string'){jtable[i]=n;};
			}
		});
		
		var table = $.jsonToControl($.extend(jtable,{events:config.events}),thiz).appendTo(thiz);
		var cm = config.cm; // 列模型
		/**cm:[{title:'标题',render:function(rowdata,val,rindx,cindx){},editor:function(rowdata,val,rindx,cindx){}}]**/
		var rm = config.rm; // 行型
		/**rm:{oddclass:'',evenclass:'',headclass:''}**/
		
		var tr = $.jsonToControl({tag:'tr','class':config.rm?config.rm['headclass']:'',style:config.rm?config.rm['headstyle']:''}).appendTo($.jsonToControl({tag:'thead'}).appendTo(table));
		$.each(cm,function(i,n){ //构构表头
			var jtd = {tag:'th',child:[n.headtext]};
			$.each(n,function(i,m){
				switch(n){
				    case 'dataindex':  break;
				    case 'headtext' :  break;
					default: if(typeof m == 'string'){jtd[i]=m;};
				}
			});
			tr.append($.jsonToControl($.extend(jtd,{events:n.events})));
		});
		var tbody = $.jsonToControl({tag:'tbody'}).appendTo(table);
		
		// 加载数据
		thiz.loadData = function(data){
			tbody.empty(); // 清除表格数据
			if(!data){return;}
			table.data('data',data); // 保存表格数据
			if(data.length==0)
			{
				$(table).attr("style","text-align:center");
				$(tbody).html("<tr><td colspan='"+cm.length+"' style='color:red;font-size:14px'>没有相关记录</td></tr>");
				//$(tbody).html("<span style='color:red;font-size:14px'>没有相关记录</span>");
			}
			$.each(data,function(i,rowdata){
				var tr = $.jsonToControl({tag:'tr','class':i%2==0&&rm?rm['oddclass']:rm['evenclass']}).appendTo(tbody);
				tr.data('data',rowdata);//保存行数据
				$.each(cm,function(j,colm){
					var td = $.jsonToControl({tag:'td'}).appendTo(tr);
					var cel = colm['render']?colm.render(i,j,eval('rowdata.'+colm['dataindex']),rowdata):eval('rowdata.'+colm['dataindex']);
					if(typeof cel == 'string'){
						$(td).html(cel);
					}else{
						if(cel instanceof Array){
							$.each(cel,function(i,c){
								$(td).append(c);
							});
						}else{
							$(td).append(cel);
						}
					}
					td.data('data',rowdata[colm['dataindex']]);//保存单元格数据
				});
			});
			//if(window.parent)parent.wit.SetCwinHeight();
		};

		thiz.total = 0;
		thiz.sumTotal = 0;
		thiz.baseparam = config.baseparam||{start:0,limit:10}; // 默认从0开始,每页显示20条
		
		// 加载数据
		thiz.load = function(params){
			if(config.data){thiz.loadData(config.data); return;};
			thiz.baseparam = $.extend(thiz.baseparam,config.baseparam,params);
			thiz.start = parseInt(thiz.baseparam['start'] ||0) ;
			thiz.limit = parseInt(thiz.baseparam['limit'] ||10) ;
			if(config.url){
				$.ajax({url:config.url,
						dataType:'json',
						type:'post',
						data: thiz.baseparam, // 传参
						success:function(data, textStatus){
							var dt = config['root'] ? eval('data.'+config['root']) : data;
							thiz.total = config['total'] ? eval('data.'+config['total']):data.length;
							thiz.sumTotal = config['sumTotal'] ? eval('data.'+config['sumTotal']):0;
							thiz.loadData(dt);
							thiz.trigger('loaded',data);
						},
						error:function(XMLHttpRequest, textStatus, errorThrown){
							alert('加载数据失败');
							if(XMLHttpRequest.responseText!=undefined && XMLHttpRequest.responseText!=null 
									&&XMLHttpRequest.responseText.indexOf("/login.jsp")!=-1)
								parent.window.location="login.jsp";
						}});
			}
		};
		
		if(config.autoload){
			thiz.load(thiz.baseparam);
		}
		
		// 首页
		thiz.firstpage = function(){
			thiz.load({start:0});
		};
		// 下一页
		thiz.nextpage = function(){
			thiz.load({start:thiz.start+thiz.limit >= thiz.total ? thiz.start: thiz.start+thiz.limit});
		};
		// 上一页
		thiz.prevpage = function(){
			thiz.load({start:thiz.start-thiz.limit > 0 ? thiz.start-thiz.limit: 0});
		};
		// 尾页
		thiz.lastpage = function(){
			thiz.load({start:(thiz.total%thiz.limit)==0?thiz.total-thiz.limit:thiz.total-thiz.total%thiz.limit});
		};
		// 跳转
		thiz.gopage = function(p){
			p=parseInt(p.replace(/[ ]/g,"")==""?0:p);
			if(p <= 0 || (p-1) * thiz.limit > thiz.total){return;} // 无效页码
			thiz.load({start:(p-1) * thiz.limit});
		};
		
		 /**
	     * 取总页数.
	     */
	    thiz.pagecount = function()
	    {
	        if (thiz.total % thiz.limit == 0)
	            return Math.floor(thiz.total/thiz.limit);
	        else
	            return Math.floor(thiz.total/thiz.limit) + 1;
	    };

	    /**
	     * 取该页当前页码,页码从1开始.
	     */
	    thiz.currentpage = function()
	    {
	        return Math.floor(thiz.start/thiz.limit) + 1;
	    };

	    /**
	     * 该页是否有下一页.
	     */
	    thiz.hasnextpage = function()
	    {
	        return thiz.currentpage() < thiz.pagecount() - 1;
	    };

	    /**
	     * 该页是否有上一页.
	     */
	    thiz.hasprevpage = function()
	    {
	        return thiz.currentpage() > 1;
	    };
		
		if(config.footbar){ // 显示底部工具栏
			/**footbar:[{type:'a',text:'查询',children:[]}]**/
			$.each(config.footbar instanceof Array?config.footbar:[config.footbar],function(i,n){
				thiz.append($.jsonToControl(n,thiz)); // 根据json生成html标答
			});
		}
		return thiz;
	},
	select:function(config){
		/**{root:'',url:'data.do',key:'',value:'',blanktext:'',parent:['#id'],parentname:['provinceId'],child:'#childId'}**/
		var thiz = this;
		var obj = {tag:'select'};
		$.each(config,function(i,v){
			switch(i){
			  case 'root':
			  case 'url':
			  case 'key':
			  case 'value':
			  case 'blanktext':
			  case 'parent':
			  case 'autoload':
			  case 'child': break;
			  default:obj[i] = v;
			}
		});
		var sel = $.jsonToControl(obj);
		thiz.append(sel);
		if(config.blanktext){
			$.jsonToControl({tag:'option',value:'',child:config.blanktext}).appendTo(sel);
		}
		
		sel.clear = function(firechange){
			$('option[value!=""]',sel).remove();
			if(firechange != false && sel.change){
				sel.change();
			}
		};
		
		sel.load = function(param){
			sel.clear(false);
			$.ajax({url:config.url,
				dataType:'json',
				type:'post',
				data: param, // 传参
				success:function(data, textStatus){
					if(sel.change){
						sel.change();
					}
					var dt = data;
					if(config.root){
						dt = data[config.root];
					}
					$.each(dt,function(j,v){
						var val = eval('(v.'+config.value+')');
						var opt = $.jsonToControl({tag:'option',value:val,child:eval('(v.'+config.key+')')}).appendTo(sel);
						if(val == config.dftvalue){
							opt.attr('selected','selected');
							if(sel.change){
								sel.change();
							}
						}
					});
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					alert('加载数据失败');
				}});
		};
		if(config.autoload){
			sel.load();
		}
		return sel;
	}
});