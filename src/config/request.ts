import axios, {AxiosPromise} from "axios";
import Cookies from "js-cookie";
import PubSub from "pubsub-js";

// 请求方法名枚举
enum RequestMethod {
	Get = "get",
	Post = "post",
	Put = "put",
	Delete = "delete",
}

// 定义请求参数接口
interface IRequestParams {
	[key: string]: object|string|number;
}

export const baseUrl = process.env.REACT_APP_DEBUG_URL;
// const baseUrl = process.env.REACT_APP_RELEASE_URL;
// 封装请求方法
function request<T>(
	method: RequestMethod,
	url: string,
	data?: IRequestParams,
	token?: string
): AxiosPromise<T> {
	return axios({
		baseURL: baseUrl,
		withCredentials: true,
		headers: { "Content-Type": "application/json", "Authorization": token ? token : "" },
		method,
		url,
		data,
	});
}

// GET 请求方法
export function get<T>(url: string, params?: IRequestParams): AxiosPromise<T> {
	return request<T>(RequestMethod.Get, url, params, Cookies.get("token"));
}

// POST 请求方法
export function post<T>(url: string, data?: IRequestParams): AxiosPromise<T> {
	return request<T>(RequestMethod.Post, url, data, Cookies.get("token"));
}

// PUT 请求方法
export function put<T>(url: string, data?: IRequestParams): AxiosPromise<T> {
	return request<T>(RequestMethod.Put, url, data, Cookies.get("token"));
}

// DELETE 请求方法
export function del<T>(url: string, params?: IRequestParams): AxiosPromise<T> {
	return request<T>(RequestMethod.Delete, url, params, Cookies.get("token"));
}

export const loginSuccess = (token: string) => {
	PubSub.publish("openTip", {
		type: "success",
		msg: { message: "登录成功！", description: "" }
	});
	Cookies.set("token", token,{ expires: 1, path: "/" });
	PubSub.publish("getLoginInfo", true);
	PubSub.publish("loginStatus", false);
	PubSub.publish("commitLoginStatus", true);
};

export const loginFail = (e: Error) => {
	PubSub.publish("openTip", {
		type: "warning",
		msg: { message: "登录失败：", description: e.message }
	});
};
