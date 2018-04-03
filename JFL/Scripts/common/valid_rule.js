/*注册验证手机是否已存在*/
function isExistMobile(vals,urls){
	/*验证手机*/
	var v=vals,u=urls,tmobile=false,rules=c_Regular().Mobile;
	v=v.replace(/(\s*)/g,"");
	if(rules.test(v)){
		tmobile=true;
	}else{
		return tmobile="手机格式不正确";
	}	
	$.ajax({
		url:u,
		type:"post",
		async:false,
		data:{mobilePhone:v},
		dataType:"json",
		success: function(res){
			if(res.State==false||res.State=="false"){
				tmobile="手机已注册,请检查手机号码是否正确";
			}else{
				tmobile=true;
			}
		},
		error:function(e){
			tmobile="手机认证失败";
		}
	});
	return tmobile;
}
/*注册验证邮箱是否已经存在*/
function isExistEmail(vals,urls){
	/*验证邮箱*/
	var v=vals,u=urls,temail=false,reles=c_Regular().Email;
	v=v.replace(/(\s*)/g,"");	
	if(reles.test(v)){
		temail=true;
	}else{
		return temail="邮箱格式不正确";
	}
	$.ajax({
		url:u,
		type:"post",
		async:false,
		data:{email:v},
		dataType:"json",
		success: function(res){
			if(res.State==false||res.State=="false"){
				temail="此邮箱已注册,请检查邮箱是否正确";
			}else{
				temail=true;
			}
		},
		error:function(e){
			temail="邮箱认证失败";
		}
	});
	return temail;
}
/*收货地址--城市地址校验*/
function address_PC(vals,objs,wraps){
	var v=vals,o=objs,w=wraps,pcinfo=false;
	if(v==""||v=="请选择"){
		pcinfo="请选择收货省份";
		w.html(pcinfo);
	}else{
		var ts1=o.next("select");
		if(ts1.length==0){
			pcinfo="请选择收货城市";
			w.html(pcinfo);
			return pcinfo;
		}
		if((ts1.length!=0&&ts1.val()=="")||(ts1.length!=0&&ts1.val()=="请选择")){
			pcinfo="请选择收货城市";
			w.html(pcinfo);
		}else{
			var ts2=ts1.next("select");
			if(ts2.length==0){
				pcinfo="请选择收货区县";
				w.html(pcinfo);
				return pcinfo;
			}
			if((ts2.length!=0&&ts2.val()=="")||(ts2.length!=0&&ts2.val()=="请选择")){
				pcinfo="请选择收货区县";
				w.html(pcinfo);
			}else{
				pcinfo=true;
				w.html("");
			}
		}
	}
	return pcinfo;
}

/*收货地址--手机号码和电话号码校验*/
function address_MP(vals,objs,wraps){
	var rules=c_Regular();
	var v=vals,o=objs,w=wraps,mpinfo=false,oid=o.attr("id"),v1="",v2="";
	if(oid=="dzx_04_01"){
		v1=v.replace(/(\s*)/g,"");
		v2=document.getElementById("dzx_04_02").value;
	}else if(oid=="dzx_04_02"){
		v1=document.getElementById("dzx_04_01").value;
		v2=v.replace(/(\s*)/g,"");
	}else if(oid=="b_dzx_04_01"){
		v1=v.replace(/(\s*)/g,"");
		v2=document.getElementById("b_dzx_04_02").value;
	}else if(oid=="b_dzx_04_02"){
		v1=document.getElementById("b_dzx_04_01").value;
		v2=v.replace(/(\s*)/g,"");
	}
	v2=v2.replace(/(\s*)/g,"");
	if(v1==""&&v2==""){
		mpinfo="手机号码或固定电话至少选一个";
		wraps.html(mpinfo);
	}else if(v1==""&&v2!=""){
		if(rules.Phone.test(v2)){
			mpinfo=true;
			wraps.html("");
		}else{
			mpinfo="固定电话格式错误";
			wraps.html(mpinfo);
		}
	}else if(v1!=""&&v2==""){
		if(rules.Mobile.test(v1)){
			mpinfo=true;
			wraps.html("");
		}else{
			mpinfo="手机号码格式错误";
			wraps.html(mpinfo);
		}
	}else if(v1!=""&&v2!=""){
		if(rules.Phone.test(v2)&&!rules.Mobile.test(v1)){
			mpinfo="手机号码格式错误";
			wraps.html(mpinfo);
		}else if(!rules.Phone.test(v2)&&rules.Mobile.test(v1)){
			mpinfo="固定电话格式错误";
			wraps.html(mpinfo);
		}else if(!rules.Phone.test(v2)&&!rules.Mobile.test(v1)){
			mpinfo="手机号码和固定电话格式都错误";
			wraps.html(mpinfo);
		}else{
			mpinfo=true;
			wraps.html("");
		}
	}
	return mpinfo;
}

















