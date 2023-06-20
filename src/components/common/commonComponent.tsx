import React, {useEffect, useState} from "react";
import PubSub from "pubsub-js";
import {TipComponent} from "./tipComponent";
import HeaderComponent from "../header/headerComponent";
import {MenuComponent} from "../menu/menuComponent";
import {LoginComponent} from "./loginComponent";
import {BrowserHistory} from "history";

interface CommonComponentProps {
    history: BrowserHistory;
}

export const CommonComponent: React.FC<CommonComponentProps> = ({history}) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const pubSubToken = PubSub.subscribe('menuShow', (_, val) => setShow(val));
        const historyToken = PubSub.subscribe('history', (_, val) => {
            history.push(val.path);
            window.location.reload();
        })
        return () => {
            PubSub.unsubscribe(pubSubToken);
            PubSub.unsubscribe(historyToken);
        }
    }, [history])
    return (
        <>
            <TipComponent/>
            <HeaderComponent param={{width: "100%", height: "72px",marginTop:'0'}}/>
            {
                show ? <MenuComponent param={{width: "100%", height: "auto",marginTop:'0'}} show={show}/>
                    : <></>
            }
            <LoginComponent history={history}/>
        </>
    )
}