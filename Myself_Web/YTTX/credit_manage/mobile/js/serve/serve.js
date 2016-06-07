/**
name:credit_manage / serve;
 author:yipin;
 date:2016-06-07;
 version:1.0.0**/
require.config({baseUrl:"../js/",paths:{jquery:"lib/jquery/jquery.min",jquery_mobile:"lib/jquery/jquery-mobile.min"},shim:{jquery_mobile:{deps:["jquery"]}}}),require(["jquery","jquery_mobile"],function(a,b){a(function(){})});