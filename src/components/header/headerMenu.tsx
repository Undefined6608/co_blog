import React, {useState} from "react";
import "../../sass/header/headerMenu.sass";
import {SizeInterface} from "../../config/publicInterface";
import PubSub from "pubsub-js";

export const HeaderMenu: React.FC<SizeInterface> = ({param}) => {
    const [show, setShow] = useState(false);
    const updateShow = () => {
        const nextShow = !show;
        setShow(nextShow);
        PubSub.publish('menuShow', nextShow);
    };

    return (
        <div className="menu" style={{width: param.width, height: param.height,marginTop:param.marginTop}} onClick={updateShow}>
            <img className={!show ? "show" : ""} src="/static/images/menu.png" alt=""/>
            <img className={show ? "show" : ""} src="/static/images/quxiao.png" alt=""/>
        </div>
    )
}