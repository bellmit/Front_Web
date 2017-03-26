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

        /*机构设置*/
        this.setting={
            editstate:true,
            rootorgname:'深圳银通支付有限公司',
            add_substruct_state:false,
            adjuct_pos_state:false
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

        console.log($rootScope);

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
                $child;

            if(haschild){

                $child=$this.next();
                if($child.hasClass('g-d-showi')){
                    /*隐藏*/
                    $child.removeClass('g-d-showi');
                    $this.removeClass('sub-menu-titleactive');
                }else{
                    /*显示*/
                    $child.addClass('g-d-showi');
                    $this.addClass('sub-menu-titleactive');
                }
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
        };

        /*切换编辑状态*/
        this.toggleRootOrgname=function () {
           self.setting.editstate=!self.setting.editstate;
        };
        /*提交编辑*/
        this.submitRootOrgname=function (e) {
            var kcode=window.event?e.keyCode:e.which;
            if(kcode===13){
                structService.updateRootOrgname(self.setting);
            }
        };

        /*初始化查询菜单*/
        structService.getMenuList(self.search.orgname);

    }]);