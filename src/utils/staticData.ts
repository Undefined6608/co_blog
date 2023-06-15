import {UserSettingInterface} from "../config/publicInterface";

export const userSettingList: UserSettingInterface[] = [
    {
        id: crypto.randomUUID(),
        icon: "/static/images/bianxie.png",
        name: "编写文档",
        href: "/editArticle"
    }, {
        id: crypto.randomUUID(),
        icon: "/static/images/shezhi.png",
        name: "用户设置",
        href: "/userSetting"
    }, {
        id: crypto.randomUUID(),
        icon: "/static/images/fankui.png",
        name: "用户反馈",
        href: "/feedBack"
    }, {
        id: crypto.randomUUID(),
        icon: "/static/images/tuichudenglu.png",
        name: "退出登录",
        href:"/"
    }
]