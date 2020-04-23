<template>
	<div class="box">
		<h2>CRM客户管理系统</h2>
		<h3>(用户名：admin, 密码：666)</h3>
		<div class="inputs">
			<el-input v-model="username" placeholder="请输入用户名" prefix-icon="el-icon-user" class="username"></el-input>
			<el-input v-model="password" type="password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
			<el-button type="primary" class="button" @click="login">登录</el-button>
		</div>
	</div>
</template>

<script>
	// @相当于./src，已经配置好的
	import {login} from "@/api/login";
	export default {
		name: "login",
		data(){
			return {
				username: "",
				password: ""
			}
		},
		methods: {
			login(){
				if (!this.username || !this.password){
					this.$message.error("用户名或密码不能为空！");
					return;
				}
				login({account: this.username, password: this.password}).then(data=>{
					if (data.code == 1){
						this.$alert("用户名或密码错误", "提示", {
							confirmButtonText: "确定"
						});
					} else if (data.code == 0){
						this.$alert("登录成功", "提示", {
							confirmButtonText: "确定",
							callback: action=>{// action可以判断点击了哪个按钮
								// 切换到"/"
								this.$router.push("/");
								// 缓存power
								localStorage.setItem("power", data.power);
							}
						});
					}
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.box {
		width: 500px;
		margin: 100px auto;
		text-align: center;

		h2 {
			line-height: 50px;
		}

		h3 {
			font-size: 15px;
		}
		// 为组件设置样式时，不要用标签选择器，会被替换
		.inputs {
			width: 300px;
			margin: 20px auto 20px; 
			
			.username {
				margin-bottom: 10px;
			}

			.button {
				margin-top:20px;
				width: 80px;
			}
		}

		p {
			position: absolute;
			bottom: 5px;
			left: 50%;
			transform: translateX(-50%);
			font-size: 14px;
			line-height: 5px;
		}
	}
</style>