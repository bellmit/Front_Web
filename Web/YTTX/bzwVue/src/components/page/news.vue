<template>
  <div class="screen-item screen-news" id="screen_news">
    <div>
      <h3 class="theme g-c-base">新闻资讯</h3>
      <div class="screen-box" v-cloak>
        <div class="screen-newstab-wrap">
          <div class="tab-btn tab-btn-left" id="tab_btn_left"></div>
          <div class="tab-show" id="tab_btn">
            <span v-for="tab in tablist">{{tab.theme}}</span>
          </div>
          <div class="tab-btn tab-btn-right" id="tab_btn_right"></div>
        </div>
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
  import VueAxios from 'vue-axios'
  //Vue.use(VueAxios, axios)


  export default {
    name: 'cc_news',
    data() {
      return {
        tabconfig: {
          btn_left: false,
          btn_right: false,
          limit: 5
        },
        tablist: [{
          id: '1',
          theme: '新闻中心'
        }, {
          id: '2',
          theme: '公司历程'
        }, {
          id: '3',
          theme: '招商加盟'
        }, {
          id: '4',
          theme: '公司公告'
        }, {
          id: '5',
          theme: '关于软件'
        }],
        newslist: [{
          id: '1',
          src: 'static/images/1.jpg',
          title: '2018年是“实体+互联网”的元年！',
          info: '刘强东谈“无界零售”，马云谈“新零售”，雷军谈“小米之家”，他们几位因为互联网企业做大了，知名度高了，形成号召力了！所以，所规划的一切，都是'
        }, {
          id: '2',
          src: 'static/images/2.jpg',
          title: '传统门店逆袭之路－布住网新零售！',
          info: '近来广受关注的门店新零售增长迅速，并且不断出现新玩法。有近80％的零售选择线上线下融合式的购物方式，全渠道成为了大家的共识。新零售要给用户带'
        }, {
          id: '3',
          src: 'static/images/3.jpg',
          title: '热烈祝贺『布住网』东莞区域项目推介会取得圆满成功！',
          info: '2017年12月13日，『布住网』东莞区域项目推介会在深圳金龙轩酒店盛大召开。深圳乾鼎盛世实业有限公司总裁孔新建、布住网项目运营总监吴胜利出'
        }, {
          id: '4',
          src: 'static/images/1.jpg',
          title: '热烈祝贺【布住网】全国销售会议取得圆满成功！',
          info: '2017年12月3日，深圳乾鼎盛世实业有限公司【布住网】全国销售会议在深圳总部（高新奇科技园）隆重召开。会议由乾鼎盛世董事屈东芝女士、集采中'
        }, {
          id: '5',
          src: 'static/images/3.jpg',
          title: '创新找到差异化的价值!',
          info: '现在最大的经济挑战就是同质化，所有的产品都是以别人创新的产品再以便宜的价格模仿出来，这样比性价比的模式是非常危险的。想要在消费者心中占据位置'
        }, {
          id: '6',
          src: 'static/images/2.jpg',
          title: '深入解剖互联网+如何落地？',
          info: '去年很多人都认为互联网就是工具，一说互联网就是电商。一年过去了，我们发现互联网其实正在成为我们每个人的信仰。“互联网+"在我看来代表着一个新'
        }]
      }
    },
    mounted() {
      axios.get('static/json/test.json')
        .then(() => {
          /*测试模式*/
          let result = Mock.mock({
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|3-10': [{
              // 属性 id 是一个自增数，起始值为 1，每次增 1
              'id|+1': 1,
              'theme': /[a-zA-Z0-9]{2,10}/
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
    methods: {
      renderNewsTab(data) {
        console.log(data);
        if (data === null) {

        } else {

        }
      }
    }
  }
</script>
