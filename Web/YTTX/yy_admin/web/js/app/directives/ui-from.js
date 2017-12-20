/*表单指令*/
angular.module('ui.form', [])
/*手机号码指令，手机格式化指令*/
    .directive('uiMobilePhone', ['toolUtil', '$parse', function (toolUtil, $parse) {
        return {
            replace: false,
            restrict: 'EC',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                /*绑定事件*/
                angular.element(elem).bind('keyup focusout', function ($event) {
                    var etype = $event.type,
                        self = this,
                        phoneno;
                    if (etype === 'keyup') {
                        phoneno = self.value.replace(/\D*/g, '');
                        if (phoneno === '' || isNaN(phoneno)) {
                            phoneno = '';
                        } else {
                            phoneno = toolUtil.phoneFormat(phoneno);
                        }
                        scope.$apply(function () {
                            $parse(attrs['ngModel']).assign(scope, phoneno);
                        });
                    } else if (etype === 'focusout') {
                        /*手动执行脏检查*/
                        scope.$apply(function () {
                            ctrl.$setValidity("mpformaterror", toolUtil.isMobilePhone(self.value));
                        });
                    }
                });
            }
        }
    }])
    /*银行卡指令，银行卡格式化指令*/
    .directive('uiBankCard', ['toolUtil', '$parse', function (toolUtil, $parse) {
        return {
            replace: false,
            restrict: 'EC',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                /*绑定事件*/
                angular.element(elem).bind('keyup focusout', function ($event) {
                    var etype = $event.type,
                        self = this;
                    if (etype === 'keyup') {
                        var bankno = self.value.replace(/\D*/g, '');
                        if (bankno === '' || isNaN(bankno)) {
                            bankno = '';
                        } else {
                            bankno = toolUtil.cardFormat(bankno);
                        }
                        scope.$apply(function () {
                            $parse(attrs['ngModel']).assign(scope, bankno);
                        });
                    } else if (etype === 'focusout') {
                        /*手动执行脏检查*/
                        scope.$apply(function () {
                            ctrl.$setValidity("bcformaterror", toolUtil.isBankCard(self.value));
                        });
                    }
                });
            }
        }
    }])
    /*比较指令，比较是否相等)*/
    .directive('uiCompareEqual', ['toolUtil', function (toolUtil) {
        return {
            replace: false,
            restrict: 'EC',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                /*绑定事件*/
                var equaldom = document.getElementById(attrs.equaldom);
                angular.element(elem).bind('keyup', function ($event) {
                    var etype = $event.type,
                        self = this;
                    if (etype === 'keyup') {
                        var str1 = toolUtil.trims(equaldom.value),
                            str2 = toolUtil.trims(self.value);
                        if (str2 !== '') {
                            /*手动执行脏检查*/
                            scope.$apply(function () {
                                ctrl.$setValidity("equalerror", str1 === str2);
                            });
                        } else {
                            /*手动执行脏检查*/
                            scope.$apply(function () {
                                ctrl.$setValidity("equalerror", true);
                            });
                        }
                    }
                });
            }
        }
    }])
    /*比较指令，比较是否不相等)*/
    .directive('uiCompareUnequal', ['toolUtil', function (toolUtil) {
        return {
            replace: false,
            restrict: 'EC',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                /*绑定事件*/
                var equaldom = document.getElementById(attrs.equaldom);
                angular.element(elem).bind('keyup', function ($event) {
                    var etype = $event.type,
                        self = this;
                    if (etype === 'keyup') {
                        var str1 = toolUtil.trims(equaldom.value),
                            str2 = toolUtil.trims(self.value);
                        /*手动执行脏检查*/
                        if (str2 !== '') {
                            scope.$apply(function () {
                                ctrl.$setValidity("unequalerror", str1 !== str2);
                            });
                        } else {
                            scope.$apply(function () {
                                ctrl.$setValidity("unequalerror", true);
                            });
                        }
                    }
                });
            }
        }
    }])
    /*格式化两位小数*/
    .directive('uiDoublePoint', ['toolUtil', '$parse', function (toolUtil, $parse) {
        return {
            replace: false,
            restrict: 'EC',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                /*绑定事件*/
                var limit = attrs.limit || 12;
                angular.element(elem).bind('focusout', function ($event) {
                    var etype = $event.type,
                        self = this;
                    if (etype === 'focusout') {
                        scope.$apply(function () {
                            $parse(attrs['ngModel']).assign(scope, toolUtil.moneyCorrect(self.value, limit, true)[0]);
                        });
                    }
                });
            }
        }
    }])
    /*格式化电话号码(4位)*/
    .directive('uiTelePhone4', ['toolUtil', '$parse', function (toolUtil, $parse) {
        return {
            replace: false,
            restrict: 'EC',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                /*绑定事件*/
                angular.element(elem).bind('keyup focusout', function ($event) {
                    var etype = $event.type,
                        self = this;
                    if (etype === 'keyup') {
                        var phoneno = self.value.replace(/\D*/g, '');
                        if (phoneno === '' || isNaN(phoneno)) {
                            phoneno = '';
                        }
                        scope.$apply(function () {
                            $parse(attrs['ngModel']).assign(scope, toolUtil.telePhoneFormat(phoneno, 4));
                        });
                    } else if (etype === 'focusout') {
                        /*手动执行脏检查*/
                        scope.$apply(function () {
                            ctrl.$setValidity("tpformaterror", toolUtil.isTelePhone(self.value, 4));
                        });
                    }
                });
            }
        }
    }])
    /*格式化电话号码(3位)*/
    .directive('uiTelePhone3', ['toolUtil', '$parse', function (toolUtil, $parse) {
        return {
            replace: false,
            restrict: 'EC',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                /*绑定事件*/
                angular.element(elem).bind('keyup focusout', function ($event) {
                    var etype = $event.type,
                        self = this;
                    if (etype === 'keyup') {
                        var phoneno = self.value.replace(/\D*/g, '');
                        if (phoneno === '' || isNaN(phoneno)) {
                            phoneno = '';
                        }
                        scope.$apply(function () {
                            $parse(attrs['ngModel']).assign(scope, toolUtil.telePhoneFormat(phoneno, 3));
                        });
                    } else if (etype === 'focusout') {
                        /*手动执行脏检查*/
                        scope.$apply(function () {
                            ctrl.$setValidity("tpformaterror", toolUtil.isTelePhone(self.value, 3));
                        });
                    }
                });
            }
        }
    }])
    /*只能输入整形数字*/
    .directive('uiIntNumber', ['$parse', function ($parse) {
        return {
            replace: false,
            restrict: 'EC',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                /*绑定事件*/
                angular.element(elem).bind('focusout', function ($event) {
                    var etype = $event.type,
                        self = this;

                    if (etype === 'focusout') {
                        var data = self.value.replace(/\D*/g, '');
                        if (data === '' || isNaN(data)) {
                            data = '';
                        }
                        scope.$apply(function () {
                            $parse(attrs['ngModel']).assign(scope, data);
                        });
                    }
                });
            }
        }
    }])
    /*只能输入数字(包括小数)*/
    .directive('uiAllNumber', ['$parse', function ($parse) {
        return {
            replace: false,
            restrict: 'EC',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                /*绑定事件*/
                angular.element(elem).bind('focusout', function ($event) {
                    var etype = $event.type,
                        self = this;

                    if (etype === 'focusout') {
                        var data = self.value.replace(/[^0-9\.]*/g, '');
                        if (data.indexOf('.') !== -1) {
                            (function () {
                                data = data.split('.');
                                var len = data.length;
                                if (len !== 2) {
                                    data.length = 2;
                                }
                                if (data[0] === '') {
                                    data = data[1];
                                } else if (data[1] === '') {
                                    data = data[0];
                                } else {
                                    data = data.join('.');
                                }
                            }());
                        }
                        if (data === '' || isNaN(data)) {
                            data = '';
                        }
                        scope.$apply(function () {
                            $parse(attrs['ngModel']).assign(scope, data);
                        });
                    }
                });
            }
        }
    }])
    /*单一百分百*/
    .directive('uiSinglePercent', ['$parse', function ($parse) {
        return {
            replace: false,
            restrict: 'EC',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                /*绑定事件*/
                angular.element(elem).bind('focusout', function ($event) {
                    var etype = $event.type,
                        self = this,
                        data;

                    if (etype === 'focusout') {
                        data = self.value.replace(/[^0-9\.]*/g, '');
                        if (data.indexOf('.') !== -1) {
                            (function () {
                                data = data.split('.');
                                var len = data.length;
                                if (len !== 2) {
                                    data.length = 2;
                                }
                                if (data[0] === '') {
                                    data = data[1];
                                } else if (data[1] === '') {
                                    data = data[0];
                                } else {
                                    data = data.join('.');
                                }
                            }());
                        }
                        if (data === '' || isNaN(data)) {
                            data = '';
                        } else {
                            data = (data * 10000) / 10000;
                            if (data > 100) {
                                data = 100;
                            }
                        }
                        scope.$apply(function () {
                            $parse(attrs['ngModel']).assign(scope, data);
                        });
                    }
                });
            }
        }
    }])
    /*组合(关联)百分百*/
    .directive('uiRelationPercent3', ['toolUtil', function (toolUtil) {
        /*关联属性处理*/
        function relationData(config) {
            var j = 1,
                res = 0/*已经存在的输入数总和*/,
                len = config.len,
                value = (config.value * 10000) / 10000/*当前操作值*/,
                index = parseInt(config.index, 10) || 1,
                scope = config.scope,
                verflow_value = 0/*当前循环溢出值*/,
                current_value = 0/*当前循环值*/,
                overflow = 0/*溢出值*/;

            if (value >= 100) {
                /*超出最大值则重置为最大值，其他归0*/
                for (j; j < len; j++) {
                    if (j !== index) {
                        scope.$apply(function () {
                            scope['relation' + j] = 0;
                        });
                    } else {
                        scope.$apply(function () {
                            scope['relation' + index] = 100;
                        });
                    }
                }
            } else {
                for (j; j < len; j++) {
                    verflow_value = scope['relation' + j];
                    /*修正空值和非数字值*/
                    if (verflow_value === '' || isNaN(verflow_value)) {
                        verflow_value = 0;
                        scope.$apply(function () {
                            scope['relation' + j] = 0;
                        });
                    }
                    /*如果溢出*/
                    if ((res * 10000 + verflow_value * 10000) > 1000000) {
                        overflow = (res * 10000 + verflow_value * 10000) - 1000000;
                        var k = 1;
                        for (k; k < len; k++) {
                            if (k !== index) {
                                if (overflow !== 0) {
                                    /*如果当前循环值为操作值*/
                                    current_value = scope['relation' + k];
                                    if (current_value * 10000 >= overflow) {
                                        scope.$apply(function () {
                                            scope['relation' + k] = (function () {
                                                var tempstr = (current_value * 10000 - overflow) / 10000;
                                                tempstr=tempstr.toString();
                                                if(tempstr.indexOf('.')!==-1){
                                                    tempstr=tempstr.split('.');
                                                    tempstr=tempstr[0]+'.'+tempstr[1].slice(0,2);
                                                }
                                                return tempstr;
                                            })();
                                        });
                                        overflow = 0;
                                    } else {
                                        scope.$apply(function () {
                                            scope['relation' + k] = 0;
                                        });
                                        overflow = (function () {
                                            var tempstr = (overflow - current_value * 10000) / 10000;
                                            tempstr=tempstr.toString();
                                            if(tempstr.indexOf('.')!==-1){
                                                tempstr=tempstr.split('.');
                                                tempstr=tempstr[0]+'.'+tempstr[1].slice(0,2);
                                            }
                                            return tempstr;
                                        })();
                                    }
                                } else if (overflow === 0 && k <= len - 1) {
                                    scope.$apply(function () {
                                        scope['relation' + k] = 0;
                                    });
                                }
                            }
                        }
                        break;
                    } else {
                        res = (function () {
                            var tempstr = (res * 10000 + verflow_value * 10000) / 10000;
                            tempstr=tempstr.toString();
                            if(tempstr.indexOf('.')!==-1){
                                tempstr=tempstr.split('.');
                                tempstr=tempstr[0]+'.'+tempstr[1].slice(0,2);
                            }
                            return tempstr;
                        })();
                    }
                }

            }
        }

        return {
            replace: false,
            restrict: 'EC',
            require: 'ngModel',
            scope: {
                relation1: '=relation1',
                relation2: '=relation2',
                relation3: '=relation3'
            },
            link: function (scope, elem, attrs, ctrl) {
                /*绑定事件*/
                angular.element(elem).bind('focusout', function ($event) {
                    var etype = $event.type,
                        self = this,
                        data;

                    if (etype === 'focusout') {
                        data = self.value.replace(/[^0-9\.]*/g, '');
                        if (data.indexOf('.') !== -1) {
                            (function () {
                                data = data.split('.');
                                var len = data.length;
                                if (len !== 2) {
                                    data.length = 2;
                                }
                                if (data[0] === '') {
                                    data = data[1];
                                } else if (data[1] === '') {
                                    data = data[0];
                                } else {
                                    data = data.join('.');
                                }
                            }());
                        }
                        if (data === '' || isNaN(data)) {
                            data = '0';
                        }
                        relationData({
                            index: attrs.current,
                            len: 4,
                            value: data,
                            scope: scope
                        });
                    }
                });
            }
        }
    }])
    /*.directive('uiRelationPercent', ['toolUtil', function (toolUtil) {
        return {
            replace: false,
            restrict: 'EC',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {

                var relation = attrs.relation/!*关联参数*!/,
                    isrelation = false/!*是否是关联*!/,
                    current = attrs.current || attrs.id/!*当前引用标识*!/,
                    relationlen = 0,
                    currentindex = -1,
                    relationarr,
                    relationdom = [];

                /!*判断是否是关联*!/
                if (typeof relation !== 'undefined') {
                    (function () {
                        relationarr = relation.split(',');
                        currentindex = toolUtil.arrIndex(current, relationarr);
                        relationlen = relationarr.length;
                        var i = 0;
                        if (relationlen >= 2) {
                            isrelation = true;
                            for (i; i < relationlen; i++) {
                                relationdom.push(document.getElementById(relationarr[i]));
                            }
                        }
                    }());
                }


                /!*绑定事件*!/
                angular.element(elem).bind('focusout', function ($event) {
                    var etype = $event.type,
                        self = this,
                        data;

                    if (etype === 'focusout') {
                        data = self.value.replace(/[^0-9\.]*!/g, '');
                        if (data === '') {
                            self.value = '';
                            return false;
                        }
                        if (data.indexOf('.') !== -1) {
                            (function () {
                                data = data.split('.');
                                var len = data.length;
                                if (len !== 2) {
                                    data.length = 2;
                                }
                                if (data[0] === '') {
                                    data = data[1];
                                } else if (data[1] === '') {
                                    data = data[0];
                                } else {
                                    data = data.join('.');
                                }
                            }());
                        }
                        if (data === '' || isNaN(data)) {
                            self.value = '';
                            return false;
                        }
                        data = (data * 10000) / 10000;
                        if (data > 100) {
                            data = 100;
                        }
                        if (isrelation) {
                            (function () {
                                var j = 0,
                                    res = 0,
                                    tempstr = 0,
                                    keep = 0;
                                if (data === 100) {
                                    /!*当前设置为100%时*!/
                                    for (j; j < relationlen; j++) {
                                        if (j !== currentindex) {
                                            relationdom[j].value = '0';
                                        }
                                    }
                                } else {
                                    /!*当前设置为其他情况时*!/
                                    for (j; j < relationlen; j++) {
                                        /!*计算非当前值*!/
                                        tempstr = relationdom[j].value;
                                        if (tempstr !== '') {
                                            if ((res * 10000 + tempstr * 10000) > 100 * 10000) {
                                                keep = (res * 10000 + tempstr * 10000) - 100 * 10000;
                                                var k = j + 1;
                                                if (j === currentindex) {
                                                    data = (tempstr * 10000 - keep) / 10000;
                                                    if (k < relationlen) {
                                                        for (k; k < relationlen; k++) {
                                                            relationdom[k].value = '0';
                                                        }
                                                    }
                                                } else {
                                                    relationdom[j].value = (tempstr * 10000 - keep) / 10000;
                                                    if (k < relationlen) {
                                                        for (k; k < relationlen; k++) {
                                                            if (j !== currentindex) {
                                                                relationdom[k].value = '0';
                                                            }
                                                        }
                                                    }
                                                }
                                                break;
                                            } else {
                                                res = (res * 10000 + tempstr * 10000) / 10000;
                                            }
                                        }
                                    }
                                }
                            }());
                        }
                        scope.$apply(function () {
                            self.value = data;
                        });
                    }
                });
            }
        }
    }])*/
    /*html过滤，非法html指令*/
    .directive('uiFilterHtmlIllegal', ['toolUtil', function (toolUtil) {
        return {
            replace: false,
            restrict: 'EC',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                /*绑定事件*/
                angular.element(elem).bind('keyup', function () {
                    var self = this;
                    self.value = toolUtil.trimHtmlIllegal(self.value);
                });
            }
        }
    }]);