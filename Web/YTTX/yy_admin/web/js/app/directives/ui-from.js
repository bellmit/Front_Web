/*表单指令*/
angular.module('ui.form',[])
    /*手机号码指令，手机格式化指令*/
    .directive('uiMobilePhone',['toolUtil',function(toolUtil) {
        return {
            replace:false,
            restrict: 'EC',
            require: 'ngModel',
            link:function (scope, elem, attrs,ctrl) {
                /*绑定事件*/
                angular.element(elem).bind('keyup focusout',function ($event){
                    var etype=$event.type;
                    if(etype==='keyup'){
                        var phoneno=this.value.replace(/\D*/g,'');
                        if(phoneno===''){
                            this.value='';
                            return false;
                        }
                        this.value=toolUtil.phoneFormat(this.value);
                    }else if(etype==='focusout'){
                        /*手动执行脏检查*/
                        scope.$apply(function(){
                            ctrl.$setValidity("mpformaterror",toolUtil.isMobilePhone(elem.val()));
                        });
                    }
                });
            }
        }
    }])
    /*银行卡指令，银行卡格式化指令*/
    .directive('uiBankCard',['toolUtil',function(toolUtil) {
        return {
            replace:false,
            restrict: 'EC',
            require: 'ngModel',
            link:function (scope, elem, attrs,ctrl) {
                /*绑定事件*/
                angular.element(elem).bind('keyup focusout',function ($event){
                    var etype=$event.type;
                    if(etype==='keyup'){
                        var bankno=this.value.replace(/\D*/g,'');
                        if(bankno===''){
                            this.value='';
                            return false;
                        }
                        this.value=toolUtil.cardFormat(this.value);
                    }else if(etype==='focusout'){
                        /*手动执行脏检查*/
                        scope.$apply(function(){
                            ctrl.$setValidity("bcformaterror",toolUtil.isBankCard(elem.val()));
                        });
                    }
                });
            }
        }
    }])
    /*比较指令，比较是否相等)*/
    .directive('uiCompareEqual',['toolUtil',function(toolUtil) {
        return {
            replace:false,
            restrict: 'EC',
            require: 'ngModel',
            link:function (scope, elem, attrs,ctrl) {
                /*绑定事件*/
                var equaldom=document.getElementById(attrs.equaldom);
                angular.element(elem).bind('keyup',function ($event){
                    var etype=$event.type;
                    if(etype==='keyup'){
                        var str1=toolUtil.trims(equaldom.value),
                            str2=toolUtil.trims(this.value);
                        if(str2!==''){
                            /*手动执行脏检查*/
                            scope.$apply(function(){
                                ctrl.$setValidity("equalerror",str1===str2);
                            });
                        }else{
                            /*手动执行脏检查*/
                            scope.$apply(function(){
                                ctrl.$setValidity("equalerror",true);
                            });
                        }
                    }
                });
            }
        }
    }])
    /*比较指令，比较是否不相等)*/
    .directive('uiCompareUnequal',['toolUtil',function(toolUtil) {
        return {
            replace:false,
            restrict: 'EC',
            require: 'ngModel',
            link:function (scope, elem, attrs,ctrl) {
                /*绑定事件*/
                var equaldom=document.getElementById(attrs.equaldom);
                angular.element(elem).bind('keyup',function ($event){
                    var etype=$event.type;
                    if(etype==='keyup'){
                        var str1=toolUtil.trims(equaldom.value),
                            str2=toolUtil.trims(this.value);
                        /*手动执行脏检查*/
                        if(str2!==''){
                            scope.$apply(function(){
                                ctrl.$setValidity("unequalerror",str1!==str2);
                            });
                        }else{
                            scope.$apply(function(){
                                ctrl.$setValidity("unequalerror",true);
                            });
                        }
                    }
                });
            }
        }
    }])
    /*格式化两位小数*/
    .directive('uiDoublePoint',['toolUtil',function(toolUtil) {
        return {
            replace:false,
            restrict: 'EC',
            require: 'ngModel',
            link:function (scope, elem, attrs,ctrl) {
                /*绑定事件*/
                angular.element(elem).bind('focusout',function ($event){
                    var etype=$event.type;
                    if(etype==='focusout'){
                        /*手动执行脏检查*/
                        scope.$apply(function(){
                            elem.val(toolUtil.moneyCorrect(elem.val(),12,true)[0]);
                        });
                    }
                });
            }
        }
    }])
    /*格式化电话号码(4位)*/
    .directive('uiTelePhone4',['toolUtil',function(toolUtil) {
        return {
            replace:false,
            restrict: 'EC',
            require: 'ngModel',
            link:function (scope, elem, attrs,ctrl) {
                /*绑定事件*/
                angular.element(elem).bind('keyup focusout',function ($event){
                    var etype=$event.type;
                    if(etype==='keyup'){
                        var phoneno=this.value.replace(/\D*/g,'');
                        if(phoneno===''){
                            this.value='';
                            return false;
                        }
                        this.value=toolUtil.telePhoneFormat(this.value,4);
                    }else if(etype==='focusout'){
                        /*手动执行脏检查*/
                        scope.$apply(function(){
                            ctrl.$setValidity("tpformaterror",toolUtil.isTelePhone(elem.val(),4));
                        });
                    }
                });
            }
        }
    }])
    /*格式化电话号码(3位)*/
    .directive('uiTelePhone3',['toolUtil',function(toolUtil) {
        return {
            replace:false,
            restrict: 'EC',
            require: 'ngModel',
            link:function (scope, elem, attrs,ctrl) {
                /*绑定事件*/
                angular.element(elem).bind('keyup focusout',function ($event){
                    var etype=$event.type;
                    if(etype==='keyup'){
                        var phoneno=this.value.replace(/\D*/g,'');
                        if(phoneno===''){
                            this.value='';
                            return false;
                        }
                        this.value=toolUtil.telePhoneFormat(this.value,3);
                    }else if(etype==='focusout'){
                        /*手动执行脏检查*/
                        scope.$apply(function(){
                            ctrl.$setValidity("tpformaterror",toolUtil.isTelePhone(elem.val(),3));
                        });
                    }
                });
            }
        }
    }]);