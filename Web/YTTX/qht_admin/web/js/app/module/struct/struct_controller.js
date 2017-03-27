/*首页控制器*/
angular.module('app')
    .controller('StructController', ['structService','$rootScope',function(structService,$rootScope){
        var self=this;

        /*tab选项卡*/
        this.tabitem=[{
            name:'运营架构',
            href:'struct',
            active:'tabactive'
        },{
            name:'角色',
            href:'role',
            active:''
        }];

        /*搜索*/
        this.search={
            searchactive:'',
            orgname:''
        };

        /*编辑*/
        this.edit={
            editstate:false,
            powerstate:false,
            rootorgname:'深圳银通支付有限公司',
            id:'',
            layer:'',
            orgname:''
        };
        /*机构设置*/
        this.setting={
            add_substruct_state:false,
            adjust_pos_state:false
        };


        /*菜单加载*/
        this.menuitem={
        };

        /*搜索过滤*/
        this.searchAction=function (e) {
            var kcode=window.event?e.keyCode:e.which;

            if(self.search.orgname===''){
                self.search.searchactive='';
            }else{
                self.search.searchactive='search-content-active';
            }
            if(kcode===13){
                structService.getMenuList(self.search.orgname);
            }
        };
        /*清空过滤条件*/
        this.searchClear=function () {
            self.search.orgname='';
            self.search.searchactive='';
        };

        /*子菜单展开*/
        this.toggleSubMenu=function (e) {
            e.preventDefault();
            e.stopPropagation();

            var target=e.target,
                node=target.nodeName.toLowerCase();
            if(node==='ul'||node==='li'){
                return false;
            }
            var $this=$(target),
                haschild=$this.hasClass('sub-menu-title'),
                $child,
                isrequest=false,
                isroot=false;

            if(haschild){
                $child=$this.next();
                if($child.hasClass('g-d-showi')){
                    /*隐藏*/
                    $child.removeClass('g-d-showi');
                    $this.removeClass('sub-menu-titleactive');
                    /*是否已经加载过数据*/
                    isrequest=$this.attr('data-isrequest');
                    if(isrequest){
                        /*清空隐藏节点数据*/
                        structService.initOperate({
                            data:null,
                            config:{
                                setting:self.setting
                            }
                        });
                    }
                }else{
                    /*显示*/
                    isrequest=$this.attr('data-isrequest');
                    isroot=$this.hasClass('sub-menu-root');
                    if(isrequest==='false'){
                        /*重新加载*/
                        if(isroot){
                            /*获取根目录数据*/
                            structService.getMenuList({
                                search:self.search.orgname,
                                $reqstate:$this,
                                root:true,
                                setting:self.setting
                            });
                        }else{
                            /*获取非根目录数据*/
                            structService.getMenuList({
                                search:self.search.orgname,
                                $reqstate:$this,
                                id:$this.attr('data-id'),
                                layer:$this.attr('data-layer'),
                                $wrap:$child,
                                root:false,
                                setting:self.setting
                            });
                        }
                    }else if(isrequest==='true'){
                        /*已加载的直接遍历存入操作区域*/
                        if(haschild){
                            var data=$child.find('>li >a'),
                                list=[],
                                len=data.size();
                            if(len!==0){
                                data.each(function () {
                                    var citem=$(this),
                                        orgname=citem.attr('data-label'),
                                        id=citem.attr('data-id');
                                    list.push({
                                        orgname:orgname,
                                        id:id
                                    });
                                });
                                if(isroot){
                                    structService.initOperate({
                                        data:list,
                                        config:{
                                            root:true,
                                            setting:self.setting
                                        }
                                    });
                                }else{
                                    structService.initOperate({
                                        data:list,
                                        config:{
                                            root:false,
                                            layer:$this.attr('data-layer'),
                                            setting:self.setting
                                        }
                                    });
                                }
                            }
                        }
                    }
                    $child.addClass('g-d-showi');
                    $this.addClass('sub-menu-titleactive');
                }
            }else{
                    /*错误节点*/
                    structService.initOperate({
                        data:null,
                        config:{
                            setting:self.setting
                        }
                    });
            }


            /*切换编辑信息*/
            if(isroot){
                /*根目录*/
                
            }else{
                /*非根目录*/

            }


        };

        /*机构列表展开*/
        this.toggleStructList=function (e) {
            e.preventDefault();

            var target=e.target,
                node=target.nodeName.toLowerCase();
            if(node!=='span'){
                return false;
            }
            var $span=$(target),
                $item=$span.parent(),
                $ul,
                isreload=$item.hasClass('ts-reload'),
                haschild='',
                isrequest=false;

            if(isreload){
                var id=$span.attr('data-id');
                /*显示*/
                isrequest=$span.attr('data-isrequest');
                if(isrequest==='false'){
                    /*重新加载*/
                    $ul=$item.find('ul');
                    /*获取非根目录数据*/
                    structService.getOperateList({
                        search:self.search.orgname,
                        $reqstate:$span,
                        $li:$item,
                        id:id,
                        $wrap:$ul,
                        root:false
                    });
                }
            }else{
                haschild=$item.hasClass('ts-child');
                if(haschild){
                    if($item.hasClass('ts-active')){
                        /*隐藏*/
                        $item.removeClass('ts-active');
                    }else{
                        /*显示*/
                        $item.addClass('ts-active');
                    }
                }
            }


        };

        /*切换编辑状态*/
        this.toggleEdit=function () {
           structService.toggleEdit('show');
        };
        /*提交编辑*/
        this.submitRootOrgname=function (e) {
            var kcode=window.event?e.keyCode:e.which;
            if(kcode===13){
                structService.updateRootOrgname(self.edit);
            }
        };



    }]);