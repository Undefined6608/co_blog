import React, {useEffect, useState} from "react";
import "../../sass/header/headerMenu.sass";
import {SizeInterface} from "../../config/publicInterface";
import PubSub from "pubsub-js";

interface HeaderMenuParam extends SizeInterface {
    menuShow: boolean
}

export const HeaderMenu: React.FC<HeaderMenuParam> = ({param, menuShow}) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        setShow(menuShow);
    }, [menuShow])
    const updateShow = () => {
        const nextShow = !show;
        setShow(nextShow);
        PubSub.publish('menuShow', nextShow);
    };

    return (
        <div className="menu" style={{width: param.width, height: param.height, marginTop: param.marginTop}}
             onClick={updateShow}>
            <img className={!show ? "show" : ""} src="/static/images/menu.png" alt=""/>
            <img className={show ? "show" : ""} src="/static/images/quxiao.png" alt=""/>
        </div>
    )
}