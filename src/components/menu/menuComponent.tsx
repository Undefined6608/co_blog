import React from "react";
import {CommonInputBox} from "../common/commonInputBox";
import {SizeInterface} from "../../config/publicInterface";
import "@/sass/menu/menuComponent.sass";

interface MenuComponentParam extends SizeInterface {
    show: boolean
}

export const MenuComponent: React.FC<MenuComponentParam> = ({param, show}) => {
    return (
        <div className={show ? "menuComponent showMenu" : "menuComponent"}>
            <CommonInputBox param={{width: "95%", height: "33px"}}/>
        </div>
    )
}