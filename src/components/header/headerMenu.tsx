import React, { useEffect, useState } from "react";
import "../../sass/header/headerMenu.sass";
import PubSub from "pubsub-js";
import { HeaderMenuParam } from "../../config/propsInterface";

/**
 * 
 * @prop param 基础样式
 * @prop menuShow 是否显示
 * @returns 
 */
export const HeaderMenu: React.FC<HeaderMenuParam> = ({ param, menuShow }) => {
	// 是否显示
	const [show, setShow] = useState(false);
	// 主题
	const [theme, setTheme] = useState(false);

	useEffect(() => {
		// 是否显示
		setShow(menuShow);
		// 订阅主题
		const themeToken = PubSub.subscribe("setTheme", (_, val: boolean) => {
			// 设置主题
			setTheme(val);
		});
		// 取消订阅
		return () => {
			PubSub.unsubscribe(themeToken);
		};
	}, [menuShow]);

	/**
	 * 更新显示
	 */
	const updateShow = () => {
		const nextShow = !show;
		setShow(nextShow);
		PubSub.publish("menuShow", nextShow);
	};

	return (
		<div className="menu" style={{ width: param.width, height: param.height, marginTop: param.marginTop }} onClick={updateShow}>
			<div className={theme ? "menuBox menuBox-dark" : "menuBox"}>
				<img className={!show ? "show" : ""} src="/static/images/menu.png" alt="" />
				<img className={show ? "show" : ""} src="/static/images/quxiao.png" alt="" />
			</div>
		</div>
	);
};