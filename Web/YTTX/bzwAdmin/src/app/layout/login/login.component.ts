import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'admin-login-form',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  private debug=true/*测试模式*/;

  loginForm: FormGroup;/*表单对象*/
  bgTheme=this.loginservice.getBgTheme();/*登录面板背景设置*/

  /*构造函数*/
  constructor(private loginservice: LoginService, private fb: FormBuilder) {}


  /*接口实现:(钩子实现)*/
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password:['', [Validators.required,Validators.minLength(6)]],
      identifyingCode:['', [Validators.required,Validators.minLength(4)]]
    });
  }

  /*获取表单的内置提示信息*/
  getFormControl(name) {
    return this.loginForm.controls[name];
  }

  /*表单提交*/
  loginSubmit() {
    this.loginservice.loginSubmit({
      debug:this.debug,
      form:this.loginForm
    });
    /*for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
    }*/
  }

}

