/*
author:yipin,
name:sort 
数据展现排序
*/
define(function (){
    return {
        /*保存已选中排序状态值*/
				sortcount:0,
				/*保存已选中排序参数*/
        sortobj:{
					orderby:'',
					states:''
				},
        /*排序状态切换*/
        toggleSort: function (selector) {
            if(selector.hasClass('issort')){
								this.sortcount++;
								this.sortobj.orderby=selector.attr('data-sort');
								if(this.sortcount==1){
									//默认
									selector.removeClass('sortasc sortdesc').siblings('.issort').removeClass('sortasc sortdesc');
									this.sortobj.states='';
								}else if(this.sortcount==2){
									//升序
									selector.removeClass('sortdesc').addClass('sortasc').siblings('.issort').removeClass('sortasc sortdesc');
									this.sortobj.states='asc';
								}else if(this.sortcount==3){
									//降序
									selector.removeClass('sortasc').addClass('sortdesc').siblings('.issort').removeClass('sortasc sortdesc');
									this.sortobj.states='desc';
									this.sortcount=0;
								}
						}   
        },
				/*返回排序参数*/
				getSortValue:function(){
					return this.sortobj;
				}
    }
});