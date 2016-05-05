$(function(){
	/*service img*/
	var service_plan=$("#service_plan img");
	service_plan.each(function(){
        if($(this).width()>=600){
			this.width=600;
		}
    });
	
});