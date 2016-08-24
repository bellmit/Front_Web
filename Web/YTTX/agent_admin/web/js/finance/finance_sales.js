/*admin_member:成员设置*/
(function($){
	'use strict';
	$(function(){


		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://120.24.226.70:8081/yttx-agentbms-api/module/menu',
				async:false,
				type:'post',
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			});


			/*权限调用*/
			var powermap=public_tool.getPower(),
				financesales_power=public_tool.getKeyPower('销售分润查看',powermap),
				financeswing_power=public_tool.getKeyPower('刷卡分润查看',powermap);


			/*dom引用和相关变量定义*/
			var $finance_wrap1=$('#finance_wrap1')/*表格*/,
				$finance_wrap2=$('#finance_wrap1')/*表格*/,
				module_id='finance_list'/*模块id，主要用于本地存储传值*/,
				table1=null/*数据展现*/,
				table2=null/*数据展现*/,
				$finance_colgroup1=$('#finance_colgroup1'),
				$finance_thead1=$('#finance_thead1');


			/*查询对象*/
			var $search_Time=$('#search_Time'),
				$admin_search_btn=$('#admin_search_btn'),
				$admin_search_clear=$('#admin_search_clear');




			/*数据加载配置*/
			var finance_config1={
				url:"",
				dataType:'JSON',
				method:'post',
				dataSrc:function ( json ) {
					var code=parseInt(json.code,10);
					if(code!==0){
						if(code===999){
							/*清空缓存*/
							public_tool.clear();
							public_tool.loginTips();
						}
						console.log(json.message);
						return null;
					}
					return json.result.list;
				},
				data:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					token:decodeURIComponent(logininfo.param.token)
				}
			},
				finance_config2={
					url:"",
					dataType:'JSON',
					method:'post',
					dataSrc:function ( json ) {
						var code=parseInt(json.code,10);
						if(code!==0){
							if(code===999){
								/*清空缓存*/
								public_tool.clear();
								public_tool.loginTips();
							}
							console.log(json.message);
							return null;
						}
						return json.result.list;
					},
					data:{
						roleId:decodeURIComponent(logininfo.param.roleId),
						adminId:decodeURIComponent(logininfo.param.adminId),
						token:decodeURIComponent(logininfo.param.token)
					}
				},
				finance_opt1={
					deferRender:true,/*是否延迟加载数据*/
					//serverSide:true,/*是否服务端处理*/
					searching:true,/*是否搜索*/
					ordering:false,/*是否排序*/
					//order:[[1,'asc']],/*默认排序*/
					paging:true,/*是否开启本地分页*/
					pagingType:'simple_numbers',/*分页按钮排列*/
					autoWidth:true,/*是否*/
					info:true,/*显示分页信息*/
					stateSave:false,/*是否保存重新加载的状态*/
					processing:true,/*大消耗操作时是否显示处理状态*/
					ajax:finance_config1,/*异步请求地址及相关配置*/
					columns:'',/*控制分页数*/
					aLengthMenu: [
						[5,10,20,30],
						[5,10,20,30]
					],
					lengthChange:true/*是否可改变长度*/
				},
				finance_opt2={
					deferRender:true,/*是否延迟加载数据*/
					//serverSide:true,/*是否服务端处理*/
					searching:true,/*是否搜索*/
					ordering:false,/*是否排序*/
					//order:[[1,'asc']],/*默认排序*/
					paging:true,/*是否开启本地分页*/
					pagingType:'simple_numbers',/*分页按钮排列*/
					autoWidth:true,/*是否*/
					info:true,/*显示分页信息*/
					stateSave:false,/*是否保存重新加载的状态*/
					processing:true,/*大消耗操作时是否显示处理状态*/
					ajax:finance_config2,/*异步请求地址及相关配置*/
					columns:'',/*控制分页数*/
					aLengthMenu: [
						[5,10,20,30],
						[5,10,20,30]
						],
					lengthChange:true/*是否可改变长度*/
					};






			/*时间调用*/
			$search_Time.val(moment().subtract(3, 'month').format('YYYY-MM-DD')+','+moment().format('YYYY-MM-DD')).daterangepicker({
				format: 'YYYY-MM-DD',
				todayBtn: true,
				maxDate:moment().format('YYYY-MM-DD'),
				endDate:moment().format('YYYY-MM-DD'),
				startDate:moment().subtract(3, 'month').format('YYYY-MM-DD'),
				separator:','
			}).on('apply.daterangepicker',function(ev, picker){
					var end=moment(picker.endDate).format('YYYY-MM-DD'),
						start=moment(picker.startDate).format('YYYY-MM-DD'),
						limitstart=moment(end).subtract(3, 'month').format('YYYY-MM-DD'),
						isstart=moment(start).isBetween(limitstart,end);

				/*校验时间区间合法性*/
				if(!isstart){
					picker.setStartDate(limitstart);
				}
			});



			/*清空查询条件*/
			$admin_search_clear.on('click',function(){
				$.each([$search_Time],function(){
					if(this.selector.toLowerCase().indexOf('time')!==-1){
						this.val(moment().subtract(3, 'month').format('YYYY-MM-DD')+','+moment().format('YYYY-MM-DD'));
					}else{
						this.val('');
					}

				});
			});


			/*联合查询*/
			$admin_search_btn.on('click',function(){
				var data= $.extend(true,{},finance_config1.data);

				$.each([$search_Time],function(){
					var text=this.val(),
						selector=this.selector.slice(1),
						key=selector.split('_');

					if(text===""){
						if(typeof data['start'+key[1]]!=='undefined'){
							data['start'+key[1]]=moment().subtract(3, 'month').format('YYYY-MM-DD');
							data['end'+key[1]]=moment().format('YYYY-MM-DD');
						}
					}else{
						text=text.split(',');
						data['start'+key[1]]=text[0];
						data['end'+key[1]]=text[1];
					}

				});
				/*合并参数*/
				finance_config1.data= $.extend(true,{},data);

				/*清除数据并摧毁实例*/
				table1.clear().draw();
				//table1.destroy();
				table1=null;

				/*组合视图对象*/
				var tempobj=financeSearch($search_Time.val());
				$(tempobj['col']).appendTo($finance_colgroup1.html(''));
				$(tempobj['th']).appendTo($finance_thead1.html(''));
				finance_opt1.columns=dataobj1['tr'].slice(0);

				/*创建新实例并初始化请求数据*/
				table1=$finance_wrap1.DataTable(finance_opt1);
				table1.ajax.config(finance_config1).load(false);
			});




			/*数据加载*/
			var dataobj1=financeSearch($search_Time.val());
			$(dataobj1['col']).appendTo($finance_colgroup1.html(''));
			 $(dataobj1['th']).appendTo($finance_thead1.html(''));

				finance_opt1.columns=dataobj1['tr'].slice(0);

			table1=$finance_wrap1.DataTable(finance_opt1);
			/*//table2=$finance_wrap2.DataTable();*/
			



		}

	});

	/*财务查询*/
	function financeSearch(datestr){

		console.log(datestr);

		if(datestr){
			var date=datestr.split(','),
				startobj=moment(date[0]),
				endobj=moment(date[1]);

		}else{
			var startobj=moment().subtract(3, 'month'),
			endobj=moment();
		}


		var startmonth=parseInt(startobj.month()) ,
			endmonth=parseInt(endobj.month()),
			len= 0,
			res={},
			i= 0,
			colstr='<col class="g-w-percent5">',
			thstr='<th>所属关系</th>',
			tdstr=[{defaultContent:''}];

		/*{data:"gradeName"}*/

		if(endmonth<startmonth){
			endmonth=endmonth + 12;
		}

		len=endmonth - startmonth;

		for(i;i<=len;i++){
			var tempobj=startobj.add(1,'month'),
				tempth=tempobj.year()+'年'+tempobj.month()+'月'+tempobj.date()+'日';

			colstr+='<col class="g-w-percent5"><col class="g-w-percent5">';
			thstr+='<th class="no-sorting">'+tempth+'销售</th><th class="no-sorting">'+tempth+'分润</th>';
			tdstr.push({defaultContent:''},{defaultContent:''});
			/*{data:"month"+tempobj.month()}*/
		}
		res['col']=colstr;
		res['th']=thstr;
		res['tr']=tdstr.slice(0);
		return res;
	}



})(jQuery);