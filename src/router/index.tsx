// 引入React-Router
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
// 引入创建history对象方法
import {createBrowserHistory, History} from "history";
// 引入组件
import {Home} from "../pages/Home";
import {CommonComponent} from "../components/common/commonComponent";
import React from "react";
import {Register} from "../pages/register";
import {Forget} from "../pages/forget";

// 创建history对象
const history: History = createBrowserHistory();

export const AppRouter = () => {

    return (
        <Router>
            <CommonComponent history={history}/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/forget'} element={<Forget/>}/>
                <Route path={'*'} element={<Navigate to={'/'}/>}/>
            </Routes>
        </Router>
    )
}