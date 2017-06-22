/*datepicker 97时间日期服务*/
angular.module('app')
	.service('datePicker97Service',function () {
		/*初始化配置*/
		var self=this,
			isdate=WdatePicker && typeof WdatePicker==='function';


		/*单项调用*/
		this.datePicker=function (config) {
			if(!config){
				return false;
			}
            var model=config.model,
                fn=config.fn;
			if(isdate){
				WdatePicker({
					onpicked:function(dp){
                        if(fn && typeof fn==='function'){
                            fn.call(null,{
                                $node1:dp.cal.getNewDateStr()
                            });
                        }else{
                            if(model){
                                model.dateTime=dp.cal.getNewDateStr();
                            }else{
                                config.$node1.val(dp.cal.getNewDateStr());
                            }
                        }
					},
					oncleared:function () {
                        if(fn && typeof fn==='function'){
                            fn.call(null,{
                                $node2:''
                            });
                        }else{
                            if(model){
                                model.dateTime='';
                            }else{
                                config.$node1.val('');
                            }
                        }
					},
					maxDate:model.dateTime===''?moment().format('YYYY-MM-DD'):config.format?config.format:'%y-%M-%d',
					position:config.position?config.position:{left:0,top:2}
				});
			}
		};


		/*联合调用*/
		this.datePickerRange=function (config) {
			if(!isdate){
				return false;
			}
			if(!config){
				return false;
			}
            var model=config.model,
                fn=config.fn;
			$.each([config.$node1,config.$node2],function (index) {
				this.on('click',function () {
					if(index===0){
						 WdatePicker({
							 onpicked:function(dp){
                                 if(fn && typeof fn==='function'){
                                     fn.call(null,{
                                         $node1:dp.cal.getNewDateStr()
                                     });
                                 }else{
                                     if(model){
                                         model.startTime=dp.cal.getNewDateStr();
                                     }else{
                                         config.$node1.val(dp.cal.getNewDateStr());
                                     }
                                 }
							 },
							 oncleared:function () {
                                 if(fn && typeof fn==='function'){
                                     fn.call(null,{
                                         $node2:''
                                     });
                                 }else{
                                     if(model){
                                         model.startTime='';
                                     }else{
                                         config.$node1.val('');
                                     }
                                 }
							 },
							 maxDate:model?model.endTime==='':config.$node1.val()===''?moment().format('YYYY-MM-DD'):'#F{$dp.$D(\''+config.$node2.selector.slice(1)+'\')}',
							 position:config.position?config.position:{left:0,top:2}
						 });
					 }else if(index===1){
						 WdatePicker({
							 onpicked:function(dp){
                                 if(fn && typeof fn==='function'){
                                     fn.call(null,{
                                         $node2:dp.cal.getNewDateStr()
                                     });
                                 }else{
                                     if(model){
                                         model.endTime=dp.cal.getNewDateStr();
                                     }else{
                                         config.$node2.val(dp.cal.getNewDateStr());
                                     }
                                 }
							 },
							 oncleared:function () {
                                 if(fn && typeof fn==='function'){
                                     fn.call(null,{
                                         $node2:''
                                     });
                                 }else{
                                     if(model){
                                         model.endTime='';
                                     }else{
                                         config.$node2.val('');
                                     }
                                 }
							 },
							 minDate:model?model.startTime==='':config.$node2.val()===''?moment().format('YYYY-MM-DD'):'#F{$dp.$D(\''+config.$node1.selector.slice(1)+'\')}',
							 maxDate:config.format?config.format:'%y-%M-%d',
							 position:config.position?config.position:{left:0,top:2}
						 });
					 }

				});
			});
		};
	});
