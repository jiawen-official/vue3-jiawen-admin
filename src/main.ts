import { createApp, Directive } from 'vue';
import App from './App.vue';
import router from '@/router';

import { createPinia } from 'pinia';

import ElementPlus from 'element-plus';
import jwPagination from '@/components/views/jw-pagination/jw-pagination.vue';
import '@/permission';

// 引入svg注册脚本
import 'virtual:svg-icons-register';

// 国际化
import i18n from '@/lang/index';

// 自定义样式
import '@/styles/index.scss';

const app = createApp(App);

// 自定义指令
import * as directive from '@/directive';

Object.keys(directive).forEach(key => {
  app.directive(key, (directive as { [key: string]: Directive })[key]);
});

// 注册全局组件
app
  .component('jwPagination', jwPagination)
  .use(createPinia())
  .use(router)
  .use(ElementPlus)
  .use(i18n)
  .mount('#app');
