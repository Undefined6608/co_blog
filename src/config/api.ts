import {get, post} from "./request";
import {
	ArticleListInterface, ArticleMsgInterface,
	ArticleTypeInterface,
	BaseInterface, CommitsInterface, LoginInterface, UploadImgInterface,
	UserInfoInterface
} from "./publicInterface";
import PubSub from "pubsub-js";
import axios from "axios";

const requestError = (e: Error) => {
	PubSub.publish("openTip", {
		type: "error",
		msg: { message: "请求失败", description: e.message }
	});
};

export const userNameOccupy = async ({ username }: { username: string }) => {
	return await new Promise<BaseInterface>((resolve, reject) => {
		post<BaseInterface>("/user/userNameOccupy", { user_name: username }).then((r) => {
			return resolve(r.data);
		}).catch((e) => {
			reject(e);
		});
	});
};

export const phoneOccupy = async ({ phone }: { phone: string }) => {
	return await new Promise<BaseInterface>((resolve, reject) => {
		post<BaseInterface>("/user/phoneOccupy", { phone: phone }).then((r) => {
			return resolve(r.data);
		}).catch((e) => {
			reject(e);
		});
	});
};

export const emailOccupy = async ({ email }: { email: string }) => {
	return await new Promise<BaseInterface>((resolve, reject) => {
		post<BaseInterface>("/user/emailOccupy", { email: email }).then((r) => {
			return resolve(r.data);
		}).catch((e) => {
			reject(e);
		});
	});
};

export const register = async ({ username, password, phone, email }: { username: string, password: string, phone: string, email: string }) => {
	return await new Promise<BaseInterface>((resolve, reject) => {
		post<BaseInterface>("/user/register", {
			username: username,
			password: password,
			phone: phone,
			email: email
		}).then((r) => {
			if (r.status !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch((e) => {
			reject(e);
			return requestError(e);
		});
	});
};

export const phoneLogin = async ({ phone, password, remember }: { phone: string, password: string, remember: number }) => {
	if (!remember) return;
	return await new Promise<LoginInterface>((resolve, reject) => {
		post<LoginInterface>("/user/phoneLogin", { phone: phone, password: password }).then((r) => {
			if (r.status !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch((e) => {
			reject(e);
			return requestError(e);
		});
	});
};

export const emailLogin = async ({ email, password, remember }: { email: string, password: string, remember: number }) => {
	if (!remember) return;
	return await new Promise<LoginInterface>((resolve, reject) => {
		post<LoginInterface>("/user/emailLogin", { email: email, password: password }).then((r) => {
			if (r.status !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch((e) => {
			reject(e);
			return requestError(e);
		});
	});
};

export const getUserInfo = async () => {
	return await new Promise<UserInfoInterface>((resolve, reject) => {
		get<UserInfoInterface>("/user/userInfo").then((r) => {
			if (r.status !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch((e) => {
			reject(e);
			return requestError(e);
		});
	});
};

export const logout = async () => {
	return new Promise<BaseInterface>((resolve, reject) => {
		post<BaseInterface>("/user/logout").then(r => {
			if (r.status !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch(e => {
			reject(e);
			return requestError(e);
		});
	});
};

/***************************************************文章********************************************************************/
/*export const getArticleType = () => {
	return new Promise<ArticleTypeInterface>((resolve, reject) => {
		get<ArticleTypeInterface>("/article/getArticleType").then(r => {
			if (r.status !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch(e => {
			return requestError(e);
		})
	})
}*/

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

export const getArticleList = (typeId: number) => {
	return new Promise<ArticleListInterface>((resolve, reject) => {
		// get<ArticleListInterface>(`/article/getArticleList?typeId=${typeId}`).then(r => {
		get<ArticleListInterface>(`/article/articleList?type_id=${typeId}`).then(r => {
			if (r.status !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch(e => {
			reject(e);
			return requestError(e);
		});
	});
};

export const getArticleMsg = (articleId: number) => {
	return new Promise<ArticleMsgInterface>((resolve, reject) => {
		// get<ArticleMsgInterface>(`/article/getArticleMsg?articleId=${articleId}`).then(r => {
		get<ArticleMsgInterface>(`/article/articleInfo?article_id=${articleId}`).then(r => {
			if (r.status !== 200 || r.data.code !== 200) return requestError(new Error(r.data.msg));
			return resolve(r.data);
		}).catch(e => {
			reject(e);
			return requestError(e);
		});
	});
};

export const updateImg = async (files: Array<File>) => {
	return Promise.all<UploadImgInterface>(
		files.map((file) => {
			return new Promise((rev, rej) => {
				const form = new FormData();
				form.append("image", file);
				axios
					.post<UploadImgInterface>("/api/upload/img", form, {
						headers: {
							"Content-Type": "multipart/form-data"
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
