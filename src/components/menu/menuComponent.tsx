import React from "react";
import { CommonInputBox } from "../common/commonInputBox";
import "../../sass/menu/menuComponent.sass";
import { ArticleTypeList } from "../container/articleTypeList";
import { Link } from "react-router-dom";
import PubSub from "pubsub-js";
import { MenuComponentParam } from "../../config/propsInterface";

/**
 * 菜单组件
 * @prop param 基础样式
 * @returns 
 */
export const MenuComponent: React.FC<MenuComponentParam> = ({ param, showParam }) => {
	// 设置状态
	const setState = () => {
		// 这是一个空方法
	};
	return (
		<div className={showParam ? "menuComponent showMenu" : "menuComponent"}
			style={{ width: param.width, height: param.height, marginTop: param.marginTop }}>
			<CommonInputBox param={{ width: "95%", height: "33px", marginTop: "10px" }} />
			<Link to={"/"} className={"btn-list"} onClick={() => PubSub.publish("menuShow", false)}>Home</Link>
			<Link to={"/about"} className={"btn-list"} onClick={() => PubSub.publish("menuShow", false)}>About</Link>
			<ArticleTypeList state={false} setState={setState} param={{ width: "90%", height: "auto", marginTop: "10px" }} />
		</div>
	);
};