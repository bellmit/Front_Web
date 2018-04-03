function shown()
{
    var TypeID;
    TypeID = request("TypeID");
    if(TypeID != "")
    {
        
    }
}
function request(paras)
{
    //获取URL
    var url = location.href;
    //截取字符串
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
    var paraObj = {} 
    for (i=0; j=paraString[i]; i++)
    { 
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
    } 
    var returnValue = paraObj[paras.toLowerCase()]; 
    if(typeof(returnValue)=="undefined")
    { 
        return ""; 
    }
    else
    { 
        return returnValue; 
    } 
} 


$(document).ready(function(){
						   $(".n ul li even").css("background","#ccc");
						   
						   
						   
						   
						   
						   
						   })














