import axios, {AxiosPromise} from 'axios';
import PubSub from "pubsub-js";

// 请求方法名枚举
enum RequestMethod {
    Get = 'get',
    Post = 'post',
    Put = 'put',
    Delete = 'delete',
}

// 定义请求参数接口
interface IRequestParams {
    [key: string]: any;
}

// 封装请求方法
function request<T>(
    method: RequestMethod,
    url: string,
    data?: IRequestParams,
): AxiosPromise<T> {
    return axios({
        baseURL: '/api',
        withCredentials: true,
        headers:{"Content-Type":"application/json"},
        method,
        url,
        data,
    });
}

// GET 请求方法
export function get<T>(url: string, params?: IRequestParams): AxiosPromise<T> {
    return request<T>(RequestMethod.Get, url, params);
}

// POST 请求方法
export function post<T>(url: string, data?: IRequestParams): AxiosPromise<T> {
    return request<T>(RequestMethod.Post, url, data);
}

// PUT 请求方法
export function put<T>(url: string, data?: IRequestParams): AxiosPromise<T> {
    return request<T>(RequestMethod.Put, url, data);
}

// DELETE 请求方法
export function del<T>(url: string, params?: IRequestParams): AxiosPromise<T> {
    return request<T>(RequestMethod.Delete, url, params);
}

export const loginSuccess = () => {
    PubSub.publish('openTip', {
        type: 'success',
        msg: {message: "登录成功！", description: ""}
    })
    setTimeout(() => {
        window.location.reload();
    }, 1000);
}

export const loginFail = (r: any) => {
    PubSub.publish('openTip', {
        type: 'warning',
        msg: {message: "登录失败：", description: r.data.msg}
    })
}
