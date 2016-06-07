/**
name:credit_manage / menu;
 author:yipin;
 date:2016-06-07;
 version:1.0.0**/
define(["jquery"],function(a){var b={},c=location.href,d=location.search,e=location.hash,f=c.lastIndexOf("/");return b.winurl=c,-1!=f&&(f=c.slice(f+1),""!==d&&(d=f.indexOf("?"),f=f.slice(0,d)),""!==e&&(e=f.indexOf("#"),f=f.slice(0,e)),b.cururl=f),b.menuLight=function(a,b){var c=a.children(),d=c.length,e=0;for(e;d>e;e++){var g=c.eq(e),h=g.attr("href");if(-1!==f.indexOf(h))return g.addClass(b),!1}},b});