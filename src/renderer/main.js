import Vue from 'vue';
import VueKonva from '../../node_modules/vue-konva/umd/vue-konva.js';

import App from './App';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

Vue.use(VueKonva);

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
}).$mount('#app');
