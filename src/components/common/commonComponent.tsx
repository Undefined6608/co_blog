import React, {useEffect, useState} from "react";
import PubSub from "pubsub-js";
import {TipComponent} from "./tipComponent";
import HeaderComponent from "../header/headerComponent";
import {MenuComponent} from "../menu/menuComponent";
import {LoginComponent} from "./loginComponent";
import {ArticleType} from "./articleType";


export const CommonComponent: React.FC = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const pubSubToken = PubSub.subscribe('menuShow', (_, val) => setShow(val));
        return () => {
            PubSub.unsubscribe(pubSubToken);
        }
    }, [])
    return (
        <>
            <TipComponent/>
            <HeaderComponent param={{width: "100%", height: "72px", marginTop: '0'}}/>
            {
                show ? <MenuComponent param={{width: "100%", height: "calc(100vh - 72px)", marginTop: '0'}} show={show}/>
                    : <></>
            }
            <LoginComponent/>
            <ArticleType param={{width: 'auto', height: 'calc(100vh - 72px)', marginTop: '0'}}/>
        </>
    )
}