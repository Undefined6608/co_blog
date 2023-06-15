import React, {useEffect, useState} from "react";
import "@/sass/header/userBtn.sass";
import {SizeInterface, UserInfoInterface} from "../../config/publicInterface";
import {userSettingList} from "../../utils/staticData";
import {Link} from "react-router-dom";
import PubSub from "pubsub-js";
import {getUserInfo} from "../../config/api";
import {LoginOutlined} from "@ant-design/icons";

export const UserBtn: React.FC<SizeInterface> = ({param}) => {
    const [userInfo, setUserInfo] = useState<UserInfoInterface | null>(null);
    useEffect(() => {
        getUserInfo().then((r) => {
            if (r.status !== 200) return PubSub.publish('openTip', {
                type: 'error',
                msg: {message: "请求失败", description: ""}
            })
            // console.log(r.data)
            if (r.data.code === 200) return setUserInfo(r.data);
            if (r.data.code === 404) {
            }
        })
    }, []);
    const login = () => {
        if (userInfo) return;
        PubSub.publish('loginStatus', true);
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
                        </div> :
                        null
                }
            </div>
        </>
    )
}