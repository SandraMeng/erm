import Vue from "vue"
import VueRouter from 'vue-router'
import index from "../views/index.vue"
import org from "../views/org.vue"
import orgRoute from "../router/org"

Vue.use(VueRouter);

export default new VueRouter({
	// 组件懒加载：访问路由时，对应组件才会加载
	routes: [{
		path: "/login", 
		component: ()=>import("../views/login.vue")
	}, {
		path: "/", 
		component: index, // 首页不需要懒加载
		redirect: "/org",
		children: [{
			path: "org",
			name: "org",
			component: org,
			children: orgRoute,
			redirect: "/org/department"
		}]
	}]
});

