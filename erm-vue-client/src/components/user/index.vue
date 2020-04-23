<template>
	<div>
		<el-form ref="form" label-width="80px">
		    <el-select v-model="department" placeholder="部门" @change="searchDep">
		    	<el-option>不限</el-option>
		        <el-option v-model="item.name" v-for="(item, index) in departList" :key="index"></el-option>
		    </el-select>
		    <el-input type="search" style="width: 180px" placeholder="输入姓名、电话或邮箱" @change="search" @input="len" v-model="input"></el-input>
		</el-form>
		<el-table :data="userList" stripe style="width: 100%">
		    <el-table-column type="index" label="编号" align="center"></el-table-column>
		    <el-table-column prop="name" label="姓名"  align="center"></el-table-column>
		    <el-table-column label="性别" align="center">
		    	<!-- 作用域插槽 -->
		    	<template slot-scope="scope">
		    		<span v-html="scope.row.sex==0 ? '男' : '女'"></span>
		    	</template>
		    </el-table-column>
		    <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
		    <el-table-column prop="phone" label="电话" align="center"></el-table-column>
		    <el-table-column prop="department" label="部门" align="center"></el-table-column>
		    <el-table-column prop="job" label="职务"  align="center"></el-table-column>
		    <el-table-column prop="desc" label="描述" width="auto" align="center"></el-table-column>
		    <el-table-column label="操作" align="center" v-if="power.includes('userhandle')">
		        <template slot-scope="scope">
		        	<el-button @click="edit(scope.$index)">编辑</el-button>
		    		<el-button type="danger" @click="del(scope.row)">删除</el-button>
		        </template>
		    </el-table-column>
	    </el-table>
	</div>
</template>

<script>
	import Vuex from "vuex";
	import {deleteUser, search} from "@/api/index";
	export default {
	    data() {
	        return {
	        	power: localStorage.getItem("power"),
	        	index: 1,
	        	department: "",
	        	input: ""
	        }
	    },
	    created(){
	    	this.$store.dispatch("changeUserList");
	    	this.$store.dispatch("changeDepList");
	    },
	    computed: {
	    	...Vuex.mapState(["userList", "departList"])
	    },
	    methods: {
	    	del(curUser){
	    		this.$confirm("确定要删除吗？", "提示", {
	    			type: "warning"
	    		}).then(()=>{
	    			deleteUser(curUser.id).then(res=>{
	    				if (res.code == 0){
	    					this.$message("删除成功！", "提示");
	    					this.$store.dispatch("changeUserList");
	    				}
	    			})
	    		});
	    	},
	    	edit(index){
	    		this.$router.push({
	    			path: "/org/adduser",
	    			query: {
	    				index
	    			}
	    		});
	    	},
	    	searchDep(){
	    		this.find();
	    	},
	    	search(){
	    		this.find();
	    	},
	    	find(){
	    		let departId;
	    		if (!this.department || this.department === "不限")
	    			departId = 0;
	    		else
	    			departId = this.departList.find(item=>item.name===this.department).id;
	    		
	    		search(departId, this.input).then(res=>{
	    			this.$store.state.userList = res.data;
	    		});
	    	},
	    	len(){// 清空输入框时，发请求
	    		if (this.input.length===0){
	    			this.find();
	    		}
	    	}
	    }
    }
</script>

<style scoped lang="less">
	* {
		text-align: left;
	}
	.el-select {
		margin-right: 20px !important;
	}
	.el-input {
		font-size: 12px;
	}
</style>