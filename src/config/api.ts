import {get, post} from "./request";
import {LoginInterface, UserInfoInterface} from "./publicInterface";
import {AxiosPromise} from "axios";

export const register = () => {

}

export const phoneLogin = ({phone, password}: { phone: string, password: string }): AxiosPromise<LoginInterface> => {
    return post<LoginInterface>('/user/phoneLogin', {phone: phone, password: password});
}

export const emailLogin = ({email, password}: { email: string, password: string }): AxiosPromise<LoginInterface> => {
    return post<LoginInterface>('/user/emailLogin', {email: email, password: password})
}

export const getUserInfo = (): AxiosPromise<UserInfoInterface> => {
    return get<UserInfoInterface>('/user/userInfo');
}