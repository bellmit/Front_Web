//实例说明----可编辑的表格
//伪代码说明
//需要首先通过javascript来解决内容部分奇偶行的背景色不同
//1.document加载：
//
//
//
//
$(document).ready(function(){
//找到表格中的内容区域所有的偶数行
$("tbody tr:even").css("background-color","lightblue");
//我们需要找到左半部分
var numTd=$("tbody td:even");
//注册事件,表格可以编辑
numTd.click(
			function(){
				
				
				//找到当前鼠标点击的td，this对应的就是响应了click的那个td
				var tdObj=$(this);
				//判断td中是否有文本框，以解决文本框与td之间缝隙bug造成的
				//事件传播
				if(tdObj.children("input").length>0){
					return false;
					}
				var text=tdObj.html();
				tdObj.html("");
				//创建一个文本框,即：需要创建一个节点(创建文本框),然后插入
				//需要将当前td中的内容放到文本框中
				//插入文本框到td中；
				//同时清空td中内容；
				var inputObj=$("<input type='text'>").css("border","0")
				.css("font-size","16px").css("background-color",tdObj.css("background-color"))
				.width(tdObj.width()).val(text).appendTo(tdObj);
				//文本框点进之后是选中状态,浏览器选中时需要获取焦点，但有些浏览器
				//并没有先出发焦点事件  inputObj.get(0).select(); 所以
				inputObj.trigger("focus").trigger("select");
				inputObj.click(
							   function(){
								   return false;
								   }
							   );
				//处理键盘回车和esc事件
				inputObj.keyup(
							   function(event){
								   var decode=event.which;
								   if(decode==13){
									   var inputtext=$(this).val();
									   tdObj.html(inputtext);
									   }
								   if(decode==27){
									   inputObj.val(text);
									   }   
								   }
							   );
				}); 					   
});
