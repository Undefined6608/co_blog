import React, {useEffect, useState} from "react";
import {CommonInputBox} from "../common/commonInputBox";
import {SizeInterface} from "../../config/publicInterface";
import "../../sass/menu/menuComponent.sass";
import {ArticleTypeList} from "../container/articleTypeList";

interface MenuComponentParam extends SizeInterface {
    showParam: boolean
}

export const MenuComponent: React.FC<MenuComponentParam> = ({param, showParam}) => {
    return (
        <div className={showParam ? "menuComponent showMenu" : "menuComponent"}
             style={{width: param.width, height: param.height, marginTop: param.marginTop}}>
            <CommonInputBox param={{width: "95%", height: "33px", marginTop: '10px'}}/>
            <ArticleTypeList state={false} setState={() => {
            }} param={{width: "90%", height: 'auto', marginTop: '10px'}}/>
        </div>
    )
}