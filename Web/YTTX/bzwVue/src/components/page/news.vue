<template>
  <div class="screen-item screen-news" id="screen_news">
    <div>
      <h3 class="theme g-c-base">新闻资讯</h3>
      <div class="screen-box" v-cloak>
        <div class="screen-newstab-wrap">

          <!--左按钮-->
          <template v-if="tabconfig.btn_left">
            <div class="tab-btn tab-btn-left" v-bind:class="tabconfig.tabindex===0?tabconfig.btnClass:''"
                 v-on:click="btnNewsTab('left')"></div>
          </template>
          <template v-else>
            <div class="tab-btn tab-btn-left" v-bind:class="tabconfig.btnClass"></div>
          </template>

          <!--展示区-->
          <template v-if="tabconfig.list>=2">
            <div class="tab-show">
              <span v-on:click="tabNewsTab(index)"
                    v-bind:class="tabconfig.tabindex === index?tabconfig.tabClass:''"
                    v-for="(tab,index) in tablist">{{tab.theme}}</span>
            </div>
          </template>
          <template v-else>
            <div class="tab-show">
              <span v-bind:class="tabClass(index)"
                    v-for="(tab,index) in tablist">{{tab.theme}}</span>
            </div>
          </template>

          <!--右按钮-->
          <template v-if="tabconfig.btn_right">
            <div class="tab-btn tab-btn-right"
                 v-bind:class="tabconfig.tabindex>=tabconfig.list - 1?tabconfig.btnClass:''"
                 v-on:click="btnNewsTab('right')"></div>
          </template>
          <template v-else>
            <div class="tab-btn tab-btn-right" v-bind:class="tabconfig.btnClass"></div>
          </template>
        </div>
        {{tabconfig}}
        <div class="screen-newslist">
          <ul id="newstab_show">
            <li v-for="news in newslist">
              <div>
                <img alt="" v-bind:src="news.src">
              </div>
              <h4>{{news.title}}</h4>
              <p>{{news.info}}<a target="_blank" href="">详情</a></p>
            </li>
          </ul>
          <div class="newstab-more" id="newstab_more"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  /*导入异步模块*/
  //import VueAxios from 'vue-axios'

  //Vue.use(VueAxios, axios)


  export default {
    name: 'cc_news',
    data() {
      return {
        tabconfig: {
          btn_left: false,
          btn_right: false,
          limit: 5,
          tabindex: 0/*默认选中第几个选项*/,
          list: 0/*默认有多少个栏目*/,
          tabClass: 'tab-active'/*选项高亮*/,
          btnClass: 'tab-btn-disabled'/*按钮状态*/,
          hideindex: 0/*隐藏部分索引值*/
        },
        tablist: [],
        newslist: [{
          id: '1',
          src: 'static/images/1.jpg',
          title: '2018年是“实体+互联网”的元年！',
          info: '刘强东谈“无界零售”，马云谈“新零售”，雷军谈“小米之家”，他们几位因为互联网企业做大了，知名度高了，形成号召力了！所以，所规划的一切，都是'
        }]
      }
    },
    created/*mounted*/() {
      axios.get('static/json/test.json')
        .then(() => {
          /*测试模式*/
          let result = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|6-8': [{
              // 属性 id 是一个自增数，起始值为 1，每次增 1
              'id|+1': 1,
              'theme|+1': 0/*/[a-zA-Z0-9]{2,10}/*/
            }]
          });
          if (!result) {
            /*请求异常*/
            this.renderNewsTab(null);
          } else {
            /*渲染数据*/
            this.renderNewsTab(result.list);
          }
        })
    },
    computed: {},
    methods: {
      /*初始化渲染tab标签*/
      renderNewsTab(data) {
        this.stateNewsTab(data);
        this.dataNewsTab(data);
      },
      /*tab状态控制*/
      stateNewsTab(data) {
        /*data:是否为有效数据状态*/
        if (data === null) {
          this.tabconfig = Object.assign({}, this.tabconfig, {
            btn_left: false,
            btn_right: false,
            list: 0,
            tabindex: 0
          });
        } else {
          let len = data.length;
          if (len >= 2 && len <= this.tabconfig.limit) {
            if (this.tabconfig.tabindex >= len) {
              this.tabconfig = Object.assign({}, this.tabconfig, {
                btn_left: false,
                btn_right: false,
                tabindex: len - 1,
                list: len
              });
            } else {
              this.tabconfig = Object.assign({}, this.tabconfig, {
                btn_left: false,
                btn_right: false,
                list: len
              });
            }
          } else if (typeof len === 'undefined') {
            this.tabconfig = Object.assign({}, this.tabconfig, {
              btn_left: false,
              btn_right: false,
              list: 0,
              tabindex: 0
            });
          } else if (len < 2) {
            this.tabconfig = Object.assign({}, this.tabconfig, {
              btn_left: false,
              btn_right: false,
              list: len,
              tabindex: 0
            });
          } else if (len > this.tabconfig.limit) {
            if (this.tabconfig.tabindex >= len) {
              this.tabconfig = Object.assign({}, this.tabconfig, {
                btn_left: true,
                btn_right: true,
                tabindex: len - 1,
                list: len
              });
            } else {
              this.tabconfig = Object.assign({}, this.tabconfig, {
                btn_left: true,
                btn_right: true,
                list: len
              });
            }
          }
        }
      },
      /*tab数据解析*/
      dataNewsTab(data) {
        if (data === null) {
          this.tablist = [];
        } else if (typeof data.length === 'undefined') {
          this.tablist = [data];
        } else {
          this.tablist = data;
        }
      },
      /*tab事件绑定*/
      tabNewsTab(index) {
        this.tabconfig.tabindex = index;
      },
      /*绑定tab切换事件*/
      btnNewsTab(type) {
        if (type === 'left') {
          /*过滤非法状态事件*/
          if (this.tabconfig.tabindex === 0) {
            return false;
          } else {
            this.tabconfig.tabindex--;
            if (this.tabconfig.tabindex >= this.tabconfig.limit) {
              this.tabconfig.hideindex = this.tabconfig.tabindex + 1 - this.tabconfig.limit;
            } else {
              this.tabconfig.hideindex = 0;
            }
          }
        } else if (type === 'right') {
          /*过滤非法状态事件*/
          if (this.tabconfig.tabindex >= this.tabconfig.list - 1) {
            return false;
          } else {
            this.tabconfig.tabindex++;
            if (this.tabconfig.tabindex >= this.tabconfig.limit) {
              this.tabconfig.hideindex = this.tabconfig.tabindex + 1 - this.tabconfig.limit;
            } else {
              this.tabconfig.hideindex = 0;
            }
          }
        }
      }
    }
  }
</script>
