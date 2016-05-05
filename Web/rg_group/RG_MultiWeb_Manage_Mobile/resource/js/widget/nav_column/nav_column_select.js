/***
name:phonemobile select
author:yipin
下拉框中选择文章列表(单篇文章)或一键拨号时相关处理
***/
(function($,w){
		//(类方法)
		$.PhoneSelect=function(obj){
				var value=obj.value,
					arr=obj.arr,
					phonerules=obj.phonerules,
					selectrules=obj.selectrules,
					node1=obj.node1,
					node2=obj.node2,
					node3=obj.node3,
					node4=obj.node4;
				
	
				if(value.indexOf('拨号')!=-1){
					arr.splice(4,1,phonerules);
					node1.hide().children().removeClass('Validform_error');
					node2.hide().html('');
					node3.show();
					node4.show();
				}else if(value.indexOf('文章')!=-1){
					arr.splice(4,1,selectrules);
					node1.show();
					node2.show();
					node3.hide().children().removeClass('Validform_error');
					node4.hide().html('');
				}
		}
		//对象方法
		$.fn.phoneSelect=function(obj){
				this.find('option').each(function(){
					var $this=$(this),
						selected=$this.prop('selected');
						if(selected){
							obj.value=$this.html();
							$.PhoneSelect(obj);
							return false;
						}
				}).end().on('change',function(){	
						var $this=$(this);
								$option=$this.find('option').not(function(){ return !this.selected });
								obj.value=$option.html();
								$.PhoneSelect(obj);
				})

			return this;
		}
})(Zepto,window);