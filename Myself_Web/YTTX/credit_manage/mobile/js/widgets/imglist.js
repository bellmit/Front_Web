/**
name:credit_manage / imglist;
 author:yipin;
 date:2016-06-08;
 version:1.0.0**/
define(["jquery"],function(a){return{imgList:function(b,c,d){var e=b.find(c),f=e.size(),g=a(b).width(),h=parseInt(g/d,10);d>=f?b.height(parseInt(g/d-10,10)):f>d&&2*d>=f?b.height(parseInt(2*g/d-10,10)):f>2*d&&b.height(parseInt(g-10,10));for(var i=0;f>i;i++)e.eq(i).css({height:h});a(window).on("orientationchange",function(c){g=a(b).width(),h=parseInt(g/d,10),d>=f?b.height(parseInt(g/d-10,10)):f>d&&2*d>=f?b.height(parseInt(2*g/d-10,10)):f>2*d&&b.height(parseInt(g-10,10));for(var i=0;f>i;i++)e.eq(i).css({height:h})})}}});