/**
name:credit_manage / index;
 author:yipin;
 date:2016-06-07;
 version:1.0.0**/
require.config({baseUrl:"../js/",paths:{jquery:"lib/jquery/jquery.min",jquery_mobile:"lib/jquery/jquery-mobile.min",dialog:"lib/artDialog/dialog-plus"},shim:{jquery_mobile:{deps:["jquery"]}}}),require(["jquery","jquery_mobile","dialog"],function(a,b,c){a(function(){var b=a("#test");b.on("click",function(){console.log("aaa"),dialog()})})});