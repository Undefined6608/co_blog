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
    data: object
}

export interface LoginInterface extends BaseInterface {
    data:{
        token: string
    }
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

export interface UploadImgInterface extends BaseInterface {
    data: [
        {
            url: string
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
        // articleTypeList: [
        articleType: [
            {
                id: number,
                root_id: number,
                type_name: string,
                type_visible: number,
                picture: string,
                edit_status: number
            }
        ]
    }
}

export interface ArticleItemInterface {
    id: number,
    userName: string,
    avatar: string,
    read: number,
    title: string,
    context: string,
    date: string,
    icon: string
}

export interface ArticleListInterface extends BaseInterface {
    data: {
        // articleList: ArticleItemInterface[]
        rows: ArticleItemInterface[]
    }
}

export interface ArticleMsgInterface extends BaseInterface {
    data: {
        data:{
            id: number,
            userName: string,
            read: number,
            title: string,
            context: string,
            date: string,
            icon: string
        }
        /*id: number,
        userName: string,
        read: number,
        title: string,
        context: string,
        date: string,
        icon: string*/
    }
}

export interface CommitsInterface extends BaseInterface {
    data: {
        rows:[
            {
                user_name: string,
                integral: number,
                member: number,
                head_sculpture: string,
                id: number,
                context: string,
            }
        ]
    }
}
