/*配置依赖*/
require.config({
	baseUrl:'../../resource',
	paths:{
		'jquery':'js/lib/jquery/jquery-1.11.2.min',
		'bootstrap':'css/bootstrap_2.3.2/js/bootstrap.min',
		'dialog':'js/lib/artDialog/dialog',
		'querydata':'js/widgets/querydata',
		'validform':'js/plugins/validform',
		'common':'js/common/common',
		'submenu':'js/widgets/submenu',
		'themetitle':'js/widgets/themetitle',
		'highchart':'js/lib/highcharts/Highcharts-4.1.5/js/highcharts',
		'tree':'js/plugins/easyui_tree/tree'
	},
	shim:{
		'bootstrap':{
				deps:['jquery']
		},
		'dialog':{
				deps:['jquery']
		},
		'querydata':{
				deps:['jquery','dialog']
		},
		'validform':{
				deps:['jquery']
		},
		'common':{
				deps:['jquery','dialog','querydata','validform']
		},
		'submenu':{
				deps:['jquery','common']
		},
		'themetitle':{
				deps:['jquery','common']
		}
	}
});


/*程序入口*/
require(['jquery','bootstrap','dialog','querydata','validform','common','submenu','themetitle','highchart','tree'], function($,$strap,undefined,undefined,undefined,Common,undefined,undefined,undefined,undefined) {
	$(function() {
			//页面元素引用
			var $submenu=$('#submenu'),
					$theme_title=$('#theme_title'),
					$dealer_tab=$('#dealer_tab'),
					$treeOrView=$('#treeOrView'),
					$memberNo=$('#memberNo'),
					$Layer=$('#Layer'),
					$grid_querybtn=$('#grid_querybtn'),
					$grid_viewchart=$('#grid_viewchart'),
					$grid_viewtree=$('#grid_viewtree');
					
			//主题标题点击
			$theme_title.ThemeTitle(undefined,true);
				
			//子导航点击事件
			$submenu.subMenuItem(undefined,true);
			
			//图像视图对象
		var colors={
						red:['#d91616','#f1194f','#c7161e'],
						green:['#12b312','#369b38'],
						blue:['#00c8ff','#1687d8','#1179b1'],
						cyan:['#1490cb','#d1eef9'],
						yellow:['#ffff00'],
						orange:['#f26d00','#f17534','#fadac8','#fff8f1'],
						gray:['#2e2e2e','#404040','#666','#999','#aaa','#bbb','#ccc','#ddd','#eee','#f3f3f3','#fafafa'],
						white:'#fff',
						black:'#000'
				},
				charts_itemlarge={
					fill:colors.gray[8],
					stroke:colors.white,
					'stroke-width':3,
					padding:15,
					cursor:'pointer',
					r:6
				},
				charts_item={
					fill:colors.gray[8],
					stroke:colors.white,
					'stroke-width':2,
					padding:8,
					cursor:'pointer',
					r:4
				},
				charts_itemmini={
					fill:colors.gray[8],
					stroke:colors.white,
					'stroke-width':1,
					padding:2,
					cursor:'pointer',
					r:2
				},
				charts_line={
					'stroke-width':2,
					stroke:colors.black
				},
				hArrow = ['M', 5,0, 'L', 5,50, 'L',0,45, 'M',5,50, 'L',10,45],
				view_chart={
					 chart: {
								backgroundColor:colors.white,
								events:{},
								style:{
									'font-size':'12px',
									color:colors.gray[2],
								}
						},
						title: {
								text:'图形模式',
								style: {
										color:colors.gray[2],
										'font-size':'12px'
								}
						}			
				}
		
		
		//初始化
		$treeOrView.val($dealer_tab.find('li:first-child a').attr('data-value'));
		$Layer.val('1');
		
		
		
		//绑定查询层数输入限制
		$Layer.on('keyup focusout',function(e){
			var type=e.type,
				txt=this.value;
			if(type=='keyup'){
				txt=txt.replace(/\s*\D*/g,'');
			}else if(type=='focusout'&&txt==''){
				txt=1;
			}
			this.value=txt;
		});
		
		
		
			

		//查询搜索
		$grid_querybtn.queryListData([$treeOrView,$memberNo,$Layer],2000,function(sparam){
				//sparam 为一个带有参与联合查询的字符数组，可用于ajax的参数
				//console.log(sparam);
				var types=sparam[0].value,
				wrap_width=500;
				if(types=='View'){
						wrap_width=$grid_viewchart.width();

						//to do  图形模式
						//ajax
						//开发时开启下部代码
						/*$.ajax({
								url:'请求地址',
								type:'post',
								dataType:"json",
								data:'相关请求参数',
								success: function(data){
										if(data){
												
										}else{
											
										}
								},
								error: function(){
										
								}
						});*/
				}else if(types=='Tree'){
						wrap_width=$grid_viewtree.width();
						//to do 树形模型
						//ajax
						//开发时开启下部代码
						/*$.ajax({
								url:'请求地址',
								type:'post',
								dataType:"json",
								data:'相关请求参数',
								success: function(data){
										if(data){
												
										}else{
											
										}
								},
								error: function(){
										
								}
						});*/
				}
						
				//此处为测试代码
				//开发时请删除下部代码
				if(types=='View'){
						var layerchart=3,
						layout_width=0,
						layout_height=80;
						if(layerchart==0){
							$grid_viewchart.html('');
						}else{
								view_chart.chart.events.load=function(){
										var ren = this.renderer,
											i=0,
											itemchart_width=0;
										//外层--层数
										for(i;i<layerchart;i++){
												if(i==0){
													ren.label('<span>经销商编号：</span><span style="color:'+colors.gray[3]+'">0123456789</span><br /><span>经销商昵称：</span><span  style="color:'+colors.cyan[0]+'">关系第'+(i+1)+'层</span>',wrap_width*0.45,50).attr(charts_itemlarge).add().shadow(true);
												}else{
													var itemchart=parseInt(Math.random()*20),
														j=0;
													if(itemchart==0){
														itemchart=1;
													}
													if(itemchart>5){
														itemchart_width=itemchart * 170;
														layout_width=Math.max(layout_width,itemchart_width);
														layout_height+=70;
														//内层--子关系数
														for(j;j<itemchart;j++){	
																ren.label('<span style="color:'+colors.gray[3]+'">345345353</span><br /><span style="color:'+colors.cyan[0]+'">关系第'+(i+1)+'层,第'+(j+1)+'个经销商</span>',(j*160)+20,layout_height).attr(charts_itemmini).add().shadow(true);
														}
													}else{
														itemchart_width=itemchart * 250;
														layout_width=Math.max(layout_width,itemchart_width);
														layout_height+=100;
														//内层--子关系数
														for(j;j<itemchart;j++){	
																ren.label('<span>经销商编号：</span><span style="color:'+colors.gray[3]+'">345345353</span><br /><span>经销商昵称：</span><span style="color:'+colors.cyan[0]+'">关系第'+(i+1)+'层,第'+(j+1)+'个经销商</span>',(j*250)+20,layout_height).attr(charts_item).add().shadow(true);
														}
													}
												}
										}
								}
								
								$grid_viewchart.highcharts(view_chart);				
								setTimeout(function(){
									if(layerchart>2){
										view_chart.chart.height=layerchart*150 + 100;
									}
									if(layout_width>wrap_width){
										view_chart.chart.width=layout_width + 50;
									}
								},0);
					}
				}else if(types=='Tree'){
						//easyui-tree
						var itemtree=parseInt(Math.random()*10),
						res=[],
						m=0;
						if(itemtree>0){
							for(m;m<itemtree;m++){
									res.push(treefor(m));
							}
						}
						$grid_viewtree.tree({data:res});
				}			
		},true);

		

		//绑定tab选项卡事件
		$dealer_tab.delegate('a','click',function(e){
				e.preventDefault();
				$this=$(this),
				value=$this.attr('data-value');
				//效果切换
				$this.tab('show');
				//赋值
				$treeOrView.val(value);
				//显示区区展示
				if(value=='View'){
						$grid_viewchart.show();
						$grid_viewtree.hide();
				}else if(value=='Tree'){
						$grid_viewchart.hide();
						$grid_viewtree.show();
				}
				return false;
		});
		
		//内部私有函数--树形结构递归调用(此处为测试代码，开发阶段可删除)
		function treefor(n){
				var obj={};
				if(n<0){
						return '';
				}
				if(n==0){
					obj['text']='<span><em>经销商编号:</em><i>345345353</i><em>经销商昵称：</em><i>425626456</i></span>';
				}else{
						var itemtree=parseInt(Math.random()*10)%5,
						k=0,
						temparr=[];
						if(itemtree!=0){
								obj['text']='<span><em>经销商编号:</em><i>345345353</i><em>经销商昵称：</em><i>425626456</i></span>';
								obj['state']='closed';
								for(k;k<itemtree;k++){
									temparr.push({
										'text':'<span><em>经销商编号:</em><i>345345353</i><em>经销商昵称：</em><i>425626456</i></span>'
									});
								}
								obj['children']=temparr;
						}else{
							obj['text']='<span><em>经销商编号:</em><i>345345353</i><em>经销商昵称：</em><i>425626456</i></span>';
						}
				}
				return obj;
		}
		
		
			
	});
});
