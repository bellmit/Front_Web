/*
 name:credit_manage/index;
 author:yipin;
 date:2016-05-19;
version:1.0.0;
*/
require.config({baseUrl:"../js/",paths:{jquery:"lib/jquery/jquery-2.1.4.min",jquery_mobile:"lib/jquery/jquery-mobile.min",dialog:"lib/artDialog/dialog",slide:"widgets/slide"},shim:{dialog:{deps:["jquery"]},jquery_mobile:{deps:["jquery"]}}}),require(["jquery","jquery_mobile","dialog","slide"],function(a,b,c,d){a(function(){console.log("watch bbbbbbbbbbbbbbb")})});