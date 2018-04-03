define('common',function(require){
		var $=require('jquery');
		
		//菜单初始化
		(function(){
				var $mainmenu=$('#mainmenu'),
				$submenu=$('#submenu'),
				winpath=window.location.pathname.split('/'),
				i=0,
				parts=[],
				pages=[],
				len=winpath.length,
				part='',
				current='',
				$mainitem=$mainmenu.find('li'),
				$subitem=$submenu.find('a'),
				itemsize=$mainitem.length;
				subsize=$subitem.length,
				subhref='false';
				//主导航
				if(len!=0){
					for(i;i<len;i++){
							if(winpath[i]==''){
									winpath.splice(i,1);
									len=winpath.length;
							}
							if(winpath[i].indexOf('.')!=-1){
									current=winpath[i];
									winpath.splice(i,1);
									len=winpath.length;
							}
					}
					part=winpath[len-1];
					$mainitem.each(function(index, element) {
							var $this=$(this),
									$a=$this.find('a'),
									data_part=$a.attr('data-part');
									if(data_part==part){
											$this.addClass('active');
											return false;
									}
									data_part==undefined?parts.push(0):parts.push(data_part);
					});
					if(parts.length==itemsize&&$.inArray(parts)==-1){
							$mainitem.eq(0).addClass('active');
					}
					//子导航
					$subitem.each(function(index, element) {
							var $this=$(this),
							href=$this.attr('href');
							subhref=$this.attr('data-href')||'false';
							if(subhref=='true'){
									$this.addClass('submenusel');
									return true;
							}
							if(href.indexOf('/')!=-1){
								href=href.split('/');
								href=href[href.length-1];
							}
							pages.push(href);
							if(href!=''&&href==current){
								pages.pop();
								$this.addClass('submenusel');
								return false;
							}
          });
					if(pages.length==subsize&&subhref=='false'){
						$subitem.eq(0).addClass('submenusel');
					}
				}else{
					part='';
					$mainitem.eq(0).addClass('active');
					$subitem.eq(0).addClass('submenusel');
				}
		}());
		
		//to do others
		
		return;
});







