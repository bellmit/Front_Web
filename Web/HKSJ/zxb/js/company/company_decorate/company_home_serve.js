define(['jquery'],function($){
	return {
			//设计师请求
			_handler_design:function(opt){
					var listdata=[],
							htmlstr='',
							resultset=[];
							
					$.ajax({
							url:'../../../json/company_stylist.json',
							dataType:"json",
							data:'id='+opt.id,
							type:'get',
							async:false,
							success: function(result){
									if(result.total!=0){
										listdata=result.companyList;
										opt.total=result.total;
									}else{
										opt.listwrap.html('');
										listdata.length=0;
									}
							},
							error:function(){
									opt.listwrap.html('');
									listdata.length=0;
							}
					});
					
					//填充模板
					var i=0,
							len=listdata.length;
					if(len===0){
							opt.listwrap.html('<div class="shejishi-title"><h3>设计师<span>('+opt.total+')</span></h3><a href="company_stylist.html">更多></a></div>');
							return false;
					}
					len>3?len=3:len;
					resultset.push('<div class="shejishi-title"><h3>设计师<span>('+opt.total+')</span></h3><a href="company_stylist.html">更多></a></div>');
					for(i;i<len;i++){
						htmlstr=opt.template;
						resultset.push(htmlstr.replace('$href',listdata[i]['href'])
						.replace('$url',listdata[i]['url'])
						.replace('$desName',listdata[i]['desName'])
						.replace('$designExperience',listdata[i]['designExperience'])
						.replace('$goodStyle',listdata[i]['goodStyle'])
						.replace('$imgList',function(){
									var imglist=listdata[i]['imgList'],
											sublen=imglist.length;
									if(sublen!=0){
											var str='';
											sublen=sublen>3?3:sublen;
											for(var j=0;j<sublen;j++){
												if(j==1){
													str+='<li class="img-margin"><a href="'+imglist[j]['href']+'"><img src="'+imglist[j]['url']+'" width="211" height="141" alt="" ></a></li>'
												}else{
													str+='<li><a href="'+imglist[j]['href']+'"><img src="'+imglist[j]['url']+'" width="211" height="141" alt="" ></a></li>'
												}
											}
											return str;
									}else{
										return '';
									}
							
						}));
					}
					
					var $resultset=$(resultset.join(''));
					$resultset.appendTo(opt.listwrap.html(''));
					resultset.length=0;
					return true;
			},
			//设计师方案请求
			_handler_designplan:function(opt){
					var listdata=[],
							htmlstr='',
							resultset=[];
							
					$.ajax({
							url:'../../../json/company_scheme.json',
							dataType:"json",
							data:'id='+opt.id,
							type:'get',
							async:false,
							success: function(result){
									if(result.total!=0){
										listdata=result.companyList;
										opt.total=result.total;
									}else{
										opt.listwrap.html('');
										listdata.length=0;
									}
							},
							error:function(){
									opt.listwrap.html('');
									listdata.length=0;
							}
					});
					
					//填充模板
					var i=0,
							len=listdata.length;
					if(len===0){
							opt.listwrap.html('<div class="shejishi-title"><h3>设计方案<span>('+opt.total+')</span></h3><a href="company_scheme.html">更多></a></div>');
							return false;
					}
					len>4?len=4:len;
					resultset.push('<div class="shejishi-title"><h3>设计方案<span>('+opt.total+')</span></h3><a href="company_scheme.html">更多></a></div><ul>');
					for(i;i<len;i++){
						htmlstr=opt.template;
						resultset.push(htmlstr.replace(/\$href/g,listdata[i]['href'])
						.replace('$url',listdata[i]['url'])
						.replace('$desHeadPortraitUrl',listdata[i]['desHeadPortraitUrl'])
						.replace('$decName',listdata[i]['decName'])
						.replace('$desName',listdata[i]['desName']));
						if(i==len-1){
							resultset.push('</ul>');
						}
					}
					
					var $resultset=$(resultset.join(''));
					$resultset.appendTo(opt.listwrap.html(''));
					resultset.length=0;
					return true;
			},	
			//竣工实景图
			_handler_realmap:function(opt){
					var listdata=[],
							htmlstr='',
							resultset=[];
							
					$.ajax({
							url:'../../../json/company_scheme.json',
							dataType:"json",
							data:'id='+opt.id,
							type:'get',
							async:false,
							success: function(result){
									if(result.total!=0){
										listdata=result.companyList;
										opt.total=result.total;
									}else{
										opt.listwrap.html('');
										listdata.length=0;
									}
							},
							error:function(){
									opt.listwrap.html('');
									listdata.length=0;
							}
					});
					
					//填充模板
					var i=0,
							len=listdata.length;
					if(len===0){
							opt.listwrap.html('<div class="shejishi-title"><h3>竣工实景图<span>('+opt.total+')</span></h3><a href="company_complete.html">更多></a></div>');
							return false;
					}
					len>4?len=4:len;
					resultset.push('<div class="shejishi-title"><h3>竣工实景图<span>('+opt.total+')</span></h3><a href="company_complete.html">更多></a></div><div class="data-wrap"><ul>');
					for(i;i<len;i++){
						htmlstr=opt.template;
						resultset.push(htmlstr.replace(/\$id/g,listdata[i]['id'])
						.replace('$href',listdata[i]['href'])
						.replace('$url',listdata[i]['url'])
						.replace('$name',listdata[i]['name'])
						.replace('$style',listdata[i]['style'])
						.replace('$budget',listdata[i]['budget'])
						.replace('$desHeadPortraitUrl',listdata[i]['desHeadPortraitUrl'])
						.replace('$desName',listdata[i]['desName']));
						if(i==len-1){
							resultset.push('</ul></div>');
						}
					}
					
					var $resultset=$(resultset.join(''));
					$resultset.appendTo(opt.listwrap.html(''));
					resultset.length=0;
					return true;
			},
			//装修问题
			_handler_problem:function(opt){
					var listdata=[],
							htmlstr='',
							resultset=[];
							
					$.ajax({
							url:'../../../json/company_problem.json',
							dataType:"json",
							data:'id='+opt.id,
							type:'get',
							async:false,
							success: function(result){
									if(result.total!=0){
										listdata=result.companyList;
										opt.total=result.total;
									}else{
										opt.listwrap.html('');
										listdata.length=0;
									}
							},
							error:function(){
									opt.listwrap.html('');
									listdata.length=0;
							}
					});
					
					//填充模板
					var i=0,
							j=1,
							len=listdata.length;
					if(len===0){
							opt.listwrap.html('<div class="shejishi-title"><h3>装修问题<span>('+opt.total+')</span></h3><a href="#">更多></a></div>');
							return false;
					}
					len>8?len=8:len;
					resultset.push('<div class="shejishi-title"><h3>装修问题<span>('+opt.total+')</span></h3><a href="#">更多></a></div><div class="home-wenti"><ul>');
					for(i;i<len;i++){
						htmlstr=opt.template;
						resultset.push(htmlstr.replace('$href',listdata[i]['href'])
						.replace('$type',listdata[i]['type'])
						.replace('$title',(function(){
								var title=listdata[i]['title'];
								return title.length>25?title.slice(0,25)+'...':title;
						}()))
						.replace('$datetime',listdata[i]['datetime']));
						if(j%4==0&&j!=len){
							resultset.push('</ul><ul>');
						}
						if(i==len-1){
							resultset.push('</ul></div>');
						}
						j++;
					}
					
					var $resultset=$(resultset.join(''));
					$resultset.appendTo(opt.listwrap.html(''));
					resultset.length=0;
					return true;
			}
	}
	
	
	
	
	
});

