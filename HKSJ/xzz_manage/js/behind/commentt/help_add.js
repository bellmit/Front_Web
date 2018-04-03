var editor = null;
$(function(){
	 editor = CKEDITOR.replace("HELP_ANSWER", { "toolbar": "Basic" }); //显示编辑器
     CKFinder.setupCKEditor(editor, "ckfinder/"); //设置图片管理组件
     
});
//处理CKEDITOR的值
function CKupdate() {
    for (instance in CKEDITOR.instances)
        CKEDITOR.instances[instance].updateElement();
} 
//保存
function add()
{	 CKupdate(); //在提交表单前需要做以上处理
	if($("#HELP_MATTER").val().replace(/[ ]/g,"")=="")
	{
		$.messager.alert("提示","提示问题不能为空","info",function(){document.getElementById("HELP_MATTER").focus();});
		return;
	}else if($("#HELP_ANSWER").val().replace(/[ ]/g,"")==""){
		$.messager.alert("提示","提示内容不能为空","info",function(){document.getElementById("HELP_ANSWER").focus();});
		return;
	}
	else if($("#HELP_ORDERNUM").val().replace(/[ ]/g,"")==""){
		$.messager.alert("提示","提示排序号不能为空","info",function(){document.getElementById("HELP_ORDERNUM").focus();});
		return;
	}
	document.getElementById("baocunid").disabled="disabled";
//	$.post('insertHelpHt.do?HELP_ANSWER=' + escape($("#HELP_ANSWER").val()),$("#insertorupdForm").serialize(),function(result){
		$.post('insertHelpHt.do',$("#insertorupdForm").serialize(),function(result){
		if(result==1) //修改成功
		{
			window.parent.tb.load();
			parent.$('#windowDiv').window('close');
		}
		else
		{
			$.messager.alert("提示","保存失败","info");
			document.getElementById("baocunid").disabled="";
		}
	})
}