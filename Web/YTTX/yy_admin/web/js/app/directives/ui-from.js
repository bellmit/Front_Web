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