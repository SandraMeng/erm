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
	return http.delete("/department/list", {
		params: {
			departmentId
		}
	});
}

function deleteJob(jobId){
	return http.delete("/job/list", {
		params: {
			jobId
		}
	});
}

function deleteUser(userId){
	return http.delete("/user/list", {
		params: {
			userId
		}
	});
}

function updateDepart(departmentId,name,desc){
	return http.put("/department/info", {
		departmentId,
		name,
		desc
	});
}

function updateJob(jobId,name,desc,power){
	return http.put("/job/info", {
		jobId,
		name,
		desc,
		power
	});
}

function updateUser(userId,name,sex, email, phone, departmentId, jobId, desc){
	return http.put("/user/info", {
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
	return http.post("/department/list", {
		name,
		desc
	});
}

function addJob(id, name,desc,power){
	return http.post("/job/list", {
		name,
		desc,
		power
	});
}

function addUser(userId,name,sex, email, phone, departmentId, jobId, desc){
	return http.post("/user/list", {
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