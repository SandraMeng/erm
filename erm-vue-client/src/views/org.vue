<template>
	<el-container>
		<myaside :routes="routes"></myaside>
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script>
	import routes from "@/router/org"
	import myaside from "@/components/myaside.vue"
	export default {
		data(){
			return {
				routes
			};
		},
		components: {
			myaside
		}
	}
</script>

<style scoped lang="less">
	.el-main {
		width: (100% - 260px);
	}
</style>