import http from "./http";
function signout(){
	return http.get("/user/signout");
}

function getDepartList(){
	return http.get("/department/list");
}

function getUserList(){
	return http.get("/user/list");
}

function getJobList(){
	return http.get("/job/list");
}

function getUserName(){
	return http.get("/user/info");
}

function checkLogin(){
	return http.get("/user/login");
}

function deleteDepart(departmentId){
	return http.get("/department/delete", {
		params: {
			departmentId
		}
	});
}

function deleteJob(jobId){
	return http.get("/job/delete", {
		params: {
			jobId
		}
	});
}

function deleteUser(userId){
	return http.get("/user/delete", {
		params: {
			userId
		}
	});
}

function updateDepart(departmentId,name,desc){
	return http.post("/department/update", {
		departmentId,
		name,
		desc
	});
}

function updateJob(jobId,name,desc,power){
	return http.post("/job/update", {
		jobId,
		name,
		desc,
		power
	});
}

function updateUser(userId,name,sex, email, phone, departmentId, jobId, desc){
	return http.post("/user/update", {
		userId,
		name,
		sex,
		email,
		phone,
		departmentId,
		jobId,
		desc
	});
}

function addDepart(departmentId,name,desc){
	return http.post("/department/add", {
		name,
		desc
	});
}

function addJob(id, name,desc,power){
	return http.post("/job/add", {
		name,
		desc,
		power
	});
}

function addUser(userId,name,sex, email, phone, departmentId, jobId, desc){
	return http.post("/user/add", {
		name,
		sex,
		email,
		phone,
		departmentId,
		jobId,
		desc
	});
}

function search(departmentId, search){
	return http.get("/user/list", {
		params: {
			departmentId,
			search
		}
	})
}


export {
	signout,
	getDepartList,
	getUserName,
	checkLogin,
	deleteDepart,
	deleteJob,
	updateDepart,
	addDepart,
	getJobList,
	updateJob,
	addJob,
	deleteUser,
	getUserList,
	updateUser,
	addUser,
	search
}