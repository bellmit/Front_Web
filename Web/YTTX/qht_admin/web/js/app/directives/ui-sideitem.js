angular.module('ui.sideitem',[])
    .directive('uiSubLogo',function() {
        return {
          replace:false,
          restrict: 'EC',
          template:'<div class="logo-img-wrap">\
                        <img src="../images/index_logo.png" alt="logo" />\
                    </div>\
                    <h1>深圳银通移动支付有限公司</h1>'
        };
    })
    .directive('uiSubInfo',function() {
        return {
            replace:false,
            restrict: 'EC',
            template:'<li>身份：<span>省级代理商</span></li>\
                      <li>姓名：<span>王二麻子</span></li>\
                      <li>手机号码：<span>152 3521 5696</span></li>\
                      <li>地址：<span>广东省深圳市龙华新区龙华汽车站摩天大厦88层88号</span></li>'
        };
    });