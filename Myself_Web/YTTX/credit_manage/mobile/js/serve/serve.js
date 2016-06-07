/**
name:credit_manage / serve;
 author:yipin;
 date:2016-06-07;
 version:1.0.0**/
require.config({baseUrl:"../../js/",paths:{jquery:"lib/jquery/jquery",jquery_mobile:"lib/jquery/jquery-mobile",slide:"widgets/slide",imglist:"widgets/imglist"},shim:{dialog:{deps:["jquery"]},jquery_mobile:{deps:["jquery"]}}}),require(["jquery","jquery_mobile","slide","imglist"],function(a,b,c,d){a(function(){var b=a("#slideimg_show"),e=a("#slide_img"),f=a("#slideimg_btn"),g=a("#serve_grid");c.slideToggle({$wrap:b,$slide_img:e,$btnwrap:f,minwidth:640,isresize:!1,size:3,times:5e3,eff_time:500,btn_active:"slidebtn-active"}),d.imgList(g,"li",3)})});