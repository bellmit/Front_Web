/**
 * 公用控件的下拉实现
 */
(function($) {
	var defaults = {
		townInitVal : '',//街道初始化值
		pid : 's1',//省ID
		cid : 's2',//二级地方ID
		tid :'town',//三级地市ID
		contextPath : $('#contextPath').val(),//项目路径
		firstid:'firstcarType',//一级车型的id
		secondid:'secondcarType',//二级车型的ID
		threeid:'cartype',//三级车型的ID
		brandInitVal:''//车型的初始化值
	};
	
	var initCity = function(options) {
		var opts = $.extend(defaults, options);

			var _pronvice = $('#' + opts.pid);
			var _city = $('#' + opts.cid);
			var _town = $('#'+opts.tid);
			
			//街道下拉框
			_town.combobox({
				valueField:'regionid',
				textField:'regionname',
				editable:false,//不支持搜索
				filter:function(q,row){
					//实现搜索
					return row.initialchar.indexOf(q.toUpperCase()) != -1 || row.regionname.indexOf(q.toUpperCase()) != -1 || row.areacode.indexOf(q.toUpperCase()) != -1;
				}
			}).combobox('disable');
			
			_pronvice.combobox({
				url: opts.contextPath + '/commom/getProvince',
				valueField:'regionid',
				textField:'regionname',
				editable:false,//不支持搜索
				filter:function(q,row){
					//实现搜索
					return row.initialchar.indexOf(q.toUpperCase()) != -1 || row.regionname.indexOf(q.toUpperCase()) != -1;
				},
				onSelect:function(record){
					//重新加载数据
					if(record.regionid !=''){
						_town.combobox('disable').combobox('clear');
						_city.combobox('clear').combobox('reload', opts.contextPath + '/commom/getCity?provinceCode='+record.regionid).combobox('enable');
						opts.townInitVal='';
						//						_city.combobox('textbox').focus();//获取焦点
					}
				},
				onChange:function(){
					_city.combobox('loadData',[]);
					_town.combobox('loadData',[]);
				},
				onLoadSuccess:function(){
					_pronvice.combobox('setValue',opts.townInitVal.substring(0,2)+"0000");
					var pronviceId = _pronvice.combobox('getValue');
					if(pronviceId!=''){
						_city.combobox('clear').combobox('reload', opts.contextPath + '/commom/getCity?provinceCode='+pronviceId);
						setTimeout(function(){
							if (opts.townInitVal !='' && opts.townInitVal.length>=4) {
							   _city.combobox('setValue',opts.townInitVal.substring(0,4)+"00");
							}
							_city.combobox('enable');
						},200);
					}
				}
			});
			
			_city.combobox({
				valueField:'regionid',
				textField:'regionname',
				editable:false,//不支持搜索
				onSelect:function(record){
					//重新加载数据
					if(record.regionid !=''){
						_town.combobox('enable').combobox('clear').combobox('reload', opts.contextPath + '/commom/getCity?provinceCode='+record.regionid);
					}
				},
				filter:function(q,row){
					//实现搜索
					return row.initialchar.indexOf(q.toUpperCase()) != -1 || row.name.indexOf(q.toUpperCase()) != -1;
				},
				onChange:function(){
					_town.combobox('loadData',[]);
				},
				onLoadSuccess:function(){
					setTimeout(function(){
						var cityId = _city.combobox('getValue');
						if(cityId !=''){
							_town.combobox('clear').combobox('reload', opts.contextPath + '/commom/getCity?provinceCode='+cityId);
							setTimeout(function(){
								if (opts.townInitVal.length==6) {
									_town.combobox('setValue',opts.townInitVal).combobox('enable');
								}else if(opts.brandInitVal.length ==4){
									_town.combobox('enable');
								}else{
									_town.combobox('loadData',[]);
								}
							},600);
						}
					},400);
				}
			}).combobox('disable');
			
	};

	var initBrand = function(options){
		var opts = $.extend(defaults, options);
		
		var first_brand = $('#'+opts.firstid);
		var second_brand = $('#'+opts.secondid);
		var three_brand = $('#'+opts.threeid);
		
		three_brand.combobox({
			valueField:'id',
			editable:false,//不支持搜索
			textField:'name',
			filter:function(q,row){
				//实现搜索
				return row.initialchar.indexOf(q.toUpperCase()) != -1 || row.name.indexOf(q.toUpperCase()) != -1;
			}
		}).combobox('disable');
		
		//车型品牌的下拉
		first_brand.combobox({
			valueField:'id',
			textField:'name',
			editable:false,//不支持搜索
			url: opts.contextPath + '/commom/getOneBrand',
			filter:function(q,row){
				//实现搜索
				return row.initialchar.indexOf(q.toUpperCase()) != -1 || row.name.indexOf(q.toUpperCase()) != -1;
			},
			onChange:function(){
				second_brand.combobox('loadData',[]);
				three_brand.combobox('loadData',[]);
				
			},
			onSelect:function(record){
				//重新加载数据
				if(record.id !=''){
					three_brand.combobox('disable').combobox('clear');
					second_brand.combobox('clear').combobox('reload', opts.contextPath + '/commom/getOtherBrand?id='+record.id).combobox('enable');
					opts.brandInitVal='';
				}
			},
			onLoadSuccess:function(){
				first_brand.combobox('setValue',opts.brandInitVal.substring(0,3));
				var first_id = first_brand.combobox('getValue');
				if(first_id !=''){
					second_brand.combobox('clear').combobox('reload', opts.contextPath + '/commom/getOtherBrand?id='+first_id);
					setTimeout(function(){
						if (opts.brandInitVal.length>=6) {
							second_brand.combobox('setValue',opts.brandInitVal.substring(0,6))
						}
						second_brand.combobox('enable');
					},300);
				}
			}
		});
		
		second_brand.combobox({
			valueField:'id',
			textField:'name',
			editable:false,//不支持搜索
			onSelect:function(record){
				//重新加载数据
				if(record.id !=''){
					three_brand.combobox('enable').combobox('clear').combobox('reload', opts.contextPath + '/commom/getOtherBrand?id='+record.id);
				}
			},
			filter:function(q,row){
				//实现搜索
				return row.initialchar.indexOf(q.toUpperCase()) != -1 || row.name.indexOf(q.toUpperCase()) != -1;
			},
			onChange:function(){
				three_brand.combobox('loadData',[]);
			},
			onLoadSuccess:function(){
				setTimeout(function(){
					var second_id = second_brand.combobox('getValue');
					if(second_id !=''){
						three_brand.combobox('clear').combobox('reload', opts.contextPath + '/commom/getOtherBrand?id='+second_id);
						setTimeout(function(){
							if (opts.brandInitVal.length==9) {
								three_brand.combobox('setValue',opts.brandInitVal).combobox('enable');
							}else if(opts.brandInitVal.length ==6){
								three_brand.combobox('enable');
							}else{
								three_brand.combobox('loadData',[]);
							}
						},600);
					}
				},400);
			}
		}).combobox('disable');
	};
	
	$.EasyUiCity = initCity;//城市下拉的调用
	$.EasyUiBrand = initBrand;//车型下拉的调用
})(jQuery);
