<template>
	<el-main>
		<el-table :data="departList" stripe style="width: 100%">
		    <el-table-column type="index" label="编号" width="100" align="center"></el-table-column>
		    <el-table-column prop="name" label="名称" width="140" align="center"></el-table-column>
		    <el-table-column prop="desc" label="描述" width="auto" align="center"></el-table-column>
		    <el-table-column prop="operation" label="操作" align="center" v-if="power.includes('departhandle')">
		        <template slot-scope="scope">
		        	<!-- 当前行对象在departList中的索引位置 -->
		        	<el-button @click="edit(scope.$index)">编辑</el-button>
		        	<!-- 当前行对象 -->
		    		<el-button type="danger" @click="del(scope.row)">删除</el-button>
		        </template>
		    </el-table-column>
        </el-table>
	</el-main>
</template>

<script>
	import Vuex from "vuex";
	import {deleteDepart} from "@/api/index";
	export default {
	    data() {
	        return {
	        	// VUE指令的值必须是在实例上注册过的响应式数据
	        	power: localStorage.getItem("power"),
	        	index: 1
	        }
	    },
	    created(){
	    	this.$store.dispatch("changeDepList");
	    },
	    computed: {// 列表的渲染依赖公共响应式数据 departList
	    	...Vuex.mapState(["departList"])
	    },
	    methods: {
	    	del(curDep){
	    		this.$confirm("确定要删除吗？", "提示", {
	    			type: "warning"
	    		}).then(()=>{
	    			deleteDepart(curDep.id).then(res=>{
	    				if (res.code == 0){
	    					this.$message("删除成功！", "提示");
	    					this.$store.dispatch("changeDepList");
	    				}
	    			})
	    		});
	    	},
	    	edit(index){
	    		this.$router.push({
	    			path: "/org/adddepartment",
	    			query: {
	    				index
	    			}
	    		});
	    	}
	    }
    }
</script>

<style scoped lang="less">
	.el-main {
		padding-top:0;
		.el-button {
			padding: 10px 15px;
			font-size: 12px;
		}
	}
</style>