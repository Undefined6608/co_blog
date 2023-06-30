// 引入React
import React from "react";
// 引入组件css
import "../../sass/header/headerComponent.sass";
import {Link} from "react-router-dom";
import {CommonInputBox} from "../common/commonInputBox";
import {HeaderMenu} from "./headerMenu";
import {SizeInterface} from "../../config/publicInterface";
import {UserBtn} from "./userBtn";
import {useState} from "react";
import {motion} from "framer-motion";

interface HeaderComponentParam extends SizeInterface {
    menuShow: boolean
}

const HeaderComponent: React.FC<HeaderComponentParam> = ({param, menuShow}) => {
    const [isOn, setIsOn] = useState(false);
    const toggleSwitch = () => {
        const conTemp = !isOn;
        PubSub.publish('theme', conTemp);
        PubSub.publish('setTheme', conTemp);
        setIsOn(conTemp);
    };
    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30
    };
    return (
        <div className={"headerBox"} style={{width: param.width, height: param.height, marginTop: param.marginTop}}>
            <div className="header">
                <div className="header-left">
                    <Link to={'/'} className={"logo"}>Co-Blog</Link>
                </div>
                <div className="header-right">
                    <div className="switch" data-ison={isOn} data-dark-mode={isOn} onClick={toggleSwitch}>
                        <motion.div className="handle" layout transition={spring}/>
                    </div>
                    <Link to={"/"} className={"btn-list"}>Home</Link>
                    <Link to={"/about"} className={"btn-list"}>About</Link>
                    <CommonInputBox param={{width: "256px", height: "33px", marginTop: '0'}}/>
                    <div className="icon-item" onClick={() => {
                        window.location.href = "https://github.com/Undefined6608"
                    }}>
                        <img src="/static/images/github.png" alt=""/>
                    </div>
                    <UserBtn param={{width: "24px", height: "72px", marginTop: '0'}}/>
                    <HeaderMenu param={{width: "24px", height: "24px", marginTop: '0'}} menuShow={menuShow}/>
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent;