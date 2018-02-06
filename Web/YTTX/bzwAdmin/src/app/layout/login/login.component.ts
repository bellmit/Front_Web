import {Component, Output, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'admin-login-form',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  private debug = true/*测试模式*/;

  loginForm: FormGroup;
  /*表单对象*/
  bgTheme = this.loginservice.getBgTheme();
  /*登录面板背景设置*/
  @Output() login = {
    islogin: false, /*是否登录*/
    message: ''/*登录提示信息*/
  };
  /*验证码地址*/
  
  validcode_src='assets/images/bg/bg_default.png';


  /*构造函数*/
  constructor(private loginservice: LoginService, private fb: FormBuilder) {}


  /*接口实现:(钩子实现)*/
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      identifyingCode: ['', [Validators.required, Validators.minLength(4)]]
    });
    this.getValidCode();
  }

  /*获取表单的内置提示信息*/
  getFormControl(name) {
    return this.loginForm.controls[name];
  }

  /*表单提交*/
  loginSubmit() {
    this.loginservice.loginSubmit({
      debug: this.debug,
      form: this.loginForm,
      login: this.login
    });
    /*for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
    }*/
  }

  /*测试信息显示*/
  showMessage() {
    let toggle = Math.floor(Math.random() * 10) % 2 === 0;
    if (toggle) {
      this.login.message = Math.random().toString();
      setTimeout(() => {
        this.login.message = '';
      }, 3000);
    } else {
      this.login.message = '';
    }
  }


  getValidCode(){
    this.loginservice.getValidCode({
      debug:this.debug,
      src:this
    });
  }



}

