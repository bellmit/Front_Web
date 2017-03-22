'use strict';

/*控制器设置基本配置*/

(function () {
  angular.module('app')
      .controller('SupportController', ['toolUtil',function(toolUtil) {
        this.isSupport=toolUtil.isSupport();
    }])
      .controller('LoginController',['toolUtil','loginService',function (toolUtil,loginService) {
          var self=this;

          /*模型*/
          this.isLogin=loginService.isLogin()/*是否存在*/;

          this.login={
              username:'',
              password:'',
              identifyingCode:''
          };

          /*设置提示*/
          $.extend(true,toastr.options,{
              positionClass: "toast-top-center"
          });

          /*绑定提交*/
          this.submitLogin=function () {
              /*校验成功*/
              toolUtil.requestHttp({
                  url:'/sysuser/login',
                  method:'post',
                  set:true,
                  data:self.login
              }).then(function(resp){
                  self.isLogin=loginService.reqAction(resp,self.login.username);
              },
              function(resp){
                  self.isLogin=false;
                  var message=resp.data.message;
                  if(typeof message !=='undefined'&&message!==''){
                      toastr.error(message);
                  }else{
                      toastr.error('登录失败');
                  }
              });
              return false;
          };
          /*获取验证码*/
          this.getValidCode=function () {
              loginService.getValidCode({
                  wrap:'validcode_wrap',
                  url:"/sysuser/identifying/code"
              });
          };
          /*退出*/
          this.loginOut=function () {
              toolUtil.loginOut();
              self.isLogin=false;
              self.login={
                  username:'',
                  password:'',
                  identifyingCode:''
              };
          }
      }]);
}());


/*var dia=toolDialog.dia();
 $scope.testHaha=function(){
 toolDialog.show({
 dia:dia,
 type:'warn',
 value:'你妹，还是你妹'
 });
 };
 $scope.testHehe=function(){
 var suredia=toolDialog.sureDialog(dia);
 suredia.sure('',function(cf){
 var tip=cf.dia;
 toolDialog.show({
 dia:dia,
 type:'warn',
 value:'你妹，还是你妹'
 });
 },"是否审核该商品?",true);
 };*/
