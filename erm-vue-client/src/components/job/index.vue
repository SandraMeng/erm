<template>
	<el-table :data="jobList" stripe style="width: 100%">
	    <el-table-column type="index" label="编号" width="100" align="center"></el-table-column>
	    <el-table-column prop="name" label="职务" width="100" align="center"></el-table-column>
	    <el-table-column prop="desc" label="描述" width="auto" align="center"></el-table-column>
	    <el-table-column label="权限" width="auto" align="center">
	    	<template slot-scope="scope">
	    		<span>{{scope.row.power|showPower}}</span>
	    	</template>
	    </el-table-column>
	    <el-table-column prop="operation" label="操作" align="center" v-if="power.includes('jobhandle')">
	        <template slot-scope="scope">
	        	<el-button @click="edit(scope.$index)">编辑</el-button>
	    		<el-button type="danger" @click="del(scope.row)">删除</el-button>
	        </template>
	    </el-table-column>
    </el-table>
</template>

<script>
	import Vuex from "vuex";
	import {deleteJob} from "@/api/index"
	export default {
	    data() {
	        return {
	        	power: localStorage.getItem("power"),
	        	index: 1
	        }
	    },
	    created(){
	    	this.$store.dispatch("changeJobList");
	    },
	    computed: {
	    	...Vuex.mapState(["jobList"])
	    },
	    filters: {
	    	showPower(val){
	    		if (typeof val == "string"){
	    			let arr = val.split("|");
		    		let obj = {
		    			"userhandle": "用户操作",
		    			"departhandle": "部门操作",
		    			"jobhandle": "职务操作",
		    			"resetpassword": "重置密码"
		    		};
		    		return arr.map(item=>obj[item]).join("，").replace(/^，/, '');
	    		}
	    	}
	    },
	    methods: {
	    	del(curJob){
	    		this.$confirm("确定要删除吗？", "提示", {
	    			type: "warning"
	    		}).then(()=>{
	    			deleteJob(curJob.id).then(res=>{
	    				if (res.code == 0){
	    					this.$message("删除成功！", "提示");
	    					this.$store.dispatch("changeJobList");
	    				}
	    			})
	    		});
	    	},
	    	edit(index){
	    		this.$router.push({
	    			path: "/org/addjob",
	    			query: {
	    				index
	    			}
	    		});
	    	}
	    }
    }
</script>

<style scoped lang="less">
	.el-button {
		padding: 10px 15px;
		font-size: 12px;
	}
</style>