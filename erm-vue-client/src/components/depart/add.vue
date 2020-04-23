<template>
	<el-form ref="form" :model="form" label-width="80px">
	    <el-form-item label="部门名称">
	        <el-input v-model="form.name" required></el-input>
	    </el-form-item>
	    <el-form-item label="部门描述">
	        <el-input type="textarea" v-model="form.desc" :rows="4" required></el-input>
	    </el-form-item>
	    <el-form-item>
    		<el-button type="primary" @click="submit">提交</el-button>
  		</el-form-item>
	</el-form>
</template>

<script>
	import Vuex from "vuex";
	import {updateDepart, addDepart} from "@/api/index.js"
	export default {
		name: "",
		data(){
			return {
				form: {
		            name: "",
		            desc: ''
                },
                index: this.$route.query.index
			};
		},
		// 善用钩子函数，最早可以使用响应式属性的地方
		created(){
			// 直接给form赋值
			this.index === undefined ? null : this.form = this.departList[this.$route.query.index];
		},
		beforeRouteUpdate(to,from,next){
			// 点击编辑后，再点击新增部门时，清空输入框
			this.form = {
				name: "",
		        desc: ""
			};
			this.index = undefined;
			next();
		},
		methods: {
		    submit() {
		    	let func, word,id;
		    	if (this.index === undefined){
		    		func = addDepart;
		    		word = "新增成功！";
		    	} else {
		    		func = updateDepart;
		    		word = "修改成功！";
		    		id = this.departList[this.index].id;
		    	}
		    	func(id, this.form.name, this.form.desc).then(res=>{
		    		if (res.code == 0) {
		    			this.$message(word);
		        	    this.$router.push("/org/department");
		    		}
		    	});
		    }
		},
		computed: {
			// departList在created阶段才能获取
			...Vuex.mapState(["departList"])
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