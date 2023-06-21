// 引入React-Router
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// 引入组件
import {Home} from "../pages/Home";
import {CommonComponent} from "../components/common/commonComponent";
import React from "react";
import {Register} from "../pages/register";
import {Forget} from "../pages/forget";
import {Article} from "../pages/article";
import {ArticleList} from "../pages/articleList";

export const AppRouter = () => {

    return (
        <Router>
            <CommonComponent/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/forget'} element={<Forget/>}/>
                <Route path={'/articleList'} element={<ArticleList/>}/>
                <Route path={'/article'} element={<Article/>}/>
            </Routes>
        </Router>
    )
}