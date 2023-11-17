import React, {useEffect, useState} from "react";
import "../../sass/header/headerMenu.sass";
import {SizeInterface} from "../../config/publicInterface";
import PubSub from "pubsub-js";

interface HeaderMenuParam extends SizeInterface {
    menuShow: boolean
}

export const HeaderMenu: React.FC<HeaderMenuParam> = ({param, menuShow}) => {
    const [show, setShow] = useState(false);
    const [theme, setTheme] = useState(false);
    useEffect(() => {
        setShow(menuShow);
        const themeToken = PubSub.subscribe('setTheme', (_, val: boolean) => {
            setTheme(val);
        })
        return () => {
            PubSub.unsubscribe(themeToken);
        }
    }, [menuShow])
    const updateShow = () => {
        const nextShow = !show;
        setShow(nextShow);
        PubSub.publish('menuShow', nextShow);
    };

    return (
        <div className="menu" style={{width: param.width, height: param.height, marginTop: param.marginTop}}
             onClick={updateShow}>
            <div className={theme ? "menuBox menuBox-dark" : "menuBox"}>
                <img className={!show ? "show" : ""} src="/static/images/menu.png" alt=""/>
                <img className={show ? "show" : ""} src="/static/images/quxiao.png" alt=""/>
            </div>
        </div>
    )
}