// 引入React-Router
import {BrowserRouter, Routes, Route} from "react-router-dom";
// 引入组件
import {Home} from "../pages/Home";
import {CommonComponent} from "../components/common/commonComponent";
import React from "react";
import {Register} from "../pages/register";
import {Forget} from "../pages/forget";
import {Article} from "../pages/article";
import {ArticleList} from "../pages/articleList";
import {EditArticle} from "../pages/editArticle";

export const AppRouter = () => {

    return (
        <BrowserRouter>
            <CommonComponent/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/forget'} element={<Forget/>}/>
                <Route path={'/articleList'} element={<ArticleList/>}/>
                <Route path={'/article'} element={<Article/>}/>
                <Route path={'editArticle'} element={<EditArticle/>}/>
            </Routes>
        </BrowserRouter>
    )
}