import React, { useEffect, useState } from "react";
import "../sass/pages/editArticle.sass";
import { EditComponent } from "../components/common/editComponent";
import { Input, Select } from "antd";
import { addArticle, getArticleType } from "../api/article";
import { getUserInfo } from "../api/user";
import PubSub from "pubsub-js";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/request";
import Cookies from "js-cookie";
import { SizeType } from "antd/es/config-provider/SizeContext";

export const EditArticle: React.FC = () => {
	const [typeList, setTypeList] = useState<Array<{ value: number, label: string }>>();
	const [type, setType] = useState(0);
	const [title, setTitle] = useState("");
	const [saveShow, setSaveShow] = useState(false);
	const history = useNavigate();
	const [size] = useState<SizeType>("large");
	const [icon, setIcon] = useState("http://39.101.72.168:81/image/icon.jpg");
	const [articleVal, setArticleVal] = useState("");

	const props: UploadProps = {
		name: "image",
		action: baseUrl + "/upload/articleIcon",
		// action: "/api/upload/img",
		method: "PUT",
		headers: {
			ContentType: "multipart/form-data",
			Authorization: Cookies.get("token") || ""
		},
		beforeUpload: (file) => {
			const isPNG = file.type === "image/png";
			if (!isPNG) {
				message.error(`${file.name} 不是png类型`);
				return false; // 阻止文件上传
			}
			const fileSizeLimit = 5 * 1024 * 1024; // 2 MB (以字节为单位)
			if (file.size > fileSizeLimit) {
				message.error("文件大小超过限制（最大5MB）");
				return false; // 阻止文件上传
			}
			return isPNG || Upload.LIST_IGNORE;
		},
		onChange(info) {
			console.log(info);
			if (info.file.status === "done") {
				if (info.file.response.code !== 200) return;
				setIcon(info.file.response.data.url);
				message.success(`${info.file.name} 图片上传成功!`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} 图片上传失败!`);
			}
		},
	};

	// 点击保存按钮
	const save = () => {
		setSaveShow(true);
	};

	// 提交文章
	const publish = () => {
		addArticleHandler();
	};

	const getArticleValue = (val: string) => {
		setArticleVal(val);
	};

	const addArticleHandler = () => {
		if (type === 0 || !title || !icon || !articleVal) return PubSub.publish("openTip", {
			type: "warning",
			msg: { message: "必填数据存在空值！", description: "请检查后再提交！" }
		});
		addArticle({ type: type, title: title, html: articleVal, icon: icon }).then((r) => {
			if (r.code !== 200) return PubSub.publish("openTip", {
				type: "error",
				msg: { message: "保存失败！", description: r.msg }
			});
			PubSub.publish("openTip", {
				type: "success",
				msg: { message: "保存成功", description: "" }
			});
			setSaveShow(false);
		});
	};

	useEffect(() => {
		getUserInfo().then((r) => {
			if (r.code !== 200) return history("/");
			if (r.data.limit !== 0 && r.data.limit !== 1) return history("/");
		});
		const saveShow = PubSub.subscribe("saveShow", () => {
			setSaveShow(true);
		});
		getArticleType().then((r) => {
			// console.log(r);
			if (r.code !== 200) return PubSub.publish("openTip", {
				type: "warning",
				msg: { message: "请求失败！", description: r.msg }
			});
			const updateTypeList: Array<{ value: number, label: string }> = r.data.articleType.filter(person => person.edit_status).map((item) => {
				return { value: item.id, label: item.type_name };
			});
			return setTypeList(updateTypeList);
		});
		return () => {
			PubSub.unsubscribe(saveShow);
		};
	}, []);
	return (
		<div className={"commonPages editArticleBox"}>
			{
				saveShow ?
					<div className={"selectList"} onClick={() => setSaveShow(false)}>
						<div className="selectBox" onClick={event => event.stopPropagation()}>
							<div className={"selectItem"}>
								文章类别：
								<Select
									onChange={setType}
									options={typeList}
									placeholder="请选择"
								/>
							</div>
							<div className={"selectItem"}>
								文章标题：
								<Input placeholder="请输入文章标题" value={title} onChange={(e) => setTitle(e.target.value)} />
							</div>
							<div className={"selectItem"}>
								文章展示图片：
								<Upload {...props}>
									<Button icon={<UploadOutlined />}>.png上传图片</Button>
								</Upload>
							</div>
							<div className="selectItem">
								<Button type="primary" size={size} onClick={publish}>提交</Button>
							</div>
						</div>
					</div> :
					null
			}
			<Button type="primary" size={size} onClick={save}>保存文章</Button>
			<EditComponent param={{ width: "100%", height: "80vh", marginTop: "10px" }} typeParam={false} contextParam={""} getArticleValue={getArticleValue} />
		</div>
	);
};
