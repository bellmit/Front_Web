/*导航栏目核心服务对象接口*/
/*AMD模块支持*/
if(typeof define === "function" && define.amd) {
	define(function(require){
		var $=require('jquery');
		/*对象模型*/
		return {
				/*初始化*/
				init:function(objs){
						/*生成手机背景*/
						this.mobileBgShow(objs['mobile_view'].prev());
						/*栏目id值*/
						this.columnid=[];
						/*栏目text值*/
						this.columnname={};
						/*本地数据模型(存储查询所有数据)*/
						this.localmodule={};
						/*栏目状态值*/
						this.columnstate={
							'激活':1,
							'禁止':0,
							0:'禁止',
							1:'激活'
						};
						/*查询所有数据*/
						this.localmodule=this.selectColumnData();
						/*初始化*/
						var tempdata;
						for(var i in this.localmodule){
							tempdata=this.localmodule[i];
							this.columnid.push(tempdata['columnid']);
							this.columnname[tempdata['columnid']]=tempdata['columnname'];
						}
						objs['column_add'].prop({'disabled':false});
						this.initRender(objs);
						return this;
				},
				/*导航栏目按钮操作*/
				menuHandler:function(menu,formparams){
					var text=menu.text(),
							id=menu.attr('data-columnid');
							
					menu.addClass('nc-itemsel').siblings().removeClass('nc-itemsel');
					if(text!='临时栏目名称'||text!=''){
							/*加载已经持久化数据*/
							var res=this.localmodule[id];
							if(res==''||typeof res!='object'){
								return false;
							}
							this.setColumnData(formparams,res);
					}
				},
				/*手机预览操作*/
				mobileHandler:function(e,menu){
					var eobj=e.target,
					current=eobj.nodeName.toLowerCase(),
					cdata,
					$this,
					$parent,
					self=this;
					if(current=='div'||current=='img'||current=='p'){
						/*预览项与导航栏目对应*/
						$this=$(eobj);
						if(current=='div'){
							cdata=$this.parent().attr('data-columnid');
						}else if(current=='img'||current=='p'){
							cdata=$this.parent().parent().attr('data-columnid');
						}
						menu.find('li').each(function(index,element){
								var $current=$(element),tempdata=$current.attr('data-columnid');
								if(cdata==tempdata){
										$current.addClass('nc-itemsel').siblings().removeClass('nc-itemsel');
										return false;
								}
						});
					}else if(current=='span'){
						/*执行删除操作*/
						$this=$(eobj);
						dialog({
							title:'温馨提示',
							width:300,
							content:'是否删除',
							okValue: '确定',
							ok: function () {
									var dia=this;
									var res=self.deleteColumnData();
									/*测试代码*/
									if(res){
										dia.content('<span class="g-c-blue2">ok,删除成功</span>');
										$parent=$this.parent().parent();
										cdata=$parent.attr('data-columnid');
										$parent.html('').remove();
										menu.find('li').each(function(index,element){
												var $current=$(element),tempdata=$current.attr('data-columnid');
												if(cdata==tempdata){
														$current.html('').remove();
														/*去除按钮禁用*/
														menu.next().prop({'disabled':false});
														return false;
												}
										});
										self.columnid.splice($.inArray(parseInt(cdata),self.columnid),1);
										/*
										to do
										调用服务对象的更新方法
										*/
									}else{
										dia.content('<span class="g-c-red2">哦槽!删除失败</span>');
									}
									setTimeout(function(){
										dia.close().remove();
									},500);
									return false;
							},
							cancelValue: '取消',
							cancel: function () {}
						}).showModal();
					}
				},
				/*选择模板*/
				selectTemplate:function(type){
					if(type=='delete'||type=='mobile'){
						return '<li data-columnid="$columnid"><div><img alt="" src="../../resource/images/menu_img/$imgsrc" ><p>$columnname</p><span>删除</span></div></li>';
					}else if(type=='add'||type=='menusel'){
						return '<li data-columnid="$columnid" class="nc-itemsel">$columnname</li>';
					}else if(type=='menu'){
						return '<li data-columnid="$columnid">$columnname</li>';
					}
				},
				/*设置表单值*/
				setColumnData:function(objs,res){
					var self=this;
					
					for(var items in res){
						if(items=='columnstate'){
							/*单选(栏目状态)*/
							objs[items].next().find('li').each(function(){
									var $this=$(this),
									text=$this.text().replace(/\s*/g,'');
									if(self.columnstate[text]==res[items]){
										objs[items].val(res[items]);
										$this.addClass('radiopluginsel').attr({'data-selected':'true','data-value':res[items]}).siblings().removeClass('radiopluginsel').removeAttr('data-selected').removeAttr('data-value');
										return false;
									}										
							});
						}else if(items=='columnindex'||items=='columnrongge'){
							/*多选(作为首页栏目,关联到荣格栏目)*/
							objs[items].val(res[items]).next().find('li').each(function(){
									var $this=$(this),ischeck=$this.attr('data-selected');
									if(res[items]==0){
											if(typeof ischeck!=='undefined'){
													$this.removeAttr('data-selected').removeClass('checkboxpluginsel');
											}
									}else if(res[items]==1){
											if(typeof ischeck==='undefined'){
													$this.attr({'data-selected':'true'}).addClass('checkboxpluginsel');		
											}
									}
							});
						}else if(items=='columntype'){
							/*下拉框(栏目类型)*/
		
							objs[items].find('option').each(function(){
									var $this=$(this),values=$this.val();
									if(res[items]==values){
											$this.prop('selected',true).siblings().prop('selected',false);
											return false;
									}
							});
						}else{
								objs[items].val(res[items]);
						}
					}
				},
				/*获取表单值*/
				getColumnDate:function(objs){
						var senddata={},currentname='';
						for(var items in objs){
							senddata.objs[items]=objs[items].val();
						}
						return senddata;
				},
				/*保存已选栏目信息*/
				saveColumnData:function(formdata,callback){
						
					/*
						保存数据
						to do
						*/
						$.ajax({
								url:obj.url,
								async:false,
								type:'post',
								dataType:"json",
								data:id,
								success: function(data){
										if(data){
											callback(true,formdata.columnid);
										}else{
											callback(false,formdata.columnid);
										}
								},
								error: function(){
										callback('error',formdata.columnid);
								}
						});
				},
				/*删除已选栏目信息*/
				deleteColumnData:function(obj){
						var deleteres=false;
						/*
						
						测试代码，正式环境或者已联入数据库则需要删除
						*/
						var test=parseInt(Math.random()*100);
						return test%2==0?true:false;
						
						/*
						删除操作
						to do
						*/
						$.ajax({
								url:obj.url,
								async:false,
								type:'post',
								dataType:"json",
								data:obj.data,
								success: function(res){
										if(res){
											deleteres=true;
										}else{
											deleteres=false;
										}
								},
								error: function(){
									deleteres=true;
								}
						});
						return deleteres;
				},
				/*添加已选栏目信息*/
				addColumnData:function(forms,menu,mobile,current){
						var self=this,len=this.columnid.length;
						if(len>=10){
								dialog({
									title:'温馨提示',
									width:300,
									content:'<span class="g-c-red2">栏目数量不能超过'+len+'个</span>',
									okValue: '确定',
									ok: function () {}
								}).showModal();
						}else{
								if(len!=0){
									var addtext=menu.find('li').last().text();
									if(addtext=='临时栏目名称'||addtext==''){
										dialog({
											title:'温馨提示',
											width:300,
											content:'<span class="g-c-red2">您刚刚已经添加了一个栏目，但是还未编辑任何栏目信息，请编辑保存相关信息！</span>',
											okValue: '确定',
											ok: function () {}
										}).showModal();
									}else{
										this.addDefaultInfo(forms,menu,mobile,len);
										current.prop({'disabled':true});
									}
								}else{
										this.addDefaultInfo(forms,menu,mobile,len);
										current.prop({'disabled':true});
								}
						}
				},
				/*添加默认栏目信息*/
				addDefaultInfo:function(forms,menu,mobile,len){
					/*清空表单*/
					forms.get(0).reset();
					/*生成默认添加项*/
					var tempid=0,
						temparr=this.columnid.slice(0),
						templatemenu=this.selectTemplate('add'),
						templatemobile=this.selectTemplate('mobile');
						
						temparr.sort(function(a,b){return a-b;});
						if(len!=0){
							tempid=temparr[len-1];
						}else{
							tempid=0;
						}
						tempid++;
						this.columnid.push(tempid);
						templatemenu=templatemenu.replace('$columnid',tempid).replace('$columnname','临时栏目名称');
						templatemobile=templatemobile.replace('$columnid',tempid).replace('$imgsrc','web_indexicon.png').replace('$columnname','临时栏目名称');
						$(templatemenu).appendTo(menu);
						$(templatemobile).appendTo(mobile);
						menu.find('li').last().siblings().removeClass('nc-itemsel');
				},
				/*查询栏目信息*/
				selectColumnData:function(){
						var self=this,columnResulte='';

						/*测试数据
						正式或有持久化数据应该去掉
						*/
						
						columnResulte={
								3:{
										columnname:'德胖子',
										columnstate:0,
										columnindex:0,
										columnid:3,
										columntype:3,
										columnlink:'http://www.baidu.com',
										columnrongge:0,
										columnthumbnail:'web_personicon.png',
										columninfo:'德胖子的微网站'
								},
								8:{
									columnname:'德哥德哥',
									columnstate:1,
									columnindex:1,
									columnid:8,
									columntype:2,
									columnlink:'http://www.baidu.com',
									columnrongge:1,
									columnthumbnail:'web_newsicon.png',
									columninfo:'上课就付款时间刚开始大家该死的快速的减肥开始的价格快速的价格时快捷方式的减肥开始的减肥'
								},
								1:{
									columnname:'我的微网站',
									columnstate:1,
									columnindex:0,
									columnid:1,
									columntype:2,
									columnlink:'http://www.baidu.com',
									columnrongge:1,
									columnthumbnail:'web_loveicon.png',
									columninfo:'是否是刚开始大家公司的会计IE瑞特人家可能告诉大家发生的快捷方式打开时空的减肥开始的减肥'
								},
								2:{
									columnname:'刘德华',
										columnstate:0,
										columnindex:1,
										columnid:2,
										columntype:1,
										columnlink:'http://www.baidu.com',
										columnrongge:1,
										columnthumbnail:'web_charmicon.png',
										columninfo:'今天、男人哭吧哭吧不是罪、真永远、练习、冰雨、来生缘'
								},
								5:{
									columnname:'我的相册',
									columnstate:1,
									columnindex:1,
									columnid:5,
									columntype:2,
									columnlink:'http://www.baidu.com',
									columnrongge:0,
									columnthumbnail:'web_companyicon.png',
									columninfo:'刘德华、黄日华、苗侨伟、汤正业、梁朝伟'
								}
						};
						

						return columnResulte;
						
						
						/*
						查询数据
						to do
						*/
						$.ajax({
								url:obj.url,
								async:false,
								type:'post',
								dataType:"json",
								data:id,
								success: function(res){
										if(res){
											columnResulte=res;
										}else{
											columnResulte='';
										}
								},
								error: function(){
									columnResulte='';
								}
						});
						return columnResulte;
				},
				/*单选框*/
				radioHandler:function(selector){
					var $this=$(selector),
					tempvalue=$this.text().replace(/\s*/g,'');
					tempvalue=this.columnstate[tempvalue];
					$this.parent().prev().val(tempvalue);
					
					$this.addClass('radiopluginsel').attr({'data-selected':'true','data-value':tempvalue}).siblings().removeClass('radiopluginsel').removeAttr('data-selected').removeAttr('data-value');
				},
				/*多选框*/
				checkboxHandler:function(selector){
					var $this=$(selector),
					ischeck=$this.attr('data-selected');
					if(typeof ischeck==='undefined'){
							$this.attr({'data-selected':'true'}).addClass('checkboxpluginsel');
							$this.parent().prev().val(1);
					}else{
							$this.removeAttr('data-selected').removeClass('checkboxpluginsel');
							$this.parent().prev().val(0);
					}
				},
				/*更新默认值*/
				updateDefaultData:function(wraps,formdata){
						var len=this.columnid.length,
						curid=formdata['columnid']
						curname=formdata['columnname'];
						/*栏目id值*/
						this.columnid.splice(len-1,1,curid);
						/*栏目text值*/
						this.columnname[curid]=curname;
						/*本地数据模型(存储查询所有数据)*/
						this.localmodule[curid]=formdata;
						
						wraps['mobile_view'].find('li').last().attr({'data-columnid':curid});
						wraps['column_menu'].find('li').last().attr({'data-columnid':curid});
						wraps['column_add'].prop({'disabled':false});
						
				},
				/*模板背景渲染*/
				mobileBgShow:function(wrap){
					 var r=parseInt(Math.random()*5,10);
					 if(r==0){
						 r=1;
					 }
					 wrap.html('<img src="../../resource/images/mobilebg_img/web_managebg'+r+'.jpg" alt="">');
				},
				/*初始化渲染*/
				initRender:function(objs){
					var mobile=this.selectTemplate('mobile'),
							menu=this.selectTemplate('menu'),
							menusel=this.selectTemplate('menusel'),
							idarr=this.columnid.slice(),
							len=idarr.length,
							i=0,
							mobilearr=[],
							menuarr=[];
					for(i;i<len;i++){
							mobilearr.push(mobile.replace('$columnid',idarr[i]).replace('$imgsrc',this.localmodule[idarr[i]]['columnthumbnail']).replace('$columnname',this.columnname[idarr[i]]));
							if(i==0){
								menuarr.push(menusel.replace('$columnid',idarr[i]).replace('$columnname',this.columnname[idarr[i]]));
							}else{
								menuarr.push(menu.replace('$columnid',idarr[i]).replace('$columnname',this.columnname[idarr[i]]));
							}
					}
					$(mobilearr.join('')).appendTo(objs['mobile_view']);
					$(menuarr.join('')).appendTo(objs['column_menu']);
				}
		};




	});
}







