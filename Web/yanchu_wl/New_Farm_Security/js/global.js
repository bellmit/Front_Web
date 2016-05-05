// JavaScript Document
/*延时隐藏图标*/
function hiddenicon(){
	var yid=document.getElementById("useridy");
	var nid=document.getElementById("useridn");
	var yidf=document.getElementById("passwordy");
	var nidf=document.getElementById("passwordn");
	yid.innerHTML="";
	nid.innerHTML="";
	yidf.innerHTML="";
	nidf.innerHTML="";
	}
/*验证身份证*/
function validsuserid(id){
var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
	var yid=document.getElementById("useridy");
	var nid=document.getElementById("useridn");
	var len=id.value.replace(/\s+/g,"").length;
	if(id.value=="")
		{
		yid.innerHTML="";
		nid.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		alert("身份证号码不能为空!");
		setTimeout(hiddenicon,1000);
		return false;
		}
	if(len==15||len==18)
		{
		if(area[parseInt(id.value.substr(0,2))]==null)
			{	
					yid.innerHTML="";
					nid.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
					alert("输入的身份证地区不正确!");
					setTimeout(hiddenicon,1000);
					return false;		
			}
		if(len==15)
			{
				if(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(id.value))
				{
							nid.innerHTML="";
							yid.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
							alert("输入的15位身份证号码正确!");
							setTimeout(hiddenicon,1000);
							return true;
				}else
				{
							yid.innerHTML="";
							nid.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
							alert("输入的15位身份证号码有错误!");
							setTimeout(hiddenicon,1000);
							return false;
				}
			}
		if(len==18)
			{
				if(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(id.value))
				{
							nid.innerHTML="";
							yid.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
							alert("输入的18位身份证号码正确!");
							setTimeout(hiddenicon,1000);
							return true;
				}else
				{
							yid.innerHTML="";
							nid.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
							alert("输入的18位身份证号码有错误!");
							setTimeout(hiddenicon,1000);
							return false;
				}
			}
		}else{
			yid.innerHTML="";
			nid.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			alert("请输入15位或者18位的身份证号码!");
			setTimeout(hiddenicon,1000);
			return false;
			}
}
/*验证密码*/
function validspassword(id){
	var yid=document.getElementById("passwordy");
	var nid=document.getElementById("passwordn");
	var pd=id.value;
	if(pd==""){
		nid.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		yid.innerHTML="";
		alert("密码不能为空");
		setTimeout(hiddenicon,1000);
		return false;
		}
	if(pd.length<6){
		nid.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		yid.innerHTML="";
		alert("密码不能小于6位");
		setTimeout(hiddenicon,1000);
		return false;
		}
	nid.innerHTML="";
	yid.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	setTimeout(hiddenicon,1000);
	return true;
}










