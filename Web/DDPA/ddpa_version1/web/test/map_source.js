(function($){
	$(function(){
		/*初始化数据*/
		var dataColorObj={0:{colors:"#e5bfb8"},1:{colors:"#fee5d9"},2:{colors:"#fcae91"},3:{colors:"#fb6a4a"},4:{colors:"#cb181d"},5:{colors:"#c51016"}};
		var lr_LoanNumber={"澳门":0,"香港":60,"台湾":0,"广东":800,"广西":20,"海南":0,"云南":0,"福建":0,"江西":0,"湖南":0,"贵州":0,"浙江":40,"安徽":0,"上海":50,"江苏":0,"湖北":0,"西藏":0,"青海":0,"甘肃":0,"新疆":0,"陕西":0,"河南":0,"山西":0,"山东":0,"河北":0,"天津":0,"北京":30,"宁夏":0,"内蒙古":0,"辽宁":0,"吉林":0,"黑龙江":0,"重庆":0,"四川":45};
		/*初始化排行*/
		lr_Top(5,lr_LoanNumber);
		/*初始化地图*/
		lr_MapInit(lr_LoanNumber,dataColorObj);
		/*初始化数据绑定*/
		lr_DataAction();
	});
})(jQuery);
/*根据数据获取颜色*/
function lr_NumToColor(nobjs,names,cobj){
	var nums=nobjs[names];
	var num_rule=0;
	if(nums==0){
		num_rule=0;
	}else if(nums>=1&&nums<7){
		num_rule=1;
	}else if(nums>=7&&nums<21){
		num_rule=2;
	}else if(nums>=21&&nums<43){
		num_rule=3;
	}else if(nums>=43&&nums<564){
		num_rule=4;
	}else{
		num_rule=5;
	}
	return cobj[num_rule].colors;
}
/*比较数据大小*/
function lr_Top(counts,objs){
	var topnum=counts,topobj=objs,i=0,topres="";
	var toparr=[];
	for(var lr_key in topobj){
		toparr.push(topobj[lr_key]+","+lr_key);
	}
	toparr.sort();
	toparr.reverse();
	toparr.slice(0,topnum);
	for(i=0;i<topnum;i++){
		var tempres=toparr[i].split(",");
		topres+="<li><p>"+tempres[1]+"</p><div>"+tempres[0]+"人</div></li>";
	}
	$("#lr_maptop").html(topres);
}
/*初始化地图*/
function lr_MapInit(nobjs,cobjs) {
    $("#map").html("");
    Raphael.getColor.reset();
	var R = Raphael("map",650,500);
    var current = null;
    var textAttr = {"fill":"#000","font-size":"12px","cursor":"pointer","font-family":"微软雅黑"};
    lr_PaintMap(R);
	var lr_tiptitle = $("#lr_tiptitle");
    for(var state in china) {
        china[state]['path'].color="#eee";
        china[state]['path'].transform("t30,0");
        (function (st, state){
			var xx = st.getBBox().x + (st.getBBox().width / 2);
            var yy = st.getBBox().y + (st.getBBox().height / 2);
			var tempname=china[state]['name'];
			st.attr({fill:lr_NumToColor(nobjs,tempname,cobjs)});
			/*修正文字定位*/
            switch (tempname){
                case "江苏":
                    xx += 5;
                    yy -=0;
                    break;
                case "河北":
                    xx -= 10;
                    yy += 20;
                    break;
                case "天津":
                    xx += 20;
                    yy += 10;
                    break;
                case "上海":
                    xx += 20;
                    break;
                case "广东":
                    yy -= 10;
                    break;
                case "澳门":
                    yy += 10;
                    break;
                case "香港":
                    xx += 20;
                    yy += 5;
                    break;
                case "甘肃":
                    xx -= 40;
                    yy -= 30;
                    break;
                case "陕西":
                    xx += 5;
                    yy += 20;
                    break;
                case "内蒙古":
                    xx -= 15;
                    yy += 65;
                    break;
				case "江西":
                    xx -= 10;
                    yy +=0;
                    break;
            }
            china[state]['text']=R.text(xx,yy,tempname).attr(textAttr).click(function(){
                lr_ClickMap();
            }).hover(function(){
                var $sl = $("#topList").find("[title='" + tempname + "']:not([select])");
                $sl.css({"font-size":"14px"});
            },function(){
                var $sl = $("#topList").find("[title='" + tempname+ "']:not([select])");
                $sl.css({"font-size":"18px"});
            });
            //移入事件,显示信息
            $(st[0]).css({"cursor":"pointer"}).click(function (e) {
                lr_ClickMap();
            }).hover(function(e){
                var _ST = this;
                var $sl = $("#topList").find("[title='" + tempname+ "']:not([select])");
                if (e.type =="mouseenter") {
                    lr_tiptitle.html(tempname).next().find("p").html(nobjs[tempname]).parent().parent().css({"display":"block",'top': (e.pageY-180)+'px','left':(e.pageX-500)+'px'});
                }else{
					lr_tiptitle.parent().hide().stop();
                }
            });
			/*选择省市*/
            function lr_ClickMap(){
				/*如果点击的是已选中状态，则不做任何操作*/
                if (current == state){return;}
				/*取消选择后恢复默认*/
                current && china[current]['path'].animate({transform:"t30,0",fill:china[current]['isClick']?china[current]['path'].color:lr_NumToColor(nobjs,current,cobjs),stroke:"#fff"},500);
                current = state;
				/*选中高亮*/
                china[state]['path'].animate({transform:"t30,-2 s1.1 1.1",fill:china[state]['path'].color=lr_NumToColor(nobjs,state,cobjs),stroke:"#fff"},500);
                st.toFront();
                R.safari();
                china[current]['text'].toFront();
				/*不存在地图对象情况*/
                if(china[current]===undefined||china[current] =="undefined"){return;}
            }
        })(china[state]['path'],state);
    }
}
/*绑定数据并交互数据*/
function lr_DataAction() {
    /*
	to do
	*/
}
