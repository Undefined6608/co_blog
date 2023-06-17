import {get, post} from "./request";
import {BaseInterface, UserInfoInterface} from "./publicInterface";
import PubSub from "pubsub-js";

export const userNameOccupy = async ({username}: { username: string }) => {
    return await new Promise<BaseInterface>((resolve, reject) => {
        post<BaseInterface>('/user/userNameOccupy', {username: username}).then((r) => {
            return resolve(r.data);
        }).catch((e) => {
            reject(e)
        })
    })
}

export const phoneOccupy = async ({phone}: { phone: string }) => {
    return await new Promise<BaseInterface>((resolve, reject) => {
        post<BaseInterface>('/user/phoneOccupy', {phone: phone}).then((r) => {
            return resolve(r.data);
        }).catch((e) => {
            reject(e)
        })
    })
}

export const emailOccupy = async ({email}: { email: string }) => {
    return await new Promise<BaseInterface>((resolve, reject) => {
        post<BaseInterface>('/user/emailOccupy', {email: email}).then((r) => {
            return resolve(r.data);
        }).catch((e) => {
            reject(e)
        })
    })
}

export const register = async ({
                                   username,
                                   password,
                                   phone,
                                   email
                               }: { username: string, password: string, phone: string, email: string }) => {
    return await new Promise<BaseInterface>((resolve, reject)=>{
        post<BaseInterface>('/user/register',{username:username,password:password,})
    })
}

export const phoneLogin = async ({
                                     phone,
                                     password,
                                     remember
                                 }: { phone: string, password: string, remember: number }) => {
    return await new Promise<BaseInterface>((resolve, reject) => {
        post<BaseInterface>('/user/phoneLogin', {phone: phone, password: password, remember: remember}).then((r) => {
            if (r.status !== 200) return PubSub.publish('openTip', {
                type: 'error',
                msg: {message: "请求失败", description: ""}
            })
            return resolve(r.data)
        }).catch((e) => {
            PubSub.publish('openTip', {
                type: 'error',
                msg: {message: "请求失败", description: e.msg}
            })
            return reject(e)
        })
    });
}

export const emailLogin = async ({
                                     email,
                                     password,
                                     remember
                                 }: { email: string, password: string, remember: number }) => {
    return await new Promise<BaseInterface>((resolve, reject) => {
        post<BaseInterface>('/user/emailLogin', {email: email, password: password, remember: remember}).then((r) => {
            if (r.status !== 200) return PubSub.publish('openTip', {
                type: 'error',
                msg: {message: "请求失败", description: ""}
            })
            return resolve(r.data)
        }).catch((e) => {
            PubSub.publish('openTip', {
                type: 'error',
                msg: {message: "请求失败", description: e.msg}
            })
            return reject(e)
        })
    });
}

export const getUserInfo = async () => {
    return await new Promise<UserInfoInterface>((resolve, reject) => {
        get<UserInfoInterface>('/user/userInfo').then((r) => {
            if (r.status !== 200) return PubSub.publish('openTip', {
                type: 'error',
                msg: {message: "请求失败", description: ""}
            })
            return resolve(r.data);
        }).catch((e) => {
            PubSub.publish('openTip', {
                type: 'error',
                msg: {message: "请求失败", description: e.msg}
            })
            return reject(e)
        })
    })
}

export const logout = async () => {
    return new Promise<BaseInterface>((resolve, reject) => {
        post<BaseInterface>('/user/logout').then(r => {
            if (r.status !== 200) return PubSub.publish('openTip', {
                type: 'error',
                msg: {message: "请求失败", description: ""}
            })
            return resolve(r.data);
        }).catch(e => {
            PubSub.publish('openTip', {
                type: 'error',
                msg: {message: "请求失败", description: e.msg}
            })
            return reject(e)
        })
    })
}