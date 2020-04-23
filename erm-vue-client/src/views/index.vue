<template>
	<el-container class="box">
	  	<el-header class="header">
	  		<div class="nav">
	  			<h2>员工管理系统</h2>
		  		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="black" text-color="#fff" active-text-color="#bbb">
		  			<el-menu-item index="0"><router-link to="/org">组织结构</router-link></el-menu-item>
		  		</el-menu>
	  		</div>
	  		<div class="welcome">
	  			<span v-html="`你好，${name}`"></span>
	  			<a href="##" @click="signout">退出登录</a>
	  		</div>
	  	</el-header>
	  	<div class="body">
	  		<router-view></router-view>
	  	</div>
	</el-container>
</template>

<script>
	import {signout, getUserName, checkLogin} from "@/api/index";
	import $router from "@/router/index.js";
	export default {
		name: "index",
		data(){
			return {
				activeIndex: "0",
				name: ""
			};
		},
		// 拦截路由，验证是否登录
		beforeRouteEnter(to,from,next){
			checkLogin().then(data=>{
				if (data.code==0){
					next();
				} else {
					alert("请先登录！");
					$router.push("/login");
				}
			});
		},
		created(){
			this.getUserName();
		},
		methods: {
			// 获取登录者姓名
			getUserName(){
				getUserName().then(res=>{
					if (res.code == 0){
						this.name = res.data.name;
					}
				})
			},
			// 退出请求
			signout(){
				signout().then(data=>{
					if (data.code == 0){
						this.$confirm("您确定要退出吗？", "提示", {
							confirmButtonText: "确定",
							cancleButtonText: "取消",
							callback: action=>{
								if (action === "confirm") {
									setTimeout(()=>{
										this.$router.push("/login");
									}, 500)
								}
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.box {
		width: 100%;
		.header {
			padding: 0 25px;
			height:50px !important;
			background: black;
			color: #fff;
			h2 {
				line-height: 50px;
				margin-right: 80px;
				font-size: 24px;
			}
			.nav {
				display: flex;
				float:left;

				.el-menu--horizontal{
					>.el-menu-item {
						height: 50px;
						line-height: 50px;
						font-size: 17px;
						padding: 0 13px;
					}
				}
				
				a {
					text-decoration: none;
				}
			}
			.welcome {
				float: right;
				line-height: 50px;
				a {
					color: #fff;
					margin-left: 15px;
				}
			}
		}
		.body {
			position: absolute;
			top: 50px;
			bottom: 0;
			height: calc(100% - 50px);
			width: 100%;
			.el-container {
				height: 100%;
			}
		}
	}
</style>