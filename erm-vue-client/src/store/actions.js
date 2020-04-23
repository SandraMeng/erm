import {getDepartList, getJobList, getUserList} from "@/api/index.js"
export default {
	changeDepList({commit}){
		getDepartList().then(data=>{
			if (data.code==0){
				commit("changeDepList", data.data);
			}
		})
	},
	changeJobList({commit}){
		getJobList().then(data=>{
			if (data.code==0){
				commit("getJobList", data.data);
			}
		})
	},
	changeUserList({commit}){
		getUserList().then(data=>{
			if (data.code==0){
				commit("getUserList", data.data);
			}
		})
	}
}