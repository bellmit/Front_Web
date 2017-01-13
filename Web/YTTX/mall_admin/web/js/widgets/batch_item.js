/*批量组件*/
;(function ($) {
    var checkid=[],
        checkitem=[],
        state=1,
        check=0,
        stateobj={
            1:'激活',
            0:'禁止'
        };
    /*构造函数*/
    function BatchItem(){}
    /*子类*/
    function SubBatchItem() {}
    /*空函数*/
    function nofn(){}


    /**/

    /*初始化函数*/
    BatchItem.prototype.init=function (opt) {
        var self=this;
        $.extend(true,this,{
            showactive:'admin-batchitem-showactive',
            checkactive:'admin-batchitem-checkactive',
            $batchtoggle:null,
            $batchshow:null,
            $checkall:null,
            $action:null,
            istable:false,
            isstate:false,
            fn:null,
            $listwrap:null
        },opt);

        /*组件初始化*/
        this.widgetInit();
        /*绑定事件*/
        this.bind();
    };

    /*组件初始化*/
    BatchItem.prototype.widgetInit=function () {
        var self=this;
        /*确认组件*/
        if(!self['setSure']){
            var sureObj=public_tool.sureDialog(self.dia)/*回调提示对象*/;
            self.setSure=new sureObj();
        }
    };

    /*事件注册*/
    BatchItem.prototype.bind=function () {
        var self=this;
        if(self.$batchtoggle){
            if(self.$batchshow){
                /*绑定切换批量显示隐藏*/
                self.$batchtoggle.on('click',function () {
                    self.$batchshow.toggleClass(self.showactive);
                });
                if(self.$listwrap){
                    /*绑定全选与取消全选*/
                    if(self.$checkall){
                        self.$checkall.on('click',function (){
                            var $this=$(this),
                                tempstate=parseInt($this.attr('data-check'),10);
                            if(tempstate===0){
                                /*选中*/
                                check=1;
                                $this.attr({
                                    'data-check':1
                                }).addClass(self.checkactive);
                                /*执行全选*/
                                self.toggleCheckAll(1);
                            }else if(tempstate===1){
                                /*取消选中*/
                                check=0;
                                $this.attr({
                                    'data-state':0
                                }).removeClass(self.checkactive);
                                /*执行取消全选*/
                                self.toggleCheckAll(0);
                            }
                        });
                    }
                    /*绑定单项选择*/
                    if(self.istable){
                        self.$listwrap.find('tbody').on('change','input[type="checkbox"]',function () {
                            self.toggleCheckItem($(this));
                        });
                    }else{
                        self.$listwrap.on('change','input[type="checkbox"]',function () {
                            self.toggleCheckItem($(this));
                        });
                    }
                    /*绑定回调执行*/
                    if(self.$action&&self.fn){
                       self.$action.on('click','div',function () {
                           var $this=$(this),
                               type=$this.attr('data-action');
                           self.fn.call(null,type);
                           /*上架*/
                           /*if(type==='up'){
                               /!*上架*!/
                               self.fn.call(self,{
                                   type:type
                               });
                           }else if(type==='down'){
                               /!*下架*!/

                           }else if(type==='audit'){
                               /!*审核*!/

                           }else if(type==='forbid'){
                               /!*禁用*!/

                           }else if(type==='enable'){
                               /!*启用*!/

                           }else if(type==='delete'){
                               /!*删除*!/

                           }else if(type==='recommend'){
                               /!*推荐*!/

                           }*/
                       });
                    }
                }

            }
        }
    };

    /*事件注销*/
    BatchItem.prototype.unbind=function () {
        var self=this;
        self.$batchtoggle.off('click');
        self.$checkall.off('click');
        if(self.istable){
            self.$listwrap.find('tbody').off('change','input[type="checkbox"]');
        }else{
            self.$listwrap.off('change','input[type="checkbox"]');
        }
    };


    /*对外工具*/

    /*清除状态(用于依赖于状态的操作)*/
    BatchItem.prototype.clearState=function () {
        this.$checkall.attr({
            'data-state':1
        });
        state=1;
    };

    /*清空数据(清除已经选中的数据)*/
    BatchItem.prototype.clear=function () {
        checkid.length=0;
        check=0;
        this.$checkall.attr({
            'data-check':0
        }).removeClass(this.checkactive);

        /*清除选中*/
        var len=checkitem.length;
        if(len!==0){
            var i=0;
            for(i;i<len;i++){
                checkitem[i].prop('checked', false);
            }
            checkitem.length=0;
        }
    };

    /*过滤数据(清除并过滤已经选中的数据)*/
    BatchItem.prototype.filterData=function (key) {
        /*清除选中*/
        var self=this,
            len=checkitem.length;
        if(len!==0&&typeof key!=='undefined'){
            var i=len - 1;
            for(i;i>=0;i--){
                if(key===i){
                    checkitem[i].prop('checked', false);
                    checkitem.splice(i,1);
                    checkid.splice(i,1);
                    break;
                }
            }
            if(checkid.length===0){
               self.clear();
            }
            return {
                checkid:checkid,
                checkitem:checkitem
            }
        }
    };

    /*全选和取消全选*/
    BatchItem.prototype.toggleCheckAll=function (chk) {
        var self=this,
            $wrap;
        if(chk===1){
            /*选中*/
            if(self.istable){
                $wrap=self.$listwrap.find('tbody');
            }else{
                $wrap=self.$listwrap;
            }
            if(self.isstate){
                /*依赖状态*/
                $wrap.find('tr').each(function (index, element) {
                    var $input=$(element).find('td:first input:checkbox');
                    if(index===0){
                        if($input.length==0){
                            self.clear();
                            return false;
                        }
                        if(!$input.is(':checked')){
                            checkid.push($input.prop('checked',true).val());
                            checkitem.push($input);
                        }
                        state=parseInt($input.attr('data-state'),10);
                    }else{
                        var tempstate=parseInt($input.attr('data-state'),10);
                        if(state===tempstate&&!$input.is(':checked')){
                            checkid.push($input.prop('checked',true).val());
                            checkitem.push($input);
                        }
                    }
                });
            }else{
                /*不依赖于状态*/
                $wrap.find('tr').each(function (index, element) {
                    var $input=$(element).find('td:first input:checkbox');
                    if(index===0){
                        if($input.length==0){
                            self.clear();
                            return false;
                        }
                    }
                    if(!$input.is(':checked')){
                        checkid.push($input.prop('checked',true).val());
                        checkitem.push($input);
                    }
                });
            }
        }else if(chk===0){
            /*取消选中*/
            self.clear();
        }
    };

    /*绑定选中某个单独多选框*/
    BatchItem.prototype.toggleCheckItem=function ($input) {
        var self=this,
            len=checkid.length,
            ishave=-1,
            text=$input.val();

        if($input.is(':checked')){
            if(!self.$batchshow.hasClass(self.showactive)){
                self.$batchshow.addClass(self.showactive);
            }
            if (len === 0) {
                checkid.push(text);
                checkitem.push($input);
                if(self.isstate){
                    state=parseInt($input.attr('data-state'),10);
                }
                self.$checkall.attr({
                    'data-check':1
                }).addClass(self.checkactive);
            } else {
                if(self.isstate){
                    var tempstate=parseInt($input.attr('data-state'),10);
                    if(state===tempstate){
                        ishave=$.inArray(text,checkid);
                        if(ishave!==-1){
                            checkid.splice(ishave,1,text);
                            checkitem.splice(ishave,1,$input);
                        }else{
                            checkid.push(text);
                            checkitem.push($input);
                        }
                    }else{
                        $input.prop('checked',false);
                    }
                }else{
                    ishave=$.inArray(text,checkid);
                    if(ishave!==-1){
                        checkid.splice(ishave,1,text);
                        checkitem.splice(ishave,1,$input);
                    }else{
                        checkid.push(text);
                        checkitem.push($input);
                    }
                }
            }

        }else{
            ishave=$.inArray(text,checkid);
            if(ishave!==-1){
                checkid.splice(ishave,1);
                checkitem.splice(ishave,1);
                if(checkid.length===0){
                    self.clear();
                }
            }
        }
    };

    /*获取选中的数据*/
    BatchItem.prototype.getBatchData=function () {
        return checkid;
    };

    /*获取选中的文档节点*/
    BatchItem.prototype.getBatchNode=function () {
        return checkitem;
    };
    


    /*设置继承*/
    nofn.prototype=BatchItem.prototype;
    SubBatchItem.prototype=new nofn();

    /*设置地址对外接口*/
    if(public_tool){
        public_tool['BatchItem']=SubBatchItem;
    }else{
        window['BatchItem']=SubBatchItem;
    }
})(jQuery);