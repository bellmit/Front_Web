/*login*/
(function($){
	'use strict';
	$(function(){

		/*dom引用*/
		var $admin_role_wrap=$('#admin_role_wrap'),
			datalist=null,
			table=null,
			dia=dialog({
				title:'温馨提示',
				cancel: false,
				okValue:'确定',
				width:300,
				ok:function(){
					this.close();
					return false;
				}
			}),
			$promise= $.Deferred.promise(),
			dataConfig={
				list:datalist,
				table:table,
				wrap:$admin_role_wrap
			};


		//初始化请求
		$promise
		.ajax({
			url: "../../json/admin/admin_role.json",
			method: 'POST',
			dataType: 'json'
		})
		.then(function (resp,dataConfig) {
			datalistSuccess(resp,dataConfig);
		})
		.then(function(resp){
			dataListFail(resp);
		});


		/*事件绑定*/
		/*搬到修改与删除*/
		$admin_role_wrap.delegate('span','click',function(e){
			e.stopPropagation();
			var target= e.target,
				$this;

			if(target.className.indexOf('btn')!==-1){
				$this=$(target);
			}else{
				$this=$(target).parent();
			}

			var id=$this.attr('data-id'),
				type=$this.attr('data-type'),
				action=$this.attr('data-action'),
				$cbx=$this.closest('tr').find('td:first-child input');

			if(!$cbx.is(':checked')){
				dia.content('<span class="g-c-warn g-btips-warn">请选中数据</span>').showModal();
			}else{


			}



		});





	});


	/*异步查询数据*/
	function getDataList(obj){

	}
	/*处理成功*/
	function datalistSuccess(resp,obj){
		if(resp.flag){
			var list=obj.list;
			list=resp.datalist.slice(0);
			if(list!==null){
				/*
				 * 初始化表格数据
				 * */
				obj.table=obj.wrap.dataTable({
					deferRender:true,
					data:list,
					columns: [
						{"defaultContent":'<input type="checkbox" name="role" class="cbr">'},
						{ "data": 'name' },
						{ "data": 'remark' },
						{ "data":'btn',
							"render":function(data, type, full, meta ){
								var id=full.btn.id,
									types=parseInt(full.btn.type,10),
									btns='';

								if(types===1){
									//超级管理员角色
									btns='<span data-id="'+id+'" data-type="'+types+'" data-action="update" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
								<i class="fa-pencil"></i>\
								<span>修改</span>\
								</span>';
								}else if(types===2||types===3){
									//普通管理员角色
									btns='<span data-id="'+id+'" data-type="'+types+'" data-action="update" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa fa-pencil"></i>\
											<span>修改</span>\
											</span>\
											<a href="member.html#data-id='+id+'&data-type='+types+'" data-id="'+id+'" data-type="'+types+'" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-group"></i>\
											<span>成员</span>\
											</a>\
											<a href="power.html#data-id='+id+'&data-type='+types+'" data-id="'+id+'" data-type="'+types+'"  class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-gear"></i>\
											<span>权限</span>\
											</a>\
											<span  data-id="'+id+'" data-type="'+types+'" data-action="delete" class="btn btn-white btn-icon btn-xs g-br2 g-c-gray8">\
											<i class="fa-trash"></i>\
											<span>删除</span>\
											</span>';
								}else{
									//其他角色
								}
								return btns;
							}
						}
					],
					aLengthMenu: [
						[10,20,50],
						[10,20,50]
					]
				});
			}
		}
	}
	/*处理失败*/
	function dataListFail(resp){
		if(!resp.flag&&resp.message){
			console.log(resp.message);
		}else{
			console.log('获取数据失败');
		}
	}





})(jQuery);