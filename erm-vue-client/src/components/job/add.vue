<template>
	<!-- 表单元素通过height和min-height设置高度无效，只能通过rows动态属性设置 -->
	<el-form ref="form" :model="form" label-width="80px">
	    <el-form-item label="职务名称">
	        <el-input v-model="form.name" required></el-input>
	    </el-form-item>
	    <el-form-item label="职务描述">
	        <el-input type="textarea" v-model="form.desc" :rows="4"></el-input>
	    </el-form-item>
	    <el-form-item label="职务权限">
	        <el-checkbox-group v-model="form.power">
	        	<el-checkbox label="userhandle"></el-checkbox>
	        	<el-checkbox label="departhandle"></el-checkbox>
	        	<el-checkbox label="jobhandle"></el-checkbox>
	        	<el-checkbox label="resetpassword"></el-checkbox>
	        </el-checkbox-group>
	    </el-form-item>
	    <el-form-item>
    		<el-button type="primary" @click="submit">提交</el-button>
  		</el-form-item>
	</el-form>
</template>

<script>
	import Vuex from "vuex";
	import {updateJob, addJob} from "@/api/index.js"
	export default {
		name: "",
		data(){
			return {
				form: {
		            name: "",
		            desc: '',
                	power: []
                },
                index: this.$route.query.index,
			};
		},
		// 善用钩子函数
		created(){
			// 判断是否要修改信息，或者新增信息
			if (this.index !== undefined){
				let form = this.jobList[this.index];
				form.power = form.power.split("|");
				this.form = form;
			}
		},
		beforeRouteUpdate(to,from,next){
			this.form = {
				name: "",
		        desc: "",
		        power: []
			};
			this.index = undefined;
			next();
		},
		methods: {
		    submit() {
		    	let func, word, id;
		    	if (this.index === undefined){
		    		func = addJob;
		    		word = "新增成功！";
		    	} else {
		    		func = updateJob;
		    		word = "修改成功！";
		    		id = this.jobList[this.index].id;
		    	}
		    	func(id, this.form.name, this.form.desc, this.form.power.join("|")).then(res=>{
		    		if (res.code == 0) {
		    			this.$message(word);
		        	    this.$router.push("/org/job");
		    		}
		    	});
		    }
		},
		computed: {
			// departList在created阶段才能获取
			...Vuex.mapState(["jobList"])
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