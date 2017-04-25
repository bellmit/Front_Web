/*首页控制器*/
angular.module('app')
    .controller('StructroleController', ['structroleService','powerService','toolUtil',function(structroleService,powerService,toolUtil){
        var self=this;


        /*模型--搜索*/
        this.search={
            searchactive:'',
            name:''
        };



        /*搜索过滤*/
        this.searchAction=function (e) {
            var kcode=e.keyCode;

            if(self.search.name===''){
                self.search.searchactive='';
            }else{
                self.search.searchactive='search-content-active';
            }
            if(kcode===13){
                /*to do*/
            }
        };
        /*清空过滤条件*/
        this.searchClear=function () {
            self.search.name='';
            self.search.searchactive='';
        };

    }]);