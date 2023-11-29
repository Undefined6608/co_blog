import React, { useEffect, useState } from "react";
import { SizeInterface } from "../../config/publicInterface";
import { MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import "../../sass/common/editComponent.sass";
import { addArticle, updateImg } from "../../config/api";
import PubSub from "pubsub-js";

interface EditComponentParam extends SizeInterface {
	typeParam: boolean,
	contextParam: string,
	updateData?: {
		type: number,
		title: string,
		icon: string
	}
}

export const EditComponent: React.FC<EditComponentParam> = ({ param, typeParam, contextParam, updateData }) => {
	const [text, setText] = useState("");
	const [previewTheme] = useState("vuepress");
	// true为仅显示，false为编写
	const [type, setType] = useState(false);
	const [theme, setTheme] = useState<"dark" | "light">("light");
	useEffect(() => {
		setType(typeParam);
		const subToken = PubSub.subscribe("setTheme", (_, val: boolean) => {
			setTheme(val ? "dark" : "light");
		});
		const saveArticle = PubSub.subscribe("saveArticle", () => {
			addArticleHandler(text);
		});
		if (typeParam) {
			setText(contextParam);
			return;
		}
		return () => {
			PubSub.unsubscribe(subToken);
			PubSub.unsubscribe(saveArticle);
		};
	}, [typeParam, contextParam]);
	const onUploadImg = async (files: Array<File>, callback: (urls: string[]) => void) => {
		const res = await updateImg(files);
		const urls = res.flatMap(item => item.data.map(innerItem => innerItem.url));
		// res.map((item) => item.data.map((item) => item.url))
		callback(urls);
	};

	const addArticleHandler = (html: string) => {
		if (!updateData) return;
		if (!updateData.type || !updateData.title || !updateData.icon || !html) return PubSub.publish("openTip", {
			type: "warning",
			msg: { message: "必填数据存在空值！", description: "请检查后再提交！" }
		});
		addArticle({ type: updateData.type, title: updateData.title, html: text, icon: updateData.icon }).then((r) => {
			if (r.code !== 200) return PubSub.publish("openTip", {
				type: "error",
				msg: { message: "保存失败！", description: r.msg }
			});
			PubSub.publish("openTip", {
				type: "success",
				msg: { message: "保存成功", description: "" }
			});
		});
	};
	return (
		<>
			<MdEditor className={type ? "show" : "edit"} modelValue={text} onChange={setText} onUploadImg={onUploadImg} style={{ width: param.width, height: param.height, marginTop: param.marginTop }} showCodeRowNumber={true} theme={theme} readOnly={type} previewTheme={previewTheme} onSave={() => { PubSub.publish("saveShow"); }} />
		</>
	);
};
