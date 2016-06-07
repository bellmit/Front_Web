/**
name:credit_manage / serach;
 author:yipin;
 date:2016-06-07;
 version:1.0.0**/
define(["jquery"],function(a){a.fn.searchInit=function(a){var b=a.btn,c=a.btnclass,d=a.tips,e=this;return""!=e.val()?b.addClass(c):b.removeClass(c),this.on("blur keyup keydown",function(f){var g=f.type,h=e.val();if("blur"==g)""==h&&b.removeClass(c);else if("keyup"==g)""==h?b.removeClass(c):b.addClass(c);else if("keydown"==g&&13==f.which)return f.preventDefault(),""==h?void 0!==d&&(d.content('<span class="g-btips-warn g-c-warn">搜索内容不能为空 </span>').show(),setTimeout(function(){d.close()},3e3)):a.fn.call(null,h),!1}),b.on("click",function(){var a=e.val();""!==a&&(e.val("").focus(),b.removeClass(c))}),this}});