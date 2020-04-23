export default {
	changeDepList(state, payload){
		state.departList = payload;
	},
	getJobList(state, payload){
		state.jobList = payload;
	},
	getUserList(state, payload){
		state.userList = payload;
	}
}