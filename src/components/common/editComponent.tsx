import React, { useEffect, useState } from "react";
import { SizeInterface } from "../../config/publicInterface";
import { ChangeEvent, MdEditor } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import "../../sass/common/editComponent.sass";
import { updateArticleImg } from "../../api/article";
import PubSub from "pubsub-js";

interface EditComponentParam extends SizeInterface {
	typeParam: boolean,
	contextParam: string,
	getArticleValue?: (val: string) => void
}

export const EditComponent: React.FC<EditComponentParam> = ({ param, typeParam, contextParam, getArticleValue }) => {
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
		if (typeParam) {
			setText(contextParam);
			return;
		}
		return () => {
			PubSub.unsubscribe(subToken);
		};
	}, [typeParam, contextParam]);
	const onUploadImg = async (files: Array<File>, callback: (urls: string[]) => void) => {
		const res = await updateArticleImg(files);
		const urls = res.flatMap(item => item.data.url);
		// res.map((item) => item.data.map((item) => item.url))
		callback(urls);
	};
	// 定义定时器
	let timer: NodeJS.Timeout;
	const setArticle: ChangeEvent = (e) => {
		// 防抖
		clearTimeout(timer);
		timer = setTimeout(() => {
			// console.log(e);
			setText(e);
			if (getArticleValue) {
				getArticleValue(e);
			}
		}, 1000);
	};
	return (
		<>
			<MdEditor
				className={type ? "show" : "edit"}
				modelValue={text}
				onChange={setArticle}
				onUploadImg={onUploadImg}
				style={{ width: param.width, height: param.height, marginTop: param.marginTop }}
				showCodeRowNumber={true}
				theme={theme}
				readOnly={type}
				previewTheme={previewTheme}
				onSave={
					() => {
						PubSub.publish("saveShow");
					}
				}
			/>
		</>
	);
};
