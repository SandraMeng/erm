<template>
	<el-aside>
		<el-menu class="el-menu-vertical-demo" background-color="#4a4846" text-color="#fff">
	        <el-submenu v-for="(item, index) in menuList" :key="index" :index="index+''">
		        <template slot="title">
		            <i :class="item[0].meta.icon"></i>
		            <span v-html="item[0].meta.rootTil"></span>
		        </template>
		        <el-menu-item-group>
		            <el-menu-item v-for="(cur,index) in item" :key="index" :index="index+''">
		            	<router-link :to="cur.path" v-html="cur.meta.til" tag="span"></router-link>
		            </el-menu-item>
		        </el-menu-item-group>
		    </el-submenu>
		</el-menu>
	</el-aside>
</template>

<script>
	export default {
		name: "myaside",
		data(){
			return {
				menuList: [],
				power: localStorage.getItem("power")
			};
		},
		created(){
			this.init_menuList();
		},
		methods: {
			init_menuList(){
				if (this.power === "")
					return;

				// 筛选出权限内的菜单项
				let routes = this.routes;
				routes = this.routes.filter(item=>{
					return this.power.includes(item.meta.power);
				});
				// 分组
				let arr = [routes[0]];
				this.routes.reduce((prev,next)=>{
					if (prev.meta.type===next.meta.type){
						arr.push(next);
					} else {
						this.menuList.push(arr);
						arr = [next];
					}
					return next;
				});
				this.menuList.push(arr);

			}
		},
		props: ["routes"]
	}
</script>

<style scoped lang="less">
	.el-aside {
		width: 240px !important;
		height: 100%;
		background: #4a4846;
		.el-menu {
			border: 0;

		}
		.el-menu-vertical-demo {
			text-align: left;
		}
		
	}
	
</style>