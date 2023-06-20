// 引入React
import React from "react";
// 引入组件css
import "../../sass/header/headerComponent.sass";
import {Link} from "react-router-dom";
import {CommonInputBox} from "../common/commonInputBox";
import {HeaderMenu} from "./headerMenu";
import {SizeInterface} from "../../config/publicInterface";
import {UserBtn} from "./userBtn";
const HeaderComponent: React.FC<SizeInterface> = ({param}) => {

    return (
        <div className={"headerBox"} style={{width: param.width, height: param.height,marginTop:param.marginTop}}>
            <div className="header">
                <div className="header-left">
                    <Link to={'/'} className={"logo"}>Co-Blog</Link>
                </div>
                <div className="header-right">
                    <Link to={"/"} className={"btn-list"}>Home</Link>
                    <Link to={"/"} className={"btn-list"}>About</Link>
                    <CommonInputBox param={{width: "256px", height: "33px",marginTop:'0'}}/>
                    <div className="icon-item">
                        <img src="/static/images/github.png" alt=""/>
                    </div>
                    <UserBtn param={{width:"24px", height:"72px",marginTop:'0'}} />
                    <HeaderMenu param={{width: "24px", height: "24px",marginTop:'0'}}/>
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent;