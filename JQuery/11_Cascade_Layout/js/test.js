// JavaScript Document
$(function(){
	var options = {
        autoResize: true,
        container: $('#main'),
        offset:5,
        itemWidth: 220
     };
    var handler = $('#tiles li');
      handler.wookmark(options);
      handler.click(function(){
        var newHeight = $('img',this).height() + Math.round(Math.random()*100+20);
        $(this).css('height',newHeight);
        handler.wookmark();
      });
});