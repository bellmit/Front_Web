/*
author:yipin,
name:checkbox 
全选和取消全选服务类
*/
define(function () {
    return {
        /*保存已选中的列表值*/
        checkid: [],
				/*保存已选中的对象*/
        checkitem:[],
				/*保存已选中的类型的当前状态：比如：激活状态：1，禁止状态：0*/
				state:1,
				/*类型映射状态*/
				stateobj:{
						1:'激活',
						0:'禁止'
				},
        /*初始化清除上次被选中的input,参数：数据容器，全选checkbox，是否是在table上绑定*/
        init: function (wrap, checkall,flag) {
            this.checkid.length = 0;
						this.checkitem.length=0;
						this.state=1;
            checkall.prop('checked', false);
						if(flag){
							wrap.find('tr').each(function (index, element) {
									if (index != 0) {
											var $input = $(element).find('td:first input:checkbox');
											if(index==0&&$input.length==0){
													return false;
											}
											if ($input.is(':checked')) {
													$input.prop('checked', false);
											}
									}
							});
						}else{
							wrap.find('tr').each(function (index, element) {
									var $input = $(element).find('td:first input:checkbox');
									if(index==0&&$input.length==0){
											return false;
									}
									if ($input.is(':checked')) {
											$input.prop('checked', false);
									}
							});
						}
        },
        /*全选和取消全选，参数：全选checkbox，数据容器，批量按钮(可选参数)ckbox，是否是在table上绑定*/
        toggleCheckAll: function (checkall, wrap,btn,flag) {
            var self = this;
            if (checkall.is(':checked')) {
								if(flag){
										wrap.find('tr').each(function (index, element) {
											if(index!=0){
												var $input=$(element).find('td:first input:checkbox');
												if(index==1){
													if($input.length==0){
															self.checkid.length=0;
															self.checkitem.length=0;
															self.state=checkall.attr('data-state')||1;
															return false;
													}
													if(!$input.is(':checked')){
															self.checkid.push($input.prop('checked',true).val());
															self.checkitem.push($input);
													}
													var tempstate=$input.attr('data-state');
													self.state=tempstate?tempstate:1;
												}else{
													if(self.state==$input.attr('data-state')&&!$input.is(':checked')){
														self.checkid.push($input.prop('checked',true).val());
														self.checkitem.push($input);
													}
												}
											}
									});
								}else{
									wrap.find('tr').each(function (index, element) {
											var $input=$(element).find('td:first input:checkbox');
											if(index==0){
												if($input.length==0){
														self.checkid.length=0;
														self.checkitem.length=0;
														self.state=checkall.attr('data-state')||1;
														return false;
												}
												if(!$input.is(':checked')){
														self.checkid.push($input.prop('checked',true).val());
														self.checkitem.push($input);
												}
												var tempstate=$input.attr('data-state');
												self.state=tempstate?tempstate:1;
											}else{
												if(self.state==$input.attr('data-state')&&!$input.is(':checked')){
													self.checkid.push($input.prop('checked',true).val());
													self.checkitem.push($input);
												}
											}
									});
								}
                if(btn){
									self.state==1?btn.attr({'data-state':0}).text('批量禁止'):btn.attr({'data-state':1}).text('批量激活');
								}
            } else {
								if(flag){
									wrap.find('tr').each(function (index, element) {
											if (index != 0) {
													var $input = $(element).find('td:first input:checkbox');
													if ($input.is(':checked')) {
															$input.prop('checked', false);
													}
											}
									});
								}else{
									wrap.find('tr').each(function (index, element) {
											var $input = $(element).find('td:first input:checkbox');
											if ($input.is(':checked')) {
													$input.prop('checked', false);
											}
									});
								}
                self.checkid.length=0;
								self.checkitem.length=0;
								self.state=1;
								if(btn){
									btn.attr({'data-state':0}).text('批量禁止');
								}
            }
        },
        /*选中某个单独多选框，参数：单个checkbox，全选checkbox，批量按钮(可选参数)*/
        inputCheck: function (checkbox, checkall,btn) {
            var self = this,
								len = this.checkid.length,
								ishave = -1,
								text = checkbox.val();
            if (checkbox.is(':checked')) {
                if (len == 0) {
                    this.checkid.push(text);
										this.checkitem.push(checkbox);
										var tempstate=checkbox.attr('data-state');
										this.state=tempstate?tempstate:1;
										if(this.state==1&&btn){
													btn.attr({'data-state':0}).text('批量禁止');
										}else if(!this.state==1&&btn){
													btn.attr({'data-state':1}).text('批量激活');
										}
										if(!checkall.is(':checked')){
											checkall.prop('checked',true);
										}
                } else {
										var tempstate=checkbox.attr('data-state');
                    if(this.state==tempstate&&tempstate){
											ishave=$.inArray(text,self.checkid);
											if(ishave!=-1){
												this.checkid.splice(ishave,1,text);
												this.checkitem.splice(ishave,1,checkbox);
											}else{
												this.checkid.push(text);
												this.checkitem.push(checkbox);
											}
										}else{
											checkbox.prop('checked',false);
										}
                }
            } else {
                ishave=$.inArray(text,self.checkid);
								if(ishave!=-1){
									this.checkid.splice(ishave,1);
									this.checkitem.splice(ishave,1);
									if(this.checkid.length==0&&checkall.is(':checked')){
										checkall.prop('checked',false);
									}
									if(this.checkid.length==0){
										this.state=1;
										this.checkitem.length=0;
										if(btn){
												btn.attr({'data-state':0}).text('批量禁止');
										}
									}
								}
            }
        },
		/*返回选中的数据*/
		getCheckBox:function(){
			return this.checkid;
		},
		/*返回选中的node对象*/
		getCheckBoxItem:function(){
			return this.checkitem;
		}
    }
});