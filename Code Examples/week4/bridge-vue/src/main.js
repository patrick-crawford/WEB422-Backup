import Vue from 'vue';
import App from './App.vue';

// See https://vuejs.org/v2/guide/deployment.html
// https://vuejs.org/v2/api/#productionTip
Vue.config.productionTip = false;

// Good discussion of this style at:
// https://css-tricks.com/what-does-the-h-stand-for-in-vues-render-method/
new Vue({
  render: h => h(App),
}).$mount('#app');
