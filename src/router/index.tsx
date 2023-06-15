// 引入React-Router
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
// 引入创建history对象方法
// import {createBrowserHistory} from "history";
// 引入组件
import {Home} from "../pages/Home";
import {TipComponent} from "../components/common/tipComponent";
import HeaderComponent from "../components/header/headerComponent";
import {MenuComponent} from "../components/menu/menuComponent";
import {LoginComponent} from "../components/common/loginComponent";
import React, {useEffect, useState} from "react";
import PubSub from "pubsub-js";


// 创建history对象
// const history = createBrowserHistory();

export const AppRouter = () => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const pubSubToken = PubSub.subscribe('menuShow', (_, val) => setShow(val));
        return () => {
            PubSub.unsubscribe(pubSubToken);
        }
    }, [])
    return (
        <Router>
            <>
                <TipComponent/>
                <HeaderComponent param={{width: "100%", height: "72px"}}/>
                {
                    show ? <MenuComponent param={{width: "100%", height: "auto"}} show={show}/>
                        : <></>
                }
                <LoginComponent />
            </>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'*'} element={<Navigate to={'/'}/>}/>
            </Routes>
        </Router>
    )
}