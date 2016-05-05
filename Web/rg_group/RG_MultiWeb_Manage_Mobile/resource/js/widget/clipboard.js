(function($,w){
		/*扩展适配剪切板对象*/
		$.extend($,{
			adaptCB:function(e){
					return e.clipboardData||w.clipboardData;
			},
			getCB:function(e){
					return $.adaptCB(e).getData("text");
			},
			setCB:function(e,str){
					return e.clipboardData?e.clipboardData.setData("text/plain",str):w.clipboardData.setData("text",str);
			}
		});
})(Zepto,window);