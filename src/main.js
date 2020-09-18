import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dataV from '@jiaminghi/data-view';
import echarts from 'echarts';
import eleUI from 'element-ui';

Vue.use(dataV);
Vue.use(echarts)
Vue.use(eleUI)
import 'element-ui/lib/theme-chalk/index.css';
// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';
import 'vue-awesome/icons/align-left.js';
// 引入hcharts

var Highcharts = require('highcharts')
// 在 Highcharts 加载之后加载功能模块
require('highcharts/modules/sankey')(Highcharts)
// 引入主题
import '@/common/BI.js';
// 全局注册图标
Vue.component('icon', Icon);

// 适配flex
import '@/common/flexible.js';

// 引入全局css
import './assets/scss/style.scss';
// 全局引用过滤器
// import * as custom from './utils/filters'
// // 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
// Object.keys(custom).forEach(key => {
//   Vue.filter(key, custom[key])
// })
// //全局字号
import { fontSize } from './utils';
// 全局挂载
Vue.prototype.fontSize = fontSize
Vue.config.productionTip = false;
//引入轮播
import NutUI from '@nutui/nutui';
import '@nutui/nutui/dist/nutui.css';
NutUI.install(Vue);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
