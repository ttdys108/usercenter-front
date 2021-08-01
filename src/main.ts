import '@/sysconfig';

// webpack_public_path
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__!;
}

import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify';
import { registerMicroApps, start } from 'qiankun';

import VueRouter from "vue-router";

Vue.config.productionTip = false;

let instance: Vue | null;
let routerCopy: VueRouter | null;

function render(props: any = {}) {
  console.log('running mode: ', window.__POWERED_BY_QIANKUN__);
  const { container } = props;
  console.log('container: ', container);
  routerCopy = router;
  instance = new Vue({
    router: routerCopy,
    store,
    vuetify,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[usercenter] bootstraped by qiankun');
}
export async function mount(props: any) {
  console.log('[usercenter] mounted by qiankun, props from main framework', props);
  render(props);
}
export async function unmount() {
  console.log('[usercenter] unmounted by qiankun');
  instance!.$destroy();
  instance!.$el.innerHTML = '';
  instance = null;
  routerCopy = null;
}