$(function(){
	carServer.run();
});

var carServer = {
	run:function(){
		this._init_();
		this._bind_event_();
		this._start_();
	},
	
	_init_:function(){
	    this.contextPath = $("#contextPath").val();	
	    this._carRecord('','');
	    this._carShop('');
	    
	},
	
	_bind_event_:function(){
		
	},
	_start_:function(){
		
	},
	_carRecord:function(currentPage,selDate){//保养记录
	     var sessionUrl = this.contextPath+"/friend/isHaveFriendInfo?pk="+new Date().getTime();
		 var friendid ='';
	     $.ajax({
	    	   type: "GET",
	    	   url: sessionUrl,
	    	   async:false,
	    	   success: function(msg){
	    	   friendid = msg; 
	    	   }
	    	});
	     if(friendid!=''){
		    var url =this.contextPath +"/carfri/car_record?pk="+new Date().getTime()+"&currentPage="+currentPage+"&choseMonth="+selDate;
		    $("#tab-list-info").load(url,"",function(){
		    	var currentYear = new Date().getFullYear();
		    	var selDate = $("#selDate").val();
		    	for(var i=0;i<=3;i++){
		    		var year = (currentYear-i);
		    		if(selDate==year){
		    		   $("#choseMonth").append("<option value='"+year+"' selected='selected'>"+year+"年</option>");
		    		}else{
		    		   $("#choseMonth").append("<option value='"+year+"'>"+year+"年</option>");
		    		}
		    	}
		    	initPagination($('#totalResults').val(),($('#currentPage').val()-1));
		    });
	     }else{
	    	 var url = this.contextPath+"/friend/login";
	    	 window.location.href=url;
	     }
	},
	_carShop:function(currentShopPage){
		 var sessionUrl = this.contextPath+"/friend/isHaveFriendInfo?pk="+new Date().getTime();
		 var friendid ='';
	     $.ajax({
	    	   type: "GET",
	    	   url: sessionUrl,
	    	   async:false,
	    	   success: function(msg){
	    	   friendid = msg; 
	    	   }
	    	});
	    if(friendid!=''){
			var shopUrl = this.contextPath+"/carfri/car_shop?pk="+new Date().getTime()+"&currentPage="+currentShopPage;
		    $("#redAgaency-info").load(shopUrl,"",function(){
		    	initShopPagination($('#totalShopResults').val(),($('#currentShopPage').val()-1));
		    });
	    }else{
	    	 var url = this.contextPath+"/friend/login";
	    	 window.location.href=url;
	     }
	}
};


function pageselectCallback(page_index,jq){
	$('#currentPage').val(page_index+1);
    var currentPage = page_index+1;
    var selDate = $("#selDate").val();
    carServer._carRecord(currentPage,selDate);
    return false;
}

function shopPageselectCallback(page_index,jq){
	$('#currentShopPage').val(page_index+1);
    var currentShopPage = page_index+1;
    carServer._carShop(currentShopPage);
    return false;
}

/** 
 * Initialisation function for pagination
 */
function initPagination(num_entries,current_page) {
    $("#Pagination").pagination(num_entries, {
        callback: pageselectCallback,
        items_per_page:$('#pageSize').val(),
        current_page:current_page
    });
 }

function initShopPagination(num_entries,current_page) {
    $("#PaginationShop").pagination(num_entries, {
        callback: shopPageselectCallback,
        items_per_page:$('#pageShopSize').val(),
        current_page:current_page
    });
 }
//保养记录更改日期
function change(selDate){
	carServer._carRecord('',selDate);
}