import { ArticleItemInterface } from "./responseInterface";

/**
 * 组件基础样式类型
 * @prop {object} param 组件样式
 */
export interface SizeInterface {
	/**
	 * 组件样式
	 * @prop {string} width 宽度
	 * @prop {string} height 高度
	 * @prop {string} marginTop 上边距
	 */
	param: {
		width: string,
		height: string,
        marginTop: string
    }
}

/**
 * 评论组件参数类型声明
 * @extends SizeInterface 基础样式
 * @prop {number} articleId 文章id
 */
export interface CommitComponentParam extends SizeInterface {
	// 文章id
	articleId: number
}

/**
 * 编辑组件参数类型
 * @extends SizeInterface 基础样式
 * @prop {boolean} typeParam 是否是显示模式
 * @prop {string} contextParam 文章内容
 * @prop {function} getArticleValue 获取文章内容
 */
export interface EditComponentParam extends SizeInterface {
	typeParam: boolean,
	contextParam: string,
	getArticleValue?: (val: string) => void
}

/**
 * 文章框组件参数类型
 * @prop {SizeInterface} param 组件参数
 * @prop {string} param.width 宽度
 * @prop {string} param.height 高度
 * @prop {string} param.marginTop 顶部边距
 * @prop {string} context 文章内容
 */
export interface ArticleBoxParam extends SizeInterface {
	context: string
}

/**
 * 文章列表项类型
 * @prop {SizeInterface} param 组件参数
 * @prop {ArticleItemInterface} data 文章数据
 * @returns 文章列表项
 */
export interface ArticleItemParam extends SizeInterface {
	data: ArticleItemInterface
}

/**
 * 子组件接收参数类型
 * @extends SizeInterface 组件基础样式
 * @prop {boolean} state 是否显示子菜单
 * @prop {React.Dispatch<React.SetStateAction<boolean>>} setState 设置state的函数
 */
export interface ChildProps extends SizeInterface {
	state: boolean;
	setState: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * 头部组件参数类型
 * @prop param: 组件参数
 * @prop menuShow: 菜单是否显示
 */
export interface HeaderComponentParam extends SizeInterface {
	menuShow: boolean
}

/**
 *  头部菜单组件参数
 * @prop param 基础样式
 * @prop menuShow 菜单是否显示
 */
export interface HeaderMenuParam extends SizeInterface {
	menuShow: boolean
}

/**
 * 菜单组件参数接口
 * @extends SizeInterface 基础样式
 * @prop {boolean} showParam 是否显示菜单
 */
export interface MenuComponentParam extends SizeInterface {
	showParam: boolean
}