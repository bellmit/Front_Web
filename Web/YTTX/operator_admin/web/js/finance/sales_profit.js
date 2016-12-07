/*admin_member:成员设置*/
(function($){
	'use strict';
	$(function(){


		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'http://10.0.5.222:8080/mall-agentbms-api/module/menu',
				async:false,
				type:'post',
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			});


			/*权限调用*/
			var powermap=public_tool.getPower(83),
				salesprofit_power=public_tool.getKeyPower('mall-sales-profit-view',powermap);


			/*dom引用及其他变量*/
			var	module_id='mall-sales-profit',
				$admin_finance_monthwrap=$('#admin_finance_monthwrap'),
				$admin_finance_detailwrap=$('#admin_finance_detailwrap'),
				$admin_finance_childwrap=$('#admin_finance_childwrap'),
				$admin_finance_monthdata=$('#admin_finance_monthdata'),
				$admin_finance_detaildata=$('#admin_finance_detaildata'),
				$admin_finance_childdata=$('#admin_finance_childdata'),
				$search_child=$('#search_child'),
				search_config={},
				$admin_finance_tab2=$('#admin_finance_tab2'),
				$admin_finance_detail2=$('#admin_finance_detail2'),
				agentcolgroup='<colgroup><col class="g-w-percent14" /><col class="g-w-percent12" /><col class="g-w-percent12" /><col class="g-w-percent12" /></colgroup>',
				agentheader='<thead><tr><th>时间</th><th>省代</th><th>市代</th><th>县代</th></tr></thead>';


			if(salesprofit_power){
				var $admin_search_btn=$('#admin_search_btn');


				/*绑定切换查询不同条件*/
				$admin_search_btn.on('click','div',function(){
					var $this=$(this),
						condition=$this.attr('data-value');

					$this.removeClass('btn-white').addClass('btn-info').siblings().removeClass('btn-info').addClass('btn-white');

					if(condition==='month'){
						$admin_finance_monthwrap.removeClass('g-d-hidei');
						$admin_finance_detailwrap.addClass('g-d-hidei');
						$admin_finance_childwrap.addClass('g-d-hidei');
					}else if(condition==='detail'){
						$admin_finance_monthwrap.addClass('g-d-hidei');
						$admin_finance_detailwrap.removeClass('g-d-hidei');
						$admin_finance_childwrap.addClass('g-d-hidei');
					}else if(condition==='child'){
						$admin_finance_monthwrap.addClass('g-d-hidei');
						$admin_finance_detailwrap.addClass('g-d-hidei');
						$admin_finance_childwrap.removeClass('g-d-hidei');
					}
				});
				$admin_search_btn.find('div').eq(0).trigger('click');


				/*绑定下级代理商查询*/
				$search_child.on('change',function () {
					
				})
			}


			/*查询下级代理商*/
			searchChildAgent();






			/*{
				url:"http://10.0.5.222:8080/mall-agentbms-api/finance/profits",
					dataType:'JSON',
				method:'post',
				data:{
				roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token),
					type:1
			}
			}*/




			/*清空查询条件*/
			/*$admin_search_clear.on('click',function(){
				$.each([$search_Time],function(){
					if(this.selector.toLowerCase().indexOf('time')!==-1){
						this.val(start_date+','+end_date);
					}else{
						this.val('');
					}
				});
			});
			$admin_search_clear.trigger('click');*/





		}


		/*月报查询*/
		function getByMonthFinance(type) {

		}


		/*查询下级代理商*/
		function searchChildAgent() {
			$.ajax({
				url:'http://10.0.5.222:8080/mall-agentbms-api/agent/lower/list',
				async:false,
				type:'post',
				param:{
					roleId:decodeURIComponent(logininfo.param.roleId),
					adminId:decodeURIComponent(logininfo.param.adminId),
					grade:decodeURIComponent(logininfo.param.grade),
					token:decodeURIComponent(logininfo.param.token)
				},
				datatype:'json'
			}).done(function (resp) {
				var code=parseInt(resp.code,10);
				if(code!==0){
					if(code===999){
						/*清空缓存*/
						/*public_tool.loginTips(function(){
							public_tool.clear();
							public_tool.clearCacheData();
						});*/
						return false;
					}
					console.log(resp.message);
					dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
					return false;
				}

				var result=resp.result;

				if(result){
					var list=result.list;
					if(list){
						var len=list.length,
							i=0,
							str='';
						for(i;i<len;i++){
							if(i==0){
								str+='<option selected value="'+list[i]["id"]+'">'+list[i]["fullName"]+'</option>';
							}else{
								str+='<option value="'+list[i]["id"]+'">'+list[i]["fullName"]+'</option>';
							}
						}
						if(len!==0){
							$(str).appendTo($search_child.html(''));
						}
					}
				}
			}).fail(function (resp) {
				console.log('error');
			});
		}


		/*财务查询*/
		function financeSearch(datestr,type){


			if(datestr){
				var date=datestr.split(','),
					startobj=moment(date[0]),
					endobj=moment(date[1]);

			}else{
				var startobj=moment().subtract(2, 'month'),
					endobj=moment();
			}


			var startmonth=parseInt(startobj.month()) ,
				endmonth=parseInt(endobj.month()),
				len= 0,
				res={},
				i= 0,
				colstr='',
				thstr='',
				tdstr=[],
				colitem= 5,
				itemlen=5;

			if(endmonth<startmonth){
				endmonth=endmonth + 12;
			}

			len=endmonth - startmonth;
			if(type==='finance'){
				itemlen=len===0?3:len * 2 + 1;
			}else if(type==='station'){
				itemlen=len===0?6:len * 2 + 4;
			}
			colitem=parseInt(50/(itemlen * 2),10);
			if(colitem * itemlen<=(50 - itemlen)){
				colitem=colitem+1;
			}


			for(i;i<=len;i++){
				var tempobj=startobj.add(1,'month'),
					tempth=tempobj.year()+'年'+tempobj.month()+'月';

				if(type==='finance'){
					if(i===0){
						colstr+='<col class="g-w-percent'+colitem+'"><col class="g-w-percent'+colitem+'"><col class="g-w-percent'+colitem+'">';
						thstr+='<th>所属关系</th><th class="no-sorting">'+tempth+'销售</th><th class="no-sorting">'+tempth+'分润</th>';
						tdstr.push({"data":'relationName'},{"data":"m"+tempobj.month()+"Sales"},{"data":"m"+tempobj.month()+"Profits"});
					}else{
						colstr+='<col class="g-w-percent'+colitem+'"><col class="g-w-percent'+colitem+'">';
						thstr+='<th class="no-sorting">'+tempth+'销售</th><th class="no-sorting">'+tempth+'分润</th>';
						tdstr.push({"data":"m"+tempobj.month()+"Sales"},{"data":"m"+tempobj.month()+"Profits"});
					}
				}else if(type==='station'){
					if(i===0){
						colstr+='<col class="g-w-percent'+colitem+'"><col class="g-w-percent'+colitem+'"><col class="g-w-percent'+colitem+'"><col class="g-w-percent'+colitem+'"><col class="g-w-percent'+colitem+'"><col class="g-w-percent'+colitem+'"><col class="g-w-percent'+colitem+'">';
						thstr+='<th>序号</th><th>服务站</th><th>所属代理</th><th>所属关系</th><th>上级代理</th><th class="no-sorting">'+tempth+'销售</th><th class="no-sorting">'+tempth+'分润</th>';
						tdstr.push({"data":"id"},{"data":"shortName"},{"data":"agentShortName"},{"data":"agentGrade"},{"data":"superShortName"},{"data":"m"+tempobj.month()+"Sales"},{"data":"m"+tempobj.month()+"Profits"});
					}else{
						colstr+='<col class="g-w-percent'+colitem+'"><col class="g-w-percent'+colitem+'">';
						thstr+='<th class="no-sorting">'+tempth+'销售</th><th class="no-sorting">'+tempth+'分润</th>';
						tdstr.push({"data":"m"+tempobj.month()+"Sales"},{"data":"m"+tempobj.month()+"Profits"});
					}
				}
			}
			res['col']='<colgroup>'+colstr+'</colgroup>';
			res['th']='<thead><tr>'+thstr+'</tr></thead>';
			res['tbody']='<tbody class="middle-align"></tbody>';
			res['tr']=tdstr.slice(0);
			return res;
		}


		/*获取数据*/
		function getFinanceData(config,fn){

			$.ajax(config).done(function (resp) {
				var code=parseInt(resp.code,10);
				if(code!==0){
					if(code===999){
						/*清空缓存*/
						public_tool.loginTips(function(){
							public_tool.clear();
							public_tool.clearCacheData();
						});
						return [];
					}
					console.log(resp.message);
					dia.content('<span class="g-c-bs-warning g-btips-warn">'+(resp.message||"操作失败")+'</span>').show();
					setTimeout(function () {
						dia.close();
					},2000);
					return [];
				}

				var res1=[],
					res2=[],
					result=resp.result;

				if(!result){
					res1=[];
					res2=[];
				}else{
					var agent1=result.agent1,
						agent2=result.agent2,
						agent3=result.agent3,
						total=result.total,
						list=result.list,
						relation={
							0:'一级',
							1:'二级',
							2:'三级',
							3:'四级',
							4:'五级',
							5:'六级',
							6:'七级',
							7:'八级',
							8:'九级',
							"total":"合计"
						};


					if(!$.isEmptyObject(agent1)&&agent1){
						res1.push($.extend(true,{"relationName":relation[0]},agent1));
					}
					if(!$.isEmptyObject(agent2)&&agent2){
						res1.push($.extend(true,{"relationName":relation[1]},agent2));
					}
					if(!$.isEmptyObject(agent3)&&agent3){
						res1.push($.extend(true,{"relationName":relation[2]},agent3));
					}
					if(!$.isEmptyObject(total)&&total){
						res1.push($.extend(true,{"relationName":relation['total']},total));
					}
					if(list){
						res2=list.slice(0);
					}
				}

				if(fn&&typeof fn==='function'){
					fn.call(null,res1,res2);
				}


			}).fail(function (resp) {
				console.log('error');
			});

		}

	});




})(jQuery);