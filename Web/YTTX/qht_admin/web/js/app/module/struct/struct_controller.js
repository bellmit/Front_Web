/*首页控制器*/
angular.module('app')
    .controller('StructController', ['structService',function(structService){
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
        this.searchactive='';
        this.orgname='';

        /*机构设置*/
        this.editstate=true;
        this.rootOrgname='深圳银通支付有限公司';
        this.add_substruct_state=false;
        this.adjuct_pos_state=false;



        /*搜索过滤*/
        this.searchAction=function (e) {
            var kcode=window.event?e.keyCode:e.which;

            if(self.orgname===''){
                self.searchactive='';
            }else{
                self.searchactive='search-content-active';
            }
            if(kcode===13){
                structService.getMenuList(self.orgname);
            }
        };
        /*清空过滤条件*/
        this.searchClear=function () {
            self.orgname='';
            self.searchactive='';
        };
        /*子菜单展开*/
        this.toggleSubMenu=function (e) {
            e.preventDefault();

            var target=e.target,
                node=target.nodeName.toLowerCase();
            if(node==='ul'||node==='li'){
                return false;
            }
            var $this=$(node),
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
            if(node==='ul'){
                return false;
            }
            var $this=$(node),
                haschild=$this.hasClass('ts-child');

            if(haschild){
                if($this.hasClass('ts-active')){
                    /*隐藏*/
                    $this.removeClass('ts-active');
                }else{
                    /*显示*/
                    $this.addClass('ts-active');
                }
            }
        };


        /*切换编辑状态*/
        this.editRootOrgname=function () {
           self.editstate=!self.editstate;
        };



        /*初始化查询菜单*/
        structService.getMenuList(this.orgname);

    }]);