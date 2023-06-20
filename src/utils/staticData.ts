import {UserSettingInterface} from "../config/publicInterface";

export const userSettingList: UserSettingInterface[] = [
    {
        id: 'a',
        icon: "/static/images/bianxie.png",
        name: "编写文档",
        href: "/editArticle"
    }, {
        id: 'b',
        icon: "/static/images/shezhi.png",
        name: "用户设置",
        href: "/userSetting"
    }, {
        id: 'c',
        icon: "/static/images/fankui.png",
        name: "用户反馈",
        href: "/feedBack"
    }
]