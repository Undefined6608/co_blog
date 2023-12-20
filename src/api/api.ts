import PubSub from "pubsub-js";

/**
 * 请求错误
 * @param e 错误数据
 */
export const requestError = (e: Error) => {
	PubSub.publish("openTip", {
		type: "error",
		msg: { message: "请求失败", description: e.message }
	});
};
