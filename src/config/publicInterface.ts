export interface SizeInterface {
    param: {
        width: string,
        height: string,
        marginTop: string
    }
}

export interface BaseInterface {
    code: number,
    msg: string,
    data: {}
}

export interface UserInfoInterface extends BaseInterface {
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

export interface UploadImgInterface extends BaseInterface{
    data:[
        {
            url:string
        }
    ]
}

export interface UserSettingInterface {
    id: string,
    icon: string,
    name: string,
    href: string
}


export interface ArticleTypeInterface extends BaseInterface {
    data: {
        articleTypeList: [
            {
                id: number,
                root_id: number,
                type_name: string,
                type_visible: number,
                picture: string
            }
        ]
    }
}

export interface ArticleItemInterface {
    id: number,
    userName: string,
    read: number,
    title: string,
    context: string,
    date: string,
    icon: string
}

export interface ArticleListInterface extends BaseInterface {
    data: {
        articleList: ArticleItemInterface[]
    }
}

export interface ArticleMsgInterface extends BaseInterface {
    data: {
        id: number,
        userName: string,
        read: number,
        title: string,
        context: string,
        date: string,
        icon: string
    }
}