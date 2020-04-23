<template>
	<el-form ref="form" :model="form" label-width="80px">
	    <el-form-item label="姓名">
	        <el-input v-model="form.name"></el-input>
	    </el-form-item>
	    <el-form-item label="性别">
	        <el-input v-model="form.sex"></el-input>
	    </el-form-item>
	    <el-form-item label="邮箱">
	        <el-input v-model="form.email"></el-input>
	    </el-form-item>
	    <el-form-item label="电话">
	        <el-input v-model="form.phone"></el-input>
	    </el-form-item>
	    <el-form-item label="部门">
		    <el-select v-model="form.department" placeholder="所有部门">
		        <el-option v-model="item.name" v-for="(item,index) in departList" :key="index"></el-option>
		    </el-select>
	    </el-form-item>
	    <el-form-item label="职位">
		    <el-select v-model="form.job" placeholder="所有职位">
		        <el-option v-model="item.name" v-for="(item,index) in jobList" :key="index"></el-option>
		    </el-select>
	    </el-form-item>
	    <el-form-item label="描述">
	        <el-input type="textarea" v-model="form.desc" :rows="4"></el-input>
	    </el-form-item>
	    <el-form-item>
    		<el-button type="primary" @click="submit">提交</el-button>
  		</el-form-item>
	</el-form>
</template>

<script>
	import Vuex from "vuex";
	import {updateUser, addUser} from "@/api/index.js"
	export default {
		name: "",
		data(){
			return {
				form: {
		            name: "",
		            sex: "",
                	email: "",
                	phone: "",
                	department: "",
                	departmentId: "",
                	job: "",
                	jobId: "",
                	desc: ""
                },
                index: this.$route.query.index,
			};
		},
		// 善用钩子函数
		created(){
			this.$store.dispatch("changeDepList");
			this.$store.dispatch("changeJobList");
			if (this.index !== undefined){
				let cur_user = this.userList[this.index];
				cur_user.sex = cur_user.sex==0?"男":"女";
				this.form = cur_user;
			}
		},
		beforeRouteUpdate(to,from,next){
			this.form = {
	            name: "",
	            sex: "",
            	email: "",
            	phone: "",
            	department: "",
            	departmentId: "",
            	job: "",
            	jobId: "",
            	desc: ""
            };
			this.index = undefined;
			next();
		},
		methods: {
		    submit() {
		    	let func, word, id;
		    	if (this.index === undefined){
		    		func = addUser;
		    		word = "新增成功！";
		    	} else {
		    		func = updateUser;
		    		word = "修改成功！";
		    		id = this.userList[this.index].id;
		    	}
		    	let form = this.form,
		    		jobId = this.jobList.find(item=>item.name===form.job).id,
		    		departId = this.departList.find(item=>item.name===form.department).id,
		    		sex = form.sex === "男"? 0: 1;
		    	func(id, form.name, sex, form.email, form.phone, departId, jobId, form.desc).then(res=>{
		    		if (res.code == 0) {
		    			this.$message(word);
		        	    this.$router.push("/org/user");
		    		}
		    	});
		    }
		},
		computed: {
			...Vuex.mapState(["jobList", "departList", "userList"])
		}
	}
</script>

<style scoped lang="less">
	.el-form {
		text-align: left;
		.el-input {
			width: 400px;
		}
		.el-textarea {
			width: 400px;
		}
	}
</style>