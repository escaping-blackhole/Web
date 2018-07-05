// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

import {
  Loading,
  MessageBox,
  Notification,
  Message,
  Table,
  TableColumn,
  Popover,
  Container,
  Header,
  Main,
  Aside,
  Menu,
  MenuItem,
  Submenu,
  Upload,
  Row,
  Button,
  Tag,
  Col,
  FormItem,
  Form,
  MenuItemGroup,
  Dialog,
  Pagination,
  Input,
  Select,
  Option,
  // DropdownMenu,
  // Dropdown,
  // DropdownItem
} from 'element-ui';

Vue.use(Table);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Upload);
Vue.use(Row);
Vue.use(Col);
Vue.use(MenuItemGroup);
Vue.use(Aside);
Vue.use(Dialog);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Button);
Vue.use(Tag);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
// Vue.use(Dropdown);
// Vue.use(DropdownItem);
// Vue.use(DropdownMenu);


Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
