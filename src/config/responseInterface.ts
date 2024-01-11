/**
 * 基础请求返回值类型
 */
export interface BaseInterface {
    code: number,
    msg: string,
    data: object
}

/**
 * 登录接口返回值类型
 */
export interface LoginInterface extends BaseInterface {
    data:{
        token: string
    }
}

/**
 * 用户信息接口返回值类型
 */
export interface UserInfoInterface extends BaseInterface {
    data: {
        username: string,
        head_sculpture: string,// 用户头像
        email: string, // 邮箱
        phone: string, // 电话号码
        limit: number, // 用户权限
        integral: number, // 积分
        member: number // 会员
    }
}

/**
 * 图片上传接口返回值类型
 */
export interface UploadImgInterface extends BaseInterface {
	data: {
		url: string
	}
}

/**
 * 用户设置接口返回值类型
 */
export interface UserSettingInterface {
    id: string,
    icon: string,
    name: string,
    href: string
}

/**
 * 文章分类接口返回值类型
 */
export interface ArticleTypeInterface extends BaseInterface {
    data: {
        articleType: [
            {
                id: number,
                root_id: number,
                type_name: string,
                type_visible: number,
                picture: string,
                edit_status: boolean
            }
        ]
    }
}

/**
 * 文章列表接口返回值类型
 */
export interface ArticleItemInterface {
    id: number,
    user_name: string,
    head_sculpture: string,
    read: number,
    title: string,
    context: string,
    date: string,
	icon: string,
	member: number,
	integral: number
}

/**
 * 文章列表接口返回值类型
 */
export interface ArticleListInterface extends BaseInterface {
    data: {
        rows: ArticleItemInterface[]
    }
}

/**
 * 文章详情接口返回值类型
 */
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
    }
}

/**
 * 评论列表接口返回值类型
 */
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
