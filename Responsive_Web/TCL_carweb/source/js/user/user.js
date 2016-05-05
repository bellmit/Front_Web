$(function(){
	user.run();
});

var user = {
	run:function(){
		this._init_();
		this._bind_event_();
		this._start_();
	},
	
	_init_:function(){
		this.title = "简单测试";
	    this.contextPath = $("#contextPath").val();	
	},
	
	_bind_event_:function(){
		var me = this;
		//全选按钮增加事件
		$('#checkAll').click(function(event){
			me._checkAll();
		});
		
		//批量删除按钮添加事件
		$('#del').click(function(event){
			var url=me.contextPath+"/user/del";
			me._delete(url);
			event.preventDefault();
		});
		$("#add").click(function(){
			var url =me.contextPath+"/user/saveAdd";
			me._save(url);
		});
		
		$("#edit").click(function(){
			var url = me.contextPath+"/user/saveEdit";
			me._saveEdit(url);
		});
		
	},
	_start_:function(){
		
	},
	
	_checkAll:function(){
		var st = $("input:checked").size();
		$("input[name='ids']").attr('checked', st > 0 ? false : true);
	},
	
	
	//批量删除
	_delete:function(url){
			//得到所有被选中的复选框
			var $checked = $('#userList input[name=ids]:checkbox[checked]');
			if($checked.length<1){
				alert('请选择要删除的项！');
				return;
			}
			$.post(url,$checked.serialize(),function(response){
				if(response.success){
					alert("删除成功!");
					//window.location.href=$("#contextPath").val()+"/user/index";
					$("#search").submit();
				}else{
					alert("删除失败");
				}
			},'json');
		
		
	},
	_save:function(url){
		    var me = this;
		    var $form = $("#addForm");
			$.post(url,$form.serialize(),function(response){
				if(response.success){
					alert("增加成功!");
					window.location.href=me.contextPath+"/user/index";
				}else{
					alert("增加失败!");
				}
			},'json');
		
		
	},
	_saveEdit:function(url){
		var me = this;
		var $form = $("#editForm");
		$.post(url,$form.serialize(),function(response){
			if(response.success){
				alert("修改成功!");
				window.location.href=me.contextPath+"/user/index";
			}else{
				alert("修改失败!");
			}
		},'json');
	}
	
};