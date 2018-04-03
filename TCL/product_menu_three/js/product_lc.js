function check_brand() {
    var $input_brand = $('input[name="brand"]');
    var $checked = $input_brand.filter(":checked");
    var chk_value = [];
    var html;
    if ($checked.length < $input_brand.length && $checked.length>0) {
        //是否选择全部品牌
        $checked.each(function () {
            var item_html = '<span data-type="brand" data-bid="'+$(this).attr("data-bid")+'"><b >' + $(this).val() + '</b><a href="#" class="ico-close">x</a></span>';
            chk_value.push(item_html);
        });
        html = chk_value.join("")
    }else if($checked.length==0){
    	return "";
    }else{
        html = '<span data-type="brand" data-bid="all"><b>全部</b><a href="#" class="ico-close">x</a></span>';
    }
    return html;
}
//检查所里有的搜索项
function checkAllSearch(){
	var $options=$("span.options");
	if($options.length>0){
		return true;
	}else{
		return false;
	}
}
//得到已选择的品牌id
function getBrandids(){
	var $brand=$("#pinpai");
	if($brand.length>0){
		var brandids=new Array();
		$brand.children("span").each(function(){
			brandids.push($(this).attr("data-bid"));
		});
		return brandids;
	}else{
		return false;
	}
}
//得到参数，组合成url
function getUrl(url){
	var $car=$("#qiche");
	if($car.length>0){
		url+="&carid="+$car.attr("data-carid");
	}
	var $cartype=$("#chexing");
	if($cartype.length>0){
		url+="&cartypeid="+$cartype.attr("data-cartypeid");
	}
	var brandids=getBrandids();
	if(brandids){
		brandids=brandids.join("-");
		url+="&brandid="+brandids;
	}
	var keywords=$("#kewords").val();
	if(keywords.replace(/(^\s*)|(\s*$)/g, "")!=""&&!$("#kewords").hasClass("placeholder")){
		url+="&keywords="+encodeURIComponent(keywords);
	}
	return url;
}
function haveProductUl(){
	if($("div.product-list").length==0){
		$("div.product-details").remove();
		var ul='<div class="product-list ui-box"><h3 class="title">推荐机型</h3>';
		ul+='<ul id="productlist" class="fn-clear"></ul><div class="no-pages"></div></div>';
		$("div.search-box").after(ul);
	}
}
function getProductList(){
	haveProductUl();
	var url="/product/index/getproductlist?initial=0";
	url=getUrl(url);
	$.getJSON(url,function(msg){
		if(msg.success){
			var html="";
			var product=msg.data;
			if(product.length==0){
				html="没有符合条件的产品";
				$("#productlist").html(html);
				return false;
			}
			$("#productlist").html("");
			for(var i=0;i<product.length;i++){
				html="";
				html+='<li><div class="product-item">';
				html+='<a href="/product/'+product[i].id+'/summary.html" class="img-cnt"><img src="'+product[i].listimg+'" alt="'+product[i].name+'" width="220" height="185"></a>';
				html+='<p><a href="/product/'+product[i].id+'/summary.html">'+product[i].name.substring(0,28)+'</a></p>'
				html+='</div></li>';
				$("#productlist").append(html);
			}
			if(i==1){//处理ie的怪问题
				$("#productlist").addClass("show");
				$("#productlist").removeClass("show");
			}
		}
	});
}
function getPageHtml(){
	var url="/product/index/getpagehtml?initial=0";
	url=getUrl(url);
	$.getJSON(url,function(msg){
		if(msg.success){
			$("div.no-pages").html(msg.data);
		}
	});
}
function getCartypeList(carid){
	var url="/product/index/getcartypelist?carid="+carid;
	$.getJSON(url,function(msg){
		if(msg.success){
			var html="";
			var cartype=msg.data;
			for(var i=0;i<cartype.length;i++){
				if(i==0){
					html+='<li class="first">';
				}else{
					html+='<li>';
				}
				html+='<a href="#" data-cartypeid="'+cartype[i].id+'">'+cartype[i].name+'</a>';
				html+='</li>';
			}
			$("#cartypelist").html(html);
		}
	});
}
$(function () {
    // Stuff to do as soon as the DOM is ready;
    $("#productlist").find('div.product-item').live(
       { mouseenter:function(){
     
     
     
       $(this).addClass("item-hover");

       },
       mouseleave:function(){
  
     
       $(this).removeClass("item-hover");

       }
    


    })
    $("a.ico-close").live('click', function () {
        var $this = $(this);
        var $p=$this.parent('span');
        if($p.attr("data-type")=="brand"){
        	var bid=$p.attr("data-bid");
        	$('input[name="brand"]').each(function(){
        		if(bid=="all"){
        			$(this).attr("checked",false);
        		}else if($(this).attr("data-bid")==bid){
        			$(this).attr("checked",false);
        			return false;
        		}
        	});
        	$p.remove();
        	if($("span.last span").length==0){
        		$("span.last").remove();
        	}
        }else{
        	$p.remove();
        }
        if(!checkAllSearch()){
    		$("#search-result").remove();
    		$("div.search-notes").prepend('<div class="txt-info  search-tips" id="search-tips">Hi，您好，请选择您感兴趣的车载导航产品！</div>');
    	}
        getProductList();
        getPageHtml();
        return false;
    });
    $('#advance-search li a').live('click',function () {
        var $this = $(this);
        var info = $this.text();
        var info_class = $this.closest('ul.filter-cnt').attr('data-info');
        if(!checkAllSearch()){
         	$("#search-tips").remove();
     		$("div.search-notes").prepend('<div class="txt-info" id="search-result"><em>已选条件：</em></div>');
         }
        if(info_class=="qiche"){
        	if($("#qiche").length==0){
        		$("#search-result").children("em").after('<span class="options" >汽车品牌: <b id="qiche" data-carid="'+$this.attr("data-carid")+'">'+info+'</b><a href="#" class="ico-close">x</a></span>');
        	}else{
        		$("#qiche").text(info);
        		$("#qiche").attr("data-carid",$this.attr("data-carid"));
        	}
        	getCartypeList($this.attr("data-carid"));
        	$("#chexing").parent().remove();
         }else if(info_class=="chexing"){
        	 if($("#chexing").length==0){
        		 if($("#qiche").length==0){
             		$("#search-result").children("em").after('<span class="options" >车型: <b id="chexing" data-cartypeid="'+$this.attr("data-cartypeid")+'">'+info+'</b><a href="#" class="ico-close">x</a></span>');
             	}else{
             		$("#qiche").parent("span").after('<span class="options" >车型: <b id="chexing" data-cartypeid="'+$this.attr("data-cartypeid")+'">'+info+'</b><a href="#" class="ico-close">x</a></span>');
             	}
        	 }else{
        		$("#chexing").text(info);
         		$("#chexing").attr("data-cartypeid",$this.attr("data-cartypeid"));
        	 }
        }
        getProductList();
        getPageHtml();
        return false;
    });
    $('#advance-search input[name="brand"]').live('click',function () {
        var brand = check_brand();
        if(brand==""){
        	$("span.last").remove();
        	if(!checkAllSearch()){
        		$("#search-result").remove();
        		$("div.search-notes").prepend('<div class="txt-info  search-tips" id="search-tips">Hi，您好，请选择您感兴趣的车载导航产品！</div>');
        	}
        }else{
        	 if(!checkAllSearch()){
             	$("#search-tips").remove();
         		$("div.search-notes").prepend('<div class="txt-info" id="search-result"><em>已选条件：</em><span class="options last" >导航品牌: <i id="pinpai"> </i></span></div>');
             }else{
            	 if($("span.last").length==0){
            		 $("#search-result").append('<span class="options last" >导航品牌: <i id="pinpai"> </i></span>');
            	 }
             }
             $("#pinpai").html(brand);
        }
        getProductList();
        getPageHtml();
    });
    $("#submit").live('click',function(){
    	var keywords=$("#kewords").val();
    	keywords=keywords.replace(/(^\s*)|(\s*$)/g, "");
    	if(keywords!=""){
    		$("#kewords").val(keywords);
    		 getProductList();
    	     getPageHtml();
    	} 
    	return false;
    });
    $("#submit~a").live('click',function(){
    		var keywords=$(this).text();
        	if(keywords!=""){
        		$("#kewords").removeClass("placeholder");
        		$("#kewords").val(keywords);
        		 getProductList();
        	     getPageHtml();
        	} 
        	return false;
	});
    $("#toggle").live('click',function(){
    	if(!$(this).hasClass('btn-extend')){
    		$(this).text('展开');
    		$(this).addClass("btn-extend");
            $(this).removeClass("btn-shrink");
    		$('#advance-search').hide();
    	}else{
    		$(this).text('收起');

           $(this).addClass("btn-shrink");
    		$(this).removeClass("btn-extend");
    		$('#advance-search').show();
    	}
    	return false;
    });
    $("#kewords").live('blur',function(){
    	if(!$(this).hasClass("placeholder")&&$(this).val().replace(/(^\s*)|(\s*$)/g, "")==""){
    		$(this).val("请输入关键字");
    		$(this).addClass("placeholder");
    	}
    });
    $("#kewords").live('focus',function(){
    	if($(this).hasClass("placeholder")){
    		$(this).val("");
    		$(this).removeClass("placeholder");
    	}
    });

});
