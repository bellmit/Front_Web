/*配置依赖*/
require.config({
	baseUrl:'../../js/',
	paths:{
		'jquery':'lib/jquery/jquery-1.11.2.min',
		'dialog':'lib/artDialog/dialog',
		'common':'common/common',
		'gallery_query':'widgets/gallery_query',
		'masonry':'plugins/masonry.min',
		'pagination':'plugins/pagination.min',
		'lazyload':'plugins/lazyload.min',
		'rule':'widgets/rules',
		'commonfn':'widgets/commonfn',
		'validform':'plugins/validform',
		'city_select':'widgets/city_select',
		'cookie':'plugins/cookie',
		'modal_dialog':'widgets/modal_dialog'
	},
	shim:{
		'dialog':{
				deps:['jquery']
		},
		'pagination':{
				deps:['jquery']
		},
		'lazyload':{
				deps:['jquery']
		},
		'validform':{
			deps:['jquery']
		}
		
	}
});


/*程序入口*/
require(['jquery','dialog','gallery_query','masonry','pagination','lazyload','rule','commonfn','validform','city_select','cookie','common'],function($,undefined,GalleryQuery,Masonry,Pagination,undefined,Rule,CommonFn,undefined,City_Select,Modal_Dialog,undefined,Common) {
	$(function() {
			//页面元素获取
			var $query_result=$('#query_result'),
					$queryitem_space=$('#queryitem_space'),
					$queryitem_part=$('#queryitem_part'),
					$queryitem_style=$('#queryitem_style'),
					$queryitem_color=$('#queryitem_color'),
					$query_orderby=$('#query_orderby'),
					$query_listwrap=$('#query_listwrap'),
					$query_pagewrap=$('#query_pagewrap'),
					$customprovince=$('#customprovince'),
					$customcity=$('#customcity'),
					$mask_hxwrap=$('#mask_hxwrap'),
					$mask_scwrap=$('#mask_scwrap'),
					$mask_hxclosebtn=$('#mask_hxclosebtn'),
					$mask_scclosebtn=$('#mask_scclosebtn');
					
			
			//需加载的文本模板
			var	htmltemplate='<li><div class="gallery-mask"><div>'+
                    '<a data-id="$dataid" href="$href">'+
                        '<img src="$imgsrc_default" data-original="$imgsrc" alt="">'+
                    '</a>'+
                    '<span class="gallery-left" data-type="design" data-info="$datainfo_design">免费户型设计</span>'+
                    '<span class="gallery-right" data-type="wechat" data-info="$datainfo_wechat">收藏</span>'+
                  '</div>'+
                  '<p>$theme</p>'+
              '</div>'+
          '</li>';
					

			//初始化查询
			require( ['jquery-bridget/jquery.bridget'],function(birdget) {
					$.bridget( 'masonry', Masonry );
					
					//瀑布流对象
					var $fallflow=$query_listwrap.masonry({
							itemSelector : 'li',  
							columnWidth: 282,
							gutter:20,
							transitionDuration: '0.5s'
					});
					var resetcount=0;
					$(window).scroll(function(){
							resetcount++;
							if(resetcount%2==0){
								setTimeout(function(){
										$fallflow.masonry('layout');
								},100);
							}
							if(resetcount>=10000){
								resetcount=0;
							}
					});
					
					
					//联合查询
					GalleryQuery.queryItem({
								numberwrap:$query_result,
								listwrap:$query_listwrap,
								orderbywrap:$query_orderby,
								pagewrap:$query_pagewrap,
								cookie:'marquee_params',
								itemwrap:{
									'space':$queryitem_space,
									'part':$queryitem_part,
									'style':$queryitem_style,
									'color':$queryitem_color
								}						
					},function(opt,flag){
							//执行异步查询操作
							if(flag){
								$(window).scrollTop(0);
							}
							var isdata=_handler(opt,$fallflow,htmltemplate);
							
							if(isdata){
								//分页调用
								$query_pagewrap.pagination({
									pageSize:opt.pageSize,
									total:opt.total,
									pageNumber:opt.pageNum,
									onSelectPage:function(pageNumber,pageSize){
											opt.pageSize=pageSize;
											opt.pageNum=pageNumber;
											$(window).scrollTop(0);
											_handler(opt,$fallflow,htmltemplate);
									}
								});
								
							}else{
								opt.total=0;
								opt.pageNum=1;
								opt.pagewrap.html('');
							}
					});
					
					
					
					
					
					
					
			});
			
			
			//绑定户型设计和收藏显示
			$query_listwrap.delegate('span','click',function(){
					var $this=$(this),
							type=$this.attr('data-type');
					if(type==='design'){
							$mask_hxwrap.removeClass('g-d-hidei');
					}else if(type==='wechat'){
							$mask_scwrap.removeClass('g-d-hidei');
					}
			});
			//绑定户型设计和收藏隐藏
			$.each([$mask_hxclosebtn,$mask_scclosebtn],function(){
					
					if(this.selector.indexOf('mask_hx')!=-1){
							this.on('click',function(){
								$mask_hxwrap.addClass('g-d-hidei');
							});
					}else if(this.selector.indexOf('mask_sc')!=-1){
							this.on('click',function(){
									$mask_scwrap.addClass('g-d-hidei');
							});
					}
			});
			

			//表单省份和城市选择
			City_Select.areaSelect({
					$province:$customprovince,
					$city:$customcity,
					$area:null
			});
			
			
			
			//表单对象
			var $miniportal_form=$('#miniportal_form'),
					$customname=$('#customname'),
					$custommobile=$('#custommobile'),
					$customprovince_text=$('#customprovince_text'),
					$customcity_text=$('#customcity_text'),
					validobj=null;
			//校验规则
			var ruleobj=[{
						ele:$customname,
						datatype:"*",
						nullmsg: "姓名不能为空",
						errormsg: "姓名信息不正确",
						sucmsg: ""
					},{
							ele:$custommobile,
							datatype:"selfmobile",
							nullmsg: "手机不能为空",
							errormsg: "手机号码不正确",
							sucmsg: ""
					},{
							ele:$customprovince_text,
							datatype:"*",
							nullmsg: "所在省市不能为空",
							errormsg: "所在省市信息不正确",
							sucmsg: ""
					},{
							ele:$customcity_text,
							datatype:"*",
							nullmsg: "所在地区不能为空",
							errormsg: "所在地区信息不正确",
							sucmsg: ""
					}];
			
					
			//表单校验
			var dia=dialog({
					cancel:false
			}),
			issucces=false;
		  validobj=$miniportal_form.Validform({
					ajaxPost: true,
					datatype:{
						'selfmobile':function(gets,obj,curform,regxp){
								return CommonFn.isMobilePhone(gets);
						}
					},
					beforeSubmit: function(curform) {
						/*to do*/
						//send ajax 填充具体业务逻辑
						//开发时开启下部代码
						$.ajax({
								url:'请求地址',
								type:'post',
								dataType:"json",
								data:'相关请求参数',
								success: function(data){
										if(data){									
												issucces=true;
												dia.content('<span class="g-c-green1">保存成功</span>').show();
										}else{
												issucces=false;
												dia.content('<span class="g-c-red4">保存失败</span>').show();
										}
								},
								error: function(){
										issucces=false;
										dia.content('<span class="g-c-red4">保存失败</span>').show();
								}
						});
						setTimeout(function(){
							dia.close();
							if(issucces){
								//to do
								//其他操作
							}
						},3000);
						return false;
					},
					tiptype: function(msg,o) { 
						var curtype=o.type,
								cid=id=o.obj[0].id,
								curitem=o.obj;
						if(curtype==1||curtype==3){
								if(cid=='customprovince_text'){
									curitem.parent().next().next().text(msg);
								}else if(cid=='customcity_text'){
									curitem.parent().next().text(msg);
								}else{
									curitem.parent().next().text(msg);
								}
						}else if(curtype==2){
								if(cid=='customprovince_text'){
									curitem.parent().next().next().text('');
								}else if(cid=='customcity_text'){
									curitem.parent().next().text('');
								}else{
									curitem.parent().next().text('');
								}
						}
					}
			});
			validobj.addRule(ruleobj);
			
			
			
			
			
	});
	
	
	

	//私有函数
	function _handler(opt,flow,template){
			var listdata=null,
					htmlstr='',
					resultset=[];
			
			//组合参数
			var params={},
			paramstr='';
			for(var j in opt.itemquery){
					params[j]=opt.itemquery[j];
					paramstr+=j+'='+opt.itemquery[j]+'&';
			}
			params['orderby']=opt.orderby;
			params['pagenum']=opt.pageNum;
			paramstr+='pagenum='+opt.pageNum+'&';
			paramstr+='orderby='+opt.orderby;
			
			$.ajax({
					url:'../../json/gallery_list.json',
					dataType:"json",
					data:params,
					type:'get',
					async:false,
					success: function(result){
							if(result.total!==0){
								listdata=result.galleryList;	
								opt.total=result.total;
								opt.numberwrap.text(result.total);
								opt.itemparams=paramstr;
							}else{
								opt.listwrap.html('');
								listdata.length=0;
							}
					},
					error:function(){
							opt.listwrap.html('');
							listdata.length=0;
					}
			});
			
			
			//填充模板
			var i=0,
					len=listdata.length;
			if(len===0){
					flow.html('').masonry('layout');
					return false;
			}

			for(i;i<len;i++){
				htmlstr=template;
				if(i<=opt.screennum){
					resultset.push(htmlstr.replace('$dataid',listdata[i]['id'])
					.replace('$href',listdata[i]['href'])
					.replace('$imgsrc_default',listdata[i]['url'])
					.replace('$imgsrc',listdata[i]['url'])
					.replace('$datainfo_design',listdata[i]['datainfo_design'])
					.replace('$datainfo_wechat',listdata[i]['datainfo_wechat'])
					.replace('$theme',listdata[i]['name'])
					.replace('$number',listdata[i]['number']));
				}else{
					resultset.push(htmlstr.replace('$dataid',listdata[i]['id'])
					.replace('$href',listdata[i]['href'])
					.replace('$imgsrc_default','../../images/lazyload_default.png')
					.replace('$imgsrc',listdata[i]['url'])
					.replace('$datainfo_design',listdata[i]['datainfo_design'])
					.replace('$datainfo_wechat',listdata[i]['datainfo_wechat'])
					.replace('$theme',listdata[i]['name'])
					.replace('$number',listdata[i]['number']));
				}
			}

			//瀑布流执行并延迟加载
			var $resultset=$(resultset.join(''));
			flow.html('').masonry('layout');		
			flow.append($resultset).masonry('appended',$resultset).masonry('layout');
			$('img',opt.listwrap).lazyload({ 
					effect: "fadeIn"
			});
			resultset.length=0;
			return true;
	}
});


