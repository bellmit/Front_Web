//下拉菜单插件
(function($){
	$.fn.SelectBox = function(val){
		return this.each(function(i,el){
			
			var $target = $(el), txtbox = $target.find(".txtbox"), value = $target.find(".selectvalue"), valuebox = $target.find(".values");
			if(val){
				var curli = $target.find("li[rel='" + val + "']");
				//console.log(curli.attr("rel"));
				txtbox.val(curli.text());
				value.val(val);
			}else{
				var se = $target.find("li[selected='selected']");
				if(se.size() != 0){
					txtbox.val($(se[0]).text());
					value.val($(se[0]).attr("rel"));
				}
			}
			valuebox.hide();
			txtbox.click(function(){
				if(valuebox.attr("width") && valuebox.attr("width")!=""){
					valuebox.css("width",valuebox.attr("width"));
				}else{
					valuebox.css("width",txtbox.width());
				}
				valuebox.slideDown();
				valuebox.find("li").click(chooseValue);
				valuebox.mouseleave(function(){
					valuebox.slideUp();
				})
			});
			
			function chooseValue(e){
				var v = $(e.target).attr("rel");
				if($(e.target).hasClass("label")){ return true;}
				txtbox.val($(e.target).text());
				txtbox.change();
				value.val(v);
				valuebox.slideUp();
				if(txtbox.val() != ""){
					var p = txtbox.parent()
					txtbox.siblings(".tipserror").hide();
					txtbox.removeClass("Validform_error")
					txtbox.siblings(".Validform_wrong").text("").removeClass("Validform_wrong").addClass("Validform_right")
					p.siblings(".terror").hide();
				}
			}
		})
	}
})(jQuery)