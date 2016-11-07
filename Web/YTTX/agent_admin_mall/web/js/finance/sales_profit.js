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
				$admin_finance_wrap1=$('#admin_finance_wrap1'),
				$admin_finance_wrap2=$('#admin_finance_wrap2'),
				$admin_finance_data1=$('#admin_finance_data1'),
				$admin_finance_data2=$('#admin_finance_data2'),
				agentheader='<thead><tr><th>时间</th><th>省代</th><th>市代</th><th>县代</th></tr></thead>';


			if(salesprofit_power){
				var $admin_search_btn=$('#admin_search_btn');




				/*绑定切换查询不同条件*/
				$admin_search_btn.on('click','div',function(){
					var $this=$(this),
						condition=$this.attr('data-value');

					$this.removeClass('btn-white').addClass('btn-info').siblings().removeClass('btn-info').addClass('btn-white');

					if(condition==='month'){
						$admin_finance_wrap1.removeClass('g-d-hidei');
						$admin_finance_wrap2.addClass('g-d-hidei');
					}else if(condition==='detail'){
						$admin_finance_wrap1.addClass('g-d-hidei');
						$admin_finance_wrap2.removeClass('g-d-hidei');
					}
				});

				$admin_search_btn.find('div:first-child').trigger('click');


				/*绑定切换不同统计*/
				$admin_finance_data1.on('click',function (e) {
					var etype= e.type,
						target= e.target,
						node=target.nodeName.toLowerCase();



					/*点击事件*/
					if(etype==='click'){
						/*过滤*/
						if(node==='ul'||node==='div'||node==='label'||node==='span'||node==='label'){
							return false;
						}
						/*绑定操作事件*/

						/*绑定查看属性列表*/
						if(node==='button'||node==='i'){
							if(node==='i'){
								/*修正node节点*/
								target=target.parentNode;
							}
							(function(){
								var $this=$(target),
									key=$this.attr('data-key');

								if($this.hasClass('attr-item-btn')){
									/*扩展条件*/
									(function(){
										var $last=$(document.getElementById('attr_input_'+key)).find('input:last');


										$last.clone(true).attr({
											'data-value':''
										}).val('').insertAfter($last);

									}());
								}else if($this.hasClass('attr-item-listbtn')){
									/*查看属性类型*/
									$(document.getElementById('attr_list_'+key)).toggleClass('g-d-hidei');
								}else if($this.hasClass('attr-item-addbtn')){
									/*添加属性*/
									(function(){
										/*加载数据*/
										var str='',
											map=attr_map[key]['map'];
										for(var i in map){
											str+='<li>'+i+'</li>';
										}
										$(str).appendTo($admin_addattr_list.html(''));
										/*设置key和id值*/
										$admin_newattr.attr({
											'data-id':attr_map[key]['id'],
											'data-key':key
										});
										/*显示弹出框*/
										$show_addattr_wrap.modal('show',{
											backdrop:'static'
										});
									}());
								}
							}());
						}else if(node==='li'){
							/*绑定选择属性列表*/
							(function(){
								var $this=$(target),
									$ul=$this.parent(),
									key=$ul.attr('id').replace('attr_list_',''),
									isok/*数据过滤：只能组合两种数据*/,
									txt=$this.html(),
									code=$this.attr('data-value'),
									count=0,
									size,
									$inputitem=$(document.getElementById('attr_input_'+key)),
									$input;


								if($this.hasClass('admin-list-widget-active')){
									$this.removeClass('admin-list-widget-active');
									$input=$inputitem.find('input');
									$input.each(function(){
										var $self=$(this);
										if($self.val()===txt){
											$self.val('');
											delete attr_data[key][txt];
											$self.attr({'data-value':''});
											if($.isEmptyObject(attr_data[key])){
												dataRecord(key);
											}
											return false;
										}
									});
								}else{
									$this.addClass('admin-list-widget-active');
									if($.isEmptyObject(attr_data[key])){
										$input=$inputitem.find('input:first-child');
										$input.val(txt);
										attr_data[key][txt]=code;
										$input.attr({'data-value':txt});
									}else{
										$input=$inputitem.find('input');
										size=$input.size();
										$input.each(function(){
											var $self=$(this);
											if($self.val()===''){
												$self.val(txt);
												attr_data[key][txt]=code;
												$self.attr({'data-value':txt});
												return false;
											}
											count++;
										});
										if(count===size){
											var $lastinput=$input.eq(size-1),
												lasttxt=$lastinput.val();
											$ul.find('li.admin-list-widget-active').each(function(){
												var $templi=$(this),
													temptxt=$templi.html();
												if(lasttxt===temptxt){
													$templi.removeClass('admin-list-widget-active');
													delete attr_data[key][lasttxt];
													$lastinput.attr({'data-value':''});
													return false;
												}
											});
											$lastinput.val(txt);
											attr_data[key][txt]=code;
											$lastinput.attr({'data-value':txt});
										}
									}
									isok=dataRecord(key);
									if(isok!==null){
										syncAttrList((function () {
											var $previnput=$(document.getElementById('attr_input_'+isok)).find('input'),
												res=[];
											$previnput.each(function(){
												var prevtxt=$(this).val();
												if(prevtxt!==''){
													res.push(prevtxt);
												}
											});
											if(res.length!==0){
												clearAttrData('attrtxt',isok);
											}
											return res;
										}()),$(document.getElementById('attr_list_'+isok)).find('li'),'remove');
									}
								}

								/*组合条件*/
								groupCondition();

							}());
						}

					}else if(etype==='focusout'){
						/*过滤*/
						if(node!=='input'){
							return false;
						}
						/*失去焦点事件*/

						/*绑定输入框失去焦点事件*/
						(function(){
							var	$this=$(target),
								value=$this.val(),
								key=$this.attr('data-key'),
								isvalid=false,
								isok;
							if(value!==''){
								isvalid=validAttrData($this,key,value);
								if(isvalid){
									attr_data[key][value]=attr_map[key]['map'][value];
									$this.attr({
										'data-value':value
									});
									/*同步列表*/
									syncAttrList(value,key,'add');
									/*同步上次记录*/
									isok=dataRecord(key);
									if(isok!==null){
										syncAttrList((function () {
											var $previnput=$(document.getElementById('attr_input_'+isok)).find('input'),
												res=[];
											$previnput.each(function(){
												var prevtxt=$(this).val();
												if(prevtxt!==''){
													res.push(prevtxt);
												}
											});
											if(res.length!==0){
												clearAttrData('attrtxt',isok);
											}
											return res;
										}()),$(document.getElementById('attr_list_'+isok)).find('li'),'remove');
									}
								}
							}else{
								var tempvalue=$this.attr('data-value');
								if(typeof attr_data[key][tempvalue]!=='undefined'){
									delete attr_data[key][tempvalue];
									/*同步列表*/
									/*同步上次记录*/
									isok=dataRecord(key);
									if(isok!==null){
										syncAttrList((function () {
											var $previnput=$(document.getElementById('attr_input_'+isok)).find('input'),
												res=[];
											$previnput.each(function(){
												var prevtxt=$(this).attr('data-value');
												if(prevtxt!==''){
													res.push(prevtxt);
												}
											});
											if(res.length!==0){
												clearAttrData('attrtxt',isok);
											}
											return res;
										}()),$(document.getElementById('attr_list_'+isok)).find('li'),'remove');
									}else{
										/*同步列表*/
										syncAttrList(tempvalue,key,'remove');
									}
								}
							}
							/*组合条件*/
							groupCondition();

						}());
					}
				});
			}






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

	});

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
	};


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



})(jQuery);