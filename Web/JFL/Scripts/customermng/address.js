var adr_SelProvince=$("#adr_SelProvince"),adr_selProvince_update=$("#adr_selProvince_update");
/*二级下拉框事件*/
function city(cur){
	var code = cur.value;
	var url = "GetDicAreaJson"; //方法
	var data = { areaCode: code }; //传输
	if (code != "") {
		adr_SelProvince.html("请选择收货区县");
		$.ajax({
			url: url, //数据
			data: data, //数据
			type: "GET", //传输方式
			dataType: "json", //数据类型
			success: function (data) {//传输成功
				if (data.length > 0) {
					var str = "<select id='selDistrict' onchange='area(this)' name='selDistrict'>";
					for (var i = 0; i < data.length; i++) {
						str += "<option value='" + data[i].Value + "'>" + data[i].Text + "</option>";
					}
					str += "</select>";
					$("#selCity").nextAll().remove();
					$("#selCity").after(str);
				}
			},
			error: function (e) {//传输失败
				alert("系统错误！");
			}
		});
	}
	else {
		$("#selCity").nextAll().remove();
		adr_SelProvince.html("请选择收货城市");
	}
}
/*三级下拉框选择*/
function area(cur){
	var code=cur.value;
	if(code==""){
		adr_SelProvince.html("请选择收货区县");
	}else{
		adr_SelProvince.html("");
	}
}
function bindarea(cur){
	var code=cur.value;
	if(code==""){
		adr_selProvince_update.html("请选择收货区县");
	}else{
		adr_selProvince_update.html("");
	}
}
/*下拉框更新数据查询数据*/
function getCityData(code) {
	var url = "GetDicAreaJson"; //方法
	var obj = { areaCode: code }; //传输
	var json;
	$.ajax({
		url: url, //数据
		data: obj, //数据
		async: false,
		type: "GET", //传输方式
		dataType: "json", //数据类型
		success: function (data) {//传输成功
			json = data;
		},
		error: function (e) {//传输失败
			alert("系统错误！");
		}
	});
	return json;
}
/*下拉框绑定更新操作*/
function bindDate(obj) {
	var cur=$(obj);
	var code = cur.val();
	var id = cur.attr("id");
	var date = getCityData(code);
	var name;
	switch (id) {
		case 'selProvince_update':
			name = "selCity_update";
			if(code==""){
				adr_selProvince_update.html("请选择收货省市");
			}else{
				adr_selProvince_update.html("请选择收货城市");
			}
			break;
		case 'selCity_update':
			name = "selDistrict_update";
			if(code==""){
				adr_selProvince_update.html("请选择收货城市");
			}else{
				adr_selProvince_update.html("请选择收货区县");
			}
			break;
		default:
			break;
	}
	if (date.length > 0) {
		var str;
		if (name != "selDistrict_update") {
			str = "<select id='" + name + "' name='" + name + "' onchange='bindDate(this)'>";
		} else {
			str = "<select id='" + name + "' name='" + name + "' onchange='bindarea(this)'>";
		}
		for (var i = 0; i < date.length; i++) {
			str += "<option value='" + date[i].Value + "'>" + date[i].Text + "</option>";
		}
		str += "</select>";
		cur.nextAll().remove();
		cur.after(str);
	}
	
}
/**/
(function($){
	$(function(){
		/*页面节点获取*/
		var address_addvalid=$("#address_addvalid"),address_updatevalid=$("#address_updatevalid"),adr_dzx_04_01=$("#adr_dzx_04_01"),adr_b_dzx_04_01=$("#adr_b_dzx_04_01");
		/*初始化*/
		var _height = $(document).height();
        $(".hei").height(_height);
		/*用于重构1*/
		$(".shdiz").hover(function () {
			$(".dz_cz", $(this)).toggle();
		});
		/*显示隐藏遮罩层*/
		$("#tj_add_01,#tj_add_02").click(function () {
			$("#add_x,.hei").show();
		});
		$(".Close,.qx_dz").click(function () {
			$("#add_x,#update_x,.hei").hide();
		});
		/*添加操作*/
		$("a[name=setAddress]").click(function () {
			var obj = $(this).parent().parent().parent();
			var id = $(obj).attr("id");
		});
		/*表单校验对象*/
		var adr_vobj={
				ajaxPost:true,
				datatype:{
					"adr_address":function(gets,obj,curform){
						if(curform[0].id.indexOf("addvalid")!=-1){
							return address_PC(gets,obj,adr_SelProvince);
						}else if(curform[0].id.indexOf("updatevalid")!=-1){
							return address_PC(gets,obj,adr_selProvince_update);
						}
					},
					"adr_mp":function(gets,obj,curform){
						if(curform[0].id.indexOf("addvalid")!=-1){
							return address_MP(gets,obj,adr_dzx_04_01);
						}else if(curform[0].id.indexOf("updatevalid")!=-1){
							return address_MP(gets,obj,adr_b_dzx_04_01);
						}
					}
				},
				tiptype:function(msg,o){
					/*参数说明：
						  msg：提示信息;
							o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
					   cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）; */
					var objid=o.obj[0].id,curid="#adr_"+objid,curtype=o.type,curact=o.curform[0].id;
					if(curtype==1||curtype==3){
						if(curact.indexOf("addvalid")!=-1){
							if(objid!="SelProvince"||objid!="dzx_04_01"||objid!="dzx_04_02"){
								$(curid).html(msg);
							}
						}else if(curact.indexOf("updatevalid")!=-1){
							if(objid!="selProvince_update"||objid!="b_dzx_04_01"||objid!="b_dzx_04_02"){
								$(curid).html(msg);
							}
						}
						
					}else if(curtype==2){
						if(curact.indexOf("addvalid")!=-1){
							if(objid!="SelProvince"||objid!="dzx_04_01"||objid!="dzx_04_02"){
								$(curid).html("");
							}
						}else if(curact.indexOf("updatevalid")!=-1){
							if(objid!="selProvince_update"||objid!="b_dzx_04_01"||objid!="b_dzx_04_02"){
								$(curid).html("");
							}
						}
						
					}
				},
				beforeSubmit:function(curform){
					if(curform[0].id.indexOf("addvalid")!=-1){
						var name = $("#dzx_01").val();
						var city1 = $("#SelProvince").val();
						var city2 = $("#selCity").val();
						var city3 = $("#selDistrict").val();
						var xdz = $("#dzx_03").val();
						var phone1 = $("#dzx_04_01").val();
						var phone2 = $("#dzx_04_02").val();
						var mor = 0; //获取是否选中为常用地址
						if ($("#dzx_05").attr("checked")) {
							mor = 1;
						}
						var url1 = "AddAddress"; //方法
						var data = { name: name, province: city1, city: city2, district: city3, fullAddress: xdz, mobilePhone: phone1, telePhhone: phone2, isDefault: mor }; //传输
						$.ajax({
							url: url1, //数据
							data: data, //数据
							type: "POST", //传输方式
							dataType: "json", //数据类型
							success: function (data) {//传输成功
								alert("添加成功");
								window.top.location.reload();
							},
							error: function (e) {//传输失败
								alert("添加失败");
							}
						})
					}else if(curform[0].id.indexOf("updatevalid")!=-1){
						var addressID = $("#addressid").val();
						var name = $("#b_dzx_01").val();
						var city1 = $("#selProvince_update").val();
						var city2 = $("#selCity_update").val();
						var city3 = $("#selDistrict_update").val();
						var xdz = $("#b_dzx_03").val();
						var phone1 = $("#b_dzx_04_01").val();
						var phone2 = $("#b_dzx_04_02").val();
						var mor = 0; //获取是否选中为常用地址
						if ($("#b_dzx_05").attr("checked")) {
							mor = 1;
						}
						var url2 = "UpdateAddress"; //方法
				
						var data = { addressID: addressID, name: name, province: city1, city: city2, district: city3, fullAddress: xdz, mobilePhone: phone1, telePhhone: phone2, isDefault: mor }; //传输
						$.ajax({
							url: url2, //数据
							data: data, //数据
							type: "POST", //传输方式
							dataType: "json", //数据类型
							success: function (data) {//传输成功
								if (data.State) {
									alert(data.Message);
									//$("#update_x,.hei").hide();
									window.top.location.reload();
								}
							},
							error: function (e) {//传输失败
								alert("资料填写不完善！");
							}
						});
					}
					return false;
				}
		}

		
		/*删除地址*/
		$(".delAddress").click(function () {
			var obj = $(this).parent().parent().parent();
			var id = $(obj).attr("id");
			var url = "DelCustomerAddress"; //方法
			var data = { customerAddressID: id }; //传输
			$.ajax({
				url: url, //数据
				data: data, //数据
				type: "POST", //传输方式
				dataType: "json", //数据类型
				success: function (data) {//传输成功
					alert("删除成功");
					obj.remove();
				},
				error: function (e) {//传输失败
					alert("删除失败！");
				}
			});
		});
		/*编辑操作*/
		$("a[name=updateAddress]").click(function () {
			var obj = $(this).parent().parent().parent();
			var id = obj.attr("id");
			var url = "GetAddressInfo";
			var data = { addressID: id };
			$.ajax({
				url: url, //数据
				data: data, //数据
				type: "GET", //传输方式
				dataType: "json", //数据类型
				success: function (data) {//传输成功
					$("#addressid").val(data.CustomerAddressID);
					$("#b_dzx_01").val(data.Name);
					$("#b_dzx_03").val(data.FullAddress);
					$("#b_dzx_04_01").val(data.MobilePhone);
					$("#b_dzx_04_02").val(data.TelePhone);
					if (data.IsDefault == "1") {
						$("#b_dzx_05").attr("checked", true);
					}
					else {
						$("#b_dzx_05").attr("checked", false);
					}
					var province = data.Province;
					var city = data.City;
					var district = data.District;
					var provinceData = getCityData("");
					var cityData = getCityData(province)
					var districtData = getCityData(city);
					$("#address").children().remove();
					//bindProvince
					if (provinceData.length > 0) {
						var str = "<select id='selProvince_update' name='selProvince_update' onchange='bindDate(this)'>";
						for (var i = 0; i < provinceData.length; i++) {
							str += "<option value='" + provinceData[i].Value + "'>" + provinceData[i].Text + "</option>";
						}
						str += "</select>";
						// $("#address").nextAll().remove();
						$("#address").append(str);
						//$("#address").after(str);
					}
					$("#selProvince_update").val(province);
	
					if (cityData.length > 0) {
						var str = "<select id='selCity_update' name='selCity_update' onchange='bindDate(this)'>";
						for (var i = 0; i < cityData.length; i++) {
							str += "<option value='" + cityData[i].Value + "'>" + cityData[i].Text + "</option>";
						}
						str += "</select>";
						//$("#address").nextAll().remove();
						$("#selProvince_update").after(str);
					}
					$("#selCity_update").val(city);
					if (districtData.length > 0) {
						var str = "<select id='selDistrict_update' name='selDistrict_update'>";
						for (var i = 0; i < districtData.length; i++) {
							str += "<option value='" + districtData[i].Value + "'>" + districtData[i].Text + "</option>";
						}
						str += "</select>";
						//$("#address").nextAll().remove();
						$("#selCity_update").after(str);
					}
					$("#selDistrict_update").val(district);
					$("#update_x,.hei").show();
					/*更新--绑定表单校验*/
					var address_updatevalidobj=address_updatevalid.Validform(adr_vobj);
					address_updatevalidobj.addRule(vmsg_objs().adr_updatemsg);
				},
				error: function (e) {//传输失败
					alert("系统错误！");
				}
			});
	
		});
		
		/*收货地址下拉框选择*/
		$("#SelProvince").change(function () {
			var code = $("#SelProvince").val();
			if(code!=""){
				adr_SelProvince.html("请选择收货城市");
			}else{
				adr_SelProvince.html("请选择收货省市");
			}
			var url = "GetDicAreaJson"; //方法
			var data = { areaCode: code }; //传输
			if (code != "") {
				$.ajax({
					url: url, //数据
					data: data, //数据
					type: "GET", //传输方式
					dataType: "json", //数据类型
					success: function (data) {//传输成功
						if (data.length > 0) {
							var str = "<select id='selCity' name='selCity' onchange='city(this)'>";
							for (var i = 0; i < data.length; i++) {
								str += "<option value='" + data[i].Value + "'>" + data[i].Text + "</option>";
							}
							str += "</select>";
							$("#SelProvince").nextAll().remove();
							$("#SelProvince").after(str);
						}
			
					},
					error: function (e) {//传输失败
						alert("系统错误！");
					}
				});
			}
			else {
				$("#SelProvince").nextAll().remove();
			}
		});

		/*表单校验*/
		/*添加*/
		var address_addvalidobj=address_addvalid.Validform(adr_vobj);
		address_addvalidobj.addRule(vmsg_objs().adr_addmsg);
	});
})(jQuery);






