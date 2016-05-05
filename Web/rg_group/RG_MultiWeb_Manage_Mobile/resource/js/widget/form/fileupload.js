/***
name:file upload plugin
author:yipin
表单文件上传组件
***/
(function($,w){
		$.fn.fileupload=function(objs,fn){
				var param=objs,
						type,
						pattern,
						realdata,
						needdata;
				param.size=param.size*1024;
				if(param.type==''){
						type='png|jpg|jpeg|gif';
				}else if(param.type.indexOf(',')){
						type=param.type.replace(/,/g,'|');
				}else{
						type=param.type;
				}
				pattern=new RegExp('^image\/('+type+')$');
				
				
				//绑定点击事件
				this.on('change',function(){
						var filearr=this.files[0];
						if(typeof param.maxCount=='function'&&param.maxCount&&param.maxCount()){
								return false;
						}
						if(!pattern.test(filearr.type)){
							$.modal({
								content:'只能上传'+param.type+'格式图片',
								okfn:function(){}
							},1);
							return false;
						}
						if(filearr.size>param.size){
							realdata=(filearr.size/1024).toString();
							needdata=(param.size/1024).toString();
							if(realdata.indexOf('.')==-1){
								realdata=realdata+'.00';
							}
							realdata=realdata.split('.');
							if(needdata.indexOf('.')==-1){
								needdata=needdata+'.00';
							}
							needdata=needdata.split('.');
							$.modal({
								content:'上传的图片太大(' + realdata[0]+'.'+realdata[1].slice(0,2)+'kb),需小于' + needdata[0]+'.'+needdata[1].slice(0,2) + 'kb',
								okfn:function(){}
							},1);
							return false;
						}
						var reader = new FileReader();
						reader.readAsDataURL(filearr);
						//执行回调
						reader.onload =function(){return fn(filearr,this);};	
				});
				return this;
		}
})(Zepto,window);