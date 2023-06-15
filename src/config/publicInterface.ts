export interface SizeInterface {
    param: {
        width: string,
        height: string
    }
}

export interface LoginInterface {
    code: number,
    msg: string,
    data: {}
}

export interface UserInfoInterface {
    code: number,
    msg: string,
    data: {
        username: string,
        head_sculpture: string,// 用户头像
        email: string, // 邮箱
        phone: string, // 电话号码
        limits: number, // 用户权限
        integral: number, // 积分
        member: number // 会员
    }
}

export interface UserSettingInterface {
    id: string,
    icon: string,
    name: string,
    href: string
}