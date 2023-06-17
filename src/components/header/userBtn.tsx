import React, {useEffect, useState} from "react";
import "@/sass/header/userBtn.sass";
import {SizeInterface, UserInfoInterface} from "../../config/publicInterface";
import {userSettingList} from "../../utils/staticData";
import {Link} from "react-router-dom";
import PubSub from "pubsub-js";
import {getUserInfo, logout} from "../../config/api";
import {LoginOutlined} from "@ant-design/icons";
import Cookies from "js-cookie";

export const UserBtn: React.FC<SizeInterface> = ({param}) => {
    const [userInfo, setUserInfo] = useState<UserInfoInterface | null>(null);
    useEffect(() => {
        // 获取个人信息
        getUserInfo().then((r) => {
            // console.log(r.data)
            if (r.code === 200) return setUserInfo(r);
        })
    }, []);
    // 打开登录组件
    const login = () => {
        if (userInfo) return;
        PubSub.publish('loginStatus', true);
    }
    // 退出登录请求
    const handleLogout = (ev: any) => {
        ev.preventDefault();
        logout().then((r) => {
            // console.log(r.data)
            if (r.code === 200) {
                Cookies.remove('connect.sid', {path: '/'});
                PubSub.publish('openTip', {
                    type: 'success',
                    msg: {message: "退出成功！", description: ""}
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                return;
            }
            if (r.code === 404) {
                PubSub.publish('openTip', {
                    type: 'warning',
                    msg: {message: "退出失败", description: r.msg}
                })
                return;
            }
        })
    }
    return (
        <>
            <div className={"user-btn"} style={{width: param.width, height: param.height}}>
                {userInfo ?
                    <img className={"user-icon"} onClick={login} src={userInfo.data.head_sculpture} alt=""/> :
                    <LoginOutlined className={"user-icon"} style={{fontSize: '24px'}} onClick={login}/>
                }
                {
                    userInfo ?
                        <div className={"setting-list"}>
                            {
                                userInfo.data.limits === 0 || userInfo.data.limits === 1 ?
                                    userSettingList.map((item, index) => (
                                        <Link key={item.id} to={item.href} className="setting-item">
                                            <img className={"icon"} src={item.icon} alt=""/>
                                            <span className={"name"}>{item.name}</span>
                                        </Link>
                                    )) :
                                    userSettingList.slice(1).map((item, index) => (
                                        <Link key={item.id} to={item.href} className="setting-item">
                                            <img className={"icon"} src={item.icon} alt=""/>
                                            <span className={"name"}>{item.name}</span>
                                        </Link>
                                    ))
                            }
                            <a href={"/"} className="setting-item" onClick={handleLogout}>
                                <img className={"icon"} src={"/static/images/tuichudenglu.png"} alt=""/>
                                <span className={"name"}>{"退出登录"}</span>
                            </a>
                        </div> :
                        null
                }
            </div>
        </>
    )
}