/*admin_member:成员设置*/
(function($){
	'use strict';
	$(function(){
		/*初始化数据*/
		if(public_tool.initMap.isrender){
			/*菜单调用*/
			var logininfo=public_tool.initMap.loginMap;
			public_tool.loadSideMenu(public_vars.$mainmenu,public_vars.$main_menu_wrap,{
				url:'../../json/menu.json',
				async:false,
				type:'post',
				datatype:'json'
			});


			/*dom引用和相关变量定义*/
			var module_id='yttx-goods-detail'/*模块id，主要用于本地存储传值*/,
				dia=dialog({
					zIndex:2000,
					title:'温馨提示',
					okValue:'确定',
					width:300,
					ok:function(){
						this.close();
						return false;
					},
					cancel:false
				})/*一般提示对象*/,
				detail_config={
					userId:decodeURIComponent(logininfo.param.userId),
					token:decodeURIComponent(logininfo.param.token),
					providerId:decodeURIComponent(logininfo.param.providerId)
				},
			 	$admin_slide_image=$('#admin_slide_image'),
				$admin_slide_btnl=$('#admin_slide_btnl'),
				$admin_slide_btnr=$('#admin_slide_btnr'),
				$admin_slide_tool=$('#admin_slide_tool'),
				slide_config={
					$slide_tool:$admin_slide_tool,
					$image:$admin_slide_image,
					$btnl:$admin_slide_btnl,
					$btnr:$admin_slide_btnr,
					active:'admin-slide-active',
					len:5
				};


			/*清除编辑缓存并获取查看缓存*/
			public_tool.removeParams('yttx-goods-edit');
			var detail_cache=public_tool.getParams('yttx-goods-detail');

			if(detail_cache){
				/*解析数据*/
				detail_config['id']=detail_cache['id'];
				getDetailData(detail_config);
			}else{
				dia.content('<span class="g-c-bs-warning g-btips-warn">没有这个商品</span>').show();
				setTimeout(function () {
					dia.close();
					location.href='yttx-goods-manage.html';
				},2000);
			}



		}


		/*获取数据*/
		function getDetailData(config){
			$.ajax({
				url:"http://120.76.237.100:8081/yttx-providerbms-api/goods/details",
				dataType:'JSON',
				async:false,
				method:'post',
				data:config
			}).done(function(resp){
				var code=parseInt(resp.code,10)||0;
				if(code!==0){
					if(code===999){
						/*清空缓存*/
						public_tool.clear();
						public_tool.clearCacheData();
						public_tool.loginTips();
					}
					console.log(resp.message);
					return false;
				}
				var result=resp.result;

				if(!result){
					return false;
				}

				if($.isEmptyObject(result)){
					return false;
				}

				/*解析轮播图*/
				var banner=result['bannerList'];
				if(banner&&banner.length!==0){
					getSlideData(banner,slide_config);
				}

				/*解析详情*/
				var detail=result['details'];
				if(detail!==''){
					getDetailHtml(detail);
				}

				/*解析类型*/
				var type=result['goodsTypeId'];
				if(type!=='undefined'){
					document.getElementById('admin_goodstype').innerHTML=type;
				}

				/*解析名称*/
				document.getElementById('admin_name').innerHTML=result['name'];

				/*解析是否被推荐*/
				if(result['isRecommended']){
					document.getElementById('admin_isRecommended').innerHTML='是';
				}else{
					document.getElementById('admin_isRecommended').innerHTML='否';
				}

				/*解析库存，批发价，建议零售价*/




			}).fail(function(resp){
				console.log(resp.message||'error');
				return false;
			});


		}







		/*查询标签与属性*/
		function getAttrData(attr,price){
			var attrlen= 0,
				pricelen=0;
			if(attr){
				attrlen=attr.length;
			}

			if(attrlen===0){
				if(price){
					pricelen=price.length;
					if(pricelen!==0){
						var priceobj=price[0];
						if(priceobj!==null||priceobj!==''){
							priceobj=priceobj.split("#");
							if(priceobj.length!==0){
								document.getElementById('admin_inventory').innerHTML=priceobj[0];
								document.getElementById('admin_wholesale_price').innerHTML=public_tool.moneyCorrect(priceobj[1],12,true)[0];
								document.getElementById('admin_retail_price').innerHTML=public_tool.moneyCorrect(priceobj[2],12,true)[0];
							}
						}
					}
				}
			}else {
				if(price){
					pricelen=price.length;
					if(pricelen!==0){
						var colorlist,
							rulelist;
						if(attr[0]['name'].indexOf('颜色')!==-1){
							colorlist=attr[0]['list'];
						}else if(attr[1]['name'].indexOf('颜色')!==-1){
							colorlist=attr[1]['list'];
						}
						if(attr[0]['name'].indexOf('规格')!==-1){
							rulelist=attr[0]['list'];
						}else if(attr[1]['name'].indexOf('规格')!==-1){
							rulelist=attr[1]['list'];
						}



						/*var priceobj=price[0];
						if(priceobj!==null||priceobj!==''){
							priceobj=priceobj.split("#");
							if(priceobj.length!==0){
								document.getElementById('admin_inventory').innerHTML=priceobj[0];
								document.getElementById('admin_wholesale_price').innerHTML=public_tool.moneyCorrect(priceobj[1],12,true)[0];
								document.getElementById('admin_retail_price').innerHTML=public_tool.moneyCorrect(priceobj[2],12,true)[0];
							}
						}*/
					}
				}
			}


				var len=list.length,
					i= 0,
					attrmap={
						'color':{
							'map':colormap
						},
						'rule':{
							'map':rulemap
						}
					};

				if(len!==0){
					for(i;i<len;i++){
						var name=list[i]['name'],
							arr=list[i]['list'],
							j= 0,
							sublen=arr.length,
							str='',
							subobj,
							key='';

						if(name.indexOf('颜色')!==-1&&name.indexOf('公共属性')!==-1){
							key='color';
						}else if(name.indexOf('规格')!==-1){
							key='rule';
						}else{
							continue;
						}
						if(sublen!==0){

							for(j;j<sublen;j++){
								subobj=arr[j];
								var attrvalue=subobj["goodsTagId"]+'_'+subobj["id"],
									  attrtxt=subobj["name"];
								if(attrtxt in attrmap[key]['map']){
									attrtxt=attrtxt+1;
								}
								str+='<li data-value="'+attrvalue+'">'+attrtxt+'</li>';
								attrmap[key]['map'][attrtxt]=attrvalue;
							}
							$(str).appendTo(attrmap[key]['wrap']);
						}else{
							continue;
						}
					}
				}
		}



		/*组合颜色与尺寸*/
		function groupCondition(){
			if($.isEmptyObject(attr_data)){
				$admin_wholesale_price_list.html('');
				return false;
			}
			var color={},
				rule=[],
				len= 0,
				str='';
			for(var i in attr_data){
				if(i.indexOf('color')!==-1){
					color[i]=attr_data[i];
				}else if(i.indexOf('rule')!==-1){
					var tempobj={};
					tempobj['name']=attr_data[i];
					rule.push(tempobj);
				}
			}

			len=rule.length;
			if($.isEmptyObject(color)||len===0){
				$admin_wholesale_price_list.html('');
				return false;
			}


			for(var j in color){
				var k= 0,
					colorvalue=color[j];
				str+='<tr><td rowspan="'+len+'">'+colorvalue+'</td>';
				for(k;k<len;k++){
					var name=rule[k]["name"],
						code=colormap[colorvalue].split('_')[1]+'_'+rulemap[name].split('_')[1];
					if(k===0){
						str+='<td>'+name+'</td>' +
							'<td><input class="admin-table-input" name="setinventory" maxlength="5" type="text"></td>' +
							'<td><input class="admin-table-input" name="setwholesalePrice" maxlength="12" type="text"></td>' +
							'<td><input class="admin-table-input" name="setretailPrice" maxlength="12" type="text"></td>' +
							'<td><input name="setisDefault"  type="radio" data-value="'+code+'"></td></tr>';
					}else{
						str+='<tr><td>'+name+'</td>' +
							'<td><input class="admin-table-input" name="setinventory" maxlength="5" type="text"></td>' +
							'<td><input class="admin-table-input" name="setwholesalePrice" maxlength="12" type="text"></td>' +
							'<td><input class="admin-table-input" name="setretailPrice" maxlength="12" type="text"></td>' +
							'<td><input name="setisDefault"  type="radio" data-value="'+code+'"></td></tr>';
					}
				}
			}
			$(str).appendTo($admin_wholesale_price_list.html('').removeClass('g-d-hidei'));
		}


		/*获取设置的价格数据*/
		function getSetPrice(){
			var result=[],
				$tr=$admin_wholesale_price_list.find('tr'),
				len=$tr.size(),
				j=0;

			for(j;j<len;j++){
				var $input=$tr.eq(j).find('input'),
					sublen=$input.size(),
					m= 0,
					str='';
				for(m;m<sublen;m++){
					var $this=$input.eq(m);

					if(m!==3){
						var tempstr=$this.val();
						if(tempstr.indexOf(',')!==-1){
							tempstr=public_tool.trimSep(tempstr,',');
						}
						str+=tempstr+'#';
					}else{
						var key=$this.attr('data-value').split('_'),
							value=$this.is(':checked')?1:0;

						str+=value+'#'+key[0]+'#'+key[1];
					};
				}
				result.push(str);
			}
			return JSON.stringify(result);
		}


		/*解析轮播图*/
		function getSlideData(list,config){
			var len=list.length,
				i= 0,
				str='';
			for(i;i<len;i++){
				var url=list[i]['imageUrl'];
				if(url.indexOf('qiniucdn.com')!==-1){
					if(url.indexOf('?imageView2')!==-1){
						url=url.split('?imageView2')[0]+'?imageView2/1/w/50/h/50';
					}else{
						url=url+'?imageView2/1/w/50/h/50';
					}
					str+='<li><img alt="" src="'+url+'" /></li>';
				}else {
					str+='<li><img alt="" src="'+url+'" /></li>';
				}
			}
			$(str).appendTo(config.$slide_tool.html(''));
			/*调用轮播*/
			goodsSlide.GoodsSlide(config);
		}


		/*解析详情*/
		function getDetailHtml(data){
			var str=data.replace(/(jpeg|jpg|gif|png)/g,"$1"+"?imageView2/1/w/400/h/300");
				document.getElementById('admin_detail').innerHTML=str;
		}




	});



})(jQuery);