import http from "./http";
function login(options){
	return http.post("/user/login", options).then(data=>{
		return data;
	});
}

export {
	login
}
