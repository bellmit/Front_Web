$(function(){
	var photoForm = $("#photoForm");
	/*valid user_ico*/
	photoForm.validate({
		rules : {
			'file' : {
				required:true				
			}
		},
		messages : {
			'file' : {
				required:"上传文件不能为空"
			}
		},
		success : function() {
		},
		invalidHandler : function() {
			return false;
		}
	});
	
})