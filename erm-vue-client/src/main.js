import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { 
	Button, 
	Input, 
	MessageBox, 
	Message, 
	Container, 
	Header, 
	Menu, 
	MenuItem, 
	Main, 
	Aside, 
	Submenu, 
	MenuItemGroup, 
	Form, 
	Select, 
	Option, 
	Table, 
	TableColumn, 
	FormItem, 
	Checkbox, 
	CheckboxGroup
} from 'element-ui';
import "element-ui/lib/theme-chalk/index.css"

Vue.use(Button).use(Input).use(Container).use(Header);
Vue.use(Menu).use(MenuItem).use(Main).use(Aside).use(Submenu).use(MenuItemGroup);
Vue.use(Form).use(Select).use(Option).use(Table).use(TableColumn).use(FormItem);
Vue.use(Checkbox).use(CheckboxGroup);

// 将弹出层函数注入Vue
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')