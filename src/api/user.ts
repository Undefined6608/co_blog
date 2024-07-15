import { get, post } from "../utils/request";
import {
  BaseInterface,
  LoginInterface,
  UploadImgInterface,
  UserInfoInterface,
} from "../config/responseInterface";
import { requestError } from "./api";
import axios from "axios";
import Cookies from "js-cookie";
import { PhoneLoginType, RegisterType } from "../config/requestInterface";

/**
 * 用户名查重
 * @param username 用户名
 * @returns
 */
export const userNameOccupy = async ({ username }: { username: string }) => {
  return await new Promise<BaseInterface>((resolve, reject) => {
    post<BaseInterface>("/user/userNameOccupy", { user_name: username })
      .then((r) => {
        return resolve(r.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/**
 * 电话号码查重
 * @param phone 电话号码
 * @returns
 */
export const phoneOccupy = async ({ phone }: { phone: string }) => {
  return await new Promise<BaseInterface>((resolve, reject) => {
    post<BaseInterface>("/user/phoneOccupy", { phone: phone })
      .then((r) => {
        return resolve(r.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/**
 * 邮箱查重
 * @param email 邮箱
 * @returns
 */
export const emailOccupy = async ({ email }: { email: string }) => {
  return await new Promise<BaseInterface>((resolve, reject) => {
    post<BaseInterface>("/user/emailOccupy", { email: email })
      .then((r) => {
        return resolve(r.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/**
 * 注册接口
 * @param {RegisterType} 用户信息
 * @returns
 */
export const register = async ({
  username,
  password,
  verPassword,
  phone,
  email,
  emailCode,
}: RegisterType) => {
  return await new Promise<BaseInterface>((resolve, reject) => {
    post<BaseInterface>("/user/register", {
      user_name: username,
      password: password,
      ver_password: verPassword,
      phone: phone,
      email: email,
      email_code: emailCode,
    })
      .then((r) => {
        if (r.status !== 200) return requestError(new Error(r.data.msg));
        return resolve(r.data);
      })
      .catch((e) => {
        reject(e);
        return requestError(e);
      });
  });
};

/**
 * 发送邮箱验证码
 * @param email 邮箱
 * @returns
 */
export const getEmailCode = async ({ email }: { email: string }) => {
  return await new Promise<BaseInterface>((resolve, reject) => {
    post<BaseInterface>("/user/sendEmailCode", {
      email: email,
    })
      .then((r) => {
        if (r.status !== 200) return requestError(new Error(r.data.msg));
        return resolve(r.data);
      })
      .catch((e) => {
        reject(e);
        return requestError(e);
      });
  });
};

/**
 * 电话号码登录
 * @param {PhoneLoginType} 用户信息
 * @returns
 */
export const phoneLogin = async ({
  phone,
  password,
  remember,
}: PhoneLoginType) => {
  if (!remember) return;
  return await new Promise<LoginInterface>((resolve, reject) => {
    post<LoginInterface>("/user/phoneLogin", {
      phone: phone,
      password: password,
    })
      .then((r) => {
        if (r.status !== 200) return requestError(new Error(r.data.msg));
        return resolve(r.data);
      })
      .catch((e) => {
        reject(e);
        return requestError(e);
      });
  });
};

/**
 * 上传用户头像
 * @param files 上传的文件
 * @returns
 */
export const updateUserImg = async (files: Array<File>) => {
  return Promise.all<UploadImgInterface>(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append("image", file);
        axios
          .create({
            baseURL: process.env.REACT_APP_DEBUG_URL,
            timeout: 60000,
          })
          .put<UploadImgInterface>("/upload/userAvatar", form, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: Cookies.get("token") || "",
            },
          })
          .then((res) => {
            if (res.status !== 200 && res.data.code !== 200) return rej(res);
            return rev(res.data);
          })
          .catch((error) => rej(error));
      });
    }),
  );
};

/**
 * 邮箱登录
 * @param 用户信息
 * @returns
 */
export const emailLogin = async ({
  email,
  password,
  remember,
}: {
  email: string;
  password: string;
  remember: number;
}) => {
  if (!remember) return;
  return await new Promise<LoginInterface>((resolve, reject) => {
    post<LoginInterface>("/user/emailLogin", {
      email: email,
      password: password,
    })
      .then((r) => {
        if (r.status !== 200) return requestError(new Error(r.data.msg));
        return resolve(r.data);
      })
      .catch((e) => {
        reject(e);
        return requestError(e);
      });
  });
};

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfo = async () => {
  return await new Promise<UserInfoInterface>((resolve, reject) => {
    get<UserInfoInterface>("/user/userInfo")
      .then((r) => {
        if (r.status !== 200) return requestError(new Error(r.data.msg));
        return resolve(r.data);
      })
      .catch((e) => {
        reject(e);
        return requestError(e);
      });
  });
};

/**
 * 退出登录
 * @returns
 */
export const logout = async () => {
  return new Promise<BaseInterface>((resolve, reject) => {
    post<BaseInterface>("/user/logout")
      .then((r) => {
        if (r.status !== 200) return requestError(new Error(r.data.msg));
        return resolve(r.data);
      })
      .catch((e) => {
        reject(e);
        return requestError(e);
      });
  });
};
