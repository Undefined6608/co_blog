import {get, post} from "../utils/request";
import {
	ArticleListInterface, ArticleMsgInterface,
	ArticleTypeInterface,
	BaseInterface, CommitsInterface, UploadImgInterface
} from "../config/publicInterface";
import axios from "axios";
import { requestError } from "./api";
import Cookies from "js-cookie";
/**
 * 获取文章类型列表
 * @returns 
 */
export const getArticleType = () => {
	return new Promise<ArticleTypeInterface>((resolve, reject) => {
		get<ArticleTypeInterface>("/article/articleType").then(r => {
			if (r.status !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch(e => {
			reject(e);
			return requestError(e);
		});
	});
};

/**
 * 文章列表查询
 * @param typeId 文章类型ID
 * @returns 
 */
export const getArticleList = (typeId: number) => {
	return new Promise<ArticleListInterface>((resolve, reject) => {
		get<ArticleListInterface>(`/article/articleList?type_id=${typeId}`).then(r => {
			if (r.status !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch(e => {
			reject(e);
			return requestError(e);
		});
	});
};

/**
 * 获取文章详细信息
 * @param articleId 文章ID
 * @returns 
 */
export const getArticleMsg = (articleId: number) => {
	return new Promise<ArticleMsgInterface>((resolve, reject) => {
		get<ArticleMsgInterface>(`/article/articleInfo?article_id=${articleId}`).then(r => {
			if (r.status !== 200 || r.data.code !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch(e => {
			reject(e);
			return requestError(e);
		});
	});
};

/**
 * 上传文章图片
 * @param files 上传的文件
 * @returns 
 */
export const updateArticleImg = async (files: Array<File>) => {
	return Promise.all<UploadImgInterface>(
		files.map((file) => {
			return new Promise((rev, rej) => {
				const form = new FormData();
				form.append("image", file);
				axios.create({
					baseURL: process.env.REACT_APP_DEBUG_URL,
					timeout: 60000
				}).put<UploadImgInterface>("/upload/articleIcon", form, {
						headers: {
							"Content-Type": "multipart/form-data",
							"Authorization": Cookies.get("token") || ""
						}
					})
					.then((res) => {
						if (res.status !== 200 && res.data.code !== 200) return rej(res);
						return rev(res.data);
					})
					.catch((error) => rej(error));
			});
		})
	);
};

/**
 * 保存文章
 * @param {*} 文章信息
 * @returns 
 */
export const addArticle = ({ type, title, html, icon }: { type: number, title: string, html: string, icon: string }) => {
	return new Promise<BaseInterface>((resolve, reject) => {
		post<BaseInterface>("/article/addArticle", {
			typeId: type,
			title: title,
			context: html,
			icon: icon
		}).then(r => {
			if (r.status !== 200 || r.data.code !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch(e => {
			reject(e);
			return requestError(e);
		});
	});
};

/**
 * 添加阅读量
 * @param articleId 文章ID
 * @returns 
 */
export const addRead = (articleId: number) => {
	return new Promise<BaseInterface>((resolve, reject) => {
		// post<BaseInterface>(`/article/addRead`, {
		post<BaseInterface>("/article/updateRead", {
			article_id: articleId
		}).then(r => {
			if (r.status !== 200 || r.data.code !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch(e => {
			reject(e);
			return requestError(e);
		});
	});
};

/**
 * 获取文章评论
 * @param articleId 文章ID
 * @returns 
 */
export const getCommits = (articleId: number) => {
	return new Promise<CommitsInterface>((resolve, reject) => {
		// get<CommitsInterface>(`/article/getCommits?articleId=${articleId}`).then(r => {
		get<CommitsInterface>(`/article/articleComment?article_id=${articleId}`).then(r => {
			if (r.status !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch(e => {
			reject(e);
			return requestError(e);
		});
	});
};

/**
 * 添加文章评论
 * @param {*} 评论信息 
 * @returns 
 */
export const addCommits = ({ articleId, context }: { articleId: number, context: string }) => {
	return new Promise<CommitsInterface>((resolve, reject) => {
		post<CommitsInterface>("/article/addComment", {
			article_id: articleId,
			context: context
		}).then(r => {
			if (r.status !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch(e => {
			reject(e);
			return requestError(e);
		});
	});
};