// 引入React
import React from "react";
// 引入组件css
import "../../sass/header/headerComponent.sass";
import { Link } from "react-router-dom";
import { CommonInputBox } from "../common/commonInputBox";
import { HeaderMenu } from "./headerMenu";
import { UserBtn } from "./userBtn";
import { useState } from "react";
import { motion } from "framer-motion";
import { HeaderComponentParam } from "../../config/propsInterface";

/**
 * 头部组件
 * @props param header组件参数
 * @props menuShow 菜单显示状态
 * @returns 
 */
const HeaderComponent: React.FC<HeaderComponentParam> = ({ param, menuShow }) => {
	// 状态变量
	const [isOn, setIsOn] = useState(false);
	// 切换主题
	const toggleSwitch = () => {
		// 主题切换
		const conTemp = !isOn;
		// 发布主题切换消息
		PubSub.publish("theme", conTemp);
		// 发布主题切换消息
		PubSub.publish("setTheme", conTemp);
		// 设置状态
		setIsOn(conTemp);
	};

	/**
	 * 动画参数
	 * @property {string} type 动画类型
	 * @property {number} stiffness 弹性
	 * @property {number} damping 阻尼
	 */
	const spring = {
		// 动画类型
		type: "spring",
		// 弹性
		stiffness: 700,
		// 阻尼
		damping: 30
	};

	/**
	 * 点击事件
	 */
	const click = () => {
		// 跳转到github
		window.location.href = "https://github.com/Undefined6608";
	};
	return (
		<div className={"headerBox"} style={{ width: param.width, height: param.height, marginTop: param.marginTop }}>
			<div className="header">
				<div className="header-left">
					<Link to={"/"} className={"logo"}>Co-Blog</Link>
				</div>
				<div className="header-right">
					<div className="switch" data-ison={isOn} data-dark-mode={isOn} onClick={toggleSwitch}>
						<motion.div className="handle" layout transition={spring}>
							<img className={"btnImg"} src={isOn ? "/static/images/mon.png" : "/static/images/sun.png"} alt="" />
						</motion.div>
					</div>
					<Link to={"/"} className={"btn-list"}>Home</Link>
					<Link to={"/about"} className={"btn-list"}>About</Link>
					<CommonInputBox param={{ width: "256px", height: "33px", marginTop: "0" }} />
					<div className="icon-item" onClick={click}>
						<img className={isOn ? "img-dark" : ""} src="/static/images/github.png" alt="" />
					</div>
					<UserBtn param={{ width: "24px", height: "72px", marginTop: "0" }} />
					<HeaderMenu param={{ width: "24px", height: "24px", marginTop: "0" }} menuShow={menuShow} />
				</div>
			</div>
		</div>
	);
};

export default HeaderComponent;