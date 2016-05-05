(function($,w){
	
		//配置信息
		$.ValidatorSet={
					isrule:false,//是否有验证规则
					isvalided:false,//是否验证通过
					isallvalid:true,//是否需要全部校验
					isajax:false,//是否是ajax方式
					validresult:{},//校验结果集
					validlen:0,//规则长度
					successtip:'校验成功',//校验成功提示语
					errortip:'您输入的信息不正确',//失败提示语
					validtypes:(function(){
						///初始化表单类型
						var ttype='text,search,number,password,textarea,email,hidden,file,radio,checkbox'.split(','),
						i=0;
						len=ttype.length;
						tobj={};
						for(i;i<len;i++){
								tobj[ttype[i]]=ttype[i];
						}
						return tobj;
					}())
		}
		
		
		//设置配置信息
		$.setValidtorSet=function(objs){
				var vs=$.ValidatorSet;
				vs.isrule=objs.isrule?objs.isrule:false;
				vs.isvalided=objs.isvalided?objs.isvalided:false;
				vs.isallvalid=objs.isallvalid?objs.isallvalid:false;
				vs.isajax=objs.isajax?objs.isajax:false;
				vs.validresult=$.isPlainObject(objs.validresult)?objs.validresult:{};
				vs.validlen=objs.isrule?objs.isrule:false;
				vs.successtip=objs.successtip?objs.successtip:vs.successtip;
				vs.errortip=objs.errortip?objs.errortip:vs.errortip;
		}
		
		
		///核心校验器
		$.Validator=function($form,objs){
				var conf=$.ValidatorSet;
				var kk=0,
						len=objs.length;
				if(len==0){
					$.resetResult(conf);
					return;
				}else{
					conf.isrule=true;
					conf.validlen=len;
				}
				outerloop:for(kk;kk<len;kk++){
						var tobj=objs[kk],
						selector=tobj[0].selector,
						$selector,
						type,
						txt,
						temp_selector='';

						if(selector==''||typeof selector=='undefined'){
								continue outerloop;
						}
						if(typeof selector=='object'){

							$selector=selector;
							selector='valid_'+$selector.attr('name');
						}else{
							$selector=$(selector);
						}
						type=$selector.attr('type');
						if(!conf.validtypes.hasOwnProperty(type)){
						 	temp_selector=$selector.get(0).nodeName.toLowerCase();
						}
						var j=0,templen=tobj.length,m=1;
						innerloop:for(j;j<templen;j++){
								if(j==0){
									continue innerloop;
								}											
								if(tobj[j].hasOwnProperty('require')){
										if(type=='radio'||type=='checkbox'||temp_selector=='select'){
												var tempchk=0;
												if(temp_selector=='select'){
													$selector.find('option').each(function(){
														var $tempthis=$(this);
														if($tempthis.prop('selected')){
															if(tobj[j].hasOwnProperty('selfrule')){
																if(tobj[j]['selfrule']($tempthis)){
																	tempchk=1;
																	return false;
																}else{
																	tempchk=0;
																	return false;
																}
															}else{
																tempchk=1;
																return false;
															}
														};
													});
												}else{
													$selector.each(function(){
														var $tempthis=$(this);
														if($tempthis.prop('checked')){
																if(tobj[j].hasOwnProperty('selfrule')){
																	if(tobj[j]['selfrule']($tempthis)){
																		tempchk=1;
																		return false;
																	}else{
																		tempchk=0;
																		return false;
																	}
																}else{
																	tempchk=1;
																	return false;
																}
														};
													});
												}
												if(tempchk==0){
													conf.validresult[selector]=false;
												}else if(tempchk==1){
													conf.validresult[selector]=true;
												}
										}else if(conf.validtypes.hasOwnProperty(type)&&(type!='radio'||type!='checkbox')){
												if(tobj[j]['require']($selector.val())){
														conf.validresult[selector]=false;
												}else{
														conf.validresult[selector]=true;
												}
										}
								}else if(tobj[j].hasOwnProperty('rule')&&conf.validtypes.hasOwnProperty(type)&&(type!='radio'||type!='checkbox')){
											if(tobj[j]['rule']($selector.val())){
												//修改测试结果集
												conf.validresult[selector]=true;
											}else{
												conf.validresult[selector]=false;
											}																						
								}
								if(conf.validresult[selector]){
									//提示信息
									$.validTips({
										$selector:$selector,
										tip:tobj[j]['yes'],
										flag:true
									},typeof tobj[j]['selfTip']==='function'?tobj[j]['selfTip']:'');
									m++;
									if(m==templen){
											continue outerloop;
									}else{
											continue innerloop;
									}
								}else{
									//提示信息
									$.validTips({
										$selector:$selector,
										tip:tobj[j]['no'],
										flag:false
									},typeof tobj[j]['selfTip']==='function'?tobj[j]['selfTip']:'');
									break;
								}
						}		
				}
				var counts=0;
				for(var f in conf.validresult){
						if(conf.validresult[f]){
								counts++;
						}
				}
				counts==conf.validlen?conf.isvalided=true:conf.isvalided=false;
				if(conf.isvalided){
					$.ValidCallBack(conf.isajax);
				}
		};
		
		
		///*校验提示信息
		$.validTips=function (obj,fn){
				var $current=obj.$selector,
						$tipwrap,
						tip=obj.tip,
						flag=obj.flag;
				if(fn==''||!fn){
						//默认提示方式
						flag?$current.removeClass('Validform_error'):$current.addClass('Validform_error');
						$tipwrap=$current.parent().next();
						$tipwrap.html(tip);
				}else{
						//自定义提示方式
						fn(tip);
				}
		};
		///*重置校验结果数据
		$.resetResult=function(conf){
				conf.isrule=false;
				conf.isvalided=false;
				conf.validresult={};
				conf.validlen=0;
		};
})(Zepto,window);