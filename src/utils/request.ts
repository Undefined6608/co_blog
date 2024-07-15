import axios, { AxiosPromise } from "axios";
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
  [key: string]: object | string | number;
}

export const baseUrl = process.env.REACT_APP_DEBUG_URL;

// export const baseUrl = process.env.REACT_APP_RELEASE_URL;

/**
 * 请求方法
 * @param method 请求方法名
 * @param url 请求地址
 * @param data 请求参数
 * @param token token
 */
function request<T>(
  method: RequestMethod,
  url: string,
  data?: IRequestParams,
  token?: string,
): AxiosPromise<T> {
  return axios({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? token : "",
    },
    method,
    url,
    data,
  });
}

/**
 * get 请求方法
 * @param url 请求地址
 * @param params 请求参数
 * @returns
 */
export function get<T>(url: string, params?: IRequestParams): AxiosPromise<T> {
  return request<T>(RequestMethod.Get, url, params, Cookies.get("token"));
}

/**
 * post 请求方法
 * @param url 请求地址
 * @param data 请求参数
 * @returns
 */
export function post<T>(url: string, data?: IRequestParams): AxiosPromise<T> {
  return request<T>(RequestMethod.Post, url, data, Cookies.get("token"));
}

/**
 * put 请求方法
 * @param url 请求地址
 * @param data 请求参数
 * @returns
 */
export function put<T>(url: string, data?: IRequestParams): AxiosPromise<T> {
  return request<T>(RequestMethod.Put, url, data, Cookies.get("token"));
}

/**
 * delete 请求方法
 * @param url 请求地址
 * @param params 请求参数
 * @returns
 */
export function del<T>(url: string, params?: IRequestParams): AxiosPromise<T> {
  return request<T>(RequestMethod.Delete, url, params, Cookies.get("token"));
}

/**
 * 登录成功
 * @param token token
 */
export const loginSuccess = (token: string) => {
  PubSub.publish("openTip", {
    type: "success",
    msg: { message: "登录成功！", description: "" },
  });
  Cookies.set("token", token, { expires: 1, path: "/" });
  PubSub.publish("getLoginInfo", true);
  PubSub.publish("loginStatus", false);
  PubSub.publish("commitLoginStatus", true);
};

/**
 * 登录失败
 * @param e 错误信息
 */
export const loginFail = (e: Error) => {
  PubSub.publish("openTip", {
    type: "warning",
    msg: { message: "登录失败：", description: e.message },
  });
};
