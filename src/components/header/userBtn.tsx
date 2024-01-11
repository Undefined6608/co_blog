import React, { useCallback, useEffect, useState } from "react";
import "../../sass/header/userBtn.sass";
import { UserInfoInterface } from "../../config/responseInterface";
import { SizeInterface } from "../../config/propsInterface";
import { userSettingList } from "../../utils/staticData";
import { Link } from "react-router-dom";
import PubSub from "pubsub-js";
import { getUserInfo, logout } from "../../api/user";
import { LoginOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

/**
 * 用户按钮组件
 * @prop param 基础样式
 * @returns 
 */
export const UserBtn: React.FC<SizeInterface> = ({ param }) => {
	// 用户信息
	const [userInfo, setUserInfo] = useState<UserInfoInterface | null>(null);
	// 主题
	const [theme, setTheme] = useState(false);
	const getInfo = useCallback(() => {
		getUserInfo().then((r) => {
			// console.log(r);
			if (r.code === 200) return setUserInfo(r);
		});
	}, []);
	useEffect(() => {
		// 获取个人信息
		getInfo();
		// 订阅登录信息
		const loginInfoToken = PubSub.subscribe("getLoginInfo", (_, val: boolean) => {
			val ? getInfo() : setUserInfo(null);
		});
		// 订阅主题切换
		const themeToken = PubSub.subscribe("setTheme", (_, val: boolean) => {
			setTheme(val);
		});
		// 取消订阅
		return () => {
			PubSub.unsubscribe(loginInfoToken);
			PubSub.unsubscribe(themeToken);
		};
	}, [getInfo]);
	// 打开登录组件
	const login = () => {
		if (userInfo) return;
		PubSub.publish("loginStatus", true);
	};
	// 退出登录请求
	const handleLogout = (ev: React.MouseEvent) => {
		ev.preventDefault();
		logout().then((r) => {
			// console.log(r.data)
			if (r.code === 200) {
				Cookies.remove("token", { path: "/" });
				PubSub.publish("openTip", {
					type: "success",
					msg: { message: "退出成功！", description: "" }
				});
				PubSub.publish("getLoginInfo", false);
				PubSub.publish("commitLoginStatus", false);
				setUserInfo(null);
				return;
			}
			if (r.code === 404) {
				PubSub.publish("openTip", {
					type: "warning",
					msg: { message: "退出失败", description: r.msg }
				});
				return;
			}
		});
	};
	return (
		<>
			<div className={"user-btn"} style={{ width: param.width, height: param.height, marginTop: param.marginTop }}>
				{userInfo ?
					<img className={"user-icon"} onClick={login} src={userInfo.data.head_sculpture} alt="" /> :
					<LoginOutlined className={"user-icon"} style={{ fontSize: "24px" }} onClick={login} />
				}
				{
					userInfo ?
						<div className={"setting-list"}>
							{
								userInfo.data.limit === 0 || userInfo.data.limit === 1 ?
									userSettingList.map((item) => (
										<Link key={item.id} to={item.href} className="setting-item">
											<div className={"iconBox"}>
												<img className={theme ? "icon transition-icon" : "icon"} src={item.icon} alt="" />
											</div>
											<span className={"name"}>{item.name}</span>
										</Link>
									)) :
									userSettingList.slice(1).map((item) => (
										<Link key={item.id} to={item.href} className="setting-item">
											<div className={"iconBox"}>
												<img className={theme ? "icon transition-icon" : "icon"} src={item.icon} alt="" />
											</div>
											<span className={"name"}>{item.name}</span>
										</Link>
									))
							}
							<a href={"/"} className="setting-item" onClick={handleLogout}>
								<div className={"iconBox"}>
									<img className={theme ? "icon transition-icon" : "icon"} src={"/static/images/tuichudenglu.png"} alt="" />
								</div>
								<span className={"name"}>{"退出登录"}</span>
							</a>
						</div> :
						null
				}
			</div>
		</>
	);
};