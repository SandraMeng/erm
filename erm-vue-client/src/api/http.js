import axios from "axios";

// 配置好的axios实例
const http = axios.create({// axios实例
	baseUrl: "",
	// 将参数对象转为键值对字符串
	transformRequest(data){
		let str = ``;
		for (let key in data){
			str += `${key}=${data[key]}&`;
		}
		return str;
	}
});
// 拦截响应
http.interceptors.response.use(function(response){
	// response {config: {}, data: {}, request: {}, headers: {}, status:}
	return response.data;
});
export default http;